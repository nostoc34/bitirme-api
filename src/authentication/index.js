import jwt from "jsonwebtoken";
import {
    JWT_KEY,
    DB
} from "../constants";
import {
    r
} from "../database";

const getAuthStatus = ({
    token
}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const tokenDecode = await jwt.verify(token, JWT_KEY);

            if(!tokenDecode || !tokenDecode.userID) {
                return reject({
                    message: "Invalid token.",
                    code: 503
                });
            }

            const userData = await r
                .db(DB)
                .table("users")
                .get(tokenDecode.userID)
                .run();

            if(!userData) {
                return reject({
                    message: "Kullanıcı bulunamadı.",
                    code: 503
                });
            }
            
            if(!userData.token) {
                return reject({
                    message: "Token bulunamadı.",
                    code: 503
                });
            }

            if(userData.token !== token) {
                return reject({
                    message: "Geçersiz token.",
                    code: 503
                });
            }

            let response = {
                userID: userData.id
            };

            return resolve(response);
        } catch(err) {
            return reject({
                message: err.message,
                code: 503
            });
        }
    });
};
export default getAuthStatus;
