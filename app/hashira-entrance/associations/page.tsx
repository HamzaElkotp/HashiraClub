'use client';
import { useEffect, useState } from 'react';
import AssociationModal from '@/components/AssociationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faLocationArrow, faUserAlt } from '@fortawesome/free-solid-svg-icons'

export default function AssociationsPage() {
  const [associations, setAssociations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAssociation, setEditingAssociation] = useState<any | null>(null);
  const [mode, setMode] = useState<string>('');


  const fetchAssociations = async () => {
    const res = await fetch('/api/associations');
    if (res.ok) {
      const data = await res.json();
      setAssociations(data);
    }
  };

  useEffect(() => {
    fetchAssociations();
  }, []);


  const handleDeleteAssociation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this association?')) return;

    const res = await fetch(`/api/associations/${id}`, { method: 'DELETE' });

    if (res.ok) {
      setAssociations((prev:any) => prev.filter((s:any) => s?._id !== id)); // Update UI
    } else {
      alert('Failed to delete association.');
    }
  };

  const handleEditAssociation = (association: any) => {
    setEditingAssociation(association);
    setMode("Edit")
    setShowModal(true);
  };

  const handleAddAssociation = () => {
    setMode("Add")
    setShowModal(true);
  };

  return (
    <div className="container my-6">
      <h1 className="title is-3">Associations</h1>

      <div className="buttons is-right">
          <button className="button is-primary" onClick={() => handleAddAssociation()}>
            Add Association
          </button>
      </div>
      

      <div className="mt-4">
        {associations.length === 0 ? (
          <p>No associations yet.</p>
        ) : (
          <div className="columns is-2 is-multiline">
            {associations.map((s: any) => (
                <div className="column is-6" key={s._id}>
                    <article className="box media">
                        <figure className="media-left">
                            <div className="image is-128x128 is-flex is-justify-content-center">
                                <img src={s.logo} alt={s.associationName} />
                            </div>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <div className="is-flex">
                                    <div className="tags has-addons mb-1" style={{opacity: '0.8'}}>
                                        <span className="tag is-dark" style={{fontSize: '10px'}}><FontAwesomeIcon icon={faLocationArrow} /></span>
                                        <span className="tag is-primary" style={{fontSize: '10px'}}>{s.location}</span>
                                    </div>
                                    <div className="tags ml-2 has-addons mb-1" style={{opacity: '0.8'}}>
                                        <span className="tag is-dark" style={{fontSize: '10px'}}><FontAwesomeIcon icon={faUserAlt} /></span>
                                        <span className="tag is-primary" style={{fontSize: '10px'}}>{s.coachID}</span>
                                    </div>
                                    <div className='ml-2 mb-1'>
                                        {s.website && <a href={s.website} target="_blank"><FontAwesomeIcon icon={faGlobe} /></a>}
                                    </div>
                                </div>
                                <p dir='auto' className='is-size-5 has-text-weight-semibold mb-1'>{s.associationName}</p>
                                <p dir='auto' className='has-text-weight-medium clamp-2 mb-1'>{s.description}</p>
                                <div className="columns is-1 is-multiline">
                                    <div className='column is-one-quarter'>
                                        <button className="button is-small is-danger is-meduim is-fullwidth" onClick={() => handleDeleteAssociation(s._id)}>Delete</button>
                                    </div>
                                    <div className='column is-three-quarters'>
                                        <button className="button is-small is-warning is-meduim is-fullwidth" onClick={() => handleEditAssociation(s)}>Edit</button>
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
        <AssociationModal 
          onClose={
            () => {
              setShowModal(false);
              setMode('');
            }
          } 
          onSucess={
            () => {
              fetchAssociations(); // refresh list
            }
          }
          mode={mode}
          preList={{}}
        />
      )}

      {showModal && mode=="Edit" && editingAssociation && (
        <AssociationModal
          onClose={
            () => {
              setShowModal(false);
              setMode('');
            }
          } 
          onSucess={
            () => {
              fetchAssociations(); // refresh list
            }
          }
          mode={mode}
          preList={{
            editingAssociation,
            setAssociations,
            setEditingAssociation
          }}
        />
      )}
    </div>
  );
}
