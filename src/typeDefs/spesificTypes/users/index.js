const User = `
    type User {
        id: String,
        userName: String,
        fullName: String,
        email: String,
        profilePhoto: String,
        about: String,
        type: String,
        isPrivate: Boolean,
        isActive: Boolean,
        createdAt: String
    },
    type UserResponse {
        message: String,
        code: Int,
        data: User
    },
    type GetProfile {
        id: String,
        userName: String,
        fullName: String,
        email: String,
        profilePhoto: String,
        about: String,
        type: String,
        follows: Int,
        followers: Int,
        isPrivate: Boolean,
        isActive: Boolean,
        createdAt: String,
        followStatus: String
    },
    type GetOwnProfile {
        id: String,
        userName: String,
        fullName: String,
        email: String,
        profilePhoto: String,
        about: String,
        type: String,
        follows: Int,
        followers: Int,
        isPrivate: Boolean,
        isActive: Boolean,
        createdAt: String
    },
    type GetProfileRes {
        message: String,
        code: Int,
        data: GetProfile
    },
    type GetOwnProfileRes {
        message: String,
        code: Int,
        data: GetOwnProfile
    },
    type FriendSuggestionRes {
        message: String,
        code: Int,
        data: [User]
    }
`;
export default User;