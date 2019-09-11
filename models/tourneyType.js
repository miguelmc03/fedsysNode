const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourneyTypeSchema = new Schema({
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
  categories: [{ type: Schema.Types.ObjectId, ref:'Category' }],
},
{
  timestamps: true
});

module.exports = mongoose.model('TourneyType', tourneyTypeSchema)