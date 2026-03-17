const logExceptions = false
const dev = true
const doTempTests = false // dev must be true

function exceptionHandler() {
    console.log("Enabling exception handler")
    Process.setExceptionHandler(function (e) {
        console.log("=== CRASH DETECTED ===");

        console.log("Type:", e.type);
        console.log("Address:", e.address);

        if (e.context) {
            let pc = Process.findModuleByAddress(e.context.pc)
            let lr = Process.findModuleByAddress(e.context.lr)
            let sp = Process.findModuleByAddress(e.context.sp)
            console.log("PC:", e.context.pc, pc?.name ?? "null");
            console.log("LR:", e.context.lr, lr?.name ?? "null");
            console.log("SP:", e.context.sp, sp?.name ?? "null");

            console.log("\nBacktrace:");
            console.log(
                Thread.backtrace(e.context, Backtracer.ACCURATE)
                    .map(DebugSymbol.fromAddress)
                    .join("\n")
            );
        }

        return false; // allow crash after logging
    });
    console.log("Done")
}

const module = Process.getModuleByName("libg.so");
const base = module.base;
Memory.protect(base, module.size, "rwx");
console.log("libg loaded at:", base)

const strCtor = new NativeFunction(base.add(0xA130F8), "pointer", ["pointer", "pointer"]); // Done

const Armceptor = {
    nop: function(addr) {
        Memory.patchCode(addr, Process.pageSize, function(code) {
            var writer = new Arm64Writer(code, { pc: addr });
            writer.putNop();
            writer.flush();
        });
    },
    ret: function(addr) {
        Memory.patchCode(addr, Process.pageSize, function(code) {
            var writer = new Arm64Writer(code, { pc: addr });
            writer.putRet();
            writer.flush();
        });
    },
    jumpOffset: function(addr, target) {
        Memory.patchCode(addr, Process.pageSize, function(code) {
            var writer = new Arm64Writer(code, { pc: addr });
            writer.putBImm(target);
            writer.flush();
        });
    },
    jumpout: function(addr, target) {
        Memory.patchCode(addr, Process.pageSize, function(code) {
            var writer = new Arm64Writer(code, { pc: addr });
            writer.putBranchAddress(target);
            writer.flush();
        });
    },
};

function killArxan() {
    console.log("Killing Arxan")

    Interceptor.replace(Module.findExportByName('libc.so', 'openat'), new NativeCallback(function(dirfd, pathname) {
        return -1;
    }, 'int', ['int', 'pointer']));
    console.log("Killed openat")

	Armceptor.jumpout(base.add(0x5A5080), base.add(0x5A5EE8));
    Armceptor.jumpout(base.add(0x9805CC), base.add(0x98153C)); // LoginMessage::encode
    console.log("Cleaned jumps")
	
    Memory.protect(base.add(0x34A828), 4, 'rwx');
	base.add(0x34A828).writeByteArray([0x08, 0x00, 0x80, 0xD2]); // MOV X8, #0
	Memory.protect(base.add(0x34A830), 4, 'rwx');
	base.add(0x34A830).writeByteArray([0x08, 0x00, 0x80, 0xD2]);
    console.log("Removed crash jumps")

	Armceptor.ret(base.add(0x438A1C)); // 70% OG 0x8760EC
	Armceptor.ret(base.add(0x95594C)); // 90% sure
	Armceptor.ret(base.add(0x686F9C)); // Same deal as #1 og 0x831108
	Armceptor.ret(base.add(0x341D98)); // 60% og 0x71DE00
	Armceptor.ret(base.add(0x9AA32C)); // 80%
    console.log("Ret anticheat calls")

    Armceptor.ret(base.add(0x2A6738)); // AntiCheat::guard_callback
    console.log("Killed AntiCheat")

    console.log("Killed Arxan successfully")
}

function setupHost(ip, port) {
    ip = ip || "127.0.0.1"
    port = port || "9339"
    Interceptor.attach(base.add(0x920CF4), {
        onEnter(args) {
            strCtor(args[1], Memory.allocUtf8String(ip));
			strCtor(args[2], Memory.allocUtf8String(port));
            console.log(`Redirected host to ${ip}:${port}`)
        }
    })
}

function killCrypto() {
    console.log("Killing crypto")

    // Messaging::decryptData
    Interceptor.replace(base.add(0x34342C), new NativeCallback(function (a1, a2, a3, a4) {
        return 1
    }, 'int64', ['int64', 'int64', 'int', 'pointer']));

    Interceptor.attach(base.add(0x3E9D84), { // Messaging::sendPepperAuthentication
        onEnter(args) {
            console.log("PepperState is", args[0].add(16).readU32())
            this.messaging = args[0];
            args[0].add(16).writeU32(5);
            args[1] = args[2];
        },
        onLeave() {
            this.messaging.add(16).writeU32(5);
        }
    });

    // Messaging::encryptAndWrite
    Memory.protect(base.add(0x6976A0), 4, 'rwx');
    base.add(0x6976A0).writeByteArray([0x80, 0xEE, 0x84, 0xD2]) // MOV X0, #0x2774

    Interceptor.attach(base.add(0x7FC368), { //Application::getDeviceVerificationResult
        onLeave: function (retval) {
            Memory.writeU32(retval, 1);
        }
    });

    Interceptor.replace(base.add(0x601A44), new NativeCallback(function () { // PepperCrypto::box_open
            return 0
        }, "int", ["pointer", "int", "pointer", "int", "pointer", "pointer"])
    );

    console.log("Done")
}

function tempTests() {
    console.log("Loading temp tests")

    console.log("Temp tests applied")
}

function hookDebugger() {
    console.log("Hooking debugger")

    Interceptor.attach(base.add(0x58E20C), { // Debugger::warning
        onEnter(args) {
            let warning = args[0].readCString();
            console.log("[Warning]", warning);
        }
    });

    Interceptor.attach(base.add(0x555D1C), { // Debugger::error
        onEnter(args) {
            let error = args[0].readCString();
            console.log("[Error]", error);
        }
    });

    console.log("Done")
}

function decodeString(src) {
    let len = src.add(4).readInt();
    if (len >= 8) {
        return src.add(8).readPointer().readUtf8String(len);
    }
    return src.add(8).readUtf8String(len);
}

rpc.exports = {
    init: function(stage, parameters) {
        console.log("Started")
        if (logExceptions)
            exceptionHandler()
        killArxan();
        console.log(parameters.length)
        setupHost(parameters.ip, parameters.port);
        killCrypto();
        if (dev) {
            console.log("Dev mode enabled")
            hookDebugger()
            if (doTempTests)
                tempTests()
        }
    }
};