'use client';
import { Association } from '@/models/Association';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function AssociationModal({ onClose, onSucess, mode, preList }: { onClose: () => void, onSucess: () => void, mode:string, preList:any }) {
  const [form, setForm] = useState(preList?.editingAssociation || {
    associationName: '',
    description: '',
    location: '',
    coachID: '',
    website: '',
    logo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev:object) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { associationName, description, coachID, location, logo } = form;
    if (!associationName || !location || !description || !coachID || !logo) {
      return alert('Please fill all required fields.');
    }

    const res = await fetch('/api/associations', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      alert('Association added!');
      onClose();
      onSucess();
    } else {
      alert('Failed to add association.');
    }
  };

  const handleUpdateAssociation = async () => {
    console.log(preList?.editingAssociation?._id)
    const res = await fetch(`/api/associations/${preList?.editingAssociation?._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Updated association.');
      const updated = await res.json();
      preList?.setAssociations((prev:any) =>
        prev.map((s:any) => (s?._id === updated._id ? updated : s))
      );
      // setShowEditModal(false);
      preList?.setEditingAssociation(null);
    } else {
      alert('Failed to update association.');
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{mode} Association</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>

        <section className="modal-card-body">
          <div className="field">
            <label className="label">Association Name *</label>
            <input className="input" name="associationName" value={form.associationName} onChange={handleChange} />
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
            <label className="label">Location *</label>
            <input className="input" name="location" value={form.location} onChange={handleChange} />
          </div>

          <div className="field">
            <label className="label">Coach *</label>
            <input className="input" name="coachID" value={form.coachID} onChange={handleChange} />
          </div>

          <div className="field">
            <label className="label">Logo Link *</label>
            <input className="input" name="logo" value={form.logo} onChange={handleChange} />
          </div>

          <div className="field">
            <label className="label">Website Link</label>
            <input className="input" name="website" value={form.website} onChange={handleChange} />
          </div>

        </section>

        <footer className="modal-card-foot">
          <>
            {mode === 'Edit' && (
              <button className="button is-success" onClick={handleUpdateAssociation}>Save changes</button>
            )}

            {mode === 'Add' && (
              <button className="button is-success" onClick={handleSubmit}>Create Association</button>
            )}
          </>
          <button className="button" onClick={onClose}>Cancel</button>
        </footer>
      </div>
    </div>
  );
}
