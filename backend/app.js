const express = require("express");
const bodyParsor = require("body-parser");
const mongoose = require("mongoose");

const { createServer } = require("http");

const { ApolloServer } = require("apollo-server-express");

var app = express();
app.use(bodyParsor.json());

const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers/resolver");

try {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@cluster0.g1sxy.mongodb.net/Base?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log(process.send.PASSWORD);
  console.log(process.env.DB_USER);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  server.applyMiddleware({ app });

  // Wrap the Express server
  const ws = createServer(app);
  server.installSubscriptionHandlers(ws);

  ws.listen(4000 || process.env.PORT, () => {
    console.log(` Server ready at ${process.env.PORT}${server.graphqlPath}`);
    // Set up the WebSocket for handling GraphQL subscriptions
  });
} catch (err) {
  console.log(err);
}
