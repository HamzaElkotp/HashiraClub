'use client';
import { useEffect, useState } from 'react';
import McqEditor from './mcq/McqEditor';

export default function ProblemList({ contestId, type }: { contestId: string, type:string }) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null);


  const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/contests/${contestId}/${type=='mcq' ? "fetchMCQ" : type=='formQuestion' ? "fetchFormQuestion" : "fetchFileQuestion"}/`);
        if (!res.ok) throw new Error('Failed to fetch questions');
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        alert('Unable to load questions.');
      }
  };

  const deleteQuestion = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this question?');
    if (!confirmed) return;

    const res = await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } else {
      alert('Delete failed');
    }
  };

  useEffect(() => {
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
                        <p className="is-size-7 has-text-grey">Type: {type}</p>
                        <div className="columns is-2">
                            <div className='column'>
                              <button className="button is-danger is-small is-fullwidth" onClick={() => deleteQuestion(q._id)}>Delete</button>
                            </div>
                            <div className='column'>
                              <button className="button is-warning is-small is-fullwidth" onClick={() => setEditingQuestion(q)}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}

      {editingQuestion && (
        <McqEditor
          contestId={contestId}
          initialData={editingQuestion}
          onClose={() => {
            setEditingQuestion(null);
            fetchQuestions(); // refresh after edit
          }}
        />
      )}
    </div>
  );
}
