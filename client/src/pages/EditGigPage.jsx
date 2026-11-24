import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GigForm from '../components/GigForm';
import { fetchGigById, updateGig } from '../api/gigApi';
import { toDateInputValue } from '../utils/gigDates';

function EditGigPage() {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const [gigToEdit, setGigToEdit] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchGigById(gigId)
      .then((gig) => setGigToEdit({ ...gig, date: toDateInputValue(gig.date) }))
      .catch(() => setErrorMessage('That gig could not be found.'));
  }, [gigId]);

  const handleUpdate = async (gigDetails) => {
    try {
      await updateGig(gigId, gigDetails);
      navigate('/');
    } catch {
      setErrorMessage('Your changes could not be saved. Please try again.');
    }
  };

  return (
    <section className="page page--narrow">
      <header className="page__header">
        <h1>Edit Gig</h1>
        <p className="page__subtitle">Add a rating or fix a typo.</p>
      </header>
      {errorMessage && <p className="status-message status-message--error">{errorMessage}</p>}
      {!gigToEdit && !errorMessage && <p className="status-message">Loading gig…</p>}
      {gigToEdit && <GigForm initialGig={gigToEdit} submitLabel="Save changes" onSubmit={handleUpdate} />}
    </section>
  );
}

export default EditGigPage;
