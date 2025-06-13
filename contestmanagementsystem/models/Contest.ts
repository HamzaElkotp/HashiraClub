import mongoose, { Schema } from 'mongoose';

const ContestSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  banner: { type: String, required: true },
  image: { type: String, required: true },
  publishDate: { type: Date, required: true },
  registrationEndDate: { type: Date, required: true },
  startDateTime: { type: Date, required: true },
  period: {
    value: { type: Number, required: true },
    unit: { type: String, enum: ['halfHours', 'days', 'weeks'], required: true },
  },
  maxContestants: { type: Number, required: true },
  online: { type: Boolean, required: true },
  regions: [{ type: String, required: true }],
  category: { type: String, required: true },
  sponsors: [{ type: Schema.Types.ObjectId, ref: 'Sponsor' }],
  organizations: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
  organizedInsidePlatform: { type: String, enum: ['inside', 'outside'], required: true },
  externalLink: { type: String },
  externalMessage: { type: String },
  step: { type: Number, default: 0 },
  minTeamSize: { type: Number, required: true },
  maxTeamSize: { type: Number, required: true },
  teamCondition: {
    type: String,
    enum: ['sameAssociation', 'sameRegion', 'sameCountry', 'any'],
    required: true
  },
  hasPenalty: { type: Boolean, default: true, required: true },
  rateMethod: { type: String, enum: ['timestamp', 'correctSubmissions'], required: true },
  resultVisibility: { type: String, enum: ['realTime', 'endOfContest'], required: true },
  resultPublishing: { type: String, enum: ['manual', 'automatic'], required: true },
  standingStyle: {
    type: String,
    enum: ['text', 'numbers', 'colorsFull', 'colorsSimple'],
    required: true
  },
  questionType: {
    type: String,
    enum: ['form', 'file', 'mcq'],
    required: true,
  },
}, { timestamps: true });


export const Contest = mongoose.models.Contest || mongoose.model('Contest', ContestSchema);
