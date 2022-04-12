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
const {
  messageTypes,
  messageInputs,
  messageQueries,
  messageMutations,
} = require('./modules/message/message.graphql');


const { skip, limit } = defaultPaginationParams;

const typeDefs = gql`
  type Image {
    src: String
    filename: String
  }

  ${userTypes}
  ${userInputs}
  ${roomTypes}
  ${messageTypes}

  ${contactTypes}
  ${contactInputs}
  ${roomInputs}
  ${messageInputs}

  scalar Upload

  input Pagination {
    skip: Int = ${skip}
    limit: Int = ${limit}
  }

  type Query {
    ${userQueries}
    ${contactQueries}
    ${roomQueries}
    ${messageQueries}
  }

  type Mutation {
    ${userMutations}
    ${contactMutations}
    ${roomMutations}
    ${messageMutations}
  }
`;

module.exports = typeDefs;
