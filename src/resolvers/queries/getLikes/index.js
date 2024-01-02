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

const getLikes = async (obj, args, context) => {
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
        message: "Gönderi bulunumadı.",
        code: 503
    };

    const postUser = await r
        .db(DB)
        .table("users")
        .get(post.userID)
        .run();

    const isPostUserPrivate = postUser.isPrivate;

    if(isPostUserPrivate) {
        const isFollowingPostUser = await r
            .db(DB)
            .table("followings")
            .filter({
                fromUser: userID,
                toUser: post.userID,
                status: "approved"
            })
            .run();

        if(!(isFollowingPostUser && isFollowingPostUser.length || user.type === "admin")) return {
            message: "Bu gönderi sahibinin profili gizli.",
            code: 205
        };
    };

    const likes = await r
        .db(DB)
        .table("likes")
        .filter({
            postID: args.postID
        })
        .run();

    let _likes = [];

    await asyncForEach(likes, async (item, index) => {
        const userData = await r
            .db(DB)
            .table("users")
            .get(item.userID)
            .run();
        
        item.userName = userData.userName;
        item.userProfilePhoto = userData.profilePhoto;
        _likes.push(item);
    });

    return {
        message: "Beğenileri getirme başarılı.",
        code: 200,
        data: _likes
    };
};

export default getLikes;