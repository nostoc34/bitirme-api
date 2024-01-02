const Like = `
    type Like {
        id: String,
        userID: String,
        postID: String,
        createdAt: String,
    },
    type LikeResponse {
        message: String,
        code: Int,
        data: Like
    },
`;
export default Like;