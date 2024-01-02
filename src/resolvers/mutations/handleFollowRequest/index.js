import {
    r,
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';

const handleFollowRequest = async (obj, args, context) => {
    const {
        userID
    } = context;

    const followRequest = await r
        .db(DB)
        .table("followings")
        .get(args.followID)
        .run();

    if(!followRequest) return {
        message: "Takip isteği bulunumadı.",
        code: 503
    };

    if(followRequest.toUser !== userID) return {
        message: "Yetkisiz erişim.",
        code: 503
    };

    if(["approved", "rejected"].indexOf(args.reqResponse) === -1) {
        return {
            message: "Geçersiz cevap.",
            code: 503
        };
    }

    if(args.reqResponse === "approved") {
        await r
            .db(DB)
            .table("followings")
            .get(args.followID)
            .update({
                status: "approved"
            })
            .then(() => {          
                return {
                    message: "Takip isteği kabul edildi.",
                    code: 200,
                };
            })
            .catch(err => {
                return {
                    message: `Hata: ${err.message}`,
                    code: 500
                };
            });
    } else {
        await r
            .db(DB)
            .table("followings")
            .get(args.followID)
            .delete()
            .then(() => {          
                return {
                    message: "Takip isteği reddedildi.",
                    code: 200,
                };
            })
            .catch(err => {
                return {
                    message: `Hata: ${err.message}`,
                    code: 500
                };
            });
    }
};

export default handleFollowRequest;