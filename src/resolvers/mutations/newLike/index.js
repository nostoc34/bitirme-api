import {
    r
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';

const newLike = async (obj, args, context) => {
    const {
        userID
    } = context;

    const user = await r
        .db(DB)
        .table("users")
        .get(userID)
        .run();

    const post = await r
        .db(DB)
        .table("posts")
        .get(args.postID)
        .run();

    if(!post) return {
        message: "Gönderi bulunamadı.",
        code: 503
    };

    const isLiked = await r
        .db(DB)
        .table("likes")
        .filter({
            userID: userID,
            postID: args.postID
        })
        .run();

    if(isLiked && isLiked.length) {
        return await r
            .db(DB)
            .table("likes")
            .get(isLiked[0].id)
            .delete()
            .run()
            .then(() => {
                return {
                    message: "Beğeni başarıyla silindi.",
                    code: 200,
                    data: {
                        
                    }
                };
            });
    } else {
        const likeID = await r.uuid();
        let newLike = {
            id: likeID,
            postID: args.postID,
            userID: userID,
            userName: user.userName,
            profilePhoto: SERVER_URL + "upload/" + user.profilePhoto,
            createdAt: new Date().toISOString(),
        };
    
        return await r
            .db(DB)
            .table("likes")
            .insert(newLike)
            .then(() => {          
                return {
                    message: "Beğeni başarıyla eklendi.",
                    code: 200,
                    data: newLike
                };
            })
            .catch(err => {
                return {
                    message: `Hata: ${err.message}`,
                    code: 500
                };
            });
    }

    

    
};

export default newLike;