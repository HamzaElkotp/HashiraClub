import mongoose, { Schema } from 'mongoose';

const ContestSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  banner: { type: String, required: true },
  image: { type: String, required: true },
  publishDate: { type: Date },
  registrationEndDate: { type: Date },
  startDateTime: { type: Date, required: true },
  period: {
    value: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  maxContestants: { type: Number, required: true },
  isOnline: { type: Boolean, required: true },
  regions: [{ type: String }],
  category: { type: String, required: true },
  organizedInsidePlatform: { type: String, enum: ['inside', 'outside'], required: true },
  externalLink: String,
  externalMessage: String,
  minTeamSize: Number,
  maxTeamSize: Number,
  teamCondition: String,
  hasPenalty: Boolean,
  rateMethod: String,
  resultVisibility: String,
  resultPublishing: String,
  standingStyle: String,
  questionType: String,
}, { timestamps: true });

export default mongoose.models.Contest || mongoose.model('Contest', ContestSchema);
