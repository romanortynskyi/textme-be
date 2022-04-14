const contactInputs = `
  input ContactInput {
    firstName: String
    lastName: String
    phoneNumber: String
    myId: ID
  }
`;

const contactTypes = `
  type Contact {
    _id: ID!
    firstName: String!
    lastName: String!
    myId: ID!
    theirId: ID!
    user: User!
  }
`;

const contactQueries = `
  getContactsByUser(id: ID!): [Contact]
  getContact(theirId: ID!): Contact
`;

const contactMutations = `
  addContact(input: ContactInput!): Contact
`;

module.exports = {
  contactInputs,
  contactTypes,
  contactQueries,
  contactMutations,
};
