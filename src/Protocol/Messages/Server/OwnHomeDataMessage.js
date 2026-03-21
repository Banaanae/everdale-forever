const LogicRandom = require('../../../Logic/LogicRandom')
const LogicDeliverableManager = require('../../../Logic/Reflectable/LogicDeliverableManager')
const LogicJSONOutReflector = require('../../../Logic/Reflector/LogicJSONOutReflector')
const LogicRawInReflector = require('../../../Logic/Reflector/LogicRawInReflector')
const LogicRawOutReflector = require('../../../Logic/Reflector/LogicRawOutReflector')
const ByteStream = require('../../../Titan/DataStream/ByteStream')
const LogicCompressedString = require('../../../Titan/LogicCompressedString')
const LogicLong = require('../../../Titan/LogicLong')
const PiranhaMessage = require('../../PiranhaMessage')
const zlib = require('node:zlib')

class OwnHomeDataMessage extends PiranhaMessage {
    constructor (session) {
        super(session)
        this.id = 24548
        this.version = 0
        this.stream = this.DataStream.getByteStream()
    }

    async encode() {
        this.stream.writeInt(0)
        this.stream.writeLongLong(0, 1)

        // LogicClientAvatar::encode
        // 7AB9E8

        this.stream.writeLongLong(0, 1)
        this.stream.writeStringReference('') // Likely  name
        this.stream.writeInt(0) // reg state
        this.stream.writeVInt(0)
        this.stream.writeVInt(0)
        this.stream.writeVInt(0)
        this.stream.writeVInt(0)

        // 683D00
        // todo - how does code go from reflactable id to vtable, and why is this home so hidden

        // reflectNextReflectable
        this.stream.writeByte(0x00) // bool false - cant get bit packed with bool below

        if (true) { // maybe something to do with is new?
            this.stream.writeBoolean(true)
            this.stream.writeLongLong(0, 1)
        } else {
            this.stream.writeBoolean(false)
        }

        this.stream.writeBoolean(false)
        this.stream.writeString('')
        this.stream.writeInt(0)
        this.stream.writeInt(0)
        this.stream.writeInt(0)
        this.stream.writeInt(0)
        this.stream.writeInt(0)

        // v5 = (a1 + 80)
        // v5 > 0
        const isRaw = false
        this.stream.writeBoolean(isRaw)
        if (isRaw) {
            //this.stream.writeBytes(Buffer.from([])) // a1 + 80
            let reflector = new ByteStream()
            await this.reflect(reflector)
            let comp = zlib.deflateSync(reflector.buffer)
            this.stream.writeBytes(reflector.buffer)
        } else {
            //const compressed = new LogicCompressedString(JSON.stringify((await this.reflect(null)).jsonData))
            //compressed.encode(this.stream) // a1 + 64
            this.stream.writeString(JSON.stringify((await this.reflect(null)).jsonData))
        }

        this.stream.writeLongLong(0, 1)
        this.stream.writeLongLong(0, 1)
        this.stream.writeBoolean(false)
        this.stream.writeInt(0)
        this.stream.writeInt(0)
        this.stream.writeBoolean(false)
        this.stream.writeInt(0)
        this.stream.writeLongLong(0, 1)
        this.stream.writeVInt(0)
        this.stream.writeLongLong(0, 1)
        this.stream.writeVInt(0)

        this.stream.writeInt(1)

        /*let rawOut = new LogicRawOutReflector(this.stream);
        rawOut.reflectArray(1, "chronosEvents");
        let base4 = Buffer.alloc(17);
        this.stream.buffer = Buffer.concat([this.stream.buffer, base4]);
        this.stream.offset += base4.length;*/
        this.stream.writeBoolean(false)
        this.stream.writeVInt(0)


        let dump = ""
        this.stream.buffer.forEach(e => {
            dump += e.toString(16).padStart(2, '0') + " "
        });
        console.log(dump)
    }

