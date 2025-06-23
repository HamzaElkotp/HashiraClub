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

export async function GET() {
  await connectToDatabase();
  const contests = await Contest.find().sort({ createdAt: -1 });
  return new Response(JSON.stringify(contests), { status: 200 });
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const { id } = await req.json();

  await Contest.findByIdAndDelete(id);
  return new Response(JSON.stringify({ success: true }));
}
