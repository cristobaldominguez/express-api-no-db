import fs from 'fs'

class DataModel {
  static filePath = ''

  static getAll() {
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
