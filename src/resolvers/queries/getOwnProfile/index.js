import {
    r
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';

const getOwnProfile = async (obj, args, context) => {
    const {
        userID
    } = context;

    const user = await r
        .db(DB)
        .table("users")
        .get(userID)
        .run();

    if(!user) return {
        message: "Kullanıcı bulunamadı.",
        code: 503
    };

    const followCount = await r
        .db(DB)
        .table("followings")
        .filter({
            fromUser: userID,
            status: "approved"
        })
        .count()
        .run();

    const followerCount = await r
        .db(DB)
        .table("followings")
        .filter({
            toUser: userID,
            status: "approved"
        })
        .count()
        .run();

    user.followers = followerCount;
    user.follows = followCount;

    return {
        message: "Profili getirme başarılı.",
        code: 200,
        data: user
    };
};

export default getOwnProfile;