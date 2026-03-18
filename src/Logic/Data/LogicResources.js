const { LogicDataType } = require('./LogicData.js')
const LogicDataTableResource = require('./LogicDataTableResource.js')
const LogicDataTables = require('./LogicDataTables.js')

class LogicResources {
    static createDataTableResourcesArray () {
        const DataTables = []

        DataTables.push(new LogicDataTableResource("csv_logic/buildings.csv", LogicDataType.BUILDINGS, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/obstacles.csv", LogicDataType.OBSTACLES, 0))
        DataTables.push(new LogicDataTableResource("csv_logic/workers.csv", LogicDataType.WORKERS, 0))

        return DataTables
    }

    static load (resources, id, node) {
        const resource = resources[id]
        switch (resource.getTableType()) {
            case 0:
                LogicDataTables.initDataTables(node, resource.getTableIndex())
                break
            case 3:
                // StringTable
                break
            default:
                Err("LogicResources::Invalid resource type")
        }

        if (resources.length - 1 === id) {
            LogicDataTables.createReferences()
        }
    }
}

module.exports = LogicResources