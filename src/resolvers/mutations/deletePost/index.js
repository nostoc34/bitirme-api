import {
    r
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';

const deletePost = async (obj, args, context) => {
    const {
        userID
    } = context;

    const post = await r
        .db(DB)
        .table("posts")
        .get(args.postID)
        .run();

    const user = await r
        .db(DB)
        .table("users")
        .get(userID)
        .run();

    if(!post) return {
        message: "Gönderi bulunamadı.",
        code: 503
    };
    
    if(!(post.userID === userID || user.type === "admin")) return {
        message: "Yetkisiz erişim.",
        code: 503
    };

    return await r
        .db(DB)
        .table("posts")
        .get(args.postID)
        .update({
            isDeleted: true
        })
        .then(() => {
            return {
                message: "Gönderi silme başarılı.",
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

export default deletePost;