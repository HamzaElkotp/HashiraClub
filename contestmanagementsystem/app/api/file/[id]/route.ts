import { NextRequest } from 'next/server';
import {connectToDatabase} from '@/lib/mongoose';
import FileQuestion from '@/models/FileQuestion';

export async function DELETE(request: NextRequest, context: any ) {
  await connectToDatabase();
  const { id } = await context.params;
  await FileQuestion.findByIdAndDelete(id);
  return new Response(null, { status: 204 });
}

export async function PUT(request: NextRequest, context: any ) {
  await connectToDatabase();
  const { id } = await context.params;
  const body = await request.json();
  const updated = await FileQuestion.findByIdAndUpdate(id, body, { new: true });
  return new Response(JSON.stringify(updated), { status: 200 });
}