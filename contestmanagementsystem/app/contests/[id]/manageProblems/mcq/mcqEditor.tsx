'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function McqEditor({ onClose }: { onClose: () => void }) {
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

  const handleRemoveOption = (index: number) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
    if (correctAnswerIndex === index) setCorrectAnswerIndex(null);
    else if (correctAnswerIndex !== null && correctAnswerIndex > index)
      setCorrectAnswerIndex(correctAnswerIndex - 1);
  };

  const validateAndSubmit = () => {
    const newErrors = [];

    if (!title.trim()) newErrors.push('Title is required.');
    if (!details.trim()) newErrors.push('Details are required.');
    if (options.some((opt) => !opt.trim())) newErrors.push('All options must be filled.');
    if (correctAnswerIndex === null) newErrors.push('You must select the correct answer.');

    if (newErrors.length > 0) {
      alert(newErrors.join('\n'))
      return;
    }

    const question = {
      title,
      details,
      hint,
      options,
      correctAnswerIndex,
    };

    console.log('[New MCQ Question]', question);
    alert('Question created successfuly');
    onClose();
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
