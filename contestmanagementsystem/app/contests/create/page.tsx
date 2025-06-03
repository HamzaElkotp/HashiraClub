'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const defaultContest = {
  name: '',
  description: '',
  banner: null,
  image: null,
  publishDate: '',
  registrationEndDate: '',
  startDateTime: { type: Date, required: true },
  period: {
    value: 1,
    unit: 'days',
  },
  maxContestants: 100,
  isOnline: true,
  regions: [],
  category: '',
};

const allRegions = ['Global', 'MENA', 'Africa', 'Gulf Countries', 'Arab', 'Egypt', 'Saudi Arabia'];
const testCategories = ['Math', 'Science', 'Coding', 'Design'];

export default function CreateContestPage() {

  // Contest info
  const [step, setStep] = useState(0); // current step
  const [contestId, setContestId] = useState<string | null>(null); // store contest _id after step 0
  const [form, setForm] = useState(defaultContest);
  const [daysLeft, setDaysLeft] = useState('');
  const [registrationPeriod, setRegistrationPeriod] = useState('');
  const [durationInfo, setDurationInfo] = useState('');

  useEffect(() => {
    if (form.publishDate && form.registrationEndDate) {
      const pub = new Date(form.publishDate);
      const regEnd = new Date(form.registrationEndDate);
      const diffDays = Math.ceil((regEnd.getTime() - pub.getTime()) / (1000 * 3600 * 24));
      setRegistrationPeriod(`${diffDays} days of registration`);
    }

    if (form.startDateTime) {
      const now = new Date();
      const pub = new Date(form.publishDate);
      const left = Math.ceil((pub.getTime() - now.getTime()) / (1000 * 3600 * 24));
      setDaysLeft(`${left} days left for publishing the contest for public`);
    }

    const units = { halfHours: 0.5, days: 24, weeks: 168 };
    const hours = form.period.value * units[form.period.unit];
    const pub = form.startDateTime ? new Date(form.startDateTime) : new Date();
    const end = new Date(pub.getTime() + hours * 3600 * 1000);
    setDurationInfo(`${hours} hours, ends on ${end.toLocaleDateString()}, ${end.toLocaleTimeString()}`);
  }, [form.publishDate, form.registrationEndDate, form.period.value, form.period.unit, form.startDateTime]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    setForm((prev) => {
      if (keys.length === 1) {
        return { ...prev, [name]: value };
      }

      if (keys.length === 2) {
        const [parent, child] = keys;
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
      }

      return prev;
    });
  };


  const handleStartDateChange = (e: any) => {
    const value = e.target.value;
    setForm(prev => ({
      ...prev,
      startDateTime: value,
    }));
  };

  const handleMultiSelect = (e: any) => {
    const selected = Array.from(e.target.selectedOptions, (opt: any) => opt.value);
    setForm(prev => ({ ...prev, regions: selected }));
  };

  const increase = () => setForm(f => ({
    ...f,
    period: { ...f.period, value: f.period.value + 1 },
  }));
  const decrease = () => setForm(f => ({
    ...f,
    period: { ...f.period, value: Math.max(1, f.period.value - 1) },
  }));

  const handleSubmit = async () => {
    const body = { ...form, step: 0 };
    const res = await fetch('/api/contests', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const saved = await res.json();
      setContestId(saved._id);
      setStep(1);
    }
  };




  // Sponsors Info
  const [sponsors, setSponsors] = useState([]);
  const [selectedSponsors, setSelectedSponsors] = useState<string[]>([]);
  const [showAddSponsor, setShowAddSponsor] = useState(false);
  const [newSponsor, setNewSponsor] = useState({
    companyName: '',
    description: '',
    facebook: '',
    twitter: '',
    website: '',
    logo: null,
  });

  useEffect(() => {
    if (step === 1) {
      fetch('/api/sponsors')
        .then(res => res.json())
        .then(setSponsors);
    }
  }, [step]);

  const handleNewSponsorChange = (e: any) => {
    const { name, value } = e.target;
    setNewSponsor(prev => ({ ...prev, [name]: value }));
  };

  const submitNewSponsor = async () => {
    const res = await fetch('/api/sponsors', {
      method: 'POST',
      body: JSON.stringify(newSponsor),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      setShowAddSponsor(false);
      setNewSponsor({ companyName: '', description: '', facebook: '', twitter: '', website: '', logo: null });
      const newList = await fetch('/api/sponsors').then(r => r.json());
      setSponsors(newList);
    }
  };

  const toggleSponsor = (id: string) => {
    setSelectedSponsors(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };




  // Organization Info
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  const [showAddOrganization, setShowAddOrganization] = useState(false);
  const [newOrganization, setNewOrganization] = useState({
    name: '',
    description: '',
    website: '',
    logo: null,
  });

  useEffect(() => {
    if (step === 2) {
      fetch('/api/organizations')
        .then(res => res.json())
        .then(setOrganizations);
    }
  }, [step]);

  const toggleOrganization = (id: string) => {
    setSelectedOrganizations(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    );
  };

  const handleNewOrganizationChange = (e: any) => {
    const { name, value } = e.target;
    setNewOrganization(prev => ({ ...prev, [name]: value }));
  };

  const submitNewOrganization = async () => {
    const res = await fetch('/api/organizations', {
      method: 'POST',
      body: JSON.stringify(newOrganization),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      setShowAddOrganization(false);
      setNewOrganization({ name: '', description: '', website: '', logo: null });
      const newList = await fetch('/api/organizations').then(r => r.json());
      setOrganizations(newList);
    }
  };

  const goToStep0 = () => setStep(0);
  const goToStep1 = () => setStep(1);
  const goToStep2 = () => setStep(2);
  const goToStep3 = () => setStep(3);
  const goToStep4 = () => setStep(4);
  const goToStep5 = () => setStep(5);









    return  (
        <div className="container my-6">
          <h1 className="title is-2">Create Contest</h1>

          {step === 0 && (
            <div className="box">
              <h2 className="title is-3 has-text-centered">Contest Details</h2>          

              <div className="field">
                <label className="label">Name *</label>
                <input className="input" name="name" value={form.name} onChange={handleChange} required />
              </div>

              <div className="field">
                <label className="label">Description (Markdown) *</label>
                <textarea className="textarea" name="description" value={form.description} onChange={handleChange} required />
              </div>

              <div className="field">
                <label className="label">Banner *</label>
                <input className="input" type="file" name="banner" required />
              </div>

              <div className="field">
                <label className="label">Image *</label>
                <input className="input" type="file" name="image" required />
              </div>

              <button className="button is-primary mt-4" onClick={handleSubmit}>Next</button>
            </div>  
          )}

          {step === 1 &&  (
            <div className="box">
              <h2 className="title is-3 has-text-centered">Contest Take place</h2>
              <div className="field">
                <label className="label">Contest Type *</label>
                <div className="select is-fullwidth">
                  <select name="online" value={form.online ? 'true' : 'false'} onChange={e => handleChange({ target: { name: 'online', value: e.target.value === 'true' } })} required>
                    <option value="true">Online</option>
                    <option value="false">Offline</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label className="label">Regions *</label>
                <div className="select is-multiple is-fullwidth">
                  <select multiple size={5} onChange={handleMultiSelect} required>
                    {allRegions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label className="label">Category *</label>
                <div className="select is-fullwidth">
                  <select name="category" value={form.category} onChange={handleChange} required>
                    <option value="">-- Select Category --</option>
                    {testCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div className="field">
                <label className="label">Max Contestants *</label>
                <input className="input" type="number" name="maxContestants" value={form.maxContestants} onChange={handleChange} required/>
              </div>

              <div className="buttons mt-4">
                <button className="button" onClick={goToStep0}>Back</button>
                <button className="button is-primary" onClick={goToStep2}>Next</button>
              </div>
            </div>
          )}

          {step === 2 &&  (
            <div className="box">
              <h2 className="title is-3 has-text-centered">Contest Dates</h2>
              <div className="field">
                <label className="label">Publish Date *</label>
                <input className="input" type="date" name="publishDate" value={form.publishDate} onChange={handleChange} required/>
                <p className="help">{daysLeft}</p>
              </div>

              <div className="field">
                <label className="label">Registration End Date *</label>
                <input className="input" type="date" name="registrationEndDate" value={form.registrationEndDate} onChange={handleChange} required/>
                <p className="help">{registrationPeriod}</p>
              </div>

              <div className="field">
                <label className="label">Contest Start Date & Time *</label>
                <div className="control">
                  <input
                    className="input"
                    type="datetime-local"
                    name="startDateTime"
                    value={form.startDateTime}
                    onChange={handleStartDateChange}
                    required/>
                </div>
                <p className="help">
                  Starts at: {new Date(form.startDateTime).toLocaleString()}
                </p>
              </div>

              <div className="field">
                <label className="label">Contest Duration *</label>
                <div className="buttons has-addons">
                  <button className="button" type="button" onClick={decrease}>-</button>
                  <button className="button is-static">{form.period.value}</button>
                  <button className="button" type="button" onClick={increase}>+</button>
                </div>
                <div className="select mt-2">
                  <select name="period.unit" value={form.period.unit} onChange={handleChange} required>
                    <option value="halfHours">Half Hours</option>
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                  </select>
                </div>
                <p className="help">{durationInfo}</p>
              </div>

              <div className="buttons mt-4">
                <button className="button" onClick={goToStep1}>Back</button>
                <button className="button is-primary" onClick={goToStep3}>Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="box">
              <h2 className="title is-3 has-text-centered">Contest Sponsors</h2>
              <div className="buttons mb-4">
                <button className="button is-link" onClick={() => setShowAddSponsor(true)}>Add New Sponsor</button>
              </div>
              {sponsors.map((sponsor: any) => (
                <div key={sponsor._id} className="box is-flex is-justify-content-space-between">
                  <div>
                    <strong>{sponsor.companyName}</strong>
                    <p className="is-size-7">{sponsor.description}</p>
                  </div>
                  <button
                    className={`button is-small ${selectedSponsors.includes(sponsor._id) ? 'is-success' : ''}`}
                    onClick={() => toggleSponsor(sponsor._id)}
                  >
                    {selectedSponsors.includes(sponsor._id) ? 'Selected' : 'Select'}
                  </button>
                </div>
              ))}
              <div className="buttons mt-4">
                <button className="button" onClick={goToStep2}>Back</button>
                <button className="button is-primary" onClick={goToStep4}>Next</button>
              </div>
            </div>
          )}

          {showAddSponsor && (
            <div className="modal is-active">
              <div className="modal-background" onClick={() => setShowAddSponsor(false)}></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Add New Sponsor</p>
                  <button className="delete" aria-label="close" onClick={() => setShowAddSponsor(false)}></button>
                </header>
                <section className="modal-card-body">
                  <div className="field">
                    <label className="label">Company Name</label>
                    <input className="input" name="companyName" value={newSponsor.companyName} onChange={handleNewSponsorChange} />
                  </div>
                  <div className="field">
                    <label className="label">Description</label>
                    <input className="input" name="description" value={newSponsor.description} onChange={handleNewSponsorChange} />
                  </div>
                  <div className="field">
                    <label className="label">Facebook</label>
                    <input className="input" name="facebook" value={newSponsor.facebook} onChange={handleNewSponsorChange} />
                  </div>
                  <div className="field">
                    <label className="label">Twitter</label>
                    <input className="input" name="twitter" value={newSponsor.twitter} onChange={handleNewSponsorChange} />
                  </div>
                  <div className="field">
                    <label className="label">Website</label>
                    <input className="input" name="website" value={newSponsor.website} onChange={handleNewSponsorChange} />
                  </div>
                  {/* Logo upload skipped for now */}
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success" onClick={submitNewSponsor}>Save</button>
                  <button className="button" onClick={() => setShowAddSponsor(false)}>Cancel</button>
                </footer>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="box">
              <h2 className="title is-3 has-text-centered">Contest Competing Organizations</h2>
              <div className="buttons is-right">
                <button className="button is-primary is-small" onClick={() => setShowAddOrganization(true)}>
                  Add New Organization
                </button>
              </div>

              <div className="content">
                {organizations.length === 0 ? (
                  <p>No organizations available.</p>
                ) : (
                  <div className="tags">
                    {organizations.map((org: any) => (
                      <span
                        key={org._id}
                        className={`tag is-medium ${selectedOrganizations.includes(org._id) ? 'is-info' : ''}`}
                        onClick={() => toggleOrganization(org._id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {org.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="buttons mt-4">
                <button className="button" onClick={goToStep3}>Back</button>
                <button className="button is-primary" onClick={goToStep5}>Next</button>
              </div>
            </div>
          )}

          {showAddOrganization && (
            <div className="modal is-active">
              <div className="modal-background" onClick={() => setShowAddOrganization(false)}></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Add New Organization</p>
                  <button className="delete" aria-label="close" onClick={() => setShowAddOrganization(false)}></button>
                </header>
                <section className="modal-card-body">
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input className="input" name="name" value={newOrganization.name} onChange={handleNewOrganizationChange} />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                      <input className="input" name="description" value={newOrganization.description} onChange={handleNewOrganizationChange} />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Website</label>
                    <div className="control">
                      <input className="input" name="website" value={newOrganization.website} onChange={handleNewOrganizationChange} />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Logo</label>
                    <div className="control">
                      <div className="file has-name is-boxed">
                        <label className="file-label">
                          <input
                            className="file-input"
                            type="file"
                            name="logo"
                            accept="image/*"
                            onChange={(e) =>
                              setNewOrganization(prev => ({
                                ...prev,
                                logo: e.target.files ? e.target.files[0] : null,
                              }))
                            }
                          />
                          <span className="file-cta">
                            <span className="file-icon">
                              <i className="fas fa-upload"></i>
                            </span>
                            <span className="file-label">Choose a logo…</span>
                          </span>
                          <span className="file-name">
                            {newOrganization.logo ? newOrganization.logo.name : 'No file selected'}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success" onClick={submitNewOrganization}>Save</button>
                  <button className="button" onClick={() => setShowAddOrganization(false)}>Cancel</button>
                </footer>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>

            </div>
          )}


        </div>
    )
}
