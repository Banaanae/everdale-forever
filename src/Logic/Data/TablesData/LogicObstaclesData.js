const LogicData = require("../LogicData")

class LogicObstaclesData extends LogicData {
    name = null
    tid = null
    infotid = null
    scw = null
    scwlod2 = null
    scwlod3 = null
    basescw = null
    growingscw = null
    collisionshape = null
    scale = null
    cleartimeseconds = null
    clearxp = null
    width = null
    height = null
    passable = null
    subobjects = []
    subobjectx = []
    subobjecty = []
    autogrow = null
    growthtime = null
    respawnneighbor = null
    clearresource = null
    clearcost = null
    lootresource = null
    lootcount = null
    cleareffect = null
    pickupeffect = null
    spawnweight = null
    respawnweight = null
    clearontouch = null
    cleargroup = null
    lootmultiplierforversion2 = null
    appearanceperiodhours = null
    minrespawntimehours = null
    spawnresourcedata = null
    spawnresourceplantseconds = null
    spawnresourceaverageseconds = null
    spawnresourceharvestseconds = null
    spawncount = null
    lootdefensepercentage = null
    redmul = null
    greenmul = null
    bluemul = null
    redadd = null
    greenadd = null
    blueadd = null
    lightson = null
    villagetype = null
    village2respawncount = null
    variationcount = null
    tallgrass = null
    tallgrassspawnpoint = null
    harvestcount = null
    infiniteharvest = null
    harvesttimescale = null
    harvestresource = null
    harvestamount = null
    harvesttime = null
    harvestprofession = null
    harvestleftovers = null
    randomyaw = null
    randompitch = null
    randomscale = null
    fallanimation = null
    spawnspirit = null
    hideinvalleylod = null
    uibackgroundexportname = null
    toucheffect = null
    deprecated = null

    constructor (row, table) {
        super(row, table)
    }

    createReferences () {
        super.createReferences()

        const arraySize = this.row.getBiggestArraySize() 

        this.name = this.getStringValue("Name")
        this.tid = this.getStringValue("TID")
        this.infotid = this.getStringValue("InfoTID")
        this.scw = this.getStringValue("SCW")
        this.scwlod2 = this.getStringValue("SCWLod2")
        this.scwlod3 = this.getStringValue("SCWLod3")
        this.basescw = this.getStringValue("BaseSCW")
        this.growingscw = this.getStringValue("GrowingSCW")
        this.collisionshape = this.getStringValue("CollisionShape")
        this.scale = this.getIntValue("Scale")
        this.cleartimeseconds = this.getIntValue("ClearTimeSeconds")
        this.clearxp = this.getIntValue("ClearXP")
        this.width = this.getIntValue("Width")
        this.height = this.getIntValue("Height")
        this.passable = this.getBoolValue("Passable")
        for (let i = 0; i < arraySize; i++) {
            this.subobjects = this.getStringValue("SubObjects")
            this.subobjectx = this.getIntValue("SubObjectX")
            this.subobjecty = this.getIntValue("SubObjectY")
        }
        this.autogrow = this.getBoolValue("AutoGrow")
        this.growthtime = this.getIntValue("GrowthTime")
        this.respawnneighbor = this.getStringValue("RespawnNeighbor")
        this.clearresource = this.getStringValue("ClearResource")
        this.clearcost = this.getIntValue("ClearCost")
        this.lootresource = this.getStringValue("LootResource")
        this.lootcount = this.getIntValue("LootCount")
        this.cleareffect = this.getStringValue("ClearEffect")
        this.pickupeffect = this.getStringValue("PickUpEffect")
        this.spawnweight = this.getIntValue("SpawnWeight")
        this.respawnweight = this.getIntValue("RespawnWeight")
        this.clearontouch = this.getBoolValue("ClearOnTouch")
        this.cleargroup = this.getIntValue("ClearGroup")
        this.lootmultiplierforversion2 = this.getIntValue("LootMultiplierForVersion2")
        this.appearanceperiodhours = this.getIntValue("AppearancePeriodHours")
        this.minrespawntimehours = this.getIntValue("MinRespawnTimeHours")
        this.spawnresourcedata = this.getStringValue("SpawnResourceData")
        this.spawnresourceplantseconds = this.getIntValue("SpawnResourcePlantSeconds")
        this.spawnresourceaverageseconds = this.getIntValue("SpawnResourceAverageSeconds")
        this.spawnresourceharvestseconds = this.getIntValue("SpawnResourceHarvestSeconds")
        this.spawncount = this.getIntValue("SpawnCount")
        this.lootdefensepercentage = this.getIntValue("LootDefensePercentage")
        this.redmul = this.getIntValue("RedMul")
        this.greenmul = this.getIntValue("GreenMul")
        this.bluemul = this.getIntValue("BlueMul")
        this.redadd = this.getIntValue("RedAdd")
        this.greenadd = this.getIntValue("GreenAdd")
        this.blueadd = this.getIntValue("BlueAdd")
        this.lightson = this.getBoolValue("LightsOn")
        this.villagetype = this.getIntValue("VillageType")
        this.village2respawncount = this.getIntValue("Village2RespawnCount")
        this.variationcount = this.getIntValue("VariationCount")
        this.tallgrass = this.getBoolValue("TallGrass")
        this.tallgrassspawnpoint = this.getBoolValue("TallGrassSpawnPoint")
        this.harvestcount = this.getIntValue("HarvestCount")
        this.infiniteharvest = this.getBoolValue("InfiniteHarvest")
        this.harvesttimescale = this.getIntValue("HarvestTimeScale")
        this.harvestresource = this.getStringValue("HarvestResource")
        this.harvestamount = this.getIntValue("HarvestAmount")
        this.harvesttime = this.getIntValue("HarvestTime")
        this.harvestprofession = this.getStringValue("HarvestProfession")
        this.harvestleftovers = this.getStringValue("HarvestLeftovers")
        this.randomyaw = this.getIntValue("RandomYaw")
        this.randompitch = this.getIntValue("RandomPitch")
        this.randomscale = this.getIntValue("RandomScale")
        this.fallanimation = this.getBoolValue("FallAnimation")
        this.spawnspirit = this.getBoolValue("SpawnSpirit")
        this.hideinvalleylod = this.getBoolValue("HideInValleyLod")
        this.uibackgroundexportname = this.getStringValue("UIBackgroundExportName")
        this.toucheffect = this.getStringValue("TouchEffect")
        this.deprecated = this.getBoolValue("Deprecated")
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

module.exports = LogicObstaclesData