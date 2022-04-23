const messageInputs = `
  input MessageInput {
    type: String!
    text: String
    roomId: ID!
    userId: ID!
  }
`;

const messageTypes = `
  type Message {
    _id: ID!
    type: String!
    text: String!
    user: User!
    room: Room!
    contact: Contact
    createdAt: String!
    isMine: Boolean!
    myRead: ReadMessage
  }
`;

const messageQueries = `
  getMessagesByRoom(id: ID!): [Message!]!
`;

const messageMutations = `
  addMessage(input: MessageInput!): Message
`;

const messageSubscriptions = `
  messageCreated(userId: ID!): Message
`;

module.exports = {
  messageInputs,
  messageTypes,
  messageQueries,
  messageMutations,
  messageSubscriptions,
};
