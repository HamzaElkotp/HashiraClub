'use client';
import { useState, useEffect } from 'react';
import { defaultContest, allRegions, categories } from '@/constants/contest';
import { 
  ContestTakePlace, 
  ContestInfo, 
  ContestDates, 
  ContestSponsors,
  ContestCompetingAssociations, 
  ContestOrganizingMode, 
  ContestTeamSetUp,
  ExternalContestInfo, 
  ContestStandingRateMechanism, 
  ContestQAType
} from '@/components/CreateContestSteps';

import type { ContestForm } from '@/types/contest';

export default function CreateContestPage() {

  // Contest info
  const [step, setStep] = useState(0); // current step
  // const [contestId, setContestId] = useState<string | null>(null); // store contest _id after step 0
  const [form, setForm] = useState<ContestForm>(defaultContest);
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

    if (form.publishDate) {
      const now = new Date();
      const pub = new Date(form.publishDate);
      const left = Math.ceil((pub.getTime() - now.getTime()) / (1000 * 3600 * 24));
      setDaysLeft(`${left} days left for publishing the contest for public`);
    }

    type PeriodUnit = 'halfHours' | 'days' | 'weeks';

    const units: Record<PeriodUnit, number> = {
      halfHours: 0.5,
      days: 24,
      weeks: 168,
    };
    const hours = form.period.value * units[form.period.unit as PeriodUnit];
    const pub = form.startDateTime ? new Date(form.startDateTime) : new Date();
    const end = new Date(pub.getTime() + hours * 3600 * 1000);
    setDurationInfo(`${hours} hours, ends on ${end.toLocaleDateString()}, ${end.toLocaleTimeString()}`);
  }, [form.publishDate, form.registrationEndDate, form.period.value, form.period.unit, form.startDateTime]);


  const handleMultiSelect = (e: any) => {
      const selected = Array.from(e.target.selectedOptions, (opt: any) => opt.value);
      setForm(prev => ({ ...prev, regions: selected }));
  };

  const handleStartDateChange = (e: any) => {
    const value = e.target.value;
    setForm(prev => ({
      ...prev,
      startDateTime: value,
    }));
  };


  const increase = () => setForm(f => ({
    ...f,
    period: { ...f.period, value: f.period.value + 1 },
  }));
  const decrease = () => setForm(f => ({
    ...f,
    period: { ...f.period, value: Math.max(1, f.period.value - 1) },
  }));

  // const handleSubmit = async () => {
  //   const body = { ...form, step: 0 };
  //   const res = await fetch('/api/contests', {
  //     method: 'POST',
  //     body: JSON.stringify(body),
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  //   if (res.ok) {
  //     const saved = await res.json();
  //     setContestId(saved._id);
  //     setStep(1);
  //   }
  // };



  // Sponsors Info
  const [sponsors, setSponsors] = useState<any>([]);
  const [selectedSponsors, setSelectedSponsors] = useState<string[]>([]);
  // const [showAddSponsor, setShowAddSponsor] = useState(false);
  // const [newSponsor, setNewSponsor] = useState({
  //   companyName: '',
  //   description: '',
  //   facebook: '',
  //   twitter: '',
  //   website: '',
  //   logo: null,
  // });

  const loadSponsors = async () => {
    try {
      const res = await fetch('/api/sponsors');

      if (!res.ok) {
        console.error('Failed to fetch sponsors. Status:', res.status);
        setSponsors([]); // fallback
        return;
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error('Invalid sponsor data format:', data);
        setSponsors([]);
        return;
      }

      setSponsors(data);
    } catch (err) {
      console.error('Error fetching sponsors:', err);
      setSponsors([]);
    }
  };

  const toggleSponsor = (id: string) => {
    setSelectedSponsors(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // const handleNewSponsorChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setNewSponsor(prev => ({ ...prev, [name]: value }));
  // };

  // const submitNewSponsor = async () => {
  //   const res = await fetch('/api/sponsors', {
  //     method: 'POST',
  //     body: JSON.stringify(newSponsor),
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  //   if (res.ok) {
  //     setShowAddSponsor(false);
  //     setNewSponsor({ companyName: '', description: '', facebook: '', twitter: '', website: '', logo: null });
  //     const newList = await fetch('/api/sponsors').then(r => r.json());
  //     setSponsors(newList);
  //   }
  // };


  // Association Info
  const [associations, setAssociations] = useState([Object]);
  const [selectedAssociations, setSelectedAssociations] = useState<string[]>([]);
  // const [showAddAssociation, setShowAddAssociation] = useState(false);
  // const [newAssociation, setNewAssociation] = useState({
  //   name: '',
  //   description: '',
  //   website: '',
  //   logo: null,
  // });

  const loadAssociations = async () => {
    try {
      const res = await fetch('/api/associations');

      if (!res.ok) {
        console.error('Failed to fetch associations. Status:', res.status);
        setAssociations([]); // fallback
        return;
      }

      const data = await res.json();
      console.log(data);

      if (!Array.isArray(data)) {
        console.error('Invalid association data format:', data);
        setAssociations([]);
        return;
      }

      setAssociations(data);
    } catch (err) {
      console.error('Error fetching associations:', err);
      setAssociations([]);
    }
  };

  const toggleAssociation = (id: string) => {
    setSelectedAssociations(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    );
  };

  // const handleNewAssociationChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setNewAssociation(prev => ({ ...prev, [name]: value }));
  // };

  // const submitNewAssociation = async () => {
  //   const res = await fetch('/api/Associations', {
  //     method: 'POST',
  //     body: JSON.stringify(newAssociation),
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  //   if (res.ok) {
  //     setShowAddAssociation(false);
  //     setNewAssociation({ name: '', description: '', website: '', logo: null });
  //     const newList = await fetch('/api/Associations').then(r => r.json());
  //     setAssociations(newList);
  //   }
  // };


  useEffect(() => {
    if (step === 3) {
      loadSponsors();
    }

    if (step === 4) {
      loadAssociations();
    }
  }, [step]);


    return  (
        <div className="container my-6">
          <h1 className="title is-2">Create Contest</h1>

          {step === 0 && <ContestInfo form={form} setForm={setForm} setStep={setStep} />}

          {step === 1 && <ContestTakePlace form={form} setForm={setForm} setStep={setStep} handleMultiSelect={handleMultiSelect} allRegions={allRegions} Categories={categories} />}

          {step === 2 && <ContestDates form={form} setForm={setForm} setStep={setStep} handleStartDateChange={handleStartDateChange} increase={increase} decrease={decrease} daysLeft={daysLeft} registrationPeriod={registrationPeriod} durationInfo={durationInfo} />}

          {step === 3 && <ContestSponsors form={form} setForm={setForm} setStep={setStep} toggleSponsor={toggleSponsor} sponsors={sponsors} selectedSponsors={selectedSponsors} />}

          {/* {showAddSponsor && (
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
                    <label className="label">Logo</label>
                    <input
                      className="input"
                      type="text"
                      placeholder="Enter sponsor logo URL"
                      value={newSponsor.logo || ''}
                      onChange={(e) => setNewSponsor((prev) => ({ ...prev, logo: e.target.value }))}
                    />
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
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success" onClick={submitNewSponsor}>Save</button>
                  <button className="button" onClick={() => setShowAddSponsor(false)}>Cancel</button>
                </footer>
              </div>
            </div>
          )} */}

          {step === 4 && <ContestCompetingAssociations form={form} setForm={setForm} setStep={setStep} Associations={associations} selectedAssociations={selectedAssociations} toggleAssociation={toggleAssociation} />}

          {/* {showAddAssociation && (
            <div className="modal is-active">
              <div className="modal-background" onClick={() => setShowAddAssociation(false)}></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Add New Association</p>
                  <button className="delete" aria-label="close" onClick={() => setShowAddAssociation(false)}></button>
                </header>
                <section className="modal-card-body">
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input className="input" name="name" value={newAssociation.name} onChange={handleNewAssociationChange} />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                      <input className="input" name="description" value={newAssociation.description} onChange={handleNewAssociationChange} />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Website</label>
                    <div className="control">
                      <input className="input" name="website" value={newAssociation.website} onChange={handleNewAssociationChange} />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Logo</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Enter association logo URL"
                        value={newAssociation.logo || ''}
                        onChange={(e) => setNewAssociation((prev) => ({ ...prev, logo: e.target.value }))}
                      />
                    </div>
                  </div>
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success" onClick={submitNewAssociation}>Save</button>
                  <button className="button" onClick={() => setShowAddAssociation(false)}>Cancel</button>
                </footer>
              </div>
            </div>
          )} */}

          {step === 5 && <ContestOrganizingMode form={form} setForm={setForm} setStep={setStep} />}

          {step === 6 && form.organizingPlace === 'inside' && <ContestTeamSetUp form={form} setForm={setForm} setStep={setStep} />}

          {step === 6 && form.organizingPlace === 'outside' && <ExternalContestInfo form={form} setForm={setForm} setStep={setStep} />}

          {step === 7 && form.organizingPlace === 'inside'  && <ContestStandingRateMechanism form={form} setForm={setForm} setStep={setStep} />}

          {step === 8 && form.organizingPlace === 'inside' && <ContestQAType form={form} setForm={setForm} setStep={setStep} />}
        </div>
    )
}
