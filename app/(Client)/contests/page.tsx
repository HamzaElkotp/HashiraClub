import AppShell from '@/app/(Client)/app-shell';
// import { connectToDatabase } from '@/lib/mongoose';
// import Contest from '@/models/Contest';
// import { Metadata } from 'next';

export default function ContestsPage() {
    return (
        <AppShell>
            {1==1 ? (
                <>
                    <div className="relative w-full text-center flex flex-col items-center justify-center gap-6 mt-10 border dark:border-white/20 border-black/50 rounded-xl p-8 overflow-hidden" id='contest-timer'>
                        <div
                            className="absolute inset-0 dark:opacity-35 opacity-90"
                            style={{
                            backgroundImage: `URL(img.png)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            }}
                        />

                        <div className="relative z-10">
                            <div className={'font-bold mb-6 text-gray-200 dark:text-gray-200'}>
                                <p className='text-4xl'>Hashira Contests</p>
                                {/* {status === '' && <Skeleton className="w-1/1 h-15 mx-auto" />} */}
                            </div>
                        </div>
                    
                    </div>
                </>
            ) : (
                <div className="p-6 text-center text-muted-foreground">Loading...</div>
            )}
        </AppShell>
    );
}