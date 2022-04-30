const readMessageInputs = `
  input ReadMessageInput {
    userId: String!
    messageId: String!
    roomId: String!
  }
`;

const readMessageTypes = `
  type ReadMessage {
    _id: ID!
  }
`;

const readMessageQueries = `
  
`;

const readMessageMutations = `
  addReadMessage(input: ReadMessageInput!): ReadMessage
`;

module.exports = {
  readMessageInputs,
  readMessageTypes,
  readMessageQueries,
  readMessageMutations,
};
