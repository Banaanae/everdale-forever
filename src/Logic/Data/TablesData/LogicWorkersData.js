const LogicData = require("../LogicData")

class LogicWorkersData extends LogicData {
    name = null
    tid = null
    infotid = null
    speed = null
    hardcodedarrival = null
    townhalllevel = null
    requiredbuilding = null
    levelupxp = null
    nameset = null
    gfxid = null
    scale = null
    collisionshape = null
    isvillager = null
    defaultskin = null
    defaultskinvariation = null
    basemodifiers = []
    boosteffect = null
    boostmoveeffect = null
    iconswf = null
    iconexportname = null
    istaskprovider = null
    npc = null
    speciality = null
    specialitylevel = null
    toucheffect = null
    offergroup = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        const arraySize = this.row.getBiggestArraySize() 

        this.name = this.getStringValue("Name")
        this.tid = this.getStringValue("TID")
        this.infotid = this.getStringValue("InfoTID")
        this.speed = this.getIntValue("Speed")
        this.hardcodedarrival = this.getBoolValue("HardcodedArrival")
        this.townhalllevel = this.getIntValue("TownHallLevel")
        this.requiredbuilding = this.getStringValue("RequiredBuilding")
        this.levelupxp = this.getIntValue("LevelUpXp")
        this.nameset = this.getStringValue("NameSet")
        this.gfxid = this.getStringValue("GfxId")
        this.scale = this.getIntValue("Scale")
        this.collisionshape = this.getStringValue("CollisionShape")
        this.isvillager = this.getBoolValue("IsVillager")
        this.defaultskin = this.getStringValue("DefaultSkin")
        this.defaultskinvariation = this.getIntValue("DefaultSkinVariation")
        for (let i = 0; i < arraySize; i++) {
            this.basemodifiers = this.getStringValue("BaseModifiers")
        }
        this.boosteffect = this.getStringValue("BoostEffect")
        this.boostmoveeffect = this.getStringValue("BoostMoveEffect")
        this.iconswf = this.getStringValue("IconSWF")
        this.iconexportname = this.getStringValue("IconExportName")
        this.istaskprovider = this.getBoolValue("IsTaskProvider")
        this.npc = this.getStringValue("NPC")
        this.speciality = this.getStringValue("Speciality")
        this.specialitylevel = this.getIntValue("SpecialityLevel")
        this.toucheffect = this.getStringValue("TouchEffect")
        this.offergroup = this.getStringValue("OfferGroup")
    }

    getStringValue (name) {
        return this.getValue(name, 0)
    }

    getIntValue (name) {
        return this.getIntegerValue(name, 0)
    }

    getBoolValue (name) {
        return this.getBooleanValue(name, 0)
    }
}

module.exports = LogicWorkersData