// models/ContestCategory.ts
import mongoose from 'mongoose';

const ContestCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  logo: { type: String, required: true }
}, { timestamps: true });

export const ContestCategory = mongoose.models.ContestCategory || mongoose.model('ContestCategory', ContestCategorySchema);
