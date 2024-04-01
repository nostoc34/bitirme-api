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

const getLikesCount = async (obj, args, context) => {
    const {
        userID
    } = context;

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

        if(!(isFollowingPostUser && isFollowingPostUser.length)) return {
            message: "Bu gönderi sahibinin profili gizli.",
            code: 503
        };
    };

    const likes = await r
        .db(DB)
        .table("likes")
        .filter({
            postID: args.postID
        })
        .count()
        .run();

    return {
        message: "Beğenileri getirme başarılı.",
        code: 200,
        data: likes
    };
};

export default getLikesCount;