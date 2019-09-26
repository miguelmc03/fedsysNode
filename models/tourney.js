const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  code: {
    type:Number,
    required: [true, 'Subcategory name is required']
  },
  name: {
    type:String,
    required: [true, 'Subcategory name is required']
  },
  parent: { type: Schema.Types.ObjectId, ref:'Category' },
  winner: String
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
    type:  subcategorySchema,
    required: [true, 'Subcategory is required']
  },
  eliminated: Boolean,
  email: String,
  phone: String,
});

const staringSchema = new Schema ({
  active: Boolean,
  number: {
    type: Number,
  },
  subcategoryCode: Number,
  fase: String
});

const tourneySchema = new Schema({
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

tourneySchema.plugin(deepPopulate)

module.exports = mongoose.model('Tourney', tourneySchema)
