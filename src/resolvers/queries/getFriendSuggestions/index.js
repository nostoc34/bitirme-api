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

const getFriendSuggestions = async (obj, args, context) => {
    const {
        userID
    } = context;

    const user = await r
        .db(DB)
        .table("users")
        .get(userID)
        .run();

    let list = [];

    const follows = await r
        .db(DB)
        .table("followings")
        .filter({
            fromUser: userID,
            status: "approved"
        })
        .pluck("toUser")
        .run();

    let ff1 = [];
    let ff2 = [];

    await asyncForEach(follows, async (item) => {
        const _followFollows = await r
            .db(DB)
            .table("followings")
            .filter(function(flw) {
                return flw("fromUser").eq(item.toUser).and(flw("toUser").eq(userID).not());
            })
            .pluck("toUser")
            .run();
        _followFollows.forEach((item) => ff1.push(item));
    });

    ff1.forEach((item) => {
        if(ff2.findIndex(e => e.toUser === item.toUser) === -1) {
            ff2.push(item);
        }
    });

    let followFollows = [];

    ff2.forEach((item) => {
        if(follows.findIndex(e => e.toUser === item.toUser) === -1) {
            followFollows.push(item);
        }
    });

    let fff1 = [];
    let fff2 = [];

    await asyncForEach(followFollows, async (c_item) => {
        list.push({
            user: c_item.toUser,
            point: 10
        });

        const _followFollowFollows = await r
            .db(DB)
            .table("followings")
            .filter(function(flw) {
                return flw("fromUser").eq(c_item.toUser).and(flw("toUser").eq(userID).not());
            })
            .pluck("toUser")
            .run();
            
        _followFollowFollows.forEach((item) => fff1.push(item));
    });

    fff1.forEach((item) => {
        if(fff2.findIndex(e => e.toUser === item.toUser) === -1) {
            fff2.push(item);
        }
    });

    let followFollowFollows = [];

    fff2.forEach((item) => {
        if(followFollows.findIndex(e => e.toUser === item.toUser) === -1) {
            followFollowFollows.push(item);
        }
    });
        
    await asyncForEach(followFollowFollows, async (cc_item) => {
        list.push({
            user: cc_item.toUser,
            point: 5
        });
    });

    const myLikes = await r
        .db(DB)
        .table("likes")
        .filter({
            userID: userID
        })
        .pluck("postID")
        .run();

    await asyncForEach(myLikes, async (item) => {
        const likes = await r
            .db(DB)
            .table("likes")
            .filter(function(like) {
                return like("postID").eq(item.postID).and(like("userID").eq(userID).not());
            })
            .run();

        await asyncForEach(likes, async (item) => {
            let isFound = false;
            await asyncForEach(list, async (l_item) => {
                if(item.userID === l_item.user) {
                    l_item.point = l_item.point + 5;
                    isFound = true;
                }
            });
            if(!isFound) {
                list.push({
                    user: item.userID,
                    point: 5
                });
            }
        });
    });

    const myComments = await r
        .db(DB)
        .table("comments")
        .filter({
            userID: userID,
            isDeleted: false
        })
        .pluck("postID")
        .run();

    await asyncForEach(myComments, async (item) => {
        const comments = await r
            .db(DB)
            .table("comments")
            .filter(function(com) {
                return com("postID").eq(item.postID).and(com("userID").eq(userID).not()).and(com("isDeleted").eq(false));
            })
            .run();

        await asyncForEach(comments, async (item) => {
            let isFound = false;
            await asyncForEach(list, async (l_item) => {
                if(item.userID === l_item.user) {
                    l_item.point = l_item.point + 5;
                    isFound = true;
                }
            });
            if(!isFound) {
                list.push({
                    user: item.userID,
                    point: 5
                });
            }
        });
    });

    list = list.sort((a, b) => b.point - a.point);

    let response = [];

    await asyncForEach(list, async (item) => {
        let target = await r
            .db(DB)
            .table("users")
            .get(item.user)
            .run();

        target.profilePhoto = SERVER_URL + "upload/" + target.profilePhoto;
        response.push(target);
    });

    response = response.slice(0,5); 

    return {
        message: "Önerilen arkdaşlar başarıyla getirildi.",
        code: 200,
        data: response
    };
};

export default getFriendSuggestions;