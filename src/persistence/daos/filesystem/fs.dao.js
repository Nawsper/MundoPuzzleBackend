import fs from "fs";

export default class FsDao {
    constructor(path) {
        this.path = path;
    }

    async getAll() {
        try {
            if (fs.existsSync(this.path)) {
                const items = await fs.promises.readFile(this.path, 'utf-8')
                const itemsJSON = JSON.parse(items)
                return itemsJSON
            } else {
                console.log("List empty")
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getId() {
        let maxId = 0;
        const items = await this.getAll()
        items.map((item) => {
            if (item.id > maxId) {
                maxId = item.id;
            }
            return maxId;
        });
        return maxId;
    }


    async getById(id) {
        try {
            const items = await this.getAll();
            if (items.length === 0) {
                return "List empty";
            } else {
                const itemId = items.find(item => item.id === Number(id));
                if (itemId) {
                    return itemId;
                } else {
                    return "Not found";
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const newitems = {
                id: (await this.getId()) + 1,
                status: true,
                ...obj,
            };

            const itemsFile = await this.getAll();
            itemsFile.push(newitems);
            await fs.promises.writeFile(this.path, JSON.stringify(itemsFile));

            return "Added successfully";
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, updateditems) {
        try {
            const itemsFile = await this.getAll();

            const index = itemsFile.findIndex(item => item.id === Number(id));
            if (index === -1) {
                return "Not found";
            }

            itemsFile[index] = { ...itemsFile[index], ...updateditems };

            await fs.promises.writeFile(this.path, JSON.stringify(itemsFile));

            return "Updated successfully";

        } catch (error) {
            console.log(error);
            return "Error updating the item";
        }
    }

    async delete(id) {
        try {
            const itemsFile = await this.getAll();

            const index = itemsFile.findIndex(item => item.id === Number(id));
            if (index === -1) {
                return "Not found";
            }

            itemsFile.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(itemsFile));

            return "Deleted successfully: ";

        } catch (error) {
            console.log(error);
        }
    }

}