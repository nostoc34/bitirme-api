export default `
    type Query {
        getComments(
            postID: String!
        ): GetCommentsRes,
        getOwnPosts: GetOwnPostsRes
    }
`;