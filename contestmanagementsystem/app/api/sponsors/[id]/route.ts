import { connectToDatabase } from '@/lib/mongoose';
import Sponsor from '@/models/Sponsor';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  await Sponsor.findByIdAndDelete(params.id);
  return new Response(null, { status: 204 });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const data = await req.json();
  const updated = await Sponsor.findByIdAndUpdate( params.id, data, { new: true });
  return new Response(JSON.stringify(updated), { status: 200 });
}
