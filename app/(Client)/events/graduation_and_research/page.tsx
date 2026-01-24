// import AppShell from '@/app/(Client)/app-shell';
// import PageBuilder from '@/components/contestView/pagebuilder';
// import { connectToDatabase } from '@/lib/mongoose';
// import Contest from '@/models/Contest';
// import { Metadata } from 'next';

// async function getContestById(id: string) {
//   await connectToDatabase();
//   return await Contest.findById(id).lean();
// }

// export async function generateMetadata({ params }: any): Promise<Metadata> {
//   const contest:any = await getContestById(params.id);

//   return {
//     title: contest?.name,
//     description: contest?.description,
//     openGraph: {
//       title: contest?.name,
//       description: contest?.description,
//       url: `https://hashiraclub.com/contests/${contest.id}`,
//       type: 'website',
//       images: [
//         {
//           url: contest?.banner,
//           width: 1200,
//           height: 630,
//           alt: contest?.name,
//         },
//       ],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: contest?.name,
//       description: contest?.description,
//       images: [contest?.banner],
//     },
//   };
// }

// export default function ContestPage() {

//   return (
//     <AppShell>
//       {1==1 ? (
//         <>
//           <PageBuilder />
//         </>
//       ) : (
//         <div className="p-6 text-center text-muted-foreground">Loading...</div>
//       )}
//     </AppShell>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import ContestBanner from '@/components/contestView/contest-banner';
import Scroll from '@/components/contestView/banner/scroll';
import ContestCountdown from '@/components/contestView/contest-Countdown';
import ContestContent from '@/components/contestView/contest-content';


import { ContestForm } from '@/types/contest';
import AppShell from '../../app-shell';


// const params = useParams<{ id: string }>();


const data:ContestForm = {
    name: "Graduagtion project and Scientific Reaserch",
    about: "Join us on this podcast as we host Ibrahim Arm for an in-depth conversation about graduation projects done right. We explore how to the right idea and building a strong team to tackling the details that really matter. Plus, we answer your questions and break down scientific research, and share practical tips on how to write powerful research papers that set your project apart.",
    description: "Join us on this podcast as we host Ibrahim Arm for an in-depth conversation about graduation projects done right. We explore how to the right idea and building a strong team to tackling the details that really matter. Plus, we answer your questions and break down scientific research, and share practical tips on how to write powerful research papers that set your project apart.",
    content: `Join Us

With Ibrahim Amr

Graduation Project Podcast: From Idea to Impact

Are you starting your graduation project and feeling lost about where to begin?
Do you want to build a project that is not only accepted, but truly stands out?

In this podcast episode, Ibrahim Amr shares a complete, practical roadmap for building a strong graduation project from the ground up.

We will cover:

- Building the Right Team
    How to choose the right team members, define responsibilities, and distribute roles effectively to ensure smooth collaboration and real productivity.

- Choosing a Strong Graduation Project Idea
    How to evaluate ideas, avoid common mistakes, and select a project that is both realistic and impressive.

- Selecting the Right Programming Language and Technology
    How to choose the most suitable language and tools based on your skills, project requirements, and long-term goals—not just trends.

- Understanding and Choosing the Right Architecture
    What software architecture really means, why it matters, and how the right choice can elevate your project from average to professional.

- Introduction to Scientific Research
    What scientific research is, what it focuses on, and why it has become a core component of modern graduation projects.

- A Deep Dive into My Scientific Research
    Why I chose this research topic, how the research was conducted step by step, how the architecture works, and how to apply it in real-world scenarios.

- How Scientific Research Prepares You for a Master’s Degree
    How graduation research can support your academic future, when pursuing a master’s degree is beneficial, and an honest discussion of its advantages and disadvantages.

This episode is not theoretical.
It is based on real experience, real challenges, and real lessons learned.

If you are a student in Computer Science, Information Technology, Software Engineering, or any technical field, this podcast is designed for you.

Join us and take your graduation project to the next level.`,
    banner: "https://i.ibb.co/j9shpkxC/Pdocast2.png", //
    image: "https://hashiraclub.com/img.png", // 
    publishDate: "2026-01-24T18:00:00.000Z",
    registrationEndDate: "2026-01-26T18:00:00.000Z",
    startDateTime: "2026-01-26T18:00:00.000Z",
    period: {
        value: 6,
        unit: "halfHours",
    },
    maxContestants: 10000,
    isOnline: true,
    regions: ["MENA", "Africa"],
    category: "",
    organizingPlace: "outside",
    externalLink: "https://discord.gg/ev8f2N58?event=1464598678789423132", // 
    externalMessage: "", 
    minTeamSize: 1,
    maxTeamSize: 1,
    teamCondition: "",
    teamCoach: "",
    hasPenalty: false,
    rateMethod: "",
    resultVisibility: "",
    resultPublishing: "",
    standingStyle: "",
    questionType: "",
    registers: 76,
}

export default function PageBuilder() {
    const [contestData, setContest] = useState<ContestForm>(data);


  return (
    <AppShell>
        <ContestBanner contest={contestData || {}} />
        <Scroll id={"contest-timer"}/>
        <ContestCountdown contest={contestData || {}} />
        <ContestContent contest={contestData || {}} />
    </AppShell>
  );
}