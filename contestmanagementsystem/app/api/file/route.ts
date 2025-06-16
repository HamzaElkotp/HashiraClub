import { NextRequest } from 'next/server';
import {connectToDatabase} from '@/lib/mongoose';
import FileQuestion from '@/models/FileQuestion';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const question = await FileQuestion.create(body);
    return new Response(JSON.stringify(question), { status: 201 });
  } catch (err) {
    console.error('[FILE CREATE ERROR]', err);
    return new Response(JSON.stringify({ error: 'Failed to create file question' }), { status: 500 });
  }
}
