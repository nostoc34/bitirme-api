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

const getConversations = async (obj, args, context) => {
    const {
        userID
    } = context;

    const conversations = await r
        .db(DB)
        .table("conversations")
        .filter((conversation) => {
            return conversation("users").contains(userID);
        })
        .run();

    let response = [];

    await asyncForEach(conversations, async (item) => {
        const lastMessage = await r
            .db(DB)
            .table("messages")
            .filter({
                conversationID: item.id
            })
            .orderBy(r.desc("createdAt"))
            .limit(1)
            .run();
            
        const _targetUserID = item.users.filter(e => e !== userID);
        const targetUserID = _targetUserID[0];

        const targetUser = await r
            .db(DB)
            .table("users")
            .get(targetUserID)
            .run();

        response.push({
            id: item.id,
            targetUserInfo: {
                userID: targetUser.id,
                userName: targetUser.userName,
                profilePhoto: SERVER_URL + "upload/" + targetUser.profilePhoto
            },
            lastMessage: lastMessage.length ? lastMessage[0] : {
                senderID: userID
            }
        });
    });

    return {
        message: "Sohbetler getirildi.",
        code: 200,
        data: response
    };
};

export default getConversations;
