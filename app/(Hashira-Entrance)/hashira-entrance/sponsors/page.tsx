'use client';
import { useEffect, useState } from 'react';
import SponsorModal from '@/components/SponsorModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faXTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<any | null>(null);
  const [mode, setMode] = useState<string>('');


  const fetchSponsors = async () => {
    const res = await fetch('/api/sponsors');
    if (res.ok) {
      const data = await res.json();
      setSponsors(data);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);


  const handleDeleteSponsor = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sponsor?')) return;

    const res = await fetch(`/api/sponsors/${id}`, { method: 'DELETE' });

    if (res.ok) {
      setSponsors((prev:any) => prev.filter((s:any) => s?._id !== id)); // Update UI
    } else {
      alert('Failed to delete sponsor.');
    }
  };

  const handleEditSponsor = (sponsor: any) => {
    setEditingSponsor(sponsor);
    setMode("Edit")
    setShowModal(true);
  };

  const handleAddSponsor = () => {
    setMode("Add")
    setShowModal(true);
  };

  return (
    <div className="container my-6">
      <h1 className="title is-3">Sponsors</h1>

      <div className="buttons is-right">
          <button className="button is-primary" onClick={() => handleAddSponsor()}>
            Add Sponsor
          </button>
      </div>
      

      <div className="mt-4">
        {sponsors.length === 0 ? (
          <p>No sponsors yet.</p>
        ) : (
          <div className="columns is-2 is-multiline">
            {sponsors.map((s: any) => (
                <div className="column is-4" key={s._id}>
                    <article className="box media">
                        <figure className="media-left">
                            <div className="image is-128x128 is-128x128 is-flex is-justify-content-center">
                                <img src={s.logo} alt={s.companyName} />
                            </div>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <div className="tags has-addons mb-1" style={{opacity: '0.8'}}>
                                    <span className="tag is-dark" style={{fontSize: '10px'}}>Type</span>
                                    <span className="tag is-primary" style={{fontSize: '10px'}}>{s.isGeneral ? "General Sponsor" : "Private Sponsor"}</span>
                                </div>
                                <p dir='auto' className='is-size-5 has-text-weight-semibold mb-1'>{s.companyName}</p>
                                <p dir='auto' className='has-text-weight-medium clamp-2 mb-1'>{s.description}</p>
                                <div className='mb-1'>
                                    {s.website && <a href={s.website} target="_blank"><FontAwesomeIcon icon={faGlobe} /></a>}
                                    {s.facebook && <> | <a href={s.facebook} target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a></>}
                                    {s.twitter && <> | <a href={s.twitter} target="_blank"><FontAwesomeIcon icon={faXTwitter} /></a></>}
                                    {s.linkedin && <> | <a href={s.linkedin} target="_blank"><FontAwesomeIcon icon={faLinkedinIn} /></a></>}
                                </div>
                                <div className="columns is-1 is-multiline">
                                    <div className='column is-one-third'>
                                        <button className="button is-small is-danger is-meduim is-fullwidth" onClick={() => handleDeleteSponsor(s._id)}>Delete</button>
                                    </div>
                                    <div className='column is-two-thirds'>
                                        <button className="button is-small is-warning is-meduim is-fullwidth" onClick={() => handleEditSponsor(s)}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            ))}
          </div>
        )}
      </div>

      {showModal && mode=="Add" && (
        <SponsorModal 
          onClose={
            () => {
              setShowModal(false);
              setMode('');
            }
          } 
          onSucess={
            () => {
              fetchSponsors(); // refresh list
            }
          }
          mode={mode}
          preList={{}}
        />
      )}

      {showModal && mode=="Edit" && editingSponsor && (
        <SponsorModal
          onClose={
            () => {
              setShowModal(false);
              setMode('');
            }
          } 
          onSucess={
            () => {
              fetchSponsors(); // refresh list
            }
          }
          mode={mode}
          preList={{
            editingSponsor,
            setSponsors,
            setEditingSponsor
          }}
        />
      )}
    </div>
  );
}
