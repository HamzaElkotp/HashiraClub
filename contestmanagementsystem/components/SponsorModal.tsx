'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function SponsorModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    companyName: '',
    description: '',
    logo: '',
    website: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    isGeneral: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const { companyName, description, logo } = form;
    if (!companyName || !description || !logo) {
      return alert('Please fill all required fields.');
    }

    const res = await fetch('/api/sponsors', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      alert('Sponsor added!');
      onClose();
    } else {
      alert('Failed to add sponsor.');
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add Sponsor</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>

        <section className="modal-card-body">
          <div className="field">
            <label className="label">Sponsor Name *</label>
            <input className="input" name="companyName" value={form.companyName} onChange={handleChange} />
          </div>

          <div className="field">
            <label className="label">Description (Markdown) *</label>
            <textarea className="textarea" name="description" value={form.description} onChange={handleChange}></textarea>
            <p className="help mt-2"><strong>Preview:</strong></p>
            <div className="content box" style={{ minHeight: '100px' }}>
                <ReactMarkdown>{form.description}</ReactMarkdown>
            </div>
          </div>

          <div className="field">
            <label className="label">Logo Link *</label>
            <input className="input" name="logo" value={form.logo} onChange={handleChange} />
          </div>

          <div className="field">
            <label className="label">Website Link</label>
            <input className="input" name="website" value={form.website} onChange={handleChange} />
          </div>

          <div className="field">
            <label className="label">Facebook Link</label>
            <input className="input" name="facebook" value={form.facebook} onChange={handleChange} />
          </div>

          <div className="field">
            <label className="label">Twitter Link</label>
            <input className="input" name="twitter" value={form.twitter} onChange={handleChange} />
          </div>

          <div className="field">
            <label className="label">Linkedin Link</label>
            <input className="input" name="facebook" value={form.linkedin} onChange={handleChange} />
          </div>

          <div className="field">
            <label className="checkbox">
              <input type="checkbox" name="isGeneral" checked={form.isGeneral} onChange={handleChange} />
              {' '}Show as General Sponsor
            </label>
          </div>
        </section>

        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleSubmit}>Save</button>
          <button className="button" onClick={onClose}>Cancel</button>
        </footer>
      </div>
    </div>
  );
}
