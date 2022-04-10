const firebase = require('firebase-admin');
const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress }= require('graphql-upload');
const { applyMiddleware } = require('graphql-middleware');
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require('express');
const cors = require('cors');

require('dotenv').config({
  path: '.env',
});

const connectDB = require('./config/db');
const typeDefs = require('./type-defs');
const resolvers = require('./resolvers');
const permissions = require('./permissions');
const userService = require('./modules/user/user.service');

const serviceAccount = require("./service-account.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

(async () => {
  await connectDB();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    introspection: true,
    schema: applyMiddleware(schema, permissions),
    resolvers,
    context: async ({ req }) => {
      return {
        user: await userService.getUserByToken(req.headers.token),
      };
    },
    cors: { origin: '*' },
  });
  
  const PORT = process.env.PORT || 5050;
  
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  
  // app.get('/translations', translationsService.getAllTranslations);
  
  // currencyWorker();
  
  await server.start();

  app.use(graphqlUploadExpress());
  
  server.applyMiddleware({
    app,
    bodyParserConfig: {
      limit: '15mb',
    },
  });
  
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})();
