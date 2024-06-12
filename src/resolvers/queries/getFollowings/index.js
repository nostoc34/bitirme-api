import {
    r
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';
import {
    asyncForEach
} from '../../../utils';

const getFollowings = async (obj, args, context) => {
    const {
        userID
    } = context;

    const follows = await r
        .db(DB)
        .table("followings")
        .filter({
            fromUser: userID,
            status: "approved"
        })
        .run();

    let response = [];

    await asyncForEach(follows, async(item) => {
        const friend = await r
            .db(DB)
            .table("users")
            .get(item.toUser)
            .run();

        response.push({
            userID: friend.id,
            userName: friend.userName,
            fullName: friend.fullName,
            profilePhoto: SERVER_URL + "upload/" + friend.profilePhoto
        });
    });
    
    return {
        message: "Takip edilenler getirildi.",
        code: 200,
        data: response
    };
};

export default getFollowings;
