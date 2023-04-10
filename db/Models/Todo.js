import DataModel from "./DataModel.js"
import { toDosFilePath } from '../../config.js'

class Todo extends DataModel {
  static filePath = toDosFilePath
}

export default Todo
