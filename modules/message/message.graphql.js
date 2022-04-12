const messageInputs = `
  input MessageInput {
    firstName: String
    lastName: String
    phoneNumber: String
    myId: ID
  }
`;

const messageTypes = `
  type Message {
    _id: ID!
    firstName: String!
    lastName: String!
    myId: ID!
    theirId: ID!
    user: User!
  }
`;

const messageQueries = `
  
`;

const messageMutations = `
  addMessage(input: MessageInput!): Message
`;

module.exports = {
  messageInputs,
  messageTypes,
  messageQueries,
  messageMutations,
};
