const { createServer } = require('http');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');

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

  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  const httpServer = createServer(app);
  
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const serverCleanup = useServer({ schema }, wsServer);

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
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  
  const PORT = process.env.PORT || 5050;
  
  
  
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
  
  httpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})();
