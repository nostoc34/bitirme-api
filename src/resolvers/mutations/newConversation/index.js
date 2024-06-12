import {
    r
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';

const newConversation = async (obj, args, context) => {
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
        .get(args.targetID)
        .run();

    if(!targetUser) return {
        message: "Kullanıcı bulunamadı.",
        code: 503
    };

    const conversationID = await r.uuid();

    let newConversation = {
        id: conversationID,
        users: [
            userID,
            targetUser.id
        ]
    };

    return await r
        .db(DB)
        .table("conversations")
        .insert(newConversation)
        .then(() => {          
            return {
                message: "Sohbet başlatıldı.",
                code: 200,
                data: newConversation
            };
        })
        .catch(err => {
            return {
                message: `Hata: ${err.message}`,
                code: 500,
                data: null
            };
        });
};

export default newConversation;
