'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function FileConfigEditor({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const validateAndSubmit = () => {
    const errs = [];

    if (!title.trim()) errs.push('Title is required.');
    if (!details.trim()) errs.push('Details are required.');

    if (errs.length > 0) {
      alert(errs.join('\n'));
      return;
    }

    const question = { title, details };
    alert('File question created!');
    onClose();
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card" style={{ maxWidth: '800px' }}>
        <header className="modal-card-head">
          <p className="modal-card-title">Add File Upload Question</p>
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
              rows={6}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <p className="help mt-2"><strong>Preview:</strong></p>
            <div className="content box" style={{ minHeight: '100px' }}>
              <ReactMarkdown>{details}</ReactMarkdown>
            </div>
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
