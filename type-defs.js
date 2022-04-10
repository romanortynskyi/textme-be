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
const {
  roomTypes,
  roomInputs,
  roomQueries,
  roomMutations,
} = require('./modules/room/room.graphql');


const { skip, limit } = defaultPaginationParams;

const typeDefs = gql`
  type Image {
    src: String
    filename: String
  }

  ${userTypes}
  ${userInputs}
  ${roomTypes}

  ${contactTypes}
  ${contactInputs}
  ${roomInputs}

  scalar Upload

  input Pagination {
    skip: Int = ${skip}
    limit: Int = ${limit}
  }

  type Query {
    ${userQueries}
    ${contactQueries}
    ${roomQueries}
  }

  type Mutation {
    ${userMutations}
    ${contactMutations}
    ${roomMutations}
  } 
`;

module.exports = typeDefs;
