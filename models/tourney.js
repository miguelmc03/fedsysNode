const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  type: [{ type: Schema.Types.ObjectId, ref:'TourneyType' }],
  competitors: [{ type: Schema.Types.ObjectId, ref:'Competitor' }],
  judges: [{ type: Schema.Types.ObjectId, ref:'Judge' }],
  categories: [{ type: Schema.Types.ObjectId, ref:'Category' }]
},
{
  timestamps: true
});

module.exports = mongoose.model('Tourney', tourneySchema)
