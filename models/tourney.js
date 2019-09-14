const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const competitorSchema = new Schema ({
  firstName: {
    type:String,
    required: [true, 'Firstname is required']
  },
  lastName: {
    type:String,
    required: [true, 'Lastname is required']
  },
  athlete: {
    type: Number,
    unique: true,
  },
  personalID: {
    type: Number,
    required: [true, 'ID number is required']
  },
  age: {
    type: Number,
    required: [true, 'Age is required']
  },
  gender: {
    type:String,
    required: [true, 'Gender is required']
  },
  city: {
    type:String,
    required: [true, 'City is required']
  },
  subcategories: {
    type: subcategorySchema,
    required: [true, 'City is required']
  },
  email: String,
  phone: String,
});

const subcategorySchema = new Schema({
  number: {
    type: Number,
    unique: true,
  },
  name: {
    type:String,
    unique: true,
    required: [true, 'Subcategory name is required']
  },
  parent: { type: Schema.Types.ObjectId, ref:'Category' }
});

const tourneySchema = new Schema({
  number: {
    type: Number,
    unique: true,
    required: [true, 'Tourney number is required']
  },
  name: {
    type:String,
    unique: true,
    required: [true, 'Tourney Level is required']
  },
  type: { type: Schema.Types.ObjectId, ref:'TourneyType' },
  competitors: [competitorSchema],
  judges: [{ type: Schema.Types.ObjectId, ref:'Judge' }],
  subcategories: [subcategorySchema],
},
{
  timestamps: true
});

module.exports = mongoose.model('Tourney', tourneySchema)
