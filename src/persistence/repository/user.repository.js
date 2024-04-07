import factory from "../factory.js";
const { userDao } = factory;
import UserResDTO from "../dtos/user.res.dto.js";



export default class UserRepository {
    constructor() {
        this.dao = userDao;
    }

    async getDTO() {
        try {
            const response = await this.dao.getAll();
            let users = [];
            console.log(response);
            for (let index = 0; index < response.length; index++) {
                const { nombre, apellido, email, role } = new UserResDTO(response[index])
                const user = {
                    nombre,
                    apellido,
                    email,
                    role
                }
                users.push(user);
            }
            return users
        } catch (error) {
            throw new Error(error.message);
        }
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