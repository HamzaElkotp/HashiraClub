import { connectToDatabase } from '@/lib/mongoose';
import { Sponsor } from '@/models/Sponsor';

export async function GET() {
  await connectToDatabase();
  const sponsors = await Sponsor.find().sort({ createdAt: -1 });
  return Response.json(sponsors);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const sponsor = await Sponsor.create(body);
  return Response.json(sponsor, { status: 201 });
}
