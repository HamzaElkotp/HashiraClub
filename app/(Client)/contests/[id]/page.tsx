'use client';
import AppShell from '@/app/(Client)/app-shell';
import ContestBanner from '@/components/contestView/contest-banner';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {ContestForm} from '@/types/contest'
import ContestCountdown from '@/components/contestView/contest-Countdown';
import Scroll from '@/components/contestView/banner/scroll';

export default function ContestPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [contestData, setContest] = useState<ContestForm>();
  
  useEffect(() => {
    const fetchContest = async () => {
      const res = await fetch(`/api/contests/${id}`);
      if (res.ok) {
        const data = await res.json();
        setContest(data);
        console.log(data);
      }
    };
    fetchContest();
  }, [id]);

  return (
    <AppShell>
      {1==1 ? (
        <>
          <ContestBanner contest={contestData || {}} />
          <Scroll id={"contest-timer"}/>
          <ContestCountdown contest={contestData || {}} />
        </>
      ) : (
        <div className="p-6 text-center text-muted-foreground">Loading...</div>
      )}
    </AppShell>
  );
}