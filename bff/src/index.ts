import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import fs from "fs";
import path from "path";
import cookieSession from "cookie-session";
import { errorHandler } from "./errorHandler";
import bodyParser from "body-parser";
const key =
  process.env.COOKIE_KEY ||
  fs.readFileSync(path.join(__dirname, "./__secret")).toString();

const typeDefs = gql(
  fs.readFileSync(path.join(__dirname, "./generated/schema.graphql")).toString()
);
const app = express();
const server = new ApolloServer({ typeDefs });
server.applyMiddleware({ app });
app.use(bodyParser());
app.use(
  cookieSession({
    keys: [key],
    maxAge: 60 * 60 * 1000,
    sameSite: true,
    httpOnly: true,
  })
);

app.post("/api/signin", function (req, res) {
  if (req.body.token) {
    req.session = {
      token: req.body.token,
    };
  }
  res.sendStatus(200);
});

app.use(errorHandler);
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);
