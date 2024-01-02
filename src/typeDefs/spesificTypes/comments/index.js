const Comment = `
    type Comment {
        id: String,
        userID: String,
        postID: String,
        comment: String,
        isDeleted: Boolean,
        createdAt: String,
    },
    type CommentResponse {
        message: String,
        code: Int,
        data: Comment
    },
    type GetComments{
        id: String,
        userID: String,
        postID: String,
        comment: String,
        isDeleted: Boolean,
        createdAt: String,
        userName: String,
        userProfilePhoto: String
    },
    type GetCommentsRes {
        message: String,
        code: Int,
        data: [GetComments]
    }
`;
export default Comment;