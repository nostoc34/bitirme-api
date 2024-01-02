//Mutations
import newPost from "./mutations/newPost";
import newComment from "./mutations/newComment";
import newLike from "./mutations/newLike";
import deleteComment from "./mutations/deleteComment";
import deletePost from "./mutations/deletePost";
import handleFollow from "./mutations/handleFollow";

const resolvers = {
    Mutation: {
        newPost,
        newComment,
        newLike,
        deleteComment,
        deletePost,
        handleFollow
    },
    Query: {
    }
};
export default resolvers;