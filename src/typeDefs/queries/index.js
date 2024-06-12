export default `
    type Query {
        getOwnPosts: GetOwnPostsRes,
        getLikes(
            postID: String!
        ): GetLikesRes,
        getLikesCount(
            postID: String!
        ): GetLikesCountRes,
        getOwnProfileData: GetOwnProfileRes,
        getProfile(
            userName: String!
        ): GetProfileRes,
        getPosts: GetPostsRes,
        getPost(
            postID: String!
        ): GetPostResp,
        getProfilePosts(
            userName: String!
        ): GetOwnPostsRes,
        search(
            searchText: String
        ): SearchResponse,
        getFriendSuggestions: FriendSuggestionRes,
        getMessages(
            conversationID: String!
        ): GetMessagesResponse,
        getConversations: GetConversationsResponse,
        getFollowings: GetFollowingsResponse
    }
`;