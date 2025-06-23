import { connectToDatabase } from '@/lib/mongoose';
import { Association }  from '@/models/Association';

export async function DELETE(_: Request, { params }: any) {
  await connectToDatabase();
  await Association.findByIdAndDelete(params.id);
  return new Response(null, { status: 204 });
}

export async function PUT(req: Request, { params }: any) {
  await connectToDatabase();
  const data = await req.json();
  const updated = await Association.findByIdAndUpdate( params.id, data, { new: true });
  return new Response(JSON.stringify(updated), { status: 200 });
}
