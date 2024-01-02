import {
    r
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';

const deleteComment = async (obj, args, context) => {
    const {
        userID
    } = context;

    const comment = await r
        .db(DB)
        .table("comments")
        .get(args.commentID)
        .run();

    const user = await r
        .db(DB)
        .table("users")
        .get(userID)
        .run();

    if(!comment) return {
        message: "Yorum bulunamadı.",
        code: 503
    };
    
    if(!(comment.userID === userID || user.type === "admin")) return {
        message: "Yetkisiz erişim.",
        code: 503
    };

    return await r
        .db(DB)
        .table("comments")
        .get(args.commentID)
        .update({
            isDeleted: true
        })
        .then(() => {
            return {
                message: "Yorum silme başarılı.",
                code: 200
            };
        })
        .catch(e => {
            return {
                message: "Hata!. Hata mesajı: " + e.message,
                code: 500
            };
        });
};

export default deleteComment;