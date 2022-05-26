const userEntities = require('../../entities/user');

class UserServices {
    constructor() {
    }

    addUser(user: any) {
        const { email } = user;
        const findUserInDb = userEntities.find({ email : email }).exec();
        return findUserInDb.then((doc: any) => {
            if(doc.length == 0){
                return userEntities.create(user);
            }
            throw new Error('E-mail já cadastrado.');
        });
    }

    getById(id: string) {
        return userEntities.findOne({ _id : id }).exec();
    }

    getByEmail(email: string) {
        return userEntities.findOne({ email : email }).exec();
    }

    async getByIdAndToken(id: string, token: string): Promise<any> {
        try {
            return await userEntities.findOne({ _id: id, token: token });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new UserServices();