import fs from 'fs'

class DataModel {
  static filePath = ''

  static getAll() {
    return this.getData()
  }

  static add(data) {
    const dataFromDB = this.getData()
    const dataList = dataFromDB.concat(data)
    this.save(dataList)

    return dataList
  }

  static update(data) {
    const dataList = this.getData()
    const index = dataList.findIndex(elem => elem.id === data.id)
    dataList[index] = data
    this.save(dataList)
  }

  static delete(data) {
    const dataList = this.filter(todo => todo.id !== data.id)
    this.save(dataList)
  }

  static find(cb) {
    const data = this.getData()
    return data.find(cb)
  }

  static findIndex(cb) {
    const data = this.getData()
    return data.findIndex(cb)
  }

  static filter(cb) {
    const data = this.getData()
    return data.filter(cb)
  }

  static getData() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8')
      return JSON.parse(data)

    } catch (err) {
      console.error(err)
    }
  }

  static save(info) {
    fs.writeFileSync(this.filePath, JSON.stringify(info), { encoding: 'utf8', flag: 'w' })
  }
}

export default DataModel
