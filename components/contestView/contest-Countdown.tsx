'use client';

import { useEffect, useState } from 'react';
import { differenceInSeconds, formatDistanceStrict, isBefore } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

type Status = 'registering' | 'waiting' | 'running' | 'finished' | '';

export default function ContestCountdown({ contest }: { contest: any }) {
  const [status, setStatus] = useState<Status>('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [loadedTime, setLoadedTime] = useState(false);

  const getDurationHours = () => {
    const unitMap: Record<string, number> = {
      halfHours: 0.5,
      days: 24,
      weeks: 168,
    };
    return unitMap[contest?.period?.unit] * contest?.period?.value;
  };

  const registrationEnd = new Date(contest?.registrationEndDate);
  const start = new Date(contest?.startDateTime);
  const end = new Date(start.getTime() + getDurationHours() * 3600 * 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (isBefore(now, registrationEnd)) {
        setStatus('registering');
        setTimeLeft(differenceInSeconds(registrationEnd, now));
      } else if (isBefore(now, start)) {
        setStatus('waiting');
        setTimeLeft(differenceInSeconds(start, now));
      } else if (isBefore(now, end)) {
        setStatus('running');
        setTimeLeft(differenceInSeconds(end, now));
      } else {
        setStatus('finished');
        setTimeLeft(0);
      }
      setLoadedTime(true);
    }, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { days, hours, minutes, secs };
  };

  const { days, hours, minutes, secs } = formatTime(timeLeft);

  return (
        <div className="relative w-full text-center flex flex-col items-center justify-center gap-6 mt-20 border border-white/20 rounded-xl p-8 overflow-hidden">
        <div
            className="absolute inset-0 opacity-40"
            style={{
            backgroundImage: "url('/img.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            }}
        />

        {/* Content Layer */}
        <div className="relative z-10">
            <div className={'font-bold mb-6 text-gray-800 dark:text-gray-300'}>
                {status === 'registering' && (
                    <p className='text-4xl'>Registration is Open ⚔️</p>
                )}
                {status === 'waiting' && (
                    <p className='flex flex-col gap-2'>
                        <span className='text-4xl'>Get Ready! ⚔️</span>
                        <span className='text-lg'>Contest will Start Soon 🔥</span>
                    </p>
                )}
                {status === 'running' && (
                    <p>💥 Contest is Live!</p>
                )}
                {status === 'finished' && (
                    <p>Contest has Finished 🏆</p>
                )}
                {status === '' && <Skeleton className="w-120 h-15 mx-auto" />}
            </div>

            <div className="grid grid-cols-2 md:flex justify-center gap-10 md:gap-14">
                {[
                    { label: 'Days', value: String(days).padStart(2, '0') },
                    { label: 'Hours', value: String(hours).padStart(2, '0') },
                    { label: 'Minutes', value: String(minutes).padStart(2, '0') },
                    { label: 'Seconds', value: String(secs).padStart(2, '0') },
                ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center">
                        <div className="text-gray-700 dark:text-gray-400 font-medium uppercase text-xs tracking-wider mb-2">
                            {item.label}
                        </div>
                        <div className="text-gray-800 dark:text-gray-300 text-5xl md:text-7xl font-bold font-mono">
                            {loadedTime ? item.value : <Skeleton className="w-20 h-18 mx-auto" />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}