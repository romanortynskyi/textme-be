const { gql } = require('apollo-server-express');
const { defaultPaginationParams } = require('./consts');
const { 
  userTypes,
  userInputs,
  userQueries,
  userMutations,
} = require('./modules/user/user.graphql');
const {
  contactTypes,
  contactInputs,
  contactQueries,
  contactMutations,
} = require('./modules/contact/contact.graphql');


const { skip, limit } = defaultPaginationParams;

const typeDefs = gql`
  ${userTypes}
  ${userInputs}

  ${contactTypes}
  ${contactInputs}

  scalar Upload

  input Pagination {
    skip: Int = ${skip}
    limit: Int = ${limit}
  }

  type Query {
    ${userQueries}
    ${contactQueries}
  }

  type Mutation {
    ${userMutations}
    ${contactMutations}
  } 
`;

module.exports = typeDefs;
