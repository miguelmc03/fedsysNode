const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryNumber: {
    type: Number,
    unique: true,
    required: [true, 'Category number is required']
  },
  categoryName: {
    type:String,
    unique: true,
    required: [true, 'Category Level is required']
  },
  categoryLevel: {
    type: Number,
    unique: true,
    required: [true, 'Category Level is required']
  },
  categoryParent: Number,
},
{
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema)
