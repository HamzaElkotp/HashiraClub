import { NextRequest } from 'next/server';
import {connectToDatabase} from '@/lib/mongoose';
import MCQQuestion from '@/models/MCQQuestion';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const questions = await MCQQuestion.find({ contestId: params.id });
    return new Response(JSON.stringify(questions), { status: 200 });
  } catch (err) {
    console.error('[MCQ GET ERROR]', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch MCQ questions' }), { status: 500 });
  }
}

