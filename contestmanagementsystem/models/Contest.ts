import mongoose, { Schema } from 'mongoose';

const ContestSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  banner: { type: String, required: true }, // store URL/path
  image: { type: String, required: true },
  publishDate: { type: Date, required: false },
  registrationEndDate: { type: Date, required: false },
  duration: {
    value: { type: Number, required: true }, // in half-hours
    unit: { type: String, enum: ['halfHours', 'days', 'weeks'], required: true },
  },
  maxContestants: { type: Number, required: true },
  online: { type: Boolean, required: true },
  regions: [{ type: String }],
  category: { type: String, required: true },
  step: { type: Number, default: 0 },
}, {
  timestamps: true,
});

export const Contest = mongoose.models.Contest || mongoose.model('Contest', ContestSchema);
