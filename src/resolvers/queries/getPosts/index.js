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

const getPosts = async (obj, args, context) => {
    const {
        userID
    } = context;

    const user = await r
        .db(DB)
        .table("users")
        .get(userID)
        .run();

    const follows = await r
        .db(DB)
        .table("followings")
        .filter({
            fromUser: userID,
            status: "approved"
        })
        .run();

    let _posts = [];

    await asyncForEach(follows, async (item, index) => {
        const posts = await r
            .db(DB)
            .table("posts")
            .filter({
                userID: item.toUser,
                isDeleted: false
            })
            .run();
        await asyncForEach(posts, async (item, index) => {
            item.image = SERVER_URL + "upload/" + item.image;
            const userData = await r
                .db(DB)
                .table("users")
                .get(item.userID)
                .run();
            item.userName = userData.userName;
            item.profilePhoto = SERVER_URL + "upload/" + userData.profilePhoto;
            _posts.push(item);            
        });
        
    });

    await asyncForEach(_posts, async (item, index) => {
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
        item.commentCount = comments.length;
    });

    await asyncForEach(_posts, async (item, index) => {
        const likes = await r
            .db(DB)
            .table("likes")
            .filter({
                postID: item.id,
            })
            .run();
        item.likes = likes;
        item.likeCount = likes.length;
    });

    _posts = _posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return {
        message: "Gönderiler başarıyla getirildi.",
        code: 200,
        data: _posts
    };
};

export default getPosts;