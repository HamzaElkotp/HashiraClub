import { NextRequest } from 'next/server';
import {connectToDatabase} from '@/lib/mongoose';
import MCQQuestion from '@/models/MCQQuestion';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const question = await MCQQuestion.create(body);

    return new Response(JSON.stringify(question), { status: 201 });
  } catch (err) {
    console.error('[MCQ CREATE ERROR]', err);
    return new Response(JSON.stringify({ error: 'Failed to create MCQ' }), { status: 500 });
  }
}
