'use client';
import React from 'react';
import { handleChange, validateContestStep} from '@/lib/contestCreationUtils';
import ReactMarkdown from 'react-markdown';
import { ContestForm } from '@/types/contest';


function ContestInfo({ form, setForm, setStep, currentStep }: any) {
  return (
    <div className="box">

      <h2 className="title is-3 has-text-centered">Contest Details</h2>          

      <div className="field">
          <label className="label">Name *</label>
          <input className="input" name="name" value={form.name} onChange={handleChange(setForm)} required />
      </div>

      <div className="field">
          <label className="label">Description *</label>
            <textarea
            rows={5} className="textarea" name="description" 
            value={form.description} onChange={handleChange(setForm)} required/>
      </div>

      <div className="field">
          <label className="label">Content (Markdown) *</label>
            <textarea
            rows={5} className="textarea" name="content" 
            value={form.content} onChange={handleChange(setForm)} required/>
            <p className="help mt-2"><strong>Preview:</strong></p>
            <div className="content box" style={{ minHeight: '100px' }}>
                <ReactMarkdown>{form.content}</ReactMarkdown>
            </div>
      </div>

      <div className="field">
          <label className="label">Banner *</label>
          <input
              className="input"
              type="text"
              name="banner"
              placeholder="Enter image URL for banner"
              value={form.banner}
              onChange={handleChange(setForm)}
          />
      </div>

      <div className="field">
          <label className="label">Image *</label>
          <input
              className="input"
              type="text"
              name="image"
              placeholder="Enter image URL for logo"
              value={form.image}
              onChange={handleChange(setForm)}
          />
      </div>

      <button className="button is-primary mt-4" onClick={() => {
          const errors = validateContestStep("validateInfo", form);
          if (errors.length) return alert(errors.join("\n"));
          setStep(currentStep+1);
      }}>
      Next
      </button>
    </div>
  );
}

