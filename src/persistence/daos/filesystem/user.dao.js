import FsDao from "./fs.dao.js";
const path = "./src/persistence/daos/filesystem/users.json";

export default class UserDaoFS extends FsDao {
    constructor() {
        super(path);
    }

};