import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { generateGoogleCalendarLink } from '@/components/contestView/banner/addToGoogleCalendar';

export default function AddToCalendar({ contest }: { contest: any}){
    return (
        <Button variant="outline" size="icon" className='px-6 py-5 h-12'onClick={() => {
            if (!contest) return;
            const url = generateGoogleCalendarLink({
              name: contest.name,
              description: `💥Join us⚔️!\n🔗 Podcast link: ${window.location.href}\n📺 Youtube channel: https://www.youtube.com/@fcihashira\n☎️ Discord: https://www.discord.gg/thBtZumR4k`,
              startDateTime: contest.startDateTime,
              period: contest.period,
              isOnline: contest.isOnline
            });
            window.open(url, '_blank');
          }}>
            <CalendarIcon className="text-lg" />
        </Button>
    )
}