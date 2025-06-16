import { NextRequest } from 'next/server';
import {connectToDatabase} from '@/lib/mongoose';
import FileQuestion from '@/models/FileQuestion';

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  await FileQuestion.findByIdAndDelete(params.id);
  return new Response(null, { status: 204 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const body = await req.json();
  const updated = await FileQuestion.findByIdAndUpdate(params.id, body, { new: true });
  return new Response(JSON.stringify(updated), { status: 200 });
}