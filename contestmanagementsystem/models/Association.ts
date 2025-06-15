// models/Association.ts
import mongoose from 'mongoose';

const AssociationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  website: String,
  logo: String, // Will be updated when upload is handled
}, { timestamps: true });

export const Association = mongoose.models.Association || mongoose.model('Association', AssociationSchema);
