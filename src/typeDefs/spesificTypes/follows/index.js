const Follow = `
    type Follow {
        id: String,
        fromUser: String,
        toUser: String,
        status: String,
        createdAt: String,
    },
    type FollowResponse {
        message: String,
        code: Int,
        data: Follow
    },
`;
export default Follow;