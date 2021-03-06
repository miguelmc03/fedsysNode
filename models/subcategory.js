const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  code: {
    type:String,
    unique: true,
    required: [true, 'Subcategory name is required']
  },
  name: {
    type:String,
    required: [true, 'Subcategory name is required']
  },
  parent: { type: Schema.Types.ObjectId, ref:'Category' }
},
{
  timestamps: true
});

module.exports = mongoose.model('Subcategory', subcategorySchema)
