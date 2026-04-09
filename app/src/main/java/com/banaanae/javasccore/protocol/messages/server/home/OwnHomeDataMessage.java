package com.banaanae.javasccore.protocol.messages.server.home;

import com.banaanae.javasccore.Server.Client;
import com.banaanae.javasccore.protocol.PiranhaMessage;
import com.banaanae.javasccore.titan.datastream.DataStream;
import com.banaanae.javasccore.titan.json.LogicJSONObject;
import com.banaanae.javasccore.titan.json.LogicJSONParser;
import com.banaanae.javasccore.titan.random.LogicRandom;
import com.banaanae.javasccore.titan.reflector.LogicJSONOutReflector;
import java.util.HexFormat;

public class OwnHomeDataMessage extends PiranhaMessage {
    public OwnHomeDataMessage(Client session) {
        super(session);
        this.stream = DataStream.getByteStream(new byte[0]);
    }
    
    @Override
    public void encode() {
        // TODO: Split this up into different files
        //       I'm just keeping it this way to make it easier to debug
        //       Once we get in then I'll clean up
        
        this.stream.writeInt(0);
        this.stream.writeLongLong(1);

        // LogicClientAvatar::encode
        // 7AB9E8

        this.stream.writeLongLong(1);
        this.stream.writeStringReference(""); // Likely  name
        this.stream.writeInt(0); // reg state
        this.stream.writeVInt(0);
        this.stream.writeVInt(0);
        this.stream.writeVInt(0);
        this.stream.writeVInt(0);

        // 683D00
        // todo - how does code go from reflactable id to vtable, and why is this home so hidden

        // reflectNextReflectable
        this.stream.writeByte((byte) 0x00); // bool false - cant get bit packed with bool below

        if (true) { // maybe something to do with is new?
            this.stream.writeBoolean(true);
            this.stream.writeLongLong(1);
        } else {
            this.stream.writeBoolean(false);
        }

        this.stream.writeBoolean(false);
        this.stream.writeString("");
        this.stream.writeInt(0);
        this.stream.writeInt(0);
        this.stream.writeInt(0);
        this.stream.writeInt(0);
        this.stream.writeInt(0);

        final boolean isCompressed = false;
        this.stream.writeBoolean(isCompressed);
        if (isCompressed) {
            // TODO
            //final String compressed = zlib.deflateSync(JSON.stringify((this.reflect()).jsonData));
            //this.stream.writeBytes(compressed);
        } else {
            session.log("1");
            this.stream.writeString(LogicJSONParser.createJSONString(reflect().currentObject, 1024));
        }

        this.stream.writeLongLong(1);
        this.stream.writeLongLong(1);
        this.stream.writeBoolean(false);
        this.stream.writeInt(0);
        this.stream.writeInt(0);
        this.stream.writeBoolean(false);
        this.stream.writeInt(0);
        this.stream.writeLongLong(1);
        this.stream.writeVInt(0);
        this.stream.writeLongLong(1);
        this.stream.writeVInt(0);

        this.stream.writeInt(1);

        /*let rawOut = new LogicRawOutReflector(this.stream);
        rawOut.reflectArray(1, "chronosEvents");
        let base4 = Buffer.alloc(17);
        this.stream.buffer = Buffer.concat([this.stream.buffer, base4]);
        this.stream.offset += base4.length;*/
        this.stream.writeBoolean(false);
        this.stream.writeVInt(0);
        
        System.out.println(HexFormat.of().formatHex(this.stream.buffer));
    }
    
