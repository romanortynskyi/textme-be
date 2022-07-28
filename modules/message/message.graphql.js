const messageInputs = `
  input MessageInput {
    type: String!
    text: String
    roomId: ID!
    userId: ID!
  }

  input TextMessageInput {
    text: String!
    roomId: ID!
    userId: ID!
  }

  input GifMessageInput {
    gifId: String!
    roomId: ID!
    userId: ID!
  }
`;

const messageTypes = `
  type TextMessage {
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

  type GifMessage {
    _id: ID!
    type: String!
    gifId: String!
    user: User!
    room: Room!
    contact: Contact
    createdAt: String!
    isMine: Boolean!
    myRead: ReadMessage
  }

  union Message = TextMessage | GifMessage
`;

const messageQueries = `
  getMessagesByRoom(id: ID!): [Message!]!
`;

const messageMutations = `
  addTextMessage(input: TextMessageInput!): Message
  addGifMessage(input: GifMessageInput!): Message
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
