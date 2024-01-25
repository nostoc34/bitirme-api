//Mutations
import newPost from "./mutations/newPost";
import newComment from "./mutations/newComment";
import newLike from "./mutations/newLike";
import deleteComment from "./mutations/deleteComment";
import deletePost from "./mutations/deletePost";
import handleFollow from "./mutations/handleFollow";
import handleFollowRequest from "./mutations/handleFollowRequest";
import editProfile from "./mutations/editProfile";
import changeEmail from "./mutations/changeEmail";
import changePassword from "./mutations/changePassword";

//Queries
import getOwnPosts from "./queries/getOwnPosts";
import getLikes from "./queries/getLikes";
import getLikesCount from "./queries/getLikesCount";
import getOwnProfileData from "./queries/getOwnProfileData";
import getProfile from "./queries/getProfile";
import getPosts from "./queries/getPosts";
import getPost from "./queries/getPost";
import getProfilePosts from "./queries/getProfilePosts";

const resolvers = {
    Mutation: {
        newPost,
        newComment,
        newLike,
        deleteComment,
        deletePost,
        handleFollow,
        handleFollowRequest,
        editProfile,
        changeEmail,
        changePassword
    },
    Query: {
        getOwnPosts,
        getLikes,
        getLikesCount,
        getOwnProfileData,
        getProfile,
        getPosts,
        getPost,
        getProfilePosts
    }
};
export default resolvers;