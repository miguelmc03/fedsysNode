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
  personalID: {
    type: Number,
    unique: true,
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
  email: String,
  phone: String,
},
{
  timestamps: true
});

module.exports = mongoose.model('Competitor', competitorSchema)
