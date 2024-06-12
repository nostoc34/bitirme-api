import {
    r
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';

const sendMessage = async (obj, args, context) => {
    const {
        userID
    } = context;

    const conv = await r
        .db(DB)
        .table("conversations")
        .get(args.conversationID)
        .run();
    
    if(!conv) return {
        message: "Sohbet bulunamadı.",
        code: 500
    };

    const _receiverID = conv.users.filter(e => e !== userID);
    const receiverID = _receiverID[0];

    const targetUser = await r
        .db(DB)
        .table("users")
        .get(receiverID)
        .run();

    if(!targetUser) return {
        message: "Kullanıcı bulunamadı.",
        code: 503
    };

    const messageID = await r.uuid();

    let newMessage = {
        id: messageID,
        conversationID: args.conversationID,
        senderID: userID,
        receiverID: receiverID,
        message: args.message,
        createdAt: new Date().toISOString()
    };

    return await r
        .db(DB)
        .table("messages")
        .insert(newMessage)
        .then(() => {
            return {
                message: "Mesaj gönderildi.",
                code: 200,
                data: newMessage
            };
        })
        .catch(err => {
            return {
                message: `Hata: ${err.message}`,
                code: 500
            };
        });
};

export default sendMessage;
