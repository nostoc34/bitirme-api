export default `
    type Query {
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