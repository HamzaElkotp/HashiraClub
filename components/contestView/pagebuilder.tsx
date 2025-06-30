'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import ContestBanner from '@/components/contestView/contest-banner';
import Scroll from '@/components/contestView/banner/scroll';
import ContestCountdown from '@/components/contestView/contest-Countdown';


import { ContestForm } from '@/types/contest';

// const params = useParams<{ id: string }>();

export default function PageBuilder() {

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
    <>
        <ContestBanner contest={contestData || {}} />
        <Scroll id={"contest-timer"}/>
        <ContestCountdown contest={contestData || {}} />
    </>
  );
}