import DataModel from "./DataModel.js"
import { usersFilePath } from '../../config.js'

class User extends DataModel {
  static filePath = usersFilePath
}

export default User
