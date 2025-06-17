import { NextRequest } from 'next/server';
import {connectToDatabase} from '@/lib/mongoose';
import MCQQuestion from '@/models/MCQQuestion';

export async function DELETE(request: NextRequest, context: any ) {
  await connectToDatabase();
  const { id } = context.params;
  await MCQQuestion.findByIdAndDelete(id);
  return new Response(null, { status: 204 });
}

export async function PUT(request: NextRequest, context: any ) {
  await connectToDatabase();
  const { id } = context.params;
  const body = await request.json();
  const updated = await MCQQuestion.findByIdAndUpdate(id, body, { new: true });
  return new Response(JSON.stringify(updated), { status: 200 });
}