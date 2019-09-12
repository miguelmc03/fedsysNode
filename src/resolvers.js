const Category = require('../models/category')
const { GraphQLScalarType } = require('graphql');

module.exports = {
    Query: {
        async categories() {
            return await Category.find().populate('parent');
        },
        async categoryById(_,{_id}) {
            return await Category.findById(_id).populate('parent');
        },
        async categoriesByParentId(_,{parentID}) {
            return await Category.find({parent: parentID}).populate('parent');
        },
        async tourneyTypes() {
            return await TourneyType.find().populate('categories');
        },
        async tourneyTypeById(_,{_id}) {
            return await TourneyType.findById(_id).populate('categories');
        },
        async competitors() {
            return await Competitor.find().populate('categories');
        },
        async competitorById(_,{_id}) {
            return await Competitor.findById(_id).populate('categories');
        },
    },
    Mutation: {
        async createCategory(_,{input}) {
            const newCategory = new Category(input);
            return await newCategory.save();
        },
        async updateCategory(_,{_id, input}) {
            return await Category.findByIdAndUpdate(_id, input);
        },
        async deleteCategory(_,{_id}) {
            return await Category.findByIdAndDelete(_id);
        },
        async createTourneyType(_,{input}) {
            const newTourneyType = new TourneyType(input);
            return await newTourneyType.save();
        },
        async updateTourneyType(_,{_id, input}) {
            return await TourneyType.findByIdAndUpdate(_id, input);
        },
        async deleteTourneyType(_,{_id}) {
            return await TourneyType.findByIdAndDelete(_id);
        },
        async createCompetitor(_,{input}) {
            const newCompetitor = new Competitor(input);
            return await newCompetitor.save();
        },
        async updateCompetitor(_,{_id, input}) {
            return await Competitor.findByIdAndUpdate(_id, input);
        },
        async deleteCompetitor(_,{_id}) {
            return await Competitor.findByIdAndDelete(_id);
        }
    },
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A date and time, represented as an ISO-8601 string',
        serialize: (value) => value.toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value)
      }),
};
