import {
    r
} from '../../../database';
import {
    DB,
    SERVER_URL
} from '../../../constants';

const editProfile = async (obj, args, context) => {
    const {
        userID
    } = context;

    let editedProfile = {
    };

    if(args.userName) {
        const isUserNameExist = await r
            .db(DB)
            .table("users")
            .filter({
                userName: args.userName
            })
            .run();
            
        if(isUserNameExist && isUserNameExist.length) {
            return {
                message: "Bu kullanıcı zaten kullanımda.",
                code: 503
            };
        } else {
            editedProfile.userName = args.userName;
        }
    }

    if(args.fullName) {
        editedProfile.fullName = args.fullName;
    }

    if(args.about) {
        editedProfile.about = args.about;
    }

    if(args.isPrivate) {
        editedProfile.isPrivate = args.isPrivate;
    }

    if(args.profilePhoto) {
        editedProfile.profilePhoto = `${SERVER_URL}upload/${args.profilePhoto}`;
    }

    if(Object.keys(editedProfile).length === 0) {
        return {
            message: "Herhangi değişiklik gönderilmedi.",
            code: 403
        };
    } else {
        return r
            .db(DB)
            .table("users")
            .get(userID)
            .update(editedProfile)
            .then(() => {
                return {
                    message: "Kullanıcı başarıyla güncellendi.",
                    code: 200,
                    data: editedProfile
                };
            }).catch((e) => {
                error_log(e.message, 503);
                return {
                    message: "Kullanıcı güncellenemedi.",
                    code: 503
                };
            });
    }
};

export default editProfile;