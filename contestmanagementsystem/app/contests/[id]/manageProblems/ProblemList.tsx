'use client';
import { useEffect, useState } from 'react';
import McqEditor from './mcq/McqEditor';
import FileConfigEditor from './file/FileConfigEditor';

export default function ProblemList({ contestId, questionType }: { contestId: string, questionType:string }) {
  type Question = {
    _id: string;
    title: string;
    details: string;
    type?: string; // optional if mixed
  };
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null);


  const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/contests/${contestId}/${questionType==="mcq" ? "fetchMCQ" : questionType==="formQuestion" ? "fetchFormQuestion" : "fetchFileQuestion"}`);
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

    const res = await fetch(`/api/${questionType}/${id}`, { method: 'DELETE' });
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
      ) : questions && (
        <div className="columns is-multiline is-3">
            {questions.map((q, index) => (
                <div className="column is-one-quarter" key={q._id}>
                    <div className="box">
                        <strong>{index + 1}. {q.title}</strong>
                        <p className="is-size-7 has-text-grey">Type: {questionType}</p>
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

      {editingQuestion && questionType=='mcq' && (
        <McqEditor
          contestId={contestId}
          initialData={editingQuestion}
          onClose={() => {
            setEditingQuestion(null);
            fetchQuestions(); // refresh after edit
          }}
        />
      )}
      {editingQuestion && questionType=='file' && (
        <FileConfigEditor
          contestId={contestId}
          initialData={editingQuestion}
          onClose={() => {
            setEditingQuestion(null);
            fetchQuestions();
          }}
        />
      )}
    </div>
  );
}
