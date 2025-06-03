// models/Organization.ts
import mongoose from 'mongoose';

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  website: String,
  logo: String, // Will be updated when upload is handled
}, { timestamps: true });

export default mongoose.models.Organization || mongoose.model('Organization', OrganizationSchema);
