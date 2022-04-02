const { gql } = require('apollo-server-express');
const { defaultPaginationParams } = require('./consts');
const { 
  userTypes,
  userInputs,
  userQueries,
  userMutations,
} = require('./modules/user/user.graphql');

const { skip, limit } = defaultPaginationParams;

const typeDefs = gql`
  ${userTypes}
  ${userInputs}

  scalar Upload

  input Pagination {
    skip: Int = ${skip}
    limit: Int = ${limit}
  }

  type Query {
    ${userQueries}
  }

  type Mutation {
    ${userMutations}
  } 
`;

module.exports = typeDefs;
