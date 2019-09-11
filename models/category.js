const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  number: {
    type: Number,
    unique: true,
    required: [true, 'Category number is required']
  },
  name: {
    type:String,
    unique: true,
    required: [true, 'Category name is required']
  },
  level: {
    type: Number,
    required: [true, 'Category Level is required']
  },
  parent: { type: Schema.Types.ObjectId, ref:'Category' },
},
{
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema)
