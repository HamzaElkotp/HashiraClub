import { connectToDatabase } from '@/lib/mongoose';
import Contest from '@/models/Contest';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase(); // ✅ must be awaited before anything else
    const body = await req.json();
    const created = await Contest.create(body);

    return new Response(JSON.stringify(created), { status: 201 });
  } catch (err) {
    console.error('[CONTEST CREATE ERROR]', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
