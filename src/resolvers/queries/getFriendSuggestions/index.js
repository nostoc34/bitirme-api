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
            fromUser: userID
        })
        .pluck("toUser")
        .run();

    await asyncForEach(follows, async (item) => {
        const _followFollows = await r
            .db(DB)
            .table("followings")
            .filter(function(flw) {
                return flw("fromUser").eq(item.toUser).and(flw("toUser").eq(userID).not());
            })
            .pluck("toUser")
            .run();

        const followFollows = _followFollows.filter((item) => !follows.includes(item));

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

            const followFollowFollows = _followFollowFollows.filter(x => !followFollows.includes(x));
            
            await asyncForEach(followFollowFollows, async (cc_item) => {
                list.push({
                    user: cc_item.toUser,
                    point: 5
                });
            });
        });
    });
    
    console.log("list 1: ", list);

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

    console.log("list 2: ", list);

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

    console.log("list: ", list);

    list = list.sort((a, b) => b.point - a.point);
    console.log("sort list: ", list); 

    return {
        message: "Geldi",
        code: 200
    };
};

export default getFriendSuggestions;