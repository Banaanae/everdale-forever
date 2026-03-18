const LogicData = require('./LogicData')
const GlobalID = require('../../Titan/GlobalID')

const LogicBuildingsData = require('./TablesData/LogicBuildingsData')
const LogicObstaclesData = require('./TablesData/LogicObstaclesData')
const LogicWorkersData = require('./TablesData/LogicWorkersData')

const LogicDataType = LogicData.LogicDataType

class LogicDataTable {
    tableIndex = 0
    tableName = ""
    loaded = false
    loaded2 = false

    table = null;
    items = []

    constructor (table, index) {
        this.tableIndex = index
        this.table = table
        this.items = []

        this.loadTable()
    }

    loadTable () {
        for (let i = 0; i < this.table.getRowCount(); i++) {
            this.addItem(this.table.getRowAt(i))
        }
    }

    setTable (table) {
        this.table = table

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].setCSVRow(table.getRowAt(i))
        }
    }

    addItem (row) { 
        this.items.push(this.createItem(row))
    }

    createItem (row) {
        let data = null

        switch (this.tableIndex) {
            case LogicDataType.BUILDINGS:
                data = new LogicBuildingsData(row, this)
                break

            case LogicDataType.OBSTACLES:
                data = new LogicObstaclesData(row, this)
                break

            case LogicDataType.WORKERS:
                data = new LogicWorkersData(row, this)
                break

            default:
                Err("Invalid data table index: " + this.tableIndex)
        }

        return data
    }

    createReferences () {
        if (!this.loaded) {
            for (let i = 0; i < this.items.length; i++) {
                if (!this.items[i]) {
                    Err(`LogicDataTable::createReferences() - Item at table (${this.tableIndex}) is null! Row: ${i}`)
                    continue
                }
                this.items[i].createReferences()
            }

            this.loaded = true
        }
    }

    createReferences2 () {
        if (!this.loaded2) {
            for (let i = 0; i < this.items.length; i++) {
                if (!this.items[i]) {
                    continue
                }
                this.items[i].createReferences2()
            }

            this.loaded2 = true
        }
    }

    getItemAt (index) {
        return this.items[index]
    }

    getDataByName (name) {
        if (name !== null && name.length > 0) {
            for (let i = 0; i < this.items.length; i++) {
                const data = this.items[i]

                if (data.getName() === name) {
                    return data
                }
            }

            Warn(`CSV row has an invalid name: ${name}`)
        }

        return null;
    }

    getItemById (globalId) {
        const instanceId = GlobalID.getInstanceID(globalId)

        if (instanceId < 0 || instanceId >= this.items.length) {
            Warn(`LogicDataTable::getItemById() - Instance id out of bounds! ${instanceId + 1} / ${this.items.length}`)
            return null;
        }

        return this.items[instanceId]
    }

    getItemCount () {
        return this.items.length
    }

    getTableIndex () {
        return this.tableIndex
    }

    getTableName () {
        return this.tableName
    }

    setName (name) {
        this.tableName = name
    }
}

module.exports = LogicDataTable