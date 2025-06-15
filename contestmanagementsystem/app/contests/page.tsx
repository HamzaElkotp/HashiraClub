'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const formatDiff = (date: Date) => {
    const now = new Date();
    const ms = date.getTime() - now.getTime();
    const hours = Math.max(0, Math.floor(ms / (1000 * 60 * 60)));
    const days = Math.floor(hours / 24);
    return `${days} days and ${hours % 24} hours`;
};

function returnContestStatus(form:any){
  const {
    end,
    publishDate,
    registrationEnd,
    start
  } = getContestStatus(form);
  const now = new Date();
  if (now < publishDate) {
    return `Contest will be published at ${publishDate.toLocaleString()} after ${formatDiff(publishDate)}`;
  } else if (now < registrationEnd) {
    return `Contest Registration is Open, Will close at ${registrationEnd.toLocaleString()} after ${formatDiff(registrationEnd)}`;
  } else if (now < start) {
    return `Contest Registration is Closed, Contest will start at ${start.toLocaleString()} after ${formatDiff(start)}`;
  } else if (now < end) {
    return `Contest is running, will finish at ${end.toLocaleString()} after ${formatDiff(end)}`;
  } else {
    return `Contest ended at ${end.toLocaleString()}`;
  }
}

function getContestStatus(form: any) {
  const publishDate = new Date(form.publishDate);
  const registrationEnd = new Date(form.registrationEndDate);
  const start = new Date(form.startDateTime);

  const durationHours = 
    form.period.unit === 'halfHours' ? form.period.value * 0.5 :
    form.period.unit === 'days' ? form.period.value * 24 :
    form.period.unit === 'weeks' ? form.period.value * 168 : 0;

  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
  return {
    end,
    publishDate,
    registrationEnd,
    start
  };
}


export default function ContestDashboard() {
  const [contests, setContests] = useState([]);

  const fetchContests = async () => {
    const res = await fetch('/api/contests');
    const data = await res.json();
    setContests(data);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this contest?");
    if (!confirmed) return;

    const res = await fetch('/api/contests', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) fetchContests();
    else alert("Failed to delete contest");
  };

  useEffect(() => {
    fetchContests();
  }, []);

  return (
    <div className="container my-6">
      <h1 className="title is-2 has-text-centered">Contest Management SubSystem</h1>
      <div className="buttons is-right">
        <Link href="/contests/create" className="button is-primary is-meduim">
            Create Contest
        </Link>
      </div>
      <div className="columns is-multiline">
        {contests.map((contest: any) => (
          <div key={contest._id} className="column is-one-third">
            <div className="box has-text-centered">
              <img src={contest.banner} alt="Banner" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <h2 className="title is-5 mt-3">{contest.name}</h2>
              <p className="has-text-centered has-text-grey is-size-6 mb-5">{returnContestStatus(contest)}</p>
              <div className="mt-4 mb-2 columns is-2 is-multiline">
                <div className='column is-one-third'>
                  <button className="button is-danger is-meduim is-fullwidth" onClick={() => handleDelete(contest._id)}>Delete</button>
                </div>
                <Link href={`/contests/${contest._id}/edit`} className='column is-one-third'>
                  <button className="button is-warning is-meduim is-fullwidth">Edit</button>
                </Link>
                <Link href={``} className='column is-one-third'>
                    <button className="button is-info is-meduim is-fullwidth" disabled>View</button>
                </Link>
              </div>
              <div className="buttons grid">
                <Link href={`/contests/${contest._id}/add-questions`}>
                  <button className="button is-primary is-meduim is-fullwidth">Add Questions</button>
                </Link>
                <Link href={`/contests/${contest._id}/control`}>
                    <button className="button is-success is-meduim is-fullwidth">Contest Control</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
