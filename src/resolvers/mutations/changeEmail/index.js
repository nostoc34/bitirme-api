import {
    r
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';

const changeEmail = async (obj, args, context) => {
    const {
        userID
    } = context;

    const user = await r
        .db(DB)
        .table("users")
        .get(userID)
        .run();

    if(user.password !== args.password) return {
        message: "Hatalı parola.",
        code: 503
    };

    const isEmailExists = await r
        .db(DB)
        .table("users")
        .filter({
            email: args.email
        })
        .run();

    if(isEmailExists && isEmailExists.length) return {
        message: "Bu email zaten kullanımda.",
        code: 503
    };



    return await r
        .db(DB)
        .table("users")
        .get(userID)
        .update({
            email: args.email
        })
        .then(() => {
            return {
                message: "Email başarıyla değiştirildi.",
                code: 200
            };
        }) .catch((err) => {
            return {
                message: "Email güncellenemedi.",
                code: 503
            };
        });
};

export default changeEmail;