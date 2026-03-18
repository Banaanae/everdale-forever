const GlobalID = require('../../Titan/GlobalID')

class LogicData {
    globalId = 0

    tidIndex = -1
    infoTidIndex = -1
    iconExportNameIndex = -1
    iconSWFIndex = -1

    row = null
    table = null

    constructor (row, table) {
        this.row = row
        this.table = table

        this.globalId = GlobalID.composeGlobalID(table.getTableIndex(), table.getItemCount())
    }

    createReferences () { 
        this.iconSWFIndex = this.row.getColumnIndexByName("IconSWF")
        this.iconExportNameIndex = this.row.getColumnIndexByName("IconExportName")
        this.infoTidIndex = this.row.getColumnIndexByName("InfoTID")
        this.tidIndex = this.row.getColumnIndexByName("TID")
    }

    createReferences2 () { }

    setCSVRow (row) {
        this.row = row
    }

    getArraySize (column) {
        return this.row.getArraySize(column)
    }

    getDataType () {
        return this.table.getTableIndex()
    }

    getGlobalId () {
        return this.globalId
    }

    getInstanceId () {
        return GlobalID.getInstanceID(this.globalId)
    }

    getColumnIndex (name) {
        const columnIndex = this.row.getColumnIndexByName(name)

        if (columnIndex === -1) {
            Warn(`Unable to find column ${name} from ${this.getDebuggerName()}`)
        }

        return columnIndex
    }

    getDebuggerName () {
        return `${this.row.getName()} (${this.table.getTableName()})`
    }

    getBooleanValue (columnName, index) {
        return this.row.getBooleanValue(columnName, index)
    }

    getClampedBooleanValue (columnName, index) {
        return this.row.getClampedBooleanValue(columnName, index)
    }

    getIntegerValue (columnName, index) {
        return this.row.getIntegerValue(columnName, index)
    }

    getClampedIntegerValue (columnName, index) {
        return this.row.getClampedIntegerValue(columnName, index)
    }

    getValue (columnName, index) {
        return this.row.getValue(columnName, index)
    }

    getClampedValue (columnName, index) {
        return this.row.getClampedValue(columnName, index)
    }

    getName () {
        return this.row.getName()
    }

    getTID () {
        if (this.tidIndex !== -1) {
            return this.row.getValueAt(this.tidIndex, 0)
        }

        return null
    }

    getInfoTID () {
        if (this.infoTidIndex !== -1) {
            return this.row.getValueAt(this.infoTidIndex, 0)
        }

        return null
    }

    getIconExportName () {
        if (this.iconExportNameIndex !== -1) {
            return this.row.getValueAt(this.iconExportNameIndex, 0)
        }

        return null
    }

    static LogicDataType = {
        BUILDINGS: 1,
        OBSTACLES: 5,
        WORKERS: 31
    }
}

module.exports = LogicData