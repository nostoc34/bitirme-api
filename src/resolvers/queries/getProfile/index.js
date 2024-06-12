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

    let code = 200;

    if(targetUser[0].isPrivate) {
        if(!(isUserFollowsTarget && isUserFollowsTarget.length || user.type === "admin")) {
            code =  205;
        } else {
            code =  206;
        }
    }
    console.log(code);

    return {
        message: "Profili getirme başarılı.",
        code: code,
        data: targetUser[0]
    };
};

export default getProfile;