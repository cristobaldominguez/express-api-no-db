import fs from 'fs'

class DataModel {
  static filePath = ''

  static save(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data), { encoding: 'utf8', flag: 'w' })
  }
}

export default DataModel
