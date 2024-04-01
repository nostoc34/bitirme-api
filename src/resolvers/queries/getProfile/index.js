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
        .filter({
            userName: args.userName,
            isActive: true
        })
        .run();

    const followCount = await r
        .db(DB)
        .table("followings")
        .filter({
            fromUser: targetUser[0].id,
            status: "approved"
        })
        .count()
        .run();

    const followerCount = await r
        .db(DB)
        .table("followings")
        .filter({
            toUser: targetUser[0].id,
            status: "approved"
        })
        .count()
        .run();

    targetUser[0].followers = followerCount;
    targetUser[0].follows = followCount;
    targetUser[0].profilePhoto =  SERVER_URL + "upload/" + targetUser[0].profilePhoto;

    const followStatus = await r
        .db(DB)
        .table("followings")
        .filter({
            fromUser: userID,
            toUser: targetUser[0].id
        })
        .run();
    console.log(targetUser[0]);
    console.log(followStatus);
    if(followStatus && followStatus.length) {
        targetUser[0].followStatus = followStatus[0].status;
    }

    const isUserFollowsTarget = await r
        .db(DB)
        .table("followings")
        .filter({
            fromUser: userID,
            toUser: targetUser[0].id,
            status: "approved"
        })
        .run();

    if(targetUser[0].isPrivate) {
        if(user) {        
            if(!(isUserFollowsTarget && isUserFollowsTarget.length || user.type === "admin")) {
                return {
                    message: "Bu kullanıcının profili gizli.",
                    code: 205,
                    data: targetUser[0]
                };
            };
        } else {
            return {
                message: "Bu kullanıcının profili gizli. Görmek için giriş yap.",
                code: 206,
                data: targetUser[0]
            };
        }
    }

    if(!(isUserFollowsTarget && isUserFollowsTarget.length || user.type === "admin")) {
        return {
            message: "Profili getirme başarılı.",
            code: 201,
            data: targetUser[0]
        };
    };

    return {
        message: "Profili getirme başarılı.",
        code: 200,
        data: targetUser[0]
    };
};

export default getProfile;