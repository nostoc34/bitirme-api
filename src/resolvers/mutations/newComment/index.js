import {
    r
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';

const newComment = async (obj, args, context) => {
    const {
        userID
    } = context;

    const post = await r
        .db(DB)
        .table("posts")
        .get(args.postID)
        .run();

    if(!post) return {
        message: "Gönderi bulunamadı.",
        code: 503
    };

    const commentID = await r.uuid();

    let newComment = {
        id: commentID,
        postID: args.postID,
        comment: args.comment,
        userID: userID,
        createdAt: new Date().toISOString(),
        isDeleted: false,
    };

    return await r
        .db(DB)
        .table("comments")
        .insert(newComment)
        .then(() => {          
            return {
                message: "Yorum başarıyla eklendi.",
                code: 200,
                data: newComment
            };
        })
        .catch(err => {
            return {
                message: `Hata: ${err.message}`,
                code: 500
            };
        });
};

export default newComment;