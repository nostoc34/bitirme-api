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
            const userData = await r
                .db(DB)
                .table("users")
                .get(item.userID)
                .run();
            item.userName = userData.userName;
            item.userProfilePhoto = userData.profilePhoto;
            _posts.push(item);            
        });
        
    });

    return {
        message: "Gönderiler başarıyla getirildi.",
        code: 200,
        data: _posts
    };
};

export default getPosts;