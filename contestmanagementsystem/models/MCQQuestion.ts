import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema({
  label: { type: String, required: true }
}, { _id: false });

const MCQQuestionSchema = new mongoose.Schema({
  contestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contest',
    required: true,
  },
  title: { type: String, required: true },
  details: { type: String, required: true }, // markdown
  hint: { type: String },
  options: {
    type: [OptionSchema],
    required: true,
    validate: [(arr: { label: string }[]) => arr.length >= 2, 'At least two options required']
  },
  correctAnswerIndex: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number): boolean => v >= 0,
      message: 'Correct answer index is invalid',
    },
  },
}, { timestamps: true });

export default mongoose.models.MCQQuestion || mongoose.model('MCQQuestion', MCQQuestionSchema);
