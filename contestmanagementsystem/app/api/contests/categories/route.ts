import { connectToDatabase } from '@/lib/mongoose';
import { ContestCategory } from '@/models/ContestCategory';
import { NextRequest } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const contestCategories = await ContestCategory.find();
  return new Response(JSON.stringify(contestCategories), { status: 200 });
}

export async function POST(req: NextRequest) {
  console.log(1);
  await connectToDatabase();
  const body = await req.json();
  const contestCategory = await ContestCategory.create(body);
  return new Response(JSON.stringify(contestCategory), { status: 201 });
}
