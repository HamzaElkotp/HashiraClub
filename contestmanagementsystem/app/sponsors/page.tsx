'use client';
import { useEffect, useState } from 'react';
import SponsorModal from '@/components/SponsorModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import ReactMarkdown from 'react-markdown';

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="container my-6">
      <h1 className="title is-3">Sponsors</h1>

      <button className="button is-primary" onClick={() => setShowModal(true)}>
        Add Sponsor
      </button>

      <div className="mt-4">
        {sponsors.length === 0 ? (
          <p>No sponsors yet.</p>
        ) : (
          <div className="columns is-2 is-multiline">
            {sponsors.map((s: any) => (
                <div className="column is-4" key={s._id}>
                    <article className="box media">
                        <figure className="media-left">
                            <div className="image is-128x128">
                                <img src={s.logo} alt={s.companyName} />
                            </div>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <div className="tags has-addons mb-0" style={{opacity: '0.8'}}>
                                    <span className="tag is-dark" style={{fontSize: '10px'}}>Type</span>
                                    <span className="tag is-primary" style={{fontSize: '10px'}}>{s.isGeneral ? "General Sponsor" : "Private Sponsor"}</span>
                                </div>
                                <p dir='auto' className='is-size-5 has-text-weight-semibold mb-1'>{s.companyName}</p>
                                <p dir='auto' className='has-text-weight-medium clamp-2'>{s.description}</p>
                                <div>
                                    {s.website && <a href={s.website} target="_blank"><FontAwesomeIcon icon={faGlobe} /></a>}
                                    {s.facebook && <> | <a href={s.facebook} target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a></>}
                                    {s.twitter && <> | <a href={s.twitter} target="_blank"><FontAwesomeIcon icon={faXTwitter} /></a></>}
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <SponsorModal onClose={() => {
          setShowModal(false);
          fetchSponsors(); // refresh list
        }} />
      )}
    </div>
  );
}
