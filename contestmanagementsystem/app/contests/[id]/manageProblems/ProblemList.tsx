'use client';
import { useEffect, useState } from 'react';

export default function ProblemList({ contestId }: { contestId: string }) {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/contests/${contestId}/fetchMCQ/`);
        if (!res.ok) throw new Error('Failed to fetch questions');
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        alert('Unable to load questions.');
      }
    };

    fetchQuestions();
  }, [contestId]);

  return (
    <div className="my-4">
      {questions.length === 0 ? (
        <p>No questions added yet.</p>
      ) : (
        <div className="columns is-multiline is-3">
            {questions.map((q, index) => (
                <div className="column is-one-quarter" key={index}>
                    <div className="box">
                        <strong>{index + 1}. {q.title}</strong>
                        <p className="is-size-7 has-text-grey">Type: MCQ</p>
                        {/* Future: Edit / Delete buttons */}
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}
