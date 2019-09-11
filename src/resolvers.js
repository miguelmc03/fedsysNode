const Category = require('../models/category')

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
        }
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
        }
    }
};
