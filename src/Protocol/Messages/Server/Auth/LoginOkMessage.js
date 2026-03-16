const LogicVersion = require("../../../../Logic/LogicVersion");
const PiranhaMessage = require("../../../PiranhaMessage");
const LogicCompressedString = require("../../../../Titan/LogicCompressedString")

class LoginOkMessage extends PiranhaMessage {
    constructor (session) {
        super(session)
        this.id = 29125
        this.version = 1
        this.stream = this.DataStream.getByteStream()
    }

    async encode() {
        this.stream.writeLong(0, 1);
        this.stream.writeLongLong(0, 1);
        this.stream.writeString("");
        this.stream.writeString("");
        this.stream.writeString("");
        this.stream.writeInt(11);
        this.stream.writeInt(0);
        this.stream.writeInt(99);
        this.stream.writeInt(11);
        this.stream.writeString(LogicVersion.getServerEnv());
        this.stream.writeInt(0);
        this.stream.writeInt(0);
        this.stream.writeInt(0);
        this.stream.writeString("");
        this.stream.writeString((Date.now() / 1000).toString());
        this.stream.writeString("1714237625000");
        this.stream.writeInt(0);
        this.stream.writeString("");
        this.stream.writeString("AU");
        this.stream.writeString("");
        this.stream.writeInt(3);
        this.stream.writeString("https://assets.everdalegame.com");
        this.stream.writeString("https://game-assets.everdalegame.com");
        this.stream.writeString("");
        //const scidToken = new LogicCompressedString("1234567890")
        //scidToken.encode(this.stream)
        this.stream.writeInt(0)
        this.stream.writeBoolean(true);
        this.stream.writeBoolean(false);
        this.stream.writeBoolean(false);
        this.stream.writeVInt(0);
        this.stream.writeStringReference("");
    }
}

module.exports = LoginOkMessage