'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function SponsorModal({ onClose, onSucess, mode, preList }: { onClose: () => void, onSucess: () => void, mode:string, preList:any }) {
  const [form, setForm] = useState(preList?.editingSponsor || {
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
    const { name, value, type } = e.target;
    setForm((prev:object) => ({
      ...prev,
      [name]: type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : value,
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
      onSucess();
    } else {
      alert('Failed to add sponsor.');
    }
  };

  const handleUpdateSponsor = async () => {
    console.log(preList?.editingSponsor?._id)
    const res = await fetch(`/api/sponsors/${preList?.editingSponsor?._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Updated sponsor.');
      const updated = await res.json();
      preList?.setSponsors((prev:any) =>
        prev.map((s:any) => (s?._id === updated._id ? updated : s))
      );
      // setShowEditModal(false);
      preList?.setEditingSponsor(null);
    } else {
      alert('Failed to update sponsor.');
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{mode} Sponsor</p>
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
          <>
            {mode === 'Edit' && (
              <button className="button is-success" onClick={handleUpdateSponsor}>Save changes</button>
            )}

            {mode === 'Add' && (
              <button className="button is-success" onClick={handleSubmit}>Create Sponsor</button>
            )}
          </>
          <button className="button" onClick={onClose}>Cancel</button>
        </footer>
      </div>
    </div>
  );
}
