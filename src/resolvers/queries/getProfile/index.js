import {
    r
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';

const getProfile = async (obj, args, context) => {
    const {
        userID
    } = context;

    const user = await r
        .db(DB)
        .table("users")
        .get(userID)
        .run();

    const targetUser = await r
        .db(DB)
        .table("users")
        .get(args.userID)
        .run();

    console.log(targetUser.isPrivate);
    if(targetUser.isPrivate) {
        const isUserFollowsTarget = await r
            .db(DB)
            .table("followings")
            .filter({
                fromUser: userID,
                toUser: args.userID,
                status: "approved"
            })
            .run();
        
        if(!(isUserFollowsTarget && isUserFollowsTarget.length || user.type === "admin")) return {
            message: "Bu kullanıcının profili gizli.",
            code: 205
        };
    }

    const followCount = await r
        .db(DB)
        .table("followings")
        .filter({
            fromUser: args.userID,
            status: "approved"
        })
        .count()
        .run();

    const followerCount = await r
        .db(DB)
        .table("followings")
        .filter({
            toUser: args.userID,
            status: "approved"
        })
        .count()
        .run();

    targetUser.followers = followerCount;
    targetUser.follows = followCount;

    return {
        message: "Profili getirme başarılı.",
        code: 200,
        data: targetUser
    };
};

export default getProfile;