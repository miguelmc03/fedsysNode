const Category = require('../models/category');
const Subcategory = require('../models/subcategory');
const TourneyType = require('../models/tourneyType');
const Competitor = require('../models/competitor');
const Judge = require('../models/judge');
const Tourney = require('../models/tourney');
const { GraphQLScalarType } = require('graphql');

module.exports = {
    Query: {
        // Categorias
        async categories() {
            return await Category.find();
        },
        async categoryById(_,{_id}) {
            return await Category.findById(_id);
        },
        // Subcategorias
        async subcategories() {
            return await Subcategory.find().populate('parent');
        },
        async subcategoryById(_,{_id}) {
            return await Subcategory.findById(_id).populate('parent');
        },
        async subcategoriesByParentId(_,{parentID}) {
            return await Subcategory.find({parent: parentID}).populate('parent');
        },
        // Tipos de torneos
        async tourneyTypes() {
            return await TourneyType.find().deepPopulate('subcategories subcategories.parent');
        },
        async tourneyTypeById(_,{_id}) {
            return await TourneyType.findById(_id).deepPopulate('subcategories subcategories.parent');
        },
        // Competidores
        async competitors() {
            return await Competitor.find();
        },
        async competitorById(_,{_id}) {
            return await Competitor.findById(_id);
        },
        // Jueces
        async judges() {
            return await Judge.find();
        },
        async judgeById(_,{_id}) {
            return await Judge.findById(_id);
        },
        // Torneos
        async tourneys() {
            return await Tourney.find()
            .populate('type')
            .populate('competitors')
            .populate('judges')
            .populate('subcategories');
        },
        async tourneyById(_,{_id}) {
            return await Tourney.findById(_id)
            .populate('type')
            .populate('competitors')
            .populate('judges')
            .populate('subcategories');
        },
        
    },
    Mutation: {
        // Categorias
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
        // Subcategorias
        async createSubcategory(_,{input}) {
            const newSubcategory = new Subcategory(input);
            return await newSubcategory.save();
        },
        async updateSubcategory(_,{_id, input}) {
            return await Subcategory.findByIdAndUpdate(_id, input);
        },
        async deleteSubcategory(_,{_id}) {
            return await Subcategory.findByIdAndDelete(_id);
        },
        // Tipos de torneo
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
        // Competidores
        async createCompetitor(_,{input}) {
            const newCompetitor = new Competitor(input);
            return await newCompetitor.save();
        },
        async updateCompetitor(_,{_id, input}) {
            return await Competitor.findByIdAndUpdate(_id, input);
        },
        async deleteCompetitor(_,{_id}) {
            return await Competitor.findByIdAndDelete(_id);
        },
        // Jueces
        async createJudge(_,{input}) {
            const newJudge = new Judge(input);
            return await newJudge.save();
        },
        async updateJudge(_,{_id, input}) {
            return await Judge.findByIdAndUpdate(_id, input);
        },
        async deleteJudge(_,{_id}) {
            return await Judge.findByIdAndDelete(_id);
        },
        // Torneo
        async createTourney(_,{input}) {
            const newTourney = new Tourney(input);
            return await newTourney.save();
        },
        async updateTourney(_,{_id, input}) {
            return await Tourney.findByIdAndUpdate(_id, input);
        },
        async deleteTourney(_,{_id}) {
            return await Tourney.findByIdAndDelete(_id);
        },
    },
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A date and time, represented as an ISO-8601 string',
        serialize: (value) => value.toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value)
      }),
};
