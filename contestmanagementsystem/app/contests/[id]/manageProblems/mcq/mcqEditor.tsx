'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function McqEditor({ contestId, onClose }: { contestId: string, onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [hint, setHint] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const validateAndSubmit = async () => {
    const errs = [];

    if (!title.trim()) errs.push('Title is required.');
    if (!details.trim()) errs.push('Details are required.');
    if (options.some((opt) => !opt.trim())) errs.push('All options must be filled.');
    if (correctAnswerIndex === null) errs.push('You must select the correct answer.');

    if (errs.length > 0) {
      alert(errs.join('\n'));
      return;
    }

    const payload = {
      contestId: contestId, // <-- you can pass this via props from ManageProblemsPage
      title,
      details,
      hint,
      options: options.map((o) => ({ label: o })),
      correctAnswerIndex,
    };

    const res = await fetch('/api/mcq', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      alert('MCQ question saved to DB!');
      onClose();
    } else {
      alert('Failed to save question');
    }
  };


  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card" style={{ width: '800px', maxWidth: '95%' }}>
        <header className="modal-card-head">
          <p className="modal-card-title">Add MCQ Question</p>
          <button className="delete" onClick={onClose}></button>
        </header>

        <section className="modal-card-body">
          <div className="field">
            <label className="label">Question Title *</label>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="label">Details (Markdown) *</label>
            <textarea
              className="textarea"
              rows={5}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <p className="help mt-2"><strong>Preview:</strong></p>
            <div className="content box" style={{ minHeight: '100px' }}>
              <ReactMarkdown>{details}</ReactMarkdown>
            </div>
          </div>

          <div className="field">
            <label className="label">Hint (Optional)</label>
            <input
              className="input"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="label">Options *</label>
            {options.map((option, index) => (
              <div className="field has-addons" key={index}>
                <div className="control is-expanded">
                  <input
                    className="input"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                </div>
                <div className="control">
                  <button
                    className={`button ${correctAnswerIndex === index ? 'is-success' : ''}`}
                    onClick={() => setCorrectAnswerIndex(index)}
                    type="button"
                  >
                    ✓
                  </button>
                </div>
                {options.length > 2 && (
                  <div className="control">
                    <button className="button is-danger" type="button" onClick={() => handleRemoveOption(index)}>
                      ✕
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button className="button is-link is-small mt-2" onClick={handleAddOption}>
              + Add Option
            </button>
          </div>
        </section>

        <footer className="modal-card-foot">
          <button className="button is-primary" onClick={validateAndSubmit}>Submit</button>
          <button className="button" onClick={onClose}>Cancel</button>
        </footer>
      </div>
    </div>
  );
}
