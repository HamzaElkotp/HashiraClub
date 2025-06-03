import { connectToDatabase } from '@/lib/mongoose';
import { Contest } from '@/models/Contest';

export async function POST(req: Request) {
  try {
    // await connectToDatabase();
    const body = await req.json();
    // const contest = await Contest.create(body);
    const contest = 1;
    return Response.json(contest, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Failed to save contest' }, { status: 500 });
  }
}
