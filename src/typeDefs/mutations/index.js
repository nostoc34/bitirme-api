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
        ): FollowResponse,
        handleFollowRequest(
            followID: String!,
            reqResponse: String!
        ): Default,
        editProfile(
            userName: String,
            fullName: String,
            about: String,
            isPrivate: Boolean,
            profilePhoto: Upload
        ): UserResponse,
        changeEmail(
            email: String!,
            password: String!
        ): Default,
        changePassword(
            oldPassword: String!,
            newPassword: String!,
            newPasswordRe: String!
        ): Default
    }
`;