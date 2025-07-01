import mongoose, { Schema } from 'mongoose';

const ContestSchema = new Schema({
  name: { type: String, required: true },
  about: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String },
  banner: { type: String, required: true },
  image: { type: String, required: true },
  publishDate: { type: Date },
  registrationEndDate: { type: Date },
  startDateTime: { type: Date, required: true },
  period: {
    value: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true },
  },
  maxContestants: { type: Number, required: true, min: 1 },
  isOnline: { type: Boolean, required: true },
  regions: [{ type: String }],
  category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ContestCategories'
  },
  associations: {
    type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Associations'
    }]
  },
  sponsors: {
    type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sponsors'
    }]
  },
  organizingPlace: { type: String, enum: ['inside', 'outside'], required: true },
  externalLink: String,
  externalMessage: String,
  minTeamSize: Number,
  maxTeamSize: Number,
  teamCondition: String,
  teamCoach: String,
  hasPenalty: Boolean,
  rateMethod: String,
  resultVisibility: String,
  resultPublishing: String,
  standingStyle: String,
  questionType: String,
  registers: {
    type: Number,
    default: 0,
    min: 0,
  },
}, { timestamps: true });

export default mongoose.models.Contest || mongoose.model('Contest', ContestSchema);
