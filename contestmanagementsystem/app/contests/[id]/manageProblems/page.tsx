'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import McqEditor from './mcq/mcqEditor';
import FileConfigEditor from './file/FileConfigEditor';
import FormBuilder from './form/FormBuilder';
import AddQuestionModal from './AddQuestionModal';
import ProblemList from './ProblemList';

export default function ManageProblemsPage() {
  const { id } = useParams(); // ✅ must be inside the component
  const [showModal, setShowModal] = useState(false);
  const [contest, setContest] = useState(null);

  useEffect(() => {
    const fetchContest = async () => {
      const res = await fetch(`/api/contests/${id}`);
      if (res.ok) {
        const data = await res.json();
        setContest(data);
      }
    };
    fetchContest();
  }, [id]);

  return (
    <div className="container my-6">
      <h1 className="title is-3">Manage Problems</h1>
      <h3 className="subtitle mt-2 is-4 has-text-weight-bold">{contest?.name}</h3>


      <div className='grid'>
        <h2 className="title is-5">Added Questions</h2>
        <div className="buttons is-right">
          <button className="button is-primary" onClick={() => setShowModal(true)}>
              Add New Question
          </button>
        </div>
      </div>
      

      <ProblemList contestId={id} />

      {showModal && (
        <AddQuestionModal
          contestId={id}
          questionType={contest?.questionType}
          onClose={() => setShowModal(false)}
        />
      )}
      
      {showModal && contest?.questionType === 'mcq' && (
        <McqEditor onClose={() => setShowModal(false)} contestId={id} />
      )}
      {showModal && contest?.questionType === 'file' && (
        <FileConfigEditor onClose={() => setShowModal(false)} />
      )}
      {/* {showModal && contest?.questionType === 'form' && (
        <FormBuilder onClose={() => setShowModal(false)} />
      )} */}
    </div>
  );
}
