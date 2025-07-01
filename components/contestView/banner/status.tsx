import { Clock, Flame, DoorClosedLocked, Trophy } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Status({status, timeLeft, registrationEndDate, startDate, endDate}:{status:string, timeLeft:string, registrationEndDate:string, startDate:string, endDate:Date}){
    return (
        <div>
          {status === 'registering' && (
            <p className="text-[#ff0056] font-medium">
              Registration is open until {new Date(registrationEndDate).toLocaleString()}
              <span className="flex items-center space-x-2 text-s text-gray-500">
                <Clock className="w-4 h-4" /> <span>{timeLeft} left for registration to close</span>
              </span>
            </p>
          )}
          {status === 'waiting' && (
            <p className="text-yellow-600 font-medium">
              Registration is closed. Contest starts at {new Date(startDate).toLocaleString()}
              <span className="flex items-center space-x-2 text-s text-gray-500">
                <DoorClosedLocked className="w-4 h-4" /> <span>{timeLeft} left for contest to start</span>
              </span>
            </p>
          )}
          {status === 'running' && (
            <p className="text-[#00d590] font-medium">
              Contest is running. Ends at {endDate.toLocaleString()}
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
    )
}