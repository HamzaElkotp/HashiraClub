import mongoose from 'mongoose';

const FileQuestionSchema = new mongoose.Schema(
  {
    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contest',
      required: true,
    },
    title: { type: String, required: true },
    details: { type: String, required: true },
    // acceptedTypes: [String], // e.g. ['.pdf', '.zip']
    // maxSizeMB: { type: Number, default: 10 }, // file size in MB
  },
  { timestamps: true }
);

export default mongoose.models.FileQuestion || mongoose.model('FileQuestion', FileQuestionSchema);
