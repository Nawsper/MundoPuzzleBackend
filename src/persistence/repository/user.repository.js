import factory from "../factory.js";
const { userDao } = factory;
import UserResDTO from "../dtos/user.res.dto.js";



export default class UserRepository {
    constructor() {
        this.dao = userDao;
    }

    async getByIdDTO(id) {
        try {
            const response = await this.dao.getById(id);
            return new UserResDTO(response);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}