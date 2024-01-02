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
`;
export default User;