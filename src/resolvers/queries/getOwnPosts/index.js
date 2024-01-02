import {
    r
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';

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
        .run();

    return {
        message: "Gönderileri getirme başarılı.",
        code: 200,
        data: posts
    };
};

export default getOwnPosts;