import { connectToDatabase } from '@/lib/mongoose';
import Contest from '@/models/Contest';
import { NextRequest } from 'next/server';

export async function GET(_: any, { params }: any) {
  await connectToDatabase();
  const contest = await Contest.findById(params.id);
  return new Response(JSON.stringify(contest), { status: 200 });
}

export async function PUT(req: NextRequest, { params }: any) {
  await connectToDatabase();
  const data = await req.json();

  const updated = await Contest.findByIdAndUpdate(params.id, data, {
    new: true,
  });

  return new Response(JSON.stringify(updated), { status: 200 });
}
