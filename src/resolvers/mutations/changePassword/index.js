import {
    r
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';

const changePassword = async (obj, args, context) => {
    const {
        userID
    } = context;

    const user = await r
        .db(DB)
        .table("users")
        .get(userID)
        .run();

    if(user.password !== args.oldPassword) return {
        message: "Eski şifre hatalı.",
        code: 503
    };

    if(args.newPassword !== args.newPasswordRe) return {
        message: "Yeni şifreler uyuşmuyor.",
        code: 503
    };

    return await r
        .db(DB)
        .table("users")
        .get(userID)
        .update({
            password: args.newPassword
        })
        .then(() => {
            return {
                message: "Şifre değiştirildi.",
                code: 200
            };
        }) .catch((e) => {
            error_log(e.message, 503);
            return {
                message: "Şifre güncellenemedi.",
                code: 503
            };
        });
};

export default changePassword;