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

const newPost = async (obj, args, context) => {
    const {
        userID
    } = context;

    const postID = await r.uuid();

    let newPost = {
        id: postID,
        userID: userID,
        content: args.content,
        image: SERVER_URL + "upload/" + args.image,
        isDeleted: false,
        createdAt: new Date().toISOString(),
    };

    return await r
        .db(DB)
        .table("posts")
        .insert(newPost)
        .then(() => {          
            return {
                message: "Gönderi başarıyla eklendi.",
                code: 200,
                data: newPost
            };
        })
        .catch(err => {
            return {
                message: `Hata: ${err.message}`,
                code: 500
            };
        });
};

export default newPost;