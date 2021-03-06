const {makeExecutableSchema} = require('graphql-tools')
const resolvers = require('./resolvers')
const typeDefs = `
    scalar DateTime

    type Query {
        categories: [category]
        categoryById(_id: ID!): category
        subcategories: [subcategory]
        subcategoryById(_id: ID!): subcategory
        subcategoriesByParentId(parentID: ID!): [subcategory]
        tourneyTypes: [tourneyType]
        tourneyTypeById(_id: ID!): tourneyType
        competitors: [competitor]
        competitorById: competitor
        judges: [judge]
        judgeById: judge
        tourneys: [tourney]
        tourneyById(_id: ID!): tourney
    }

    type category {
        _id: ID
        code: Int
        name: String
        createdAt: DateTime
        updatedAt: DateTime
    }

    type subcategory {
        _id: ID
        code: Int
        name: String
        number: Int
        parent: category
        createdAt: DateTime
        updatedAt: DateTime
    }

    type tourneyType {
        _id: ID
        number: Int
        name: String
        subcategories: [subcategory]
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
        subcategory: subcategory
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

    type startingOrder{
        _id: ID
        number: Int
        subcategoryCode: Int
        fase: String
        active: Boolean
    }

    type tourney {
        _id: ID
        name: String
        type: tourneyType
        competitors: [competitor]
        judges: [judge]
        subcategories: [subcategory]
        startingOrder: [startingOrder]
        createdAt: DateTime
        updatedAt: DateTime
    }


    type Mutation {
        createCategory(input: categoryInput!): category
        updateCategory(_id: ID!, input: categoryInput!): category
        deleteCategory(_id: ID!): category
        createSubcategory(input: subcategoryInput!): subcategory
        updateSubcategory(_id: ID!, input: subcategoryInput!): subcategory
        deleteSubcategory(_id: ID!): subcategory
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
        code: Int
    }

    input subcategoryInput {
        _id: String
        name: String!
        number: Int
        code: Int
        parent: ID!
    }

    input tourneyTypeInput {
        number: Int!
        name: String!
        subcategories: [ID!]
    }
    
    input competitorInput {
        firstName: String!
        lastName: String!
        athlete: Int
        personalID: Int!
        age: Int!
        gender: String!
        city: String!
        subcategory: subcategoryInput
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

    input startingOrderInput {
        number: Int
        fase: String!
        subcategoryCode: Int
        active: Boolean
    }

    input tourneyInput {
        name: String!
        type: ID!
        competitors: [competitorInput]
        judges: [ID]
        subcategories: [subcategoryInput]
        startingOrder: [startingOrderInput]
    }

`;

module.exports = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});
