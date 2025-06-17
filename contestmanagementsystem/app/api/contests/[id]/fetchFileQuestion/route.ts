import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import FileQuestion from '@/models/FileQuestion';

export async function GET(request: NextRequest, context: any) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const questions = await FileQuestion.find({ contestId: id });
    return new Response(JSON.stringify(questions), { status: 200 });
  } catch (err) {
    console.error('[File GET ERROR]', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch File questions' }), { status: 500 });
  }
}