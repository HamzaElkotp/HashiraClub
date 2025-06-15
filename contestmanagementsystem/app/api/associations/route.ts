import { connectToDatabase } from '@/lib/mongoose';
import { Association }  from '@/models/Association';

export async function GET() {
  await connectToDatabase();
  const associations = await Association.find().sort({ createdAt: -1 });
  return Response.json(associations);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const association = await Association.create(body);
  return Response.json(association, { status: 201 });
}
