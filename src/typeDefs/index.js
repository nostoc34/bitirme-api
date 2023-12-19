import mutations from "./mutations";
import queries from "./queries";

import Default from "./spesificTypes/default";

export default `
    scalar Upload,
    
    ${Default},
    ${mutations},
    ${queries}
`;

// ${Default},