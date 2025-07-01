'use client';

import { useEffect, useState } from 'react';
import { differenceInSeconds, formatDistanceStrict, isBefore } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
var he = require('he');

export default function ContestContent({ contest }: { contest: any }) {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const fixedContent = contest?.content?.replace(/\\n/g, "\n") || '';
    const decoded = he.decode(fixedContent);
    setContent(decoded);
    console.log(decoded);
  }, [contest]);

  return (
    <div className="w-full mt-16 border dark:border-white/20 shadow-xl/50 shadow-green-900/20 border-black/50 rounded-xl p-8" style={{ whiteSpace: 'pre-wrap' }}>
      { content && (
        
        <div className="content box" style={{ minHeight: '100px' }}>
          <h1 className='font-bold mb-10 text-gray-800 dark:text-gray-200 text-5xl'>Contest Details</h1>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      )}
      { (!content) && (
        <>
          <Skeleton className="w-90 h-16 mb-10" />
          <Skeleton className="w-1/1 h-100 mx-auto" />
        </>
      )}
      {content.length < 10 && (<></>)}
    </div>
  );
}