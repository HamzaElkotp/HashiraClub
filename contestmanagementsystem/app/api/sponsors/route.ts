import { connectToDatabase } from '@/lib/mongoose';
import Sponsor from '@/models/Sponsor';
import { NextRequest } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const sponsors = await Sponsor.find();
  return new Response(JSON.stringify(sponsors), { status: 200 });
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const sponsor = await Sponsor.create(body);
  return new Response(JSON.stringify(sponsor), { status: 201 });
}
