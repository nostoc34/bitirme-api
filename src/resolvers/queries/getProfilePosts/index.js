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

const getProfilePosts = async (obj, args, context) => {
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

    const targetUserID = targetUser[0].id;

    const posts = await r
        .db(DB)
        .table("posts")
        .filter({
            userID: targetUserID,
            isDeleted: false
        })
        .run();
    
        
    await asyncForEach(posts, async (item, index) => {
        item.image = SERVER_URL + "upload/" + item.image;
        const comments = await r
            .db(DB)
            .table("comments")
            .filter({
                postID: item.id,
                isDeleted: false
            })
            .run();
        item.comments = comments;
    });

    await asyncForEach(posts, async (item, index) => {
        const likes = await r
            .db(DB)
            .table("likes")
            .filter({
                postID: item.id,
            })
            .count()
            .run();
        item.likes = likes;
    });

    return {
        message: "Gönderileri getirme başarılı.",
        code: 200,
        data: posts
    };
};

export default getProfilePosts;