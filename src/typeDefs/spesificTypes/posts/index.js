const Post = `
    type Post {
        id: String,
        userID: String,
        content: String,
        image: String,
        isDeleted: Boolean,
        createdAt: String,
    },
    type OwnPost {
        id: String,
        userID: String,
        content: String,
        image: String,
        isDeleted: Boolean,
        createdAt: String,
        comments: [Comment],
        likes: Int
    },
    type GetPost {
        id: String,
        userID: String,
        content: String,
        image: String,
        isDeleted: Boolean,
        createdAt: String,
        userName: String,
        profilePhoto: String,
        comments: [Comment],
        likes: [Like],
        commentCount: Int,
        likeCount: Int
    },
    type GetPosts {
        id: String,
        userID: String,
        content: String,
        image: String,
        isDeleted: Boolean,
        createdAt: String,
        userName: String,
        profilePhoto: String,
        comments: [Comment],
        likes: [Like],
        commentCount: Int,
        likeCount: Int
    },
    type PostResponse {
        message: String,
        code: Int,
        data: Post
    },
    type GetOwnPostsRes {
        message: String,
        code: Int,
        data: [OwnPost]
    },
    type GetPostsRes {
        message: String,
        code: Int,
        data: [GetPosts]
    },
    type GetPostResp{
        message: String,
        code: Int,
        data: GetPost
    }
`;
export default Post;