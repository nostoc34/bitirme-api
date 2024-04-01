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

const search = async (obj, args, context) => {
    const {
        userID
    } = context;

    if(args.searchText.trim().length < 1) {
        return {
            message: "Bir arama metni gönderilmedi.",
            code: 400
        };
    }

    let users = await r
        .db(DB)
        .table("users")
        .filter((user) => {
            return user("id").eq(userID).not()
                .and(
                    user("fullName").match(`(?i)${args.searchText}`)
                        .or(
                            user("userName").match(`(?i)${args.searchText}`)
                        )
                )
                .and(
                    user.hasFields("isActive")
                );
        })
        .run();

    await asyncForEach(users, async (item, index) => {
        item.profilePhoto = SERVER_URL + "upload/" + item.profilePhoto;            
    });

    return {
        message: "Aramalar başarıyla getirildi.",
        code: 200,
        data: users
    };
};

export default search;