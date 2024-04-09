import {
    r
} from '../../database';
import {
    DB,
    SERVER_URL
} from '../../constants';
import vRegister from '../validations/register';
import login from '../login';

const register = async (req, res) => {
    try {
        const reqBody = req.body;
        const requestValidation = vRegister(reqBody);
        if(requestValidation.code !== 200) {
            return requestValidation;
        }

        const isUserNameAvailable = await r
            .db(DB)
            .table("users")
            .filter({
                "userName": reqBody.userName
            })
            .run();
        
        if(isUserNameAvailable & isUserNameAvailable.length) return {
            message: "Bu kullanıcı adı zaten kullanımda.",
            code: 503
        };

        const isMailAvailable = await r
            .db(DB)
            .table("users")
            .filter({
                "email": reqBody.email
            })
            .run();
        
        if(isMailAvailable & isMailAvailable.length) return {
            message: "Bu email adresi zaten kullanımda.",
            code: 503
        };

        const userID = await r.uuid();

        let newUser = {
            id: userID,
            userName: reqBody.userName.trim(),
            fullName: reqBody.fullName.trim(),
            email: reqBody.email.trim(),
            password: reqBody.password.trim(),
            profilePhoto: `defaultpp.jpg`,
            type: "user",
            isPrivate: false,
            createdAt: new Date().toISOString(),
            isActive: true,
        };

        return await r
            .db(DB)
            .table("users")
            .insert(newUser)
            .then(async () => {
                return await login({
                    req: {
                        body: {
                            userLogin: newUser.userName,
                            password: newUser.password
                        }
                    }
                })
                    .then(() => {
                        return {
                            message: "Kayıt başarıyla oluşturuldu.",
                            code: 200,
                        };
                    }) .catch((err) => {
                        return {
                            message: `Kayıt olunurken hata meydana geldi. Hata: ${err.message}.`,
                            code: 500
                        };
                    });
            }) .catch((err) => {
                return {
                    message: `Kayıt olunurken hata meydana geldi. Hata: ${err.message}.`,
                    code: 500
                };
            });
    } catch(err) {
        return {
            message: `Kayıt olunurken hata meydana geldi. Hata: ${err.message}.`,
            code: 500
        };
    };
};

export default register;