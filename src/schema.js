const {makeExecutableSchema} = require('graphql-tools')
const resolvers = require('./resolvers')
const typeDefs = `
    type Query {
        hi(name: String!): String
    }
`;

module.exports = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});
