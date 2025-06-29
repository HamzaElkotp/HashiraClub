import { Button } from '@/components/ui/button';
import { FaRankingStar } from "react-icons/fa6";
import { GiPointySword, GiSwordSlice } from "react-icons/gi";
import { HiPencilAlt } from "react-icons/hi";
import { FaLongArrowAltRight } from 'react-icons/fa';


export default function ActionButton({status, userIsRegistered}:{status:string, userIsRegistered:boolean}){
    return (
        <Button className="bg-[#00d590] text-black hover:bg-[#00c185] px-4 py-3 text-lg h-12">
            <span className='flex items-center space-x-2'>
                {status === 'registering' && (
                    <>
                    <span>Join The Competition</span>
                    </>
                )}
                {status === 'waiting' && userIsRegistered && (
                    <>
                    <HiPencilAlt /> <span>Complete Registeration</span>
                    </>
                )}
                {status === 'waiting' && !userIsRegistered && (
                    <>
                    <GiPointySword /> <span>View The Arena</span>
                    </>
                )}
                {status === 'running' && userIsRegistered && (
                    <>
                    <GiSwordSlice /> <span>Enter The Arena</span>
                    </>
                )}
                {status === 'running' && !userIsRegistered && (
                    <>
                    <GiPointySword /> <span>Watch The Contest</span>
                    </>
                )}
                {status === 'finished' && (
                    <>
                    <FaRankingStar /> <span>See Resutls</span>
                    </>
                )}
                <FaLongArrowAltRight />
            </span>
        </Button>
    )
}