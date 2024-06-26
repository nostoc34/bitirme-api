const Comment = `
    type Comment {
        id: String,
        userID: String,
        userName: String,
        profilePhoto: String,
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
`;
export default Comment;