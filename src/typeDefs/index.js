import mutations from "./mutations";
import queries from "./queries";

import Default from "./spesificTypes/default";
import User from "./spesificTypes/users";
import Post from "./spesificTypes/posts";
import Comment from "./spesificTypes/comments";
import Like from "./spesificTypes/likes";
import Follow from "./spesificTypes/follows";
import Search from "./spesificTypes/search";

export default `
    scalar Upload,
    
    ${Search},
    ${Follow},
    ${Like},
    ${Comment},
    ${Post},
    ${User},
    ${Default},
    ${mutations},
    ${queries}
`;