function ContestTakePlace({ form, setForm, setStep, currentStep, handleMultiSelect, allRegions, Categories }: any) {
  return (
    <div className="box">
        <h2 className="title is-3 has-text-centered">Contest Take place</h2>
        <div className="field">
            <label className="label">Contest Type *</label>
            <div className="select is-fullwidth">
                <select
                    name="isOnline"
                    value={form.isOnline ? 'true' : 'false'}
                    onChange={(e) => setForm((prev: ContestForm) => ({
                        ...prev,
                        isOnline: e.target.value === 'true',
                    }))}
                    required
                >
                    <option value="true">Online</option>
                    <option value="false">Offline</option>
                </select>
            </div>
        </div>

        <div className="field">
            <label className="label">Regions *</label>
            <div className="select is-multiple is-fullwidth">
                <select multiple size={5} onChange={handleMultiSelect} required>
                {allRegions.map((region:any) => (
                    <option key={region} value={region}>{region}</option>
                ))}
                </select>
            </div>
        </div>

        <div className="field">
            <label className="label">Category *</label>
            <div className="select is-fullwidth">
                <select name="category" value={form.category} onChange={handleChange(setForm)} required>
                <option value="">-- Select Category --</option>
                {Categories.map((cat:any) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                </select>
            </div>
        </div>

        <div className="field">
            <label className="label">Max Contestants *</label>
            <input className="input" type="number" name="maxContestants" value={form.maxContestants} onChange={handleChange(setForm)} required/>
            </div>

            <div className="buttons mt-4">
            <button className="button" onClick={() => setStep(currentStep-1)}>Back</button>
            <button className="button is-primary" onClick={() => {
                const errors = validateContestStep("validateTakePlace", form);
                if (errors.length) return alert(errors.join("\n"));
                setStep(currentStep+1);
                }}
            >Next
            </button>
        </div>
    </div>
  );
}

function ContestDates({ form, setForm, setStep, currentStep, handleStartDateChange, increase, decrease, daysLeft, registrationPeriod, durationInfo }: any) {
  return (
    <div className="box">
        <h2 className="title is-3 has-text-centered">Contest Dates</h2>
        <div className="field">
            <label className="label">Publish Date *</label>
            <input className="input" type="date" name="publishDate" value={form.publishDate ? form.publishDate.slice(0, 10) : ''} onChange={handleChange(setForm)} required/>
            <p className="help">{daysLeft}</p>
        </div>

        <div className="field">
            <label className="label">Registration End Date *</label>
            <input className="input" type="date" name="registrationEndDate" value={form.registrationEndDate ? form.registrationEndDate.slice(0, 10) : ''} onChange={handleChange(setForm)} required/>
            <p className="help">{registrationPeriod}</p>
        </div>

        <div className="field">
            <label className="label">Contest Start Date & Time *</label>
            <div className="control">
                <input
                className="input"
                type="datetime-local"
                name="startDateTime"
                value={form.startDateTime ? form.startDateTime.slice(0, 16) : ''}
                onChange={handleStartDateChange}
                required/>
            </div>
            <p className="help">
                Starts at: {(new Date(form.startDateTime)).toLocaleString()}
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
                <select name="period.unit" value={form.period.unit} onChange={handleChange(setForm)} required>
                <option value="halfHours">Half Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                </select>
            </div>
            <p className="help">{durationInfo}</p>
        </div>

        <div className="buttons mt-4">
            <button className="button" onClick={() => setStep(currentStep-1)}>Back</button>
            <button className="button is-primary" onClick={() => {
                const errors = validateContestStep("validateDates", form);
                if (errors.length) return alert(errors.join("\n"));
                setStep(currentStep+1);
                }}
            >
            Next</button>
        </div>
    </div>
  );
}


function ContestSponsors({ form, setForm, setStep, currentStep, toggleSponsor, sponsors, selectedSponsors }: any) {
  return (
    <div className="box">
        <h2 className="title is-3 has-text-centered">Contest Sponsors</h2>
        <div className="content">
            {sponsors.length === 0 ? (
                <p>No Sponsors available.</p>
            ) : (
                <div className="tags">
                    {sponsors.map((sponsor: any) => (
                        <div key={sponsor._id??''} 
                        className={`box ${selectedSponsors.includes(sponsor._id) ? 'has-background-grey-dark' : ''} is-flex is-justify-content-space-between`}
                        onClick={() => toggleSponsor(sponsor._id)}
                        style={{ cursor: 'pointer' }}>
                            <div className='is-block'>
                                <img className='image is-64x64 mx-auto' src={sponsor.logo} alt="" />
                                <p className={`${selectedSponsors.includes(sponsor._id) ? 'has-text-white' : ''}`}>{sponsor.companyName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <div className="buttons mt-4">
            <button className="button" onClick={() => setStep(currentStep-1)}>Back</button>
            <button className="button is-primary" onClick={() => {
                // const errors = validateContestStep(currentStep, form);
                // if (errors.length) return alert(errors.join("\n"));
                setStep(currentStep+1);
            }}>Next</button>
        </div>
    </div>
  );
}

function ContestCompetingAssociations({ form, setForm, setStep, currentStep, Associations, selectedAssociations, toggleAssociation }: any) {
  return (
    <div className="box">
        <h2 className="title is-3 has-text-centered">Competing Associations</h2>
        <div className="content">
            {Associations.length === 0 ? (
                <p>No Associations available.</p>
            ) : (
                <div className="tags">
                    {Associations.map((org: any) => (
                        <span
                            key={org._id??''}
                            className={`tag is-medium ${selectedAssociations.includes(org._id) ? 'is-primary' : ''}`}
                            onClick={() => toggleAssociation(org._id)}
                            style={{ cursor: 'pointer' }}
                        >{org.associationName}
                        </span>
                    ))}
                </div>
            )}
        </div>

        <div className="buttons mt-4">
            <button className="button" onClick={() => setStep(currentStep-1)}>Back</button>
            <button className="button is-primary" onClick={() => {
                setStep(currentStep+1);
            }}>Next</button>
        </div>
    </div>
  );
}

function ContestOrganizingMode({ form, setForm, setStep, currentStep }: any) {
  return (
    <div className="box">
        <h2 className="title is-3 has-text-centered">Organizing Mode</h2>

        <div className="field">
            <label className="label">The contest will take place in</label>
            <div className="control">
                <div className="select is-fullwidth">
                <select name="organizingPlace" value={form.organizingPlace} onChange={handleChange(setForm)} required>
                    <option value="">-- Please choose --</option>
                    <option value="inside">Organized Inside the platform</option>
                    <option value="outside">Organized externally</option>
                </select>
                </div>
            </div>
        </div>

        <div className="buttons mt-4">
            <button className="button" onClick={() => setStep(currentStep-1)}>Back</button>
            <button
                className="button is-primary"
                onClick={() => {
                const errors = validateContestStep("validateOrganizingPlace", form);
                if (errors.length) return alert(errors.join("\n"));
                setStep(currentStep+1);
            }}>Next</button>
        </div>
    </div>
  );
}

function ContestTeamSetUp({ form, setForm, setStep, currentStep }: any) {
  return (
    <div className="box">
        <h2 className="title is-3 has-text-centered">Team Setup</h2>

        <div className="field">
            <label className="label">Minimum Members per Team *</label>
            <input
                className="input"
                type="number"
                name="minTeamSize"
                value={form.minTeamSize}
                onChange={handleChange(setForm)}
                required
            />
        </div>

        <div className="field">
            <label className="label">Maximum Members per Team *</label>
            <input
                className="input"
                type="number"
                name="maxTeamSize"
                value={form.maxTeamSize}
                onChange={handleChange(setForm)}
                required
            />
        </div>

        <div className="field">
            <label className="label">Team Members Must Be From *</label>
            <div className="select is-fullwidth">
                <select name="teamCondition" value={form.teamCondition} onChange={handleChange(setForm)} required>
                <option value="">-- Please Choose --</option>
                <option value="sameAssociation">Same Association</option>
                <option value="sameRegion">Same Region</option>
                <option value="sameCountry">Same Country</option>
                <option value="any">Any</option>
                </select>
            </div>
        </div>

        <div className="field">
            <label className="label">Team Coach *</label>
            <div className="select is-fullwidth">
                <select
                    name="teamCoach"
                    value={form?.teamCoach ? form?.teamCoach : 'Mand'}
                    onChange={(e) => setForm((prev: ContestForm) => ({
                        ...prev,
                        teamCoach: e.target.value,
                    }))}
                    required
                >
                    <option value="Mand">Coach is mandatory</option>
                    <option value="Opt">Coach is optional</option>
                    <option value="No">No need to coach</option>
                </select>
            </div>
        </div>


        <div className="buttons mt-4">
            <button className="button" onClick={() => setStep(currentStep-1)}>Back</button>
            <button className="button is-primary" onClick={() => {
                console.log(form)
                const errors = validateContestStep("validateTeamSetUp", form);
                if (errors.length) return alert(errors.join("\n"));
                setStep(currentStep+1);
            }}>Next</button>
        </div>
    </div>
  );
}

function ExternalContestInfo({ form, setForm, setStep, currentStep }: any) {
  return (
    <div className="box">
        <h2 className="title is-3 has-text-centered">External Contest Info</h2>

        <div className="field">
            <label className="label">External Contest Link (optional)</label>
            <input
                className="input"
                type="url"
                name="externalLink"
                placeholder="https://example.com"
                value={form.externalLink}
                onChange={handleChange(setForm)}
            />
        </div>

        <div className="field">
            <label className="label">Message (Markdown, optional)</label>
            <textarea
                className="textarea"
                name="externalMessage"
                placeholder="Enter instructions or details in markdown..."
                value={form.externalMessage}
                onChange={handleChange(setForm)}
            />
            <p className="help mt-2"><strong>Preview:</strong></p>
            <div className="content box" style={{ minHeight: '100px' }}>
                <ReactMarkdown>{form.externalMessage}</ReactMarkdown>
            </div>
        </div>

        <div className="buttons mt-4">
            <button className="button" onClick={() => setStep(currentStep-1)}>Back</button>
            <button className="button is-primary" onClick={() => {
                // const errors = validateContestStep(currentStep, form);
                // if (errors.length) return alert(errors.join("\n"));
                setStep(currentStep+1);
            }}>Next</button>
        </div>
    </div>
  );
}

function ContestStandingRateMechanism({ form, setForm, setStep, currentStep }: any) {
  return (
    <div className="box">
        <h2 className="title is-3 has-text-centered">Standing & Rate Mechanism</h2>

        <div className="field">
            <label className="label">Enable Penalty? *</label>
            <div className="select is-fullwidth">
                <select
                    name="hasPenalty"
                    value={form.hasPenalty ? 'true' : 'false'}
                    onChange={(e) => setForm((prev: ContestForm) => ({
                        ...prev,
                        hasPenalty: e.target.value === 'true',
                    }))}
                    required
                >
                <option value="true">Yes</option>
                <option value="false">No</option>
                </select>
            </div>
        </div>

        <div className="field">
            <label className="label">Contest Rate Method *</label>
            <div className="select is-fullwidth">
                <select name="rateMethod" value={form.rateMethod} onChange={handleChange(setForm)} required>
                <option value="">-- Please Choose --</option>
                <option value="timestamp">Timestamp</option>
                <option value="correctSubmissions">Correct Submissions</option>
                </select>
            </div>
        </div>

        <div className="field">
            <label className="label">Result Visibility *</label>
            <div className="select is-fullwidth">
                <select name="resultVisibility" value={form.resultVisibility} onChange={handleChange(setForm)} required>
                <option value="">-- Please Choose --</option>
                <option value="realTime">Updated in Real-Time</option>
                <option value="endOfContest">At End of Contest</option>
                </select>
            </div>
        </div>

        <div className="field">
            <label className="label">Final Results Publishing *</label>
            <div className="select is-fullwidth">
                <select name="resultPublishing" value={form.resultPublishing} onChange={handleChange(setForm)} required>
                <option value="">-- Please Choose --</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
                </select>
            </div>
        </div>

        <div className="field">
            <label className="label">Standing Status System *</label>
            <div className="control">
                <label className="radio">
                    <input
                        type="radio"
                        name="standingStyle"
                        value="text"
                        checked={form.standingStyle === 'text'}
                        onChange={handleChange(setForm)}
                    />
                    {' '}Accepted, Pending, Review, Wrong Answer
                </label>
                <br />
                <label className="radio">
                    <input
                        type="radio"
                        name="standingStyle"
                        value="numbers"
                        checked={form.standingStyle === 'numbers'}
                        onChange={handleChange(setForm)}
                    />
                    {' '}1, 0, -1
                </label>
                <br />
                <label className="radio">
                    <input
                        type="radio"
                        name="standingStyle"
                        value="colorsFull"
                        checked={form.standingStyle === 'colorsFull'}
                        onChange={handleChange(setForm)}
                    />
                    {' '}Green, Red, White, Purple
                </label>
                <br />
                <label className="radio">
                    <input
                        type="radio"
                        name="standingStyle"
                        value="colorsSimple"
                        checked={form.standingStyle === 'colorsSimple'}
                        onChange={handleChange(setForm)}
                    />
                    {' '}Green, Red, White
                </label>
            </div>
        </div>

        <div className="buttons mt-4">
        <button className="button" onClick={() => setStep(currentStep-1)}>Back</button>
        <button className="button is-primary" onClick={() => {
            const errors = validateContestStep("validateRateMechanism", form);
            if (errors.length) return alert(errors.join("\n"));
            setStep(currentStep+1);
        }}>Next</button>
        </div>
    </div>
  );
}

function ContestQAType({ form, setForm, setStep, currentStep }: any) {
  return (
    <div className="box">
        <h2 className="title is-3 has-text-centered">Question Type</h2>

        <div className="field">
            <label className="label">Select Question Type *</label>
            <div className="select is-fullwidth">
                <select name="questionType" value={form.questionType} onChange={handleChange(setForm)} required>
                <option value="">-- Please Choose --</option>
                {/* <option value="form">Form</option> */}
                <option value="file">File Upload</option>
                <option value="mcq">Multiple Choice Questions</option>
                </select>
            </div>
        </div>

        <div className="buttons mt-4">
            <button className="button" onClick={() => setStep(currentStep-1)}>Back</button>
            <button className="button is-primary" onClick={() => {
                const errors = validateContestStep("validateQAType", form);
                if (errors.length) return alert(errors.join("\n"));
                setStep(currentStep+1);
            }}>Next</button>
        </div>
    </div>
  );
}


export {
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
}