const Post = `
    type Post {
        id: String,
        userID: String,
        content: String,
        images: [String],
        isDeleted: Boolean,
        createdAt: String,
    },
    type PostResponse {
        message: String,
        code: Int,
        data: Post
    },
    type GetOwnPostsRes {
        message: String,
        code: Int,
        data: [Post]
    }
`;
export default Post;