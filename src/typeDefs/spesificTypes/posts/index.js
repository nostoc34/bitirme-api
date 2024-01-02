const Post = `
    type Post {
        id: String,
        userID: String,
        content: String,
        images: [String],
        isDeleted: Boolean,
        createdAt: String,
    },
    type Comment {
        id: String,
        userID: String,
        postID: String,
        comment: String,
        isDeleted: Boolean,
        createdAt: String,
        userName: String,
        profilePhoto: String
    },
    type GetPost {
        id: String,
        userID: String,
        content: String,
        images: [String],
        isDeleted: Boolean,
        createdAt: String,
        userName: String,
        profilePhoto: String,
        comments: [Comment],
        likes: Int
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