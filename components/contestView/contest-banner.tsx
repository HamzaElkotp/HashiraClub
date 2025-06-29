'use client';
import AddToCalendar from '@/components/contestView/banner/addToCalendar';
import ShareContest from '@/components/contestView/banner/shareContest';
import ActionButton from '@/components/contestView/banner/actionButton';
import Status from '@/components/contestView/banner/status';

import { Users2 } from 'lucide-react';
import { FaDiscord, FaYoutube } from 'react-icons/fa';
import { TbBrandLinktree } from "react-icons/tb";
import { useEffect, useState } from 'react';

import { formatDistanceStrict, isBefore, isAfter } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';


export default function ContestBanner({ contest }: { contest: any}) {
  const [timeLeft, setTimeLeft] = useState('');
  const [status, setStatus] = useState<'registering' | 'waiting' | 'running' | 'finished' | ''>('');
  const [category, setCategory] = useState<any>();
    
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch(`/api/contests/categories/${contest.category}`);
      if (res.ok) {
        const data = await res.json();
        setCategory(data);
        console.log(data);
      }
    };
    fetchCategory();
  }, [contest?.category]);



  useEffect(() => {
    type PeriodUnit = 'halfHours' | 'days' | 'weeks';
    const units: Record<PeriodUnit, number> = {
      halfHours: 0.5,
      days: 24,
      weeks: 168,
    };
    const durationInHours = units[contest?.period?.unit as PeriodUnit] * contest?.period?.value;

    const now = new Date();
    const regEnd = new Date(contest?.registrationEndDate);
    const start = new Date(contest?.startDateTime);
    const end = new Date(start.getTime() + durationInHours * 3600 * 1000);

    if (isBefore(now, regEnd)) {
      setStatus('registering');
      setTimeLeft(formatDistanceStrict(now, regEnd));
    } else if (isBefore(now, start)) {
      setStatus('waiting');
      setTimeLeft(formatDistanceStrict(now, start));
    } else if (isBefore(now, end)) {
      setStatus('running');
      setTimeLeft(formatDistanceStrict(now, end));
    } else if(isBefore(end, now)){
      setStatus('finished');
      setTimeLeft('');
    } else{
        setStatus('');
        setTimeLeft('');
    }
  }, [contest]);

  const userIsRegistered = true;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
      <div className="col-span-6 space-y-3">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 text-sm">
          <Users2 className="w-4 h-4" />
          {contest?.registers>=0 ? <span>{contest.registers} Competitors</span> : <Skeleton className="h-4 w-28" />}
        </div>

        <Status status={status} timeLeft={timeLeft} registrationEndDate={contest.registrationEndDate} startDate={contest.startDate} endDate={contest.endDate}/>

        <h2 className="text-base text-gray-600 dark:text-gray-400 font-medium my-1 underline">
          {category?.name ? <a href=''>{category.name}</a> : <Skeleton className="h-5 w-1/3" />}
        </h2>
        <h1 className="text-gray-800 dark:text-gray-200 text-4xl font-extrabold">
          {contest?.name ? contest.name : <Skeleton className="h-12 w-4/5" />}
        </h1>

        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-base">
          {contest?.description ? contest.description : <Skeleton className="h-60 w-1/1" />}
        </div>

        <div className="flex flex-wrap items-center gap-3 my-6">
          {status === '' && (
              <>
                <Skeleton className="h-13 w-2/5" />
              </>
          )}
          {status !== '' && <ActionButton status={status} userIsRegistered={userIsRegistered}/>}

          <AddToCalendar contest={contest} />

          <ShareContest/>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="https://www.discord.gg/thBtZumR4k" target="_blank" rel="noreferrer">
            <FaDiscord className="w-6 h-6 hover:text-[#7289da]" />
          </a>
          <a href="https://www.youtube.com/@fcihashira" target="_blank" rel="noreferrer">
            <FaYoutube className="w-6 h-6 hover:text-[#ff0033] hover:transition" />
          </a>
          <a href="https://www.linktr.ee/fcihashira" target="_blank" rel="noreferrer">
            <TbBrandLinktree className="w-6 h-6 hover:text-green-300" />
          </a>
        </div>
      </div>

      <div className="col-span-6">
        <div className="rounded-xl overflow-hidden shadow-lg">
          {contest?.banner ? (
            <img
              src={contest.banner}
              width={800}
              height={450}
              className="w-full h-auto object-cover rounded-xl"
            />
          ) : (
            <Skeleton className="w-full h-[300px] rounded-xl" />
          )}
        </div>
      </div>
    </div>
  );
}