import mongoose, { Schema } from 'mongoose';

const SponsorSchema = new Schema({
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  facebook: String,
  twitter: String,
  website: String,
  logo: String, // path or URL to logo image
}, {
  timestamps: true,
});

export const Sponsor = mongoose.models.Sponsor || mongoose.model('Sponsor', SponsorSchema);