    async reflect(stream) {
        let reflector;
        if (stream === null) {
            reflector = new LogicJSONOutReflector({});
        } else {
            reflector = new LogicRawOutReflector(stream)
        }

        reflector.reflectInt(11, "version", 0)
        reflector.reflectInt(0, "debug_a", 0)
        reflector.reflectLong(0, 0, "check_tok", 0, 0)

        if (false) { // is not new
            reflector.reflectObject("home")
            reflector.reflectLong(0, 1, "id", 0, 0)
            reflector.reflectString("Banaanae", "name", "") //todo last arg
            reflector.reflectInt(1, "m_expLevel", 0)
            reflector.reflectInt(1, "m_reputation", 0)
            reflector.reflectInt(1, "m_cumulativeReputation", 0)
            reflector.reflectInt(1, "m_cumulativeValleyReputation", 0)
            reflector.reflectLong(0, 0, "allianceId", 0, 0)
            reflector.reflectInt(0, "Banner", 0) // only if alliance?
            reflector.reflectString("", "m_facebookId", null)
            reflector.reflectBool(true, "m_nameSetByUser", 0)
            reflector.reflectInt(1, "m_expPoints", 0)
            reflector.reflectInt(1, "m_diamonds", 0)
            reflector.reflectInt(1, "m_freeDiamonds", 0)
            reflector.reflectInt(1, "m_score", 0)
            reflector.reflectInt(0, "m_cumulativePurchasedDiamonds", 0)
            reflector.reflectLong(0, 0, "m_onStrike", 0, 0)
            reflector.reflectInt(1000, "m_lastSeenTime", 0)
            reflector.reflectInt(0, "m_surveyState", 0)
            reflector.reflectBool(false, "m_isTimeZoneOffsetSet", 0)
            reflector.reflectInt(0, "m_isTimeZoneOffset", 0)
            reflector.reflectLong(0, 0, "nameChangeLockedTimeSeconds", 0, 0)
            reflector.reflectInt(0, "m_totalSpendUsdCents", 0)
            reflector.reflectLong(0, 0, "m_lastPurchaseTime", 0, 0)
            reflector.reflectInt(0, "m_totalPurchaseCount", 0)
            reflector.reflectExitObject()
        }

        // sub_446B94
        // (a1 + 352) + 16LL
        reflector.reflectIntArray([], "missionhash")
        reflector.reflectArray(0, "achievements")
        // ^ if 0 goto LABEL_28
        reflector.reflectArray(0, "progress")
        reflector.reflectArray(0, "variables")
        reflector.reflectArray(0, "techs")
        reflector.reflectInt(0, "townhall", 0)

        // sub_359F8C
        // (a1 + 16) + 64LL
        reflector.reflectString("", "rlnk", "")
        reflector.reflectInt(-1, "ivs", -1)
        reflector.reflectInt(-1, "rfs", -1)
        reflector.reflectLong(0, 0, "rfaid", 0, 0)
        reflector.reflectString("", "rname", "")
        reflector.reflectInt(0, "jivsct", 0)
        reflector.reflectIntArray([], "jivlst") // LongArray
        reflector.reflectIntArray([], "tclst") // LongArray
        reflector.reflectArray(0, "tcivnmlst")
        reflector.reflectIntArray([], "rfprzcmdlst") // LongArray

        reflector.reflectInt(18, "buildingsNextId", 0)
        reflector.reflectArray(18, "buildings")
        
        await this.reflectBuilding(reflector, {id: 0, data: 100000, lvl: 0, x: 33, y: 33, lx: 4, ly: 4, t: [300000, 300020], c: [5, 250], queue: [], m_workers: [], state: 0, sites: [], orientation: 0, roofc: 0, stored: false}, null)
        await this.reflectBuilding(reflector, {id: 1, data: 100014, lvl: 0, x: 40, y: 23, lx: 3, ly: 3, m_workers: [], state: 1, sites: [], orientation: 0, roofc: 0, stored: false, prod_ms: {high: 0, low: 14400000}}, null)
        await this.reflectBuilding(reflector, {id: 2, data: 100002, lvl: 0, x: 38, y: 29, lx: 2, ly: 2, m_workers: [], state: 0, sites: [], orientation: 0, roofc: 0, stored: false}, null)
        await this.reflectBuilding(reflector, {id: 3, data: 100001, lvl: 0, x: 39, y: 39, lx: 2, ly: 2, t: [300003], c: [2], queue: [], m_workers: [], state: 0, sites: [], orientation: 0, roofc: 0, stored: false}, null)
        await this.reflectBuilding(reflector, {id: 4, data: 100003, lvl: 0, x: 38, y: 33, lx: 4, ly: 4, m_workers: [], state: 0, sites: [], orientation: 0, roofc: 0, stored: false, spawn_progress: [1, 1, 1, 1]}, null)
        await this.reflectBuilding(reflector, {id: 5, data: 100015, lvl: 0, x: 52, y: 38, lx: 2, ly: 2, m_workers: [], state: 0, sites: [], orientation: 0, roofc: 0, stored: false}, null)
        await this.reflectBuilding(reflector, {id: 6, data: 100041, lvl: 0, x: 58, y: 39, lx: 2, ly: 2, m_workers: [], state: 0, sites: [], orientation: 0, roofc: 0, stored: false}, null)
        await this.reflectBuilding(reflector, {id: 7, data: 100042, lvl: 0, x: 53, y: 32, lx: 4, ly: 3, m_workers: [], state: 0, sites: [], orientation: 0, roofc: 0, stored: false}, null)
        await this.reflectBuilding(reflector, {id: 8, data: 100071, lvl: 0, x: 49, y: 32, lx: 4, ly: 3, m_workers: [], state: 0, sites: [], orientation: 0, roofc: 0, stored: false}, null)
        await this.reflectBuilding(reflector, {id: 9, data: 100052, lvl: 0, x: 64, y: 36, lx: 2, ly: 2, m_workers: [], state: 0, sites: [], orientation: 0, roofc: 0, stored: false}, null)
        await this.reflectBuilding(reflector, {id: 10, data: 100044, lvl: 0, x: 59, y: 32, lx: 2, ly: 2, m_workers: [], state: 0, sites: [], orientation: 0, roofc: 0, stored: false}, null)
        await this.reflectBuilding(reflector, {id: 11, data: 100010, lvl: 0, x: 41, y: 48, lx: 4, ly: 4, m_workers: [], state: 1, sites: [], orientation: 0, roofc: 0, stored: false, prod_ms: {high: 0, low: 14400000}}, null)
        await this.reflectBuilding(reflector, {id: 12, data: 100007, lvl: 0, x: 50, y: 15, lx: 4, ly: 4, m_workers: [], state: 1, sites: [], orientation: 0, roofc: 0, stored: false, prod_ms: {high: 0, low: 14400000}}, null)
        await this.reflectBuilding(reflector, {id: 13, data: 100007, lvl: 0, x: 12, y: 54, lx: 4, ly: 4, m_workers: [], state: 1, sites: [], orientation: 0, roofc: 0, stored: false, prod_ms: {high: 0, low: 14400000}}, null)
        await this.reflectBuilding(reflector, {id: 14, data: 100010, lvl: 0, x: 17, y: 16, lx: 4, ly: 4, m_workers: [], state: 1, sites: [], orientation: 0, roofc: 0, stored: false, prod_ms: {high: 0, low: 14400000}}, null)
        await this.reflectBuilding(reflector, {id: 15, data: 100028, lvl: 0, x: 27, y: 54, lx: 5, ly: 5, m_workers: [], state: 1, sites: [], orientation: 0, roofc: 0, stored: false, spawn_progress: []}, null)
        await this.reflectBuilding(reflector, {id: 16, data: 100028, lvl: 0, x: 12, y: 33, lx: 5, ly: 5, m_workers: [], state: 1, sites: [], orientation: 0, roofc: 0, stored: false, spawn_progress: []}, null)
        await this.reflectBuilding(reflector, {id: 17, data: 100028, lvl: 0, x: 36, y: 10, lx: 5, ly: 5, m_workers: [], state: 1, sites: [], orientation: 0, roofc: 0, stored: false, spawn_progress: []}, null)
        reflector.reflectExitArray()

        reflector.reflectInt(11, "obstaclesNextId", 0)
        reflector.reflectArray(11, "obstacles")
        await this.reflectObstacle(reflector, {id: 0, data: 500050, lvl: 0, x: 55, y: 36, lx: 12, ly: 4, clear_t: {high: 0, low: 0}, timer_g: {high: 0, low: 0}, grow_t: 0, harv_p: false, harv: 0, fade: 0, harv_l: [], qid: -1})
        await this.reflectObstacle(reflector, {id: 1, data: 500049, lvl: 0, x: 48, y: 27, lx: 1, ly: 1, clear_t: {high: 0, low: 0}, timer_g: {high: 0, low: 0}, grow_t: 0, harv_p: false, harv: 0, fade: 0, harv_l: [], qid: -1})
        await this.reflectObstacle(reflector, {id: 2, data: 500049, lvl: 0, x: 46, y: 26, lx: 1, ly: 1, clear_t: {high: 0, low: 0}, timer_g: {high: 0, low: 0}, grow_t: 0, harv_p: false, harv: 0, fade: 0, harv_l: [], qid: -1})
        await this.reflectObstacle(reflector, {id: 3, data: 500049, lvl: 0, x: 47, y: 26, lx: 1, ly: 1, clear_t: {high: 0, low: 0}, timer_g: {high: 0, low: 0}, grow_t: 0, harv_p: false, harv: 0, fade: 0, harv_l: [], qid: -1})
        await this.reflectObstacle(reflector, {id: 4, data: 500049, lvl: 0, x: 47, y: 39, lx: 1, ly: 1, clear_t: {high: 0, low: 0}, timer_g: {high: 0, low: 0}, grow_t: 0, harv_p: false, harv: 0, fade: 0, harv_l: [], qid: -1})
        await this.reflectObstacle(reflector, {id: 5, data: 500049, lvl: 0, x: 46, y: 42, lx: 1, ly: 1, clear_t: {high: 0, low: 0}, timer_g: {high: 0, low: 0}, grow_t: 0, harv_p: false, harv: 0, fade: 0, harv_l: [], qid: -1})
        await this.reflectObstacle(reflector, {id: 6, data: 500049, lvl: 0, x: 46, y: 40, lx: 1, ly: 1, clear_t: {high: 0, low: 0}, timer_g: {high: 0, low: 0}, grow_t: 0, harv_p: false, harv: 0, fade: 0, harv_l: [], qid: -1})
        await this.reflectObstacle(reflector, {id: 7, data: 500047, lvl: 0, x: 45, y: 38, lx: 2, ly: 2, clear_t: {high: 0, low: 0}, timer_g: {high: 0, low: 0}, grow_t: 0, harv_p: false, harv: 0, fade: 0, harv_l: [], qid: -1})
        await this.reflectObstacle(reflector, {id: 8, data: 500047, lvl: 0, x: 47, y: 41, lx: 2, ly: 2, clear_t: {high: 0, low: 0}, timer_g: {high: 0, low: 0}, grow_t: 0, harv_p: false, harv: 0, fade: 0, harv_l: [], qid: -1})
        await this.reflectObstacle(reflector, {id: 9, data: 500059, lvl: 0, x: 41, y: 44, lx: 2, ly: 2, clear_t: {high: 0, low: 0}, timer_g: {high: 0, low: 0}, grow_t: 0, harv_p: false, harv: 0, fade: 0, harv_l: [], qid: -1})
        await this.reflectObstacle(reflector, {id: 10, data: 500059, lvl: 0, x: 44, y: 43, lx: 2, ly: 2, clear_t: {high: 0, low: 0}, timer_g: {high: 0, low: 0}, grow_t: 0, harv_p: false, harv: 0, fade: 0, harv_l: [], qid: -1})
        reflector.reflectExitArray()

        reflector.reflectInt(1, "workersNextId", 0)
        reflector.reflectArray(1, "workers")
        await this.reflectWorker(reflector, {id: 0, data: 3100006, nameIdx: 0, customName: "", xp: 0, lvl_claim: false, join: {high: 0, low: 0}, hunger: 9999, hunger_max: 10000, eat: 0, sleep_t: 10, at_sleep: false, reason: 0, targ_x: -1, targ_y: -1, tools2: [], awayv: {high: 0, low: 0}, away: 0, awayt: 0, visit: {high: 0, low: 0}, visitw: 0, visitf: false, spclevel: [], spcxp: [], cresn: 0, skinv: 0, qid: -1, hire: 0, hires: 0})
        reflector.reflectExitArray()

        reflector.reflectInt(0, "itemsNextId", 0)
        reflector.reflectArray(0, "items")/* remember set 1
        reflector.reflectNextObject()
        reflector.reflectInt(0, "id", null)
        reflector.reflectInt(-100000, "data", 0)
        reflector.reflectExitObject()
        reflector.reflectExitArray()*/

        reflector.reflectInt(0, "challengesNextId", 0)
        reflector.reflectArray(0, "challenges")

        reflector.reflectInt(0, "boatsNextId", 0)
        reflector.reflectArray(0, "boats")

        reflector.reflectInt(4, "cartsNextId", 0)
        reflector.reflectArray(4, "carts")
        await this.reflectCart(reflector, {id: 0, data: 600000})
        await this.reflectCart(reflector, {id: 1, data: 600001})
        await this.reflectCart(reflector, {id: 2, data: 600002})
        await this.reflectCart(reflector, {id: 3, data: 600003})
        reflector.reflectExitArray()

        reflector.reflectRandom(new LogicRandom(1 + Math.floor(Math.random() * 10)), "goRandom")

        reflector.reflectInt(0, "jobsNextId", 0)
        reflector.reflectArray(0, "jobs")

        reflector.reflectInt(0, "sitesNextId", 0)
        reflector.reflectArray(0, "sites")

        // sub_33E848
        reflector.reflectArray(0, "instances")

        // sub_6042D0
        //reflector.reflectObject("offerManager")
        //reflector.reflectExitObject()

        // sub_AC87D8
        reflector.reflectObject("techTree")
        reflector.reflectArray(0, "progress")
        reflector.reflectArray(0, "completed")
        reflector.reflectArray(0, "notif")
        reflector.reflectInt(0, "kpoints", 0)
        reflector.reflectExitObject()

        // if (a4 & 1) != 0
        // sub_8E9EDC
        reflector.reflectArray(0, "events")

        // wnotes 1004
        // worker notes?
        reflector.reflectArray(0, "wnotes")/*
        reflector.reflectNextObject()
        reflector.reflectLong(0, 1, "home", 0, 0)
        reflector.reflectBool(false, "res")
        reflector.reflectInt(0, "cdata", 0)
        reflector.reflectExitObject()
        reflector.reflectExitArray()*/

        reflector.reflectLong(0, 0, "boost_timer", 0, 0)
        reflector.reflectBool(false, "boost_pause", 0)
        reflector.reflectLong(0, 0, "boosts_regen", 0, 0)
        reflector.reflectLong(0, 0, "boosts_spent", 0, 0)
        reflector.reflectInt(0, "boost_fills", 0)
        reflector.reflectInt(0, "last_alliance_level", 1)

        // mail manager

        reflector.reflectInt(0, "leave_reason", 0)
        reflector.reflectIntArray([], "challenge_seen")
        reflector.reflectIntArray([], "challenge_page_seen")
        reflector.reflectArray(0, "respawnCycles")
        reflector.reflectRandom(new LogicRandom(1 + Math.floor(Math.random() * 10)), "respawnRandom")
        reflector.reflectRandom(new LogicRandom(1 + Math.floor(Math.random() * 10)), "mapRandom")
        reflector.reflectRandom(new LogicRandom(1 + Math.floor(Math.random() * 10)), "workerRandom")
        reflector.reflectRandom(new LogicRandom(1 + Math.floor(Math.random() * 10)), "lvlRandom")
        reflector.reflectBool(0, "on_strike", 0)
        reflector.reflectBool(0, "joined_nation", 0)
        reflector.reflectInt(0, "own_act_c", 0)

        // 4 dynamic bools
        // dword_125A9CC qword_125A9D0
        reflector.reflectBool(false, "help_opened")
        // dword_1263AA4 qword_1263AA8
        reflector.reflectBool(false, "map_visited")
        // dword_1267024 qword_1267028
        reflector.reflectBool(false, "time_estimation_seen")
        // dword_125E0EC qword_125E0F0
        reflector.reflectBool(false, "photo_mode_seen")

        // sub_4BCCB0
        /*reflector.reflectObject("questMan")
        reflector.reflectArray(0, "qarr")
        reflector.reflectRandom(new LogicRandom(1 + Math.floor(Math.random() * 10)), "random")
        reflector.reflectInt(1, "qid", 1)
        reflector.reflectExitObject()
        reflector.reflectObject("cycle")
        reflector.reflectInt(34, "data", 34)
        reflector.reflectInt(0, "id", 0)
        reflector.reflectInt(0, "cd", 0)
        reflector.reflectInt(0, "is", 0)
        reflector.reflectInt(0, "cs", 0)
        reflector.reflectInt(0, "ii", 0)
        reflector.reflectInt(0, "ci", 0)
        reflector.reflectInt(0, "t ", 0)
        reflector.reflectBool(false, "l", false)
        //reflector.reflectReflectablePointerBase(100000, "p", -1)
        reflector.reflectInt(0, "ntt", 0)
        reflector.reflectExitObject()*/

        // sub_9734D8
        reflector.reflectObject("toolInv")
        reflector.reflectArray(0, "tools")
        reflector.reflectRandom(4, "random") // todo
        reflector.reflectInt(30, "cap", 30)
        reflector.reflectExitObject()

        //sub_3C36A0
        reflector.reflectObject("reputation_manager")
        reflector.reflectArray(0, "claimed")
        reflector.reflectArray(0, "income")
        reflector.reflectInt(0, "income_cnt", 0)
        reflector.reflectInt(0, "lsr", 0)
        reflector.reflectInt(0, "mlmr", 0)
        reflector.reflectExitObject()

        //sub_4460F8
        reflector.reflectObject("missionManager")
        reflector.reflectString("", "mn", "")
        reflector.reflectInt(0, "s", 0)
        reflector.reflectBool(false, "r", false)
        reflector.reflectIntArray([0, 1, 2, 3, 4], "et")
        reflector.reflectArray(0, "ed")
        reflector.reflectIntArray([], "ev")
        reflector.reflectExitObject()

        //sub_927EB4
        /*reflector.reflectObject("ttphelp")
        // idk what this does/is for
        reflector.reflectExitObject()*/

        // LogicJsonOutReflector::fixReferences

        reflector.reflectInt(3, "boat_energy", 3)
        reflector.reflectInt(0, "boat_energy_reg", 0)
        reflector.reflectInt(3, "chall_energy", 3)
        reflector.reflectInt(0, "chall_energy_reg", 0)
        reflector.reflectInt(3, "constr_energy", 3)
        reflector.reflectInt(0, "constr_energy_reg", 0)
        reflector.reflectInt(0, "move_energy", 0)
        reflector.reflectInt(0, "move_energy_reg", 0)
        reflector.reflectArray(0, "known")
        // ^ if 0 goto LABEL_51

        const playerHasJoinedValley = false // temp for now
        if (playerHasJoinedValley) {
            // sub_3A6DFC
            reflector.reflectObject("nation")
            reflector.reflectLong(0, 0, "ff_lock", 0, 0)
            reflector.reflectInt(11, "version", 0)
            reflector.reflectObject("time")
            // sub_82D054
            const tick = Math.floor(Date.now() / 1000)
            reflector.reflectLong(tick >> 32, tick < 0 ? tick | 0x80000000 : tick & 0x7FFFFFFF, "tick", 0, 0)
            reflector.reflectExitObject()
            reflector.reflectLong(0, 0, "offset_time", 0, 0)
            // sub_868744
            reflector.reflectLong(1, 1, "id", 0, 0)
            reflector.reflectLong(0, 0, "createdTime", 0, 0)
            reflector.reflectInt(0, "badgeInfo", 0)
            reflector.reflectInt(0, "expLevel", 0)
            reflector.reflectInt(0, "expPoints", 0)
            reflector.reflectInt(0, "challengeScore", 0)
            reflector.reflectString("nation name", "name", "")
            reflector.reflectInt(1, "memberCount", 0)
            reflector.reflectInt(10, "maxMemberCount", 0)
            reflector.reflectInt(0, "castleLevel", 0)
            reflector.reflectInt(0, "monumentLevel", 0)
            reflector.reflectInt(0, 0, "lastMemberJoinedTick", 0, 0)
            reflector.reflectInt(1, "preferredLanguageId", 0)
            reflector.reflectString("description lol", "desc", "")
            reflector.reflectInt(1, "minLevel", 0)
            reflector.reflectInt(1, "minRep", 0)
            reflector.reflectInt(1, "type", 0)
            reflector.reflectInt(1, "createType", 0)
            reflector.reflectInt(1, "accessType", 0)
            reflector.reflectInt(1, "matchType", 1)
            reflector.reflectString("English", "chatLocale")
            reflector.reflectArray(0, "tags")
            // ^ if 0 return

            reflector.reflectInt(1, "rand_index", 0)
            reflector.reflectInt(1, "rand_gen", 0)
            // members 1005
            reflector.reflectInt(0, "vote_c", 0)
            // votes 1200
            reflector.reflectArray(0, "perks")
            // ^ if 0 goto LABEL_34
            //reflector.reflectInt(0, "perks_end", 0)
            //reflector.reflectArray(0, "perks_end") // LogicLongArray
            // object techTree
            reflector.reflectInt(0, "request_id", 0)
            // request 1007
            //reflector.reflectObject("objects")
            // TODO
            //reflector.reflectExitObject()
            // Dynamic reflectNextReflectable (a1 + 31) + 24
            // log 1010
            reflector.reflectInt(0, "nlog", 0)
            reflector.reflectInt(0, "colorIndex", 0)
            // trel 1001
            reflector.reflectExitObject()
        }
        reflector.reflectArray(1, "ntfs")
        reflector.reflectNextObject()
        reflector.reflectInt(0, "gid", 0)
        reflector.reflectBool(0, "e", 0)
        reflector.reflectInt(0, "ev", 0)
        reflector.reflectLong(0, "tck", 0)
        reflector.reflectLong(0, "nid", 0)
        reflector.reflectExitObject()
        reflector.reflectExitArray()
        // ^ if 0 goto LABEL_106

        // sub_69FF44

        reflector.reflectInt(1, "ntf_chat_pref", 1)
        reflector.reflectBool(1, "ntf_valley", 1)
        reflector.reflectBool(1, "ntf_village", 1)

        // TODO: sub_3D11B0
        // Array (a1 + 696) + 12

        reflector.reflectIntArray([0], "ftue_events")
        reflector.reflectInt(0, "valley_tasks", 0)

        // TODO: sub_BB2548
        reflector.reflectArray(0, "animals")/*
        reflector.reflectNextObject()
        reflector.reflectInt(34, "data", 34)
        reflector.reflectInt(0, "home_id", 0)
        reflector.reflectInt(0, "animal_id", 0)
        reflector.reflectInt("", "name", "")
        reflector.reflectExitObject()
        reflector.reflectExitArray()*/
        // TODO: sub_B17594
        reflector.reflectArray(0, "ures")
        // int d -1
        // long c 0
        // TODO: sub_B17594
        reflector.reflectArray(0, "purchd_prod_bldns")

        reflector.reflectObject("eventManager")
        // sub_5700FC
        reflector.reflectArray(0, "upcoming")
        reflector.reflectArray(0, "active")
        reflector.reflectArray(0, "activeTransientEvents")
        reflector.reflectInt(0, "pendingChronosOfferId", 0)
        reflector.reflectObject("purchaseCounts")
        reflector.reflectIntArray([], "ids")
        reflector.reflectIntArray([], "values")
        reflector.reflectExitObject()
        reflector.reflectObject("seenActiveEventIds")
        reflector.reflectExitObject()
        reflector.reflectExitObject()
        /* reflector.reflectObject("history")
        // past_members
        reflector.reflectExitObject()*/
        reflector.reflectInt(0, "known_pc", 0)
        reflector.reflectLong(0, 1, "ch_hash", 0, 0) // TODO

        return reflector
    }
    async reflectBuilding(reflector, data, stored) {
        reflector.reflectNextObject()
        reflector.reflectInt(data.id, "id", -1)
        reflector.reflectInt(data.data, "data", 0) // pointer base - good enough for now
        reflector.reflectInt(data.lvl, "lvl", 0)
        reflector.reflectInt(data.x, "x", 0)
        reflector.reflectInt(data.y, "y", 0)
        reflector.reflectInt(data.lx, "lx", 0)
        reflector.reflectInt(data.ly, "ly", 0)
        if (data.data === 100003 || data.data === 100028) {
            reflector.reflectIntArray(data.spawn_progress, "spawn_progress")
        } else if (data.data === 100014 || data.data === 100007 || data.data === 10010) {
            reflector.reflectLong(data.prod_ms.high, data.prod_ms.low, "prod_ms", 0, 0)
            reflector.reflectInt(0, "auto_n", 0)
            reflector.reflectInt(1, "m_numBatchesProduced", 0)
            reflector.reflectInt(1, "m_maxBatchesProducable", 0)
        } else if (data.data === 100002) {
            reflector.reflectIntArray([0], "workers")
            reflector.reflectIntArray([], "new_workers")
        } else if (data.data === 100015) {
            // optional object in
            /*reflector.reflectObject("TaskP")
            reflector.reflectExitObject()*/
        } else if (data.data === 100000 || data.data === 100001) {
            reflector.reflectArray(data.t.length, "t") // item id
            reflector.reflectNextInt(data.t)
            reflector.reflectExitArray()
            reflector.reflectIntArray(data.c, "c") // count
            reflector.reflectIntArray(data.queue, "queue")
        }
        if (stored !== null) {
            reflector.reflectBool(false, "auto")
            reflector.reflectBool(true, "man")
            reflector.reflectArray(0, "t")
            reflector.reflectIntArray([], "c")
            reflector.reflectIntArray([], "n")
        }
        reflector.reflectIntArray(data.m_workers, "m_workers")
        reflector.reflectInt(data.state, "state", 0)
        reflector.reflectIntArray(data.sites, "sites")
        reflector.reflectInt(data.orientation, "orientation", 0)
        reflector.reflectInt(data.roofc, "roofc", 0) // ..colour?
        reflector.reflectBool(data.stored, "stored")
        // pointer base skin
        reflector.reflectExitObject()
    }

