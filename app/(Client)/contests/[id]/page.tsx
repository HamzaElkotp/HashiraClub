import AppShell from '@/app/(Client)/app-shell';
import PageBuilder from '@/components/contestView/pagebuilder';
import { connectToDatabase } from '@/lib/mongoose';
import Contest from '@/models/Contest';
import { Metadata } from 'next';

async function getContestById(id: string) {
  await connectToDatabase();
  return await Contest.findById(id).lean();
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const contest:any = await getContestById(params.id);

  return {
    title: contest?.name || 'CompeteX Contest',
    description: contest?.description || 'Join this programming contest on CompeteX!',
    openGraph: {
      title: contest?.name,
      description: contest?.description,
      url: `https://hashiraclub.com/contests/${contest.id}`,
      type: 'website',
      images: [
        {
          url: contest?.banner || 'https://yourdomain.com/default-banner.png',
          width: 1200,
          height: 630,
          alt: contest?.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: contest?.name,
      description: contest?.description,
      images: [contest?.banner],
    },
  };
}

export default function ContestPage() {

  return (
    <AppShell>
      {1==1 ? (
        <>
          <PageBuilder />
        </>
      ) : (
        <div className="p-6 text-center text-muted-foreground">Loading...</div>
      )}
    </AppShell>
  );
}