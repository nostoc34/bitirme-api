import {
    DB,
    JWT_KEY,
    SERVER_URL
} from '../../constants';
import {
    r
} from '../../database';
import jwt from 'jsonwebtoken';

const login = async (req) => {
    try {
        const reqBody = req.body;

        const isUserExist = await r
            .db(DB)
            .table("users")
            .filter((user)=>{
                return user("userName").eq(reqBody.userLogin).or(user("email").eq(reqBody.userLogin));
            })
            .run();


        if(!(isUserExist && isUserExist.length)) return {
            message: "Kullanıcı bulunumadı.",
            code: 503
        };

        const user = isUserExist[0];

        if(!user.isActive) return {
            message: "Hesabınız engellenmiştir.",
            code: 503
        };

        if(user.password !== reqBody.password) return {
            message: "Parola hatalı.",
            code: 503
        };

        const newToken = jwt.sign({
            "userID": user.id
        }, JWT_KEY, {
            expiresIn: "8h"
        });

        const saveToken = await r
            .db(DB)
            .table("users")
            .get(user.id)
            .update({
                token: newToken
            })
            .run();

        if(!saveToken.replaced) {
            return {
                message: "Giriş yapılamadı.",
                code: 500
            };
        }

        return {
            message: "Giriş başarılı.",
            code: 200,
            data: {
                token: newToken,
                userID: user.id,
                fullName: user.fullName,
                userName: user.userName,
                profilePhoto: user.profilePhoto ? user.profilePhoto : `${SERVER_URL}upload/defaultpp.jpg`
            }
        };
    } catch(err) {
        return {
            message: `Giriş yapılamadı. Hata: ${err.message}`,
            code: 500
        };
    };
};

export default login;