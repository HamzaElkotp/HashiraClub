// import AppShell from '@/app/(Client)/app-shell';
// import PageBuilder from '@/components/contestView/pagebuilder';
// import { connectToDatabase } from '@/lib/mongoose';
// import Contest from '@/models/Contest';
import { Metadata } from 'next';
import X from './x';
import AppShell from '../../app-shell';

// async function getContestById(id: string) {
//   await connectToDatabase();
//   return await Contest.findById(id).lean();
// }

export async function generateMetadata({ params }: any): Promise<Metadata> {

  return {
    title: "Graduagtion project and Scientific Reaserch",
    description: "Join us on this podcast as we host Ibrahim Arm for an in-depth conversation about graduation projects done right. We explore how to the right idea and building a strong team to tackling the details that really matter. Plus, we answer your questions and break down scientific research, and share practical tips on how to write powerful research papers that set your project apart.",
    openGraph: {
      title: "Graduagtion project and Scientific Reaserch",
      description: "Join us on this podcast as we host Ibrahim Arm for an in-depth conversation about graduation projects done right. We explore how to the right idea and building a strong team to tackling the details that really matter. Plus, we answer your questions and break down scientific research, and share practical tips on how to write powerful research papers that set your project apart.",
      url: `https://i.ibb.co/j9shpkxC/Pdocast2.png`,
      type: 'website',
      images: [
        {
          url: "https://i.ibb.co/j9shpkxC/Pdocast2.png",
          width: 1200,
          height: 630,
          alt: "Graduagtion project and Scientific Reaserch",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Graduagtion project and Scientific Reaserch",
      description: "Join us on this podcast as we host Ibrahim Arm for an in-depth conversation about graduation projects done right. We explore how to the right idea and building a strong team to tackling the details that really matter. Plus, we answer your questions and break down scientific research, and share practical tips on how to write powerful research papers that set your project apart.",
      images: "https://i.ibb.co/j9shpkxC/Pdocast2.png",
    },
  };
}

export default function ContestPage() {

  return (
    <AppShell>
      {1==1 ? (
        <>
          <X />
        </>
      ) : (
        <div className="p-6 text-center text-muted-foreground">Loading...</div>
      )}
    </AppShell>
  );
}