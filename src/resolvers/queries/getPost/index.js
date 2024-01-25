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

const getPost = async (obj, args, context) => {
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

    const comments = await r
        .db(DB)
        .table("comments")
        .filter({
            postID: args.postID,
            isDeleted: false
        })
        .run();
    const commentCount = comments.length;
    post.comments = comments;
    post.commentCount = commentCount;

    const likes = await r
        .db(DB)
        .table("likes")
        .filter({
            postID: args.postID,
        })
        .run();
    const likeCount = likes.length;
    post.likes = likes;
    post.likeCount =likeCount;

    return {
        message: "Gönderiler başarıyla getirildi.",
        code: 200,
        data: post
    };
};

export default getPost;