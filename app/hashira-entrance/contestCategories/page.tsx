'use client';
import { useEffect, useState } from 'react';
import ContestCategoryModal from '@/components/ContestCategoryModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faXTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

export default function ContestCategoriesPage() {
  const [contestCategories, setContestCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingContestCategory, setEditingContestCategory] = useState<any | null>(null);
  const [mode, setMode] = useState<string>('');


  const fetchContestCategories = async () => {
    const res = await fetch('/api/contests/categories');
    if (res.ok) {
      const data = await res.json();
      setContestCategories(data);
    }
  };

  useEffect(() => {
    fetchContestCategories();
  }, []);


  const handleDeleteContestCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contest Category?')) return;

    const res = await fetch(`/api/contests/categories/${id}`, { method: 'DELETE' });

    if (res.ok) {
      setContestCategories((prev:any) => prev.filter((s:any) => s?._id !== id)); // Update UI
    } else {
      alert('Failed to delete contest Category.');
    }
  };

  const handleEditContestCategory = (contestCategory: any) => {
    setEditingContestCategory(contestCategory);
    setMode("Edit")
    setShowModal(true);
  };

  const handleAddContestCategory = () => {
    setMode("Add")
    setShowModal(true);
  };

  return (
    <div className="container my-6">
      <h1 className="title is-3">Contest Categories</h1>

      <div className="buttons is-right">
          <button className="button is-primary" onClick={() => handleAddContestCategory()}>
            Add Contest Category
          </button>
      </div>
      

      <div className="mt-4">
        {contestCategories.length === 0 ? (
          <p>No contest Categories yet.</p>
        ) : (
          <div className="columns is-2 is-multiline">
            {contestCategories.map((s: any) => (
                <div className="column is-4" key={s._id}>
                    <article className="box media">
                        <figure className="media-left">
                            <div className="image is-128x128 is-128x128 is-flex is-justify-content-center">
                                <img src={s.logo} alt={s.name} />
                            </div>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p dir='auto' className='is-size-5 has-text-weight-semibold mb-1'>{s.name}</p>
                                <p dir='auto' className='has-text-weight-medium clamp-2 mb-1'>{s.description}</p>
                                <div className="columns is-1 is-multiline">
                                    <div className='column is-one-third'>
                                        <button className="button is-small is-danger is-meduim is-fullwidth" onClick={() => handleDeleteContestCategory(s._id)}>Delete</button>
                                    </div>
                                    <div className='column is-two-thirds'>
                                        <button className="button is-small is-warning is-meduim is-fullwidth" onClick={() => handleEditContestCategory(s)}>Edit</button>
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
        <ContestCategoryModal 
          onClose={
            () => {
              setShowModal(false);
              setMode('');
            }
          } 
          onSucess={
            () => {
              fetchContestCategories(); // refresh list
            }
          }
          mode={mode}
          preList={{}}
        />
      )}

      {showModal && mode=="Edit" && editingContestCategory && (
        <ContestCategoryModal
          onClose={
            () => {
              setShowModal(false);
              setMode('');
            }
          } 
          onSucess={
            () => {
              fetchContestCategories(); // refresh list
            }
          }
          mode={mode}
          preList={{
            editingContestCategory,
            setContestCategories,
            setEditingContestCategory
          }}
        />
      )}
    </div>
  );
}
