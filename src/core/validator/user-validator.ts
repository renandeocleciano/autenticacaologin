const payloadCheck = require('payload-validator');

class UserValidators {

    getUserValidate(fields: any){
        return payloadCheck.validator(fields,{ "id": ""},["id"], false);
    }

    addUserValidate(fields: any) {
        return payloadCheck.validator(fields,
                {
                    "password": "","email": "", "nome": ""
                },
                ["password", "email", "nome"], 
                false);
    }
}

export default new UserValidators();