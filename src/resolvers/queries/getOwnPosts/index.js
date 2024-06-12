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

const getOwnPosts = async (obj, args, context) => {
    const {
        userID
    } = context;

    const posts = await r
        .db(DB)
        .table("posts")
        .filter({
            userID: userID,
            isDeleted: false
        })
        .orderBy(r.desc("createdAt"))
        .run();

    await asyncForEach(posts, async (item, index) => {
        item.image = SERVER_URL + "upload/"+ item.image;
    });

    await asyncForEach(posts, async (item, index) => {
        const comments = await r
            .db(DB)
            .table("comments")
            .filter({
                postID: item.id,
                isDeleted: false
            })
            .orderBy("createdAt")
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

export default getOwnPosts;