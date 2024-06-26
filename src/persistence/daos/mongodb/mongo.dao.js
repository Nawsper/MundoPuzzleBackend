export default class MongoDao {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            const response = await this.model.find({});
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getById(id) {
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(obj) {
        try {
            const response = await this.model.create(obj);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async find(obj) {
        try {
            const response = await this.model.find(obj);
            return response
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id, obj) {
        try {
            await this.model.updateOne({ _id: id }, obj);
            return obj;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteMany(obj) {
        try {
            const response = await this.model.deleteMany(obj);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}