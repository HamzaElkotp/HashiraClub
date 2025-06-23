// models/Association.ts
import mongoose from 'mongoose';

const AssociationSchema = new mongoose.Schema({
  associationName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  coachID: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    required: true,
  },
  website: String,
  logo: { type: String, required: true }, // Will be updated when upload is handled
}, { timestamps: true });

export const Association = mongoose.models.Association || mongoose.model('Association', AssociationSchema);
