const Message = `
    type Message {
        id: String,
        conversationID: String,
        senderID: String,
        receiverID: String,
        message: String,
        createdAt: String
    },
    type SendMessageResponse {
        message: String,
        code: Int,
        data: Message
    },
    type UserPayload {
        userID: String,
        userName: String,
        profilePhoto: String
    },
    type GetMessages {
        usersPayload: [UserPayload],
        messages: [Message]
    },
    type GetMessagesResponse {
        message: String,
        code: Int,
        data: GetMessages
    },
    type GetConversations {
        id: String,
        targetUserInfo: UserPayload,
        lastMessage: Message
    },
    type GetConversationsResponse {
        message: String,
        code: Int,
        data: [GetConversations]
    },
    type NewConversation {
        id: String,
        users: [String]
    },
    type NewConversationResponse {
        message: String,
        code: Int,
        data: NewConversation
    }
`;
export default Message;