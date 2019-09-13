const {makeExecutableSchema} = require('graphql-tools')
const resolvers = require('./resolvers')
const typeDefs = `
    scalar DateTime

    type Query {
        categories: [category]
        categoryById(_id: ID!): category
        categoriesByParentId(parentID: ID!): [category]
        tourneyTypes: [tourneyType]
        tourneyTypeById(_id: ID!): tourneyType
        competitors: [competitor]
        competitorById: competitor
        judges: [judge]
        judgeById: judge
        tourneys: [tourney]
        tourneyById: tourney
    }

    type category {
        _id: ID
        name: String
        number: Int
        level: Int
        parent: category
        createdAt: DateTime
        updatedAt: DateTime
    }

    type tourneyType {
        _id: ID
        number: Int
        name: String
        categories: [category]
        createdAt: DateTime
        updatedAt: DateTime
    }

    type competitor {
        _id: ID
        firstName: String
        lastName: String
        athlete: Int
        personalID: Int
        age: Int
        gender: String
        city: String
        categories: [category]
        phone: String
        email: String
        createdAt: DateTime
        updatedAt: DateTime
    }

    type judge {
        _id: ID
        firstName: String
        lastName: String
        personalID: Int
        age: Int
        city: String
        email: String
        createdAt: DateTime
        updatedAt: DateTime
    }

    type tourney {
        _id: ID
        number: Int
        name: String
        type: tourneyType
        competitors: [competitor]
        judges: [judge]
        categories: [category]
        createdAt: DateTime
        updatedAt: DateTime
    }


    type Mutation {
        createCategory(input: categoryInput!): category
        updateCategory(_id: ID!, input: categoryInput!): category
        deleteCategory(_id: ID!): category
        createTourneyType(input: tourneyTypeInput!): tourneyType
        updateTourneyType(_id: ID!, input: tourneyTypeInput!): tourneyType
        deleteTourneyType(_id: ID!): tourneyType
        createCompetitor(input: competitorInput!): competitor
        updateCompetitor(_id: ID!, input: competitorInput!): competitor
        deleteCompetitor(_id: ID!): competitor
        createJudge(input: judgeInput!): judge
        updateJudge(_id: ID!, input: judgeInput!): judge
        deleteJudge(_id: ID!): judge
        createTourney(input: tourneyInput!): tourney
        updateTourney(_id: ID!, input: tourneyInput!): tourney
        deleteTourney(_id: ID!): tourney
    }

    input categoryInput {
        name: String!
        number: Int!
        level: Int!
        parent: ID
    }

    input tourneyTypeInput {
        number: Int!
        name: String!
        categories: [ID!]
    }
    
    input competitorInput {
        firstName: String!
        lastName: String!
        athlete: Int!
        personalID: Int!
        age: Int!
        gender: String!
        city: String!
        categories: [ID!]
        phone: String
        email: String 
    }

    input judgeInput {
        firstName: String!
        lastName: String!
        personalID: Int!
        age: Int!
        city: String!
        email: String 
    }

    input tourneyInput {
        number: Int!
        name: String!
        type: ID!
        competitors: [ID!]
        judges: [ID!]
        categories: [ID!]
    }

`;

module.exports = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});
