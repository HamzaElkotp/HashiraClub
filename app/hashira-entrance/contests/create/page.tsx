'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { defaultContest, allRegions } from '@/constants/contest';
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
  const router = useRouter();
  
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

  
  // Sponsors Info
  const [sponsors, setSponsors] = useState<any>([]);
  const [selectedSponsors, setSelectedSponsors] = useState<string[]>([]);

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


  // Association Info
  const [associations, setAssociations] = useState([Object]);
  const [selectedAssociations, setSelectedAssociations] = useState<string[]>([]);

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

  const handleContestCreationSubmit = async (form:ContestForm) => {
      const res = await fetch('/api/contests', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          associations: selectedAssociations,
          sponsors: selectedSponsors
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        alert('Contest Created successfully!');
        router.push('/contests');
      } else {
        alert('Submission failed.');
      }
  };

  const [categories, setCategories] = useState<any>([]);

  const loadContestCategories = async () => {
    try {
      const res = await fetch('/api/contests/categories');

      if (!res.ok) {
        alert(`Failed to fetch Contest categories. Status: ${res.status}`);
        console.error('Failed to fetch Contest categories. Status:', res.status);
        setCategories([]); // fallback
        return;
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        alert(`Invalid Contest categories data format: ${data}`);
        console.error('Invalid Contest categories data format:', data);
        setCategories([]);
        return;
      }

      setCategories(data);
    } catch (err) {
      console.error('Error fetching Contest categories:', err);
      setCategories([]);
    }
  };

  useEffect(() => {
    if (step === 1) {
      loadContestCategories();
    }

    if (step === 3) {
      loadSponsors();
    }

    if (step === 4) {
      loadAssociations();
    }
  }, [step]);


    return  (
        <div className="container my-6">
          <h1 className="title">Create Contest</h1>

          {step === 0 && <ContestInfo form={form} setForm={setForm} setStep={setStep} currentStep={step} />}

          {step === 1 && <ContestTakePlace form={form} setForm={setForm} setStep={setStep} currentStep={step} handleMultiSelect={handleMultiSelect} allRegions={allRegions} Categories={categories} />}

          {step === 2 && <ContestDates form={form} setForm={setForm} setStep={setStep} currentStep={step} handleStartDateChange={handleStartDateChange} increase={increase} decrease={decrease} daysLeft={daysLeft} registrationPeriod={registrationPeriod} durationInfo={durationInfo} />}

          {step === 3 && <ContestSponsors form={form} setForm={setForm} setStep={setStep} currentStep={step} toggleSponsor={toggleSponsor} sponsors={sponsors} selectedSponsors={selectedSponsors} />}

          {step === 4 && <ContestCompetingAssociations form={form} setForm={setForm} setStep={setStep} currentStep={step} Associations={associations} selectedAssociations={selectedAssociations} toggleAssociation={toggleAssociation} />}

          {step === 5 && <ContestOrganizingMode form={form} setForm={setForm} setStep={setStep} currentStep={step} />}

          {step === 6 && form.organizingPlace === 'inside' && <ContestTeamSetUp form={form} setForm={setForm} setStep={setStep} currentStep={step} />}

          {step === 6 && form.organizingPlace === 'outside' && <ExternalContestInfo form={form} setForm={setForm} setStep={setStep} currentStep={step} />}

          {step === 7 && form.organizingPlace === 'inside'  && <ContestStandingRateMechanism form={form} setForm={setForm} setStep={setStep} currentStep={step} />}

          {step === 8 && form.organizingPlace === 'inside' && <ContestQAType form={form} setForm={setForm} setStep={setStep} currentStep={step} />}

          {((step === 9 && form.organizingPlace === 'inside') || (step === 7 && form.organizingPlace === 'outside')) &&
            <div className="has-text-centered mt-5">
              <button className="button is-primary" onClick={() => {
                  // const errors = validateContestStep(step, form);
                  // if (errors.length) return alert(errors.join("\n"));
                  handleContestCreationSubmit(form);
              }}>Submit Contest</button>
            </div>
          }
        </div>
    )
}
