const Search = `
    type Search {
        id: String,
        userName: String,
        fullName: String,
        profilePhoto: String,
        isPrivate: Boolean,
        isActive: Boolean,
        createdAt: String,
        followStatus: String
    },
    type SearchResponse {
        message: String,
        code: Int,
        data: [Search]
    },
`;
export default Search;