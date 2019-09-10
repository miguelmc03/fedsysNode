const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const competitorSchema = new Schema({
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
    required: [true, 'Athlete number is required']
  },
  idNumber: {
    type: Number,
    unique: true,
    required: [true, 'ID number is required']
  },
  age: {
    type: Number,
    required: [true, 'Athlete number is required']
  },
  gender: {
    type:String,
    required: [true, 'Gender is required']
  },
  city: {
    type:String,
    required: [true, 'City is required']
  },
  categories: [
    {
      type: type.Schema.Types.ObjectId, ref:'Category',
      required: [true, 'Categories number is required']
    }
  ],
  email: String,
  phone: String,
},
{
  timestamps: true
});

module.exports = mongoose.model('Competitor', competitorSchema)
