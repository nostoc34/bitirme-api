import {
    r,
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';

const handleFollow = async (obj, args, context) => {
    const {
        userID
    } = context;

    const toUser = await r
        .db(DB)
        .table("users")
        .get(args.toUser)
        .run();

    if(!toUser) return {
        message: "Kullanıcı bulunamadı.",
        code: 503
    };

    const isFollowed = await r
        .db(DB)
        .table("followings")
        .filter({
            fromUser: userID,
            toUser: args.toUser
        })
        .run();

    if(isFollowed && isFollowed.length) {
        return await r
            .db(DB)
            .table("followings")
            .get(isFollowed[0].id)
            .delete()
            .then(() => {          
                return {
                    message: "Takip başarıyla silindi.",
                    code: 200,
                };
            })
            .catch(err => {
                return {
                    message: `Hata: ${err.message}`,
                    code: 500
                };
            });
    } else {
        const followID = await r.uuid();
        let newFollow = {
            id: followID,
            fromUser: userID,
            toUser: args.toUser,
            createdAt: new Date().toISOString(),
        };
        if(toUser.isPrivate) {
            newFollow.status = "waiting";
        } else {
            newFollow.status = "approved";
        }
        
        return await r
            .db(DB)
            .table("followings")
            .insert(newFollow)
            .then(() => {          
                return {
                    message: "Takip başarıyla eklendi.",
                    code: 200,
                    data: newFollow
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

export default handleFollow;