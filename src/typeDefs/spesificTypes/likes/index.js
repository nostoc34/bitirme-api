const Like = `
    type Like {
        id: String,
        userID: String,
        postID: String,
        createdAt: String,
    },
    type GetLikes {
        id: String,
        userID: String,
        postID: String,
        userName: String,
        userProfilePhoto: String,
        createdAt: String,
    },
    type LikeResponse {
        message: String,
        code: Int,
        data: Like
    },
    type GetLikesRes {
        message: String,
        code: Int,
        data: [GetLikes]
    },
    type GetLikesCountRes{
        message: String,
        code: Int,
        data: Int
    }
`;
export default Like;