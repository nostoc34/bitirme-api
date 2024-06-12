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

const getMessages = async (obj, args, context) => {
    const {
        userID
    } = context;
    
    const conv = await r
        .db(DB)
        .table("conversations")
        .get(args.conversationID)
        .run();

    if(conv.users.findIndex(e => e === userID) === -1) {
        return {
            message: "Yetkisiz erişim.",
            code: 503
        };
    }

    const messages = await r
        .db(DB)
        .table("messages")
        .filter({
            conversationID: args.conversationID
        })
        .orderBy(r.desc("createdAt"))
        .run();

    let usersPayload = [];

    await asyncForEach(conv.users, async (item) => {
        const user = await r
            .db(DB)
            .table("users")
            .get(item)
            .run();
            
        const payload = {
            userID: user.id,
            userName: user.userName,
            profilePhoto: SERVER_URL + "upload/" + user.profilePhoto
        };

        usersPayload.push(payload);
    });

    let response = {
        usersPayload: usersPayload,
        messages: messages
    };

    return {
        message: "Mesajlar getirildi.",
        code: 200,
        data: response
    };
};

export default getMessages;