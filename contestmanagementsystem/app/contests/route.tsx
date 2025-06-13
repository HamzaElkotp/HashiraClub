// app/api/contests/route.ts
import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Contest from '@/models/Contest';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const contest = await Contest.create(body);

    return new Response(JSON.stringify(contest), {
      status: 201,
    });
  } catch (err) {
    console.error('[CONTEST CREATE ERROR]', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
