import { PiMouseScrollThin } from "react-icons/pi";
export default function Scroll({id}:{id:string}){
    return (
        <div className="flex justify-center mt-2">
            <button
              onClick={() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Scroll to timer"
              className="p-1"
            >
              <PiMouseScrollThin className='text-3xl'/>
            </button>
        </div>
    )
}