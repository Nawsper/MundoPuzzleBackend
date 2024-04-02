import Services from "./class.services.js";
import { generateToken } from '../jwt/auth.js';
import { sendGmail } from './email.service.js'

// import UserDaoMongo from "../persistence/daos/mongodb/user.dao.js";
// const userDao = new UserDaoMongo();

import persistence from '../persistence/factory.js'
const { userDao } = persistence
import UserRepository from "../persistence/repository/user.repository.js";
const userRepository = new UserRepository();

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  async register(user) {
    try {
      const response = await userDao.register(user)
      await sendGmail(user, 'register')
      return response
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(user) {
    try {
      const userExist = await userDao.login(user)
      if (userExist) return generateToken(userExist)
      else return false
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByIdDTO(id) {
    try {
      const user = await userRepository.getByIdDTO(id);
      return user ? user : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUsers(obj) {
    try {
      const response = await userDao.deleteUsers(obj)
      return response
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