    async reflectObstacle(reflector, data) {
        reflector.reflectNextObject()
        reflector.reflectInt(data.id, "id", -1)
        reflector.reflectInt(data.data, "data", 0)
        reflector.reflectInt(data.lvl, "lvl", 0)
        reflector.reflectInt(data.x, "x", 0)
        reflector.reflectInt(data.y, "y", 0)
        reflector.reflectInt(data.lx, "lx", 0)
        reflector.reflectInt(data.ly, "ly", 0)
        reflector.reflectLong(data.clear_t.high, data.clear_t.low, "clear_t", -1, -2)
        reflector.reflectLong(data.timer_g.high, data.timer_g.low, "timer_g", -1, -2)
        reflector.reflectInt(data.grow_t, "grow_t", 0)
        reflector.reflectBool(data.harv_p, "harv_p")
        reflector.reflectInt(data.harv, "harv", 0)
        reflector.reflectInt(data.fade, "fade", 0)
        reflector.reflectIntArray(data.harv_l, "harv_l")
        reflector.reflectInt(data.qid, "qid", -1)
        reflector.reflectExitObject()
    }

    async reflectWorker(reflector, data) {
        reflector.reflectNextObject()
        reflector.reflectInt(data.id, "id", -1)
        reflector.reflectInt(data.data, "data", 0)
        reflector.reflectInt(0, "lvl", 0)
        reflector.reflectInt(0, "x", 0)
        reflector.reflectInt(0, "y", 0)
        reflector.reflectInt(0, "lx", 0)
        reflector.reflectInt(0, "ly", 0)
        reflector.reflectInt(data.nameIdx, "nameIdx", 0)
        reflector.reflectString(data.customName, "customName", "")
        reflector.reflectInt(data.xp, "xp", 0)
        reflector.reflectBool(data.lvl_claim, "lvl_claim")
        // pointer base prof
        reflector.reflectInt(3200000, "prof", 32)
        reflector.reflectInt(3200000, "prof_a", 32)
        // pointer base prof_a
        reflector.reflectLong(data.join.high, data.join.low, "join", 0, 0)
        reflector.reflectInt(data.hunger, "hunger", 0)
        reflector.reflectInt(data.hunger_max, "hunger_max", 10000)
        reflector.reflectInt(data.eat, "eat", 0)
        reflector.reflectInt(data.sleep_t, "sleep_t", 0)
        reflector.reflectBool(data.at_sleep, "at_sleep")
        // +344LL move
        // +344LL visit_object
        reflector.reflectInt(data.reason, "reason", 0)
        reflector.reflectInt(data.targ_x, "targ_x", -1)
        reflector.reflectInt(data.targ_y, "targ_y", -1)
        //reflector.reflectObject("movementSystem")
        // sub_A6DFFC
        //reflector.reflectExitObject()
        reflector.reflectArray(0, "tools2")
        reflector.reflectLong(data.awayv.high, data.awayv.low, "awayv", 0, 0)
        reflector.reflectInt(data.away, "away", 0)
        reflector.reflectInt(data.awayt, "awayt", 0)
        reflector.reflectLong(data.visit.high, data.visit.low, "visit", 0, 0)
        reflector.reflectInt(data.visitw, "visitw", 0)
        reflector.reflectBool(data.visitf, "visitf")
        // pointer base cdata
        reflector.reflectIntArray([], "spclevel")
        reflector.reflectIntArray([], "spcxp")
        // pointer base cspc
        // pointer base cres
        reflector.reflectInt(data.cresn, "cresn", 0)
        // pointer base skin
        // pointer base skin2
        reflector.reflectInt(data.skinv, "skinv", 0)
        reflector.reflectInt(data.qid, "qid", -1)
        reflector.reflectInt(data.hire, "hire", 0)
        reflector.reflectInt(data.hires, "hires", 0)
        // +344LL hangout
        reflector.reflectExitObject()
    }

    async reflectCart(reflector, data) {
        reflector.reflectNextObject()
        reflector.reflectInt(data.id, "id", -1)
        reflector.reflectInt(data.data, "data", 0)
        reflector.reflectInt(0, "lvl", 0)
        reflector.reflectInt(0, "x", 0)
        reflector.reflectInt(0, "y", 0)
        reflector.reflectInt(0, "lx", 0)
        reflector.reflectInt(0, "ly", 0)
        // reflector.reflectOptionalObject("resu")
        // pointer base rr 3
        reflector.reflectInt(0, "ra", 0)
        reflector.reflectInt(0, "objId", 0)
        reflector.reflectInt(0, "taskId", 0)
        reflector.reflectLong(0, 0, "exp", 0, 0)
        reflector.reflectBool(false, "doesexp", false)
        reflector.reflectBool(false, "viltask", false)
        reflector.reflectBool(true, "can", true)
        reflector.reflectLong(0, 0, "m_createTick", 0, 0)
        reflector.reflectLong(0, 0, "m_completeTick", 0, 0)
        reflector.reflectExitObject()
    }
}

module.exports = OwnHomeDataMessage