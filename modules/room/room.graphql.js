const roomInputs = `
  input RoomInput {
    name: String
    members: [String!]!
    isPrivate: Boolean!
  }
`;

const roomTypes = `
  type Room {
    _id: ID!
    name: String!
    image: Image
    latestMessage: Message
    unreadMessagesCount: Int!
  }
`;

const roomQueries = `
  getRoomsByUser(id: ID!): [Room!]!
  getRoomById(id: ID!): Room
`;

const roomMutations = `
  addRoom(input: RoomInput!, image: Upload): Room
`;

module.exports = {
  roomInputs,
  roomTypes,
  roomQueries,
  roomMutations,
};
