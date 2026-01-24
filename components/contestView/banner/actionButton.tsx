import { Button } from '@/components/ui/button';
import { FaRankingStar } from "react-icons/fa6";
import { GiPointySword, GiSwordSlice } from "react-icons/gi";
import { HiPencilAlt } from "react-icons/hi";
import { FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';


export default function ActionButton({status, userIsRegistered}:{status:string, userIsRegistered:boolean}){
    return (
        <Link className="bg-[#00d590] text-black hover:bg-[#00c185] px-4 py-3 text-lg h-12" href={"https://discord.gg/ev8f2N58?event=1464598678789423132"}>
            <span className='flex items-center space-x-2'>
                {status === 'registering' && (
                    <>
                    <span>Join The Event</span>
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
                    <GiPointySword /> <span>Watch The Podcast</span>
                    </>
                )}
                {status === 'finished' && (
                    <>
                    <FaRankingStar /> <span>See Resutls</span>
                    </>
                )}
                <FaLongArrowAltRight />
            </span>
        </Link>
    )
}