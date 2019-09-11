const {makeExecutableSchema} = require('graphql-tools')
const resolvers = require('./resolvers')
const typeDefs = `
    type Query {
        categories: [category]
        categoryById(_id: ID!): category
        categoriesByParentId(parentID: ID!): [category]
    }

    type category {
        _id: ID
        name: String
        number: Int
        level: Int
        parent: category
        createdAt: String
        updatedAt: String
    }


    type Mutation {
        createCategory(input: categoryInput!): category
        updateCategory(_id: ID!, input: categoryInput!): category
        deleteCategory(_id: ID!): category
    }

    input categoryInput {
        name: String!
        number: Int!
        level: Int!
        parent: ID
    }
`;

module.exports = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});
