const Post = `
    type Post {
        id: String,
        userID: String,
        content: String,
        images: [String],
        isDeleted: Boolean,
        createdAt: String,
    },
    type GetPost {
        id: String,
        userID: String,
        content: String,
        images: [String],
        isDeleted: Boolean,
        createdAt: String,
        userName: String,
        userProfilePhoto: String
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
    },
    type GetPostsRes {
        message: String,
        code: Int,
        data: [GetPost]
    }
`;
export default Post;