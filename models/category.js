const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type:String,
    unique: true,
    required: [true, 'Category name is required']
  },
  code: {
    type:String,
    unique: true,
    required: [true, 'Subcategory name is required']
  },
},
{
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema)
