import mongoose, { Schema } from 'mongoose';

const SponsorSchema = new Schema({
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },
  website: { type: String },
  facebook: { type: String },
  twitter: { type: String },
  isGeneral: { type: Boolean, default: false },
});

export default mongoose.models.Sponsor || mongoose.model('Sponsor', SponsorSchema);
