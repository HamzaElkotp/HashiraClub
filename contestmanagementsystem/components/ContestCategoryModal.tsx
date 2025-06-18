'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function ContestCategoryModal({ onClose, onSucess, mode, preList }: { onClose: () => void, onSucess: () => void, mode:string, preList:any }) {
  const [form, setForm] = useState(preList?.editingContestCategory || {
    name:'',
    description:'',
    content: '',
    logo: ''
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
    const { name, description, content, logo } = form;
    if (!name || !description || !content || !logo) {
      return alert('Please fill all required fields.');
    }

    const res = await fetch('/api/contests/categories', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      alert('Contest Category added!');
      onClose();
      onSucess();
    } else {
      alert('Failed to add contest Category.');
    }
  };

  const handleUpdateContestCategory = async () => {
    console.log(preList?.editingContestCategory?._id)
    const res = await fetch(`/api/contests/categories/${preList?.editingContestCategory?._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Updated contestCategory.');
      const updated = await res.json();
      preList?.setContestCategories((prev:any) =>
        prev.map((s:any) => (s?._id === updated._id ? updated : s))
      );
      preList?.setEditingContestCategory(null);
    } else {
      alert('Failed to update contest Category.');
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{mode} Contest Category</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>

        <section className="modal-card-body">
          <div className="field">
            <label className="label">Contest Category Name *</label>
            <input className="input" name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="field">
            <label className="label">Description*</label>
            <textarea className="textarea" name="description" value={form.description} onChange={handleChange}></textarea>
          </div>

          <div className="field">
            <label className="label">Content (Markdown) *</label>
            <textarea className="textarea" name="content" value={form.content} onChange={handleChange}></textarea>
            <p className="help mt-2"><strong>Preview:</strong></p>
            <div className="content box" style={{ minHeight: '100px' }}>
                <ReactMarkdown>{form.content}</ReactMarkdown>
            </div>
          </div>

          <div className="field">
            <label className="label">Logo Link *</label>
            <input className="input" name="logo" value={form.logo} onChange={handleChange} />
          </div>
        </section>
        <footer className="modal-card-foot">
          <>
            {mode === 'Edit' && (
              <button className="button is-primary mr-2" onClick={handleUpdateContestCategory}>Save changes</button>
            )}

            {mode === 'Add' && (
              <button className="button is-primary mr-2" onClick={handleSubmit}>Create Contest Category</button>
            )}
          </>
          <button className="button" onClick={onClose}>Cancel</button>
        </footer>
      </div>
    </div>
  );
}
