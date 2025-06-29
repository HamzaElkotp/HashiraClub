import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { IoIosCheckmarkCircle } from "react-icons/io";


export default function ShareContest(){
    return (
        <Button className="px-6 py-5 h-12" size="icon"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Contest Link is Copied!', {
              className: 'my-classname',
              description: 'Contest URL is now in your clipboard. Share it with your firends, or you fear of competing them 😉',
              duration: 3000,
              icon: <IoIosCheckmarkCircle className='text-2xl text-[#00ac76]' />
            });
          }}
        >
            <Copy className="w-4 h-4" />
        </Button>
    )
}