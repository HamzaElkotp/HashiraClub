import { connectToDatabase } from '@/lib/mongoose';
import { ContestCategory } from '@/models/ContestCategory';

export async function DELETE(_: Request, { params }: any) {
  await connectToDatabase();
  await ContestCategory.findByIdAndDelete(params.id);
  return new Response(null, { status: 204 });
}

export async function PUT(req: Request, { params }: any ) {
  await connectToDatabase();
  const data = await req.json();
  const updated = await ContestCategory.findByIdAndUpdate( params.id, data, { new: true });
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function GET(req: Request, { params }: any ) {
  await connectToDatabase();
    const category = await ContestCategory.findById(params.id);
    return new Response(JSON.stringify(category), { status: 200 });
}
