const userInputs = `
  input UserSortInput {
    name: Int
    email: Int
  }

  input UserFilterInput {
    # roles: [String!]
    # banned: [String]
    search: String
  }

  input UserInput {
    firstName: String
    lastName: String
    password: String
    role: String
    email: String
    phoneNumber: String
  }
`;

const userTypes = `
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    token: String
  }

  type PaginatedUsers {
    items: [User!]
    count: Int!
  }
`;

const userQueries = `
  getAllUsers(
    filter: UserFilterInput
    pagination: Pagination
    sort: UserSortInput
  ): PaginatedUsers!
  getUserById(id: ID!): User
  getCurrentUser: User
`;

const userMutations = `
  signUp(input: UserInput!): User
  login(input: UserInput!): User
  updateUser(id: ID!, input: UserInput!): User
`;

module.exports = {
  userInputs,
  userTypes,
  userQueries,
  userMutations,
};
