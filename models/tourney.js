const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  name: {
    type:String,
    unique: true,
    required: [true, 'Subcategory name is required']
  },
  parent: { type: Schema.Types.ObjectId, ref:'Category' },
  // winner: competitorSchema
});

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
  subcategory: {
    type: subcategorySchema,
    required: [true, 'Subcategory is required']
  },
  eliminated: Boolean,
  email: String,
  phone: String,
});

const staringSchema = new Schema ({
  number: {
    type: Number,
    unique: true,
  },
  subcategory: subcategorySchema,
  fase: String
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
  startingOrder: [staringSchema]
},
{
  timestamps: true
});

module.exports = mongoose.model('Tourney', tourneySchema)
