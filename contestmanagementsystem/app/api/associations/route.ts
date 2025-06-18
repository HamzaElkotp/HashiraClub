import { connectToDatabase } from '@/lib/mongoose';
import { Association }  from '@/models/Association';
import { NextRequest } from 'next/server';


export async function GET() {
  await connectToDatabase();
  const association = await Association.find();
  return new Response(JSON.stringify(association), { status: 200 });
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const association = await Association.create(body);
  return new Response(JSON.stringify(association), { status: 201 });
}
