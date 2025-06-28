import { Button } from '@/components/ui/button';

import { Users2, CalendarIcon, Clock, Flame, DoorClosedLocked, Trophy } from 'lucide-react';
import { FaDiscord, FaYoutube } from 'react-icons/fa';
import { TbBrandLinktree } from "react-icons/tb";
import { useEffect, useState } from 'react';
import { formatDistanceStrict, isBefore, isAfter } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

export default function ContestBanner({ contest }: { contest: any}) {
  const [timeLeft, setTimeLeft] = useState('');
  const [status, setStatus] = useState<'registering' | 'waiting' | 'running' | 'finished' | ''>('');

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
      <div className="col-span-6 space-y-3">
        <div className="flex items-center space-x-2 text-muted-foreground text-sm">
          <Users2 className="w-4 h-4" />
          {contest?.registers ? <span>{contest.registers.length} Competitors</span> : <Skeleton className="h-4 w-28" />}
        </div>

        <div>
          {status === 'registering' && (
            <p className="text-red-500 font-medium">
              Registration is open until {new Date(contest?.registrationEndDate).toLocaleString()}
              <span className="flex items-center space-x-2 text-s text-gray-500">
                <Clock className="w-4 h-4" /> <span>{timeLeft} left for registration to close</span>
              </span>
            </p>
          )}
          {status === 'waiting' && (
            <p className="text-yellow-600 font-medium">
              Registration is closed. Contest starts at {new Date(contest?.startDate).toLocaleString()}
              <span className="flex items-center space-x-2 text-s text-gray-500">
                <DoorClosedLocked className="w-4 h-4" /> <span>{timeLeft} left for contest to start</span>
              </span>
            </p>
          )}
          {status === 'running' && (
            <p className="text-green-600 font-medium">
              Contest is running. Ends at {new Date(contest?.endDate).toLocaleString()}
              <span className="flex items-center space-x-2 text-s text-gray-500">
                <Flame className="w-4 h-4" /> <span>{timeLeft} left for contest to finish</span>
              </span>
            </p>
          )}
          {status === 'finished' && (
            <p className="flex items-center space-x-2 text-gray-600 font-medium">
              <Trophy className="w-4 h-4" /> <span>This contest has finished.</span>
            </p>
          )}
          {status === '' && <Skeleton className="h-10 w-2/3" />}
        </div>

        <h1 className="text-4xl font-extrabold text-foreground">
          {contest?.name ? contest.name : <Skeleton className="h-8 w-2/3" />}
        </h1>

        <div className="text-muted-foreground whitespace-pre-line text-base">
          {contest?.description ? contest.description : <Skeleton className="h-4 w-2/3" />}
        </div>

        <div className="flex flex-wrap items-center gap-4 my-6">
          <Button className="bg-[#00d590] text-black hover:bg-[#00c485] px-8 py-3 text-base h-12">Action Button</Button>
          <Button variant="outline" size="icon" className='px-6 h-12'>
            <CalendarIcon className="text-4xl" />
          </Button>
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