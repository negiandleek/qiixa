import { ApolloServer, gql } from 'apollo-server'
import fs from 'fs'
import path from 'path'

const typeDefs = gql(
  fs.readFileSync(path.join(__dirname, './generated/schema.graphql')).toString()
)
const server = new ApolloServer({typeDefs})
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});