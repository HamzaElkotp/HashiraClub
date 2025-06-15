'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
              <div className="buttons is-centered mt-4">
                <button className="button is-danger is-small" onClick={() => handleDelete(contest._id)}>Delete</button>
                <Link href={`/contests/${contest._id}/edit`}>
                  <button className="button is-warning is-small">Edit</button>
                </Link>
                <button className="button is-info is-small" disabled>View</button>
                <Link href={`/contests/${contest._id}/add-questions`}>
                  <button className="button is-primary is-small">Add Questions</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
