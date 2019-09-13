const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const judgeSchema = new Schema({
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
    required: [true, 'Athlete number is required']
  },
  city: {
    type:String,
    required: [true, 'City is required']
  },
  email: String,
},
{
  timestamps: true
});

module.exports = mongoose.model('Judge', judgeSchema)