    public LogicJSONOutReflector reflect() {
        final LogicJSONOutReflector reflector = new LogicJSONOutReflector(new LogicJSONObject(1024));

        session.log("2");
        reflector.reflectInt(11, "version", 0);
        reflector.reflectInt(0, "debug_a", 0);
        reflector.reflectLong(0, "check_tok", 0);
        session.log("3");

        if (false) { // is not new
            reflector.reflectObject("home");
            reflector.reflectLong(1, "id", 0);
            reflector.reflectString("Banaanae", "name", ""); //todo last arg
            reflector.reflectInt(1, "m_expLevel", 0);
            reflector.reflectInt(1, "m_reputation", 0);
            reflector.reflectInt(1, "m_cumulativeReputation", 0);
            reflector.reflectInt(1, "m_cumulativeValleyReputation", 0);
            reflector.reflectLong(0, "allianceId", 0);
            reflector.reflectInt(0, "Banner", 0); // only if alliance?
            reflector.reflectString("", "m_facebookId", null);
            reflector.reflectBool(true, "m_nameSetByUser", false);
            reflector.reflectInt(1, "m_expPoints", 0);
            reflector.reflectInt(1, "m_diamonds", 0);
            reflector.reflectInt(1, "m_freeDiamonds", 0);
            reflector.reflectInt(1, "m_score", 0);
            reflector.reflectInt(0, "m_cumulativePurchasedDiamonds", 0);
            reflector.reflectLong(0, "m_onStrike", 0);
            reflector.reflectInt(1000, "m_lastSeenTime", 0);
            reflector.reflectInt(0, "m_surveyState", 0);
            reflector.reflectBool(false, "m_isTimeZoneOffsetSet", false);
            reflector.reflectInt(0, "m_isTimeZoneOffset", 0);
            reflector.reflectLong(0, "nameChangeLockedTimeSeconds", 0);
            reflector.reflectInt(0, "m_totalSpendUsdCents", 0);
            reflector.reflectLong(0, "m_lastPurchaseTime", 0);
            reflector.reflectInt(0, "m_totalPurchaseCount", 0);
            reflector.reflectExitObject();
        }

        // sub_446B94
        // (a1 + 352) + 16LL
        reflector.reflectIntArray(new int[0], "missionhash");
        reflector.reflectArray(0, "achievements");
        // ^ if 0 goto LABEL_28
        reflector.reflectArray(0, "progress");
        session.log("3.1");
        reflector.reflectArray(0, "variables");
        reflector.reflectArray(0, "techs");
        reflector.reflectInt(0, "townhall", 0);

        // sub_359F8C
        // (a1 + 16) + 64LL
        reflector.reflectString("", "rlnk", "");
        reflector.reflectInt(-1, "ivs", -1);
        reflector.reflectInt(-1, "rfs", -1);
        reflector.reflectLong(0, "rfaid", 0);
        reflector.reflectString("", "rname", "");
        reflector.reflectInt(0, "jivsct", 0);
        reflector.reflectLongArray(new long[0], "jivlst");
        reflector.reflectLongArray(new long[0], "tclst");
        reflector.reflectArray(0, "tcivnmlst");
        reflector.reflectLongArray(new long[0], "rfprzcmdlst");

        reflector.reflectInt(18, "buildingsNextId", 0);
        reflector.reflectArray(18, "buildings");
        
        session.log("4");
        
        Building b = new Building();
        b.id = 0;
        b.data = 100000;
        b.x = 33;
        b.y = 33;
        b.lx = 4;
        b.ly = 4;
        b.t = new int[] {300000, 300026, 300022, 300001, 300020, 300023, 300007, 300008, 300011, 300024, 300025, 300027, 300030, 300031, 300065, 300033, 300034, 300035, 300036, 300065, 300066, 300067, 300068, 300078, 300080, 300083, 300084, 300085, 300086, 300087, 300088, 300089, 300090, 300091, 300092, 300093, 300094, 300095};
        b.c = new int[] {5, 0, 2, 250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
        b.queue = new int[0];
        System.out.println("4.05");
        this.reflectBuilding(reflector, b, null);
        session.log("5");
        b = new Building();
        b.id = 1;
        b.data = 100014;
        b.x = 40;
        b.y = 23;
        b.lx = 3;
        b.ly = 3;
        b.state = 1;
        b.prod_ms = 14400000;
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 2;
        b.data = 100002;
        b.x = 38;
        b.y = 29;
        b.lx = 2;
        b.ly = 2;
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 3;
        b.data = 100001;
        b.x = 39;
        b.y = 39;
        b.lx = 2;
        b.ly = 2;
        b.t = new int[] {300003};
        b.c = new int[] {2};
        b.queue = new int[0];
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 4;
        b.data = 100003;
        b.x = 38;
        b.y = 33;
        b.lx = 4;
        b.ly = 4;
        b.spawn_progress = new int[] {1};
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 5;
        b.data = 100015;
        b.x = 52;
        b.y = 38;
        b.lx = 2;
        b.ly = 2;
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 6;
        b.data = 100041;
        b.x = 58;
        b.y = 39;
        b.lx = 2;
        b.ly = 2;
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 7;
        b.data = 100042;
        b.x = 53;
        b.y = 32;
        b.lx = 4;
        b.ly = 3;
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 8;
        b.data = 100071;
        b.x = 49;
        b.y = 32;
        b.lx = 4;
        b.ly = 3;
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 9;
        b.data = 100052;
        b.x = 64;
        b.y = 36;
        b.lx = 2;
        b.ly = 2;
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 10;
        b.data = 100044;
        b.x = 59;
        b.y = 32;
        b.lx = 2;
        b.ly = 2;
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 11;
        b.data = 100010;
        b.x = 41;
        b.y = 48;
        b.lx = 4;
        b.ly = 4;
        b.prod_ms = 14400000;
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 12;
        b.data = 100007;
        b.x = 50;
        b.y = 15;
        b.lx = 4;
        b.ly = 4;
        b.prod_ms = 14400000;
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 13;
        b.data = 100007;
        b.x = 12;
        b.y = 54;
        b.lx = 4;
        b.ly = 4;
        b.prod_ms = 14400000;
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 14;
        b.data = 100010;
        b.x = 17;
        b.y = 16;
        b.lx = 4;
        b.ly = 4;
        b.prod_ms = 14400000;
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 15;
        b.data = 100028;
        b.x = 27;
        b.y = 54;
        b.lx = 5;
        b.ly = 5;
        b.spawn_progress = new int[] {1};
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 16;
        b.data = 100028;
        b.x = 12;
        b.y = 33;
        b.lx = 5;
        b.ly = 5;
        b.spawn_progress = new int[] {1};
        this.reflectBuilding(reflector, b, null);
        b = new Building();
        b.id = 17;
        b.data = 100028;
        b.x = 36;
        b.y = 10;
        b.lx = 5;
        b.ly = 5;
        b.spawn_progress = new int[] {1};
        this.reflectBuilding(reflector, b, null);
        reflector.reflectExitArray();

        reflector.reflectInt(11, "obstaclesNextId", 0);
        reflector.reflectArray(11, "obstacles");
        Obstacle o = new Obstacle();
        o.id = 0;
        o.data = 500050;
        o.x = 55;
        o.y = 36;
        o.lx = 12;
        o.ly = 4;
        this.reflectObstacle(reflector, o);
        o = new Obstacle();
        o.id = 1;
        o.data = 500049;
        o.x = 48;
        o.y = 27;
        o.lx = 1;
        o.ly = 1;
        this.reflectObstacle(reflector, o);
        o = new Obstacle();
        o.id = 2;
        o.data = 500049;
        o.x = 46;
        o.y = 26;
        o.lx = 1;
        o.ly = 1;
        this.reflectObstacle(reflector, o);
        o = new Obstacle();
        o.id = 3;
        o.data = 500049;
        o.x = 47;
        o.y = 26;
        o.lx = 1;
        o.ly = 1;
        this.reflectObstacle(reflector, o);
        o = new Obstacle();
        o.id = 4;
        o.data = 500049;
        o.x = 47;
        o.y = 39;
        o.lx = 1;
        o.ly = 1;
        this.reflectObstacle(reflector, o);
        o = new Obstacle();
        o.id = 5;
        o.data = 500049;
        o.x = 46;
        o.y = 42;
        o.lx = 1;
        o.ly = 1;
        this.reflectObstacle(reflector, o);
        o = new Obstacle();
        o.id = 6;
        o.data = 500049;
        o.x = 46;
        o.y = 40;
        o.lx = 1;
        o.ly = 1;
        this.reflectObstacle(reflector, o);
        o = new Obstacle();
        o.id = 7;
        o.data = 500047;
        o.x = 45;
        o.y = 38;
        o.lx = 2;
        o.ly = 2;
        this.reflectObstacle(reflector, o);
        o = new Obstacle();
        o.id = 8;
        o.data = 500047;
        o.x = 47;
        o.y = 41;
        o.lx = 2;
        o.ly = 2;
        this.reflectObstacle(reflector, o);
        o = new Obstacle();
        o.id = 9;
        o.data = 500059;
        o.x = 41;
        o.y = 44;
        o.lx = 2;
        o.ly = 2;
        this.reflectObstacle(reflector, o);
        o = new Obstacle();
        o.id = 10;
        o.data = 500059;
        o.x = 44;
        o.y = 43;
        o.lx = 2;
        o.ly = 2;
        this.reflectObstacle(reflector, o);
        reflector.reflectExitArray();

        reflector.reflectInt(1, "workersNextId", 0);
        System.out.println(reflector.currentArray);
        reflector.reflectArray(1, "workers");
        Worker w = new Worker();
        w.id = 0;
        w.data = 3100006;
        w.hunger = 5000;
        System.out.println("AEAE1");
        this.reflectWorker(reflector, w);
        System.out.println("AEAE2");
        reflector.reflectExitArray();
        System.out.println("AEAE3");

        reflector.reflectInt(0, "itemsNextId", 0);
        reflector.reflectArray(0, "items");/* remember set 1
        reflector.reflectNextObject();
        reflector.reflectInt(0, "id", null);
        reflector.reflectInt(-100000, "data", 0);
        reflector.reflectExitObject();
        reflector.reflectExitArray()*/

        reflector.reflectInt(0, "challengesNextId", 0);
        reflector.reflectArray(0, "challenges");

        reflector.reflectInt(0, "boatsNextId", 0);
        reflector.reflectArray(0, "boats");

        reflector.reflectInt(0, "cartsNextId", 0);
        reflector.reflectArray(0, "carts");
        /*this.reflectCart(reflector, {id: 0, data: 600000});
        this.reflectCart(reflector, {id: 1, data: 600001});
        this.reflectCart(reflector, {id: 2, data: 600002});
        this.reflectCart(reflector, {id: 3, data: 600003});
        reflector.reflectExitArray();*/

        reflector.reflectRandom(new LogicRandom(1 + (int) Math.floor(Math.random() * 10)), "goRandom");

        reflector.reflectInt(0, "jobsNextId", 0);
        reflector.reflectArray(0, "jobs");

        reflector.reflectInt(0, "sitesNextId", 0);
        reflector.reflectArray(0, "sites");

        // sub_33E848
        reflector.reflectArray(0, "instances");

        // sub_6042D0
        //reflector.reflectObject("offerManager");
        //reflector.reflectExitObject();

        // sub_AC87D8
        reflector.reflectObject("techTree");
        reflector.reflectArray(0, "progress");
        reflector.reflectArray(0, "completed");
        reflector.reflectArray(0, "notif");
        reflector.reflectInt(0, "kpoints", 0);
        reflector.reflectExitObject();

        // if (a4 & 1) != 0
        // sub_8E9EDC
        reflector.reflectArray(0, "events");

        // wnotes 1004
        // worker notes?
        reflector.reflectArray(0, "wnotes");/*
        reflector.reflectNextObject();
        reflector.reflectLong(0, 1, "home", 0);
        reflector.reflectBool(false, "res");
        reflector.reflectInt(0, "cdata", 0);
        reflector.reflectExitObject();
        reflector.reflectExitArray()*/

        reflector.reflectLong(0, "boost_timer", 0);
        reflector.reflectBool(false, "boost_pause", false);
        reflector.reflectLong(0, "boosts_regen", 0);
        reflector.reflectLong(0, "boosts_spent", 0);
        reflector.reflectInt(0, "boost_fills", 0);
        reflector.reflectInt(0, "last_alliance_level", 1);

        // mail manager

        reflector.reflectInt(0, "leave_reason", 0);
        reflector.reflectIntArray(new int[0], "challenge_seen");
        reflector.reflectIntArray(new int[0], "challenge_page_seen");
        reflector.reflectArray(0, "respawnCycles");
        reflector.reflectRandom(new LogicRandom(1 + (int) Math.floor(Math.random() * 10)), "respawnRandom");
        reflector.reflectRandom(new LogicRandom(1 + (int) Math.floor(Math.random() * 10)), "mapRandom");
        reflector.reflectRandom(new LogicRandom(1 + (int) Math.floor(Math.random() * 10)), "workerRandom");
        reflector.reflectRandom(new LogicRandom(1 + (int) Math.floor(Math.random() * 10)), "lvlRandom");
        reflector.reflectBool(false, "on_strike", false);
        reflector.reflectBool(false, "joined_nation", false);
        reflector.reflectInt(0, "own_act_c", 0);

        // 4 dynamic bools
        // dword_125A9CC qword_125A9D0
        reflector.reflectBool(false, "help_opened", false);
        // dword_1263AA4 qword_1263AA8
        reflector.reflectBool(false, "map_visited", false);
        // dword_1267024 qword_1267028
        reflector.reflectBool(false, "time_estimation_seen", false);
        // dword_125E0EC qword_125E0F0
        reflector.reflectBool(false, "photo_mode_seen", false);

        // sub_4BCCB0
        /*reflector.reflectObject("questMan");
        reflector.reflectArray(0, "qarr");
        reflector.reflectRandom(new LogicRandom(1 + Math.floor(Math.random() * 10)), "random");
        reflector.reflectInt(1, "qid", 1);
        reflector.reflectExitObject();
        reflector.reflectObject("cycle");
        reflector.reflectInt(34, "data", 34);
        reflector.reflectInt(0, "id", 0);
        reflector.reflectInt(0, "cd", 0);
        reflector.reflectInt(0, "is", 0);
        reflector.reflectInt(0, "cs", 0);
        reflector.reflectInt(0, "ii", 0);
        reflector.reflectInt(0, "ci", 0);
        reflector.reflectInt(0, "t ", 0);
        reflector.reflectBool(false, "l", false);
        //reflector.reflectReflectablePointerBase(100000, "p", -1);
        reflector.reflectInt(0, "ntt", 0);
        reflector.reflectExitObject()*/

        // sub_9734D8
        reflector.reflectObject("toolInv");
        reflector.reflectArray(0, "tools");
        reflector.reflectRandom(new LogicRandom(4), "random"); // todo
        reflector.reflectInt(30, "cap", 30);
        reflector.reflectExitObject();

        //sub_3C36A0
        reflector.reflectObject("reputation_manager");
        reflector.reflectArray(0, "claimed");
        reflector.reflectArray(0, "income");
        reflector.reflectInt(0, "income_cnt", 0);
        reflector.reflectInt(0, "lsr", 0);
        reflector.reflectInt(0, "mlmr", 0);
        reflector.reflectExitObject();

        //sub_4460F8
        reflector.reflectObject("missionManager");
        reflector.reflectString("", "mn", "");
        reflector.reflectInt(0, "s", 0);
        reflector.reflectBool(false, "r", false);
        reflector.reflectIntArray(new int[] {0, 1, 2, 3, 4}, "et");
        reflector.reflectArray(0, "ed");
        reflector.reflectIntArray(new int[0], "ev");
        reflector.reflectExitObject();

        //sub_927EB4
        /*reflector.reflectObject("ttphelp");
        // idk what this does/is for
        reflector.reflectExitObject()*/

        // LogicJsonOutReflector::fixReferences

        reflector.reflectInt(3, "boat_energy", 3);
        reflector.reflectInt(0, "boat_energy_reg", 0);
        reflector.reflectInt(3, "chall_energy", 3);
        reflector.reflectInt(0, "chall_energy_reg", 0);
        reflector.reflectInt(3, "constr_energy", 3);
        reflector.reflectInt(0, "constr_energy_reg", 0);
        reflector.reflectInt(0, "move_energy", 0);
        reflector.reflectInt(0, "move_energy_reg", 0);
        reflector.reflectArray(0, "known");
        // ^ if 0 goto LABEL_51

        final boolean playerHasJoinedValley = false; // temp for now
        if (playerHasJoinedValley) {
            // sub_3A6DFC
            reflector.reflectObject("nation");
            reflector.reflectLong(0, "ff_lock", 0);
            reflector.reflectInt(11, "version", 0);
            reflector.reflectObject("time");
            // sub_82D054
            reflector.reflectLong((long) Math.floor(System.currentTimeMillis() / 1000), "tick", 0);
            reflector.reflectExitObject();
            reflector.reflectLong(0, "offset_time", 0);
            // sub_868744
            reflector.reflectLong(1, "id", 0);
            reflector.reflectLong(0, "createdTime", 0);
            reflector.reflectInt(0, "badgeInfo", 0);
            reflector.reflectInt(0, "expLevel", 0);
            reflector.reflectInt(0, "expPoints", 0);
            reflector.reflectInt(0, "challengeScore", 0);
            reflector.reflectString("nation name", "name", "");
            reflector.reflectInt(1, "memberCount", 0);
            reflector.reflectInt(10, "maxMemberCount", 0);
            reflector.reflectInt(0, "castleLevel", 0);
            reflector.reflectInt(0, "monumentLevel", 0);
            reflector.reflectInt(0, "lastMemberJoinedTick", 0);
            reflector.reflectInt(1, "preferredLanguageId", 0);
            reflector.reflectString("description lol", "desc", "");
            reflector.reflectInt(1, "minLevel", 0);
            reflector.reflectInt(1, "minRep", 0);
            reflector.reflectInt(1, "type", 0);
            reflector.reflectInt(1, "createType", 0);
            reflector.reflectInt(1, "accessType", 0);
            reflector.reflectInt(1, "matchType", 1);
            reflector.reflectString("English", "chatLocale", "");
            reflector.reflectArray(0, "tags");
            // ^ if 0 return

            reflector.reflectInt(1, "rand_index", 0);
            reflector.reflectInt(1, "rand_gen", 0);
            // members 1005
            reflector.reflectInt(0, "vote_c", 0);
            // votes 1200
            reflector.reflectArray(0, "perks");
            // ^ if 0 goto LABEL_34
            //reflector.reflectInt(0, "perks_end", 0);
            //reflector.reflectArray(0, "perks_end") // LogicLongArray
            // object techTree
            reflector.reflectInt(0, "request_id", 0);
            // request 1007
            //reflector.reflectObject("objects");
            // TODO
            //reflector.reflectExitObject();
            // Dynamic reflectNextReflectable (a1 + 31) + 24
            // log 1010
            reflector.reflectInt(0, "nlog", 0);
            reflector.reflectInt(0, "colorIndex", 0);
            // trel 1001
            reflector.reflectExitObject();
        }
        reflector.reflectArray(1, "ntfs");
        reflector.reflectNextObject();
        reflector.reflectInt(0, "gid", 0);
        reflector.reflectBool(false, "e", false);
        reflector.reflectInt(0, "ev", 0);
        reflector.reflectLong(0, "tck", 0);
        reflector.reflectLong(0, "nid", 0);
        reflector.reflectExitObject();
        reflector.reflectExitArray();
        // ^ if 0 goto LABEL_106

        // sub_69FF44

        reflector.reflectInt(1, "ntf_chat_pref", 1);
        reflector.reflectBool(true, "ntf_valley", true);
        reflector.reflectBool(true, "ntf_village", true);

        // TODO: sub_3D11B0
        // Array (a1 + 696) + 12

        reflector.reflectIntArray(new int[1], "ftue_events");
        reflector.reflectInt(0, "valley_tasks", 0);

        // TODO: sub_BB2548
        reflector.reflectArray(0, "animals");/*
        reflector.reflectNextObject();
        reflector.reflectInt(34, "data", 34);
        reflector.reflectInt(0, "home_id", 0);
        reflector.reflectInt(0, "animal_id", 0);
        reflector.reflectInt("", "name", "");
        reflector.reflectExitObject();
        reflector.reflectExitArray()*/
        // TODO: sub_B17594
        reflector.reflectArray(0, "ures");
        // int d -1
        // long c 0
        // TODO: sub_B17594
        reflector.reflectArray(0, "purchd_prod_bldns");

        reflector.reflectObject("eventManager");
        // sub_5700FC
        reflector.reflectArray(0, "upcoming");
        reflector.reflectArray(0, "active");
        reflector.reflectArray(0, "activeTransientEvents");
        reflector.reflectInt(0, "pendingChronosOfferId", 0);
        reflector.reflectObject("purchaseCounts");
        reflector.reflectIntArray(new int[0], "ids");
        reflector.reflectIntArray(new int[0], "values");
        reflector.reflectExitObject();
        reflector.reflectObject("seenActiveEventIds");
        reflector.reflectIntArray(new int[0], "ids");
        reflector.reflectIntArray(new int[0], "values");
        reflector.reflectExitObject();
        reflector.reflectExitObject();
        /* reflector.reflectObject("history");
        // past_members
        reflector.reflectExitObject()*/
        reflector.reflectInt(0, "known_pc", 0);
        reflector.reflectLong(1, "ch_hash", 0); // TODO

        session.log("3");
        return reflector;
    }
    
    public class Base {
        public int id = -1;
        public int data = 0;
        public int lvl = 0;
        public int x = 0;
        public int y = 0;
        public int lx = 0;
        public int ly = 0;
    }
    
    public class Building extends Base {
        public int[] t = null;
        public int[] c = null;
        public int[] queue = null;
        
        public int[] m_workers = new int[0];
        public int state = 0;
        public int[] sites = new int[0];
        public int orientation = 0;
        public int roofc = 0;
        public boolean stored = false;
        
        public long prod_ms = 0;
        public int[] spawn_progress = null;
    }
    
    public void reflectBuilding(LogicJSONOutReflector reflector, Building data, Object stored) {
        System.out.println("4.1");
        reflector.reflectNextObject();
        System.out.println("4.2");
        reflector.reflectInt(data.id, "id", -1);
        System.out.println("4.3");
        reflector.reflectInt(data.data, "data", 0); // pointer base - good enough for now
        reflector.reflectInt(data.lvl, "lvl", 0);
        reflector.reflectInt(data.x, "x", 0);
        reflector.reflectInt(data.y, "y", 0);
        reflector.reflectInt(data.lx, "lx", 0);
        reflector.reflectInt(data.ly, "ly", 0);
        if (data.data == 100003 || data.data == 100028) {
            reflector.reflectIntArray(data.spawn_progress, "spawn_progress");
        } else if (data.data == 100014 || data.data == 100007 || data.data == 100010) {
            reflector.reflectLong(data.prod_ms, "prod_ms", 0);
            reflector.reflectInt(0, "auto_n", 0);
            reflector.reflectInt(1, "m_numBatchesProduced", 0);
            reflector.reflectInt(1, "m_maxBatchesProducable", 0);
        } else if (data.data == 100002) {
            reflector.reflectIntArray(new int[] {0}, "workers");
            reflector.reflectIntArray(new int[0], "new_workers");
        } else if (data.data == 100015) {
            // optional object in
            /*reflector.reflectObject("TaskP");
            reflector.reflectExitObject()*/
        } else if (data.data == 100000 || data.data == 100001) {
            System.out.println(data.t.length + " " + data.c.length);
            if (reflector.reflectArray(data.t.length, "t") != 0) { // item id
                for (int i : data.t)
                    reflector.reflectNextInt(i);
                System.out.println(12);
                reflector.reflectExitArray();
                System.out.println(13);
            }
            System.out.println("c" + data.id);
            reflector.reflectIntArray(data.c, "c"); // count
            reflector.reflectIntArray(data.queue, "queue");
        }
        if (stored != null) {
            reflector.reflectBool(false, "auto", false);
            reflector.reflectBool(true, "man", false); // TODO CHECL ME
            reflector.reflectArray(0, "t");
            reflector.reflectIntArray(new int[0], "c");
            reflector.reflectIntArray(new int[0], "n");
        }
        reflector.reflectIntArray(data.m_workers, "m_workers");
        reflector.reflectInt(data.state, "state", 0);
        reflector.reflectIntArray(data.sites, "sites");
        reflector.reflectInt(data.orientation, "orientation", 0);
        reflector.reflectInt(data.roofc, "roofc", 0); // ..colour?
        reflector.reflectBool(data.stored, "stored", false);
        // pointer base skin
        System.out.println("7");
        reflector.reflectExitObject();
        System.out.println("h");
        
    }
    
    public class Obstacle extends Base {
        public long clear_t = -2;
        public long timer_g = -2;
        public int grow_t = 0;
        public boolean harv_p = false;
        public int harv = 0;
        public int fade = 0;
        public int[] harv_l = new int[0];
        public int qid = -1;
    }
    
    public void reflectObstacle(LogicJSONOutReflector reflector, Obstacle data) {
        reflector.reflectNextObject();
        reflector.reflectInt(data.id, "id", -1);
        reflector.reflectInt(data.data, "data", 0);
        reflector.reflectInt(data.lvl, "lvl", 0);
        reflector.reflectInt(data.x, "x", 0);
        reflector.reflectInt(data.y, "y", 0);
        reflector.reflectInt(data.lx, "lx", 0);
        reflector.reflectInt(data.ly, "ly", 0);
        reflector.reflectLong(data.clear_t, "clear_t", -2);
        reflector.reflectLong(data.timer_g, "timer_g", -2);
        reflector.reflectInt(data.grow_t, "grow_t", 0);
        reflector.reflectBool(data.harv_p, "harv_p", false);
        reflector.reflectInt(data.harv, "harv", 0);
        reflector.reflectInt(data.fade, "fade", 0);
        reflector.reflectIntArray(data.harv_l, "harv_l");
        reflector.reflectInt(data.qid, "qid", -1);
        reflector.reflectExitObject();
    }
    
    public class Worker extends Base {
        public int nameIdx = 0;
        String customName = "";
        int xp = 0;
        boolean lvl_claim = false;
        int prof = 3200000; // TODO
        int prof_a = 3200000;
        long join = 0;
        int hunger = 0;
        int hunger_max = 10000;
        int eat = 0;
        int sleep_t = 0;
        boolean at_sleep = false;
        int reason = 0;
        int targ_x = -1;
        int targ_y = -1;
        long awayv = 0;
        int away = 0;
        int awayt = 0;
        long visit = 0;
        int visitw = 0;
        boolean visitf = false;
        int[] spclevel = new int[0];
        int[] spcxp = new int[0];
        int cresn = 0;
        int skinv = 0;
        int qid = -1;
        int hire = 0;
        int hires = 0;
    }
    
    public void reflectWorker(LogicJSONOutReflector reflector, Worker data) {
        reflector.reflectNextObject();
        reflector.reflectInt(data.id, "id", -1);
        reflector.reflectInt(data.data, "data", 0);
        reflector.reflectInt(0, "lvl", 0);
        reflector.reflectInt(0, "x", 0);
        reflector.reflectInt(0, "y", 0);
        reflector.reflectInt(0, "lx", 0);
        reflector.reflectInt(0, "ly", 0);
        reflector.reflectInt(data.nameIdx, "nameIdx", 0);
        reflector.reflectString(data.customName, "customName", "");
        reflector.reflectInt(data.xp, "xp", 0);
        reflector.reflectBool(data.lvl_claim, "lvl_claim", false);
        // pointer base prof
        reflector.reflectInt(3200000, "prof", 32);
        reflector.reflectInt(3200000, "prof_a", 32);
        // pointer base prof_a
        reflector.reflectLong(data.join, "join", 0);
        reflector.reflectInt(data.hunger, "hunger", 0);
        reflector.reflectInt(data.hunger_max, "hunger_max", 10000);
        reflector.reflectInt(data.eat, "eat", 0);
        reflector.reflectInt(data.sleep_t, "sleep_t", 0);
        reflector.reflectBool(data.at_sleep, "at_sleep", false);
        // +344LL move
        // +344LL visit_object
        reflector.reflectInt(data.reason, "reason", 0);
        reflector.reflectInt(data.targ_x, "targ_x", -1);
        reflector.reflectInt(data.targ_y, "targ_y", -1);
        //reflector.reflectObject("movementSystem");
        // sub_A6DFFC
        //reflector.reflectExitObject();
        reflector.reflectArray(0, "tools2");
        reflector.reflectLong(data.awayv, "awayv", 0);
        reflector.reflectInt(data.away, "away", 0);
        reflector.reflectInt(data.awayt, "awayt", 0);
        reflector.reflectLong(data.visit, "visit", 0);
        reflector.reflectInt(data.visitw, "visitw", 0);
        reflector.reflectBool(data.visitf, "visitf", false);
        // pointer base cdata
        reflector.reflectIntArray(data.spclevel, "spclevel");
        reflector.reflectIntArray(data.spcxp, "spcxp");
        // pointer base cspc
        // pointer base cres - collected resource
        reflector.reflectInt(data.cresn, "cresn", 0); // collected resource number
        // pointer base skin
        // pointer base skin2
        reflector.reflectInt(data.skinv, "skinv", 0);
        reflector.reflectInt(data.qid, "qid", -1);
        reflector.reflectInt(data.hire, "hire", 0);
        reflector.reflectInt(data.hires, "hires", 0);
        // +344LL hangout
        reflector.reflectExitObject();
        System.out.println("AEAE");
    }
    
    @Override
    public int getMessageType() {
        return 24548;
    }
}
