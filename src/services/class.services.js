export default class Services {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        try {
            const items = await this.dao.getAll();
            return items;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async getById(id) {
        try {
            const item = await this.dao.getById(id);
            return item ?? false;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async create(obj) {
        try {
            const newItem = await this.dao.create(obj);
            return newItem ?? false;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async update(id, obj) {
        try {
            const item = await this.dao.getById(id);
            if (!item) return false;
            return await this.dao.update(id, obj);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async delete(id) {
        try {
            const item = await this.dao.getById(id);
            if (!item) return false;
            return await this.dao.delete(id);
        } catch (error) {
            throw new Error(error.message);
        }
    };
}