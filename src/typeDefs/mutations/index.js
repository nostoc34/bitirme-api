export default `
    type Mutation {
        newPost(
            content: String,
            images: [String!]
        ): PostResponse,
        newComment(
            comment: String!,
            postID: String!,
        ): CommentResponse,
        newLike(
            postID: String!
        ): LikeResponse,
        deleteComment(
            commentID: String!
        ): Default,
        deletePost(
            postID: String!
        ): Default,
        handleFollow(
            toUser: String!
        ): FollowResponse
    }
`;