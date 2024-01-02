export default `
    type Query {
        getComments(
            postID: String!
        ): GetCommentsRes,
        getOwnPosts: GetOwnPostsRes,
        getLikes(
            postID: String!
        ): GetLikesRes,
        getLikesCount(
            postID: String!
        ): GetLikesCountRes,
        getOwnProfile: GetProfileRes,
        getProfile(
            userID: String!
        ): GetProfileRes,
        getPosts: GetPostsRes
    }
`;