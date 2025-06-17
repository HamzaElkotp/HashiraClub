'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { defaultContest, allRegions, categories } from '@/constants/contest';
import {
  ContestInfo,
  ContestTakePlace,
  ContestDates,
  ContestSponsors,
  ContestCompetingAssociations,
  ExternalContestInfo,
} from '@/components/CreateContestSteps';

import type { ContestForm } from '@/types/contest';


export default function EditContestPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState<ContestForm>(defaultContest);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sponsors, setSponsors] = useState([]);
  const [associations, setAssociations] = useState([]);
  const [selectedSponsors, setSelectedSponsors] = useState<string[]>([]);
  const [selectedAssociations, setSelectedAssociations] = useState<string[]>([]);

  const [daysLeft, setDaysLeft] = useState('');
  const [registrationPeriod, setRegistrationPeriod] = useState('');
  const [durationInfo, setDurationInfo] = useState('');

  // Load existing contest
  useEffect(() => {
    if (!id) return;

    const fetchContest = async () => {
      const res = await fetch(`/api/contests/${id}`);
      if (!res.ok) {
        alert('Failed to load contest');
        return;
      }
      const data = await res.json();
      setForm(data);
      setSelectedSponsors(data.sponsors || []);
      setSelectedAssociations(data.associations || []);
      setLoading(false);
    };

    fetchContest();
  }, [id]);


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


  // Load sponsors/orgs once when needed
  useEffect(() => {
    if (step === 3) {
      fetch('/api/sponsors')
        .then((res) => res.json())
        .then(setSponsors)
        .catch(() => setSponsors([]));
    }
    if (step === 4) {
      fetch('/api/associations')
        .then((res) => res.json())
        .then(setAssociations)
        .catch(() => setAssociations([]));
    }
  }, [step]);


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

  const handleUpdate = async () => {
    const updatedForm = {
      ...form,
      sponsors: selectedSponsors,
      associations: selectedAssociations,
    };

    const res = await fetch(`/api/contests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedForm),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      alert('Contest updated!');
      router.push('/contests');
    } else {
      alert('Update failed.');
    }
  };

  const toggleSponsor = (id: string) => {
    setSelectedSponsors((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleAssociation = (id: string) => {
    setSelectedAssociations((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="container my-6">
      <h1 className="title is-3 has-text-centered">Edit Contest</h1>

      {step === 0 && <ContestInfo form={form} setForm={setForm} setStep={setStep} currentStep={step} />}
      {step === 1 && <ContestTakePlace form={form} setForm={setForm} setStep={setStep} currentStep={step} handleMultiSelect={handleMultiSelect} allRegions={allRegions} Categories={categories} />}
      {step === 2 && <ContestDates form={form} setForm={setForm} setStep={setStep} currentStep={step} handleStartDateChange={handleStartDateChange} increase={increase} decrease={decrease} daysLeft={daysLeft} registrationPeriod={registrationPeriod} durationInfo={durationInfo} />}
      {step === 3 && <ContestSponsors form={form} setForm={setForm} setStep={setStep} currentStep={step} toggleSponsor={toggleSponsor} sponsors={sponsors} selectedSponsors={selectedSponsors} />}
      {step === 4 && <ContestCompetingAssociations form={form} setForm={setForm} setStep={setStep} currentStep={step} Associations={associations} selectedAssociations={selectedAssociations} toggleAssociation={toggleAssociation} />}
      {step === 5 && form.organizingPlace === 'outside' && <ExternalContestInfo form={form} setForm={setForm} setStep={setStep} currentStep={step} />}
      {((step === 5 && form.organizingPlace === 'inside') || (step === 6 && form.organizingPlace === 'outside')) && (
        <div className="has-text-centered mt-5">
          <button className="button is-primary" onClick={handleUpdate}>
            Update Contest
          </button>
        </div>
      )}
    </div>
  );
}
