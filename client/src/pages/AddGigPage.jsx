import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GigForm from '../components/GigForm';
import { createGig } from '../api/gigApi';

function AddGigPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreate = async (gigDetails) => {
    try {
      await createGig(gigDetails);
      navigate('/');
    } catch {
      setErrorMessage('The gig could not be saved. Check the details and try again.');
    }
  };

  return (
    <section className="page page--narrow">
      <header className="page__header">
        <h1>Add a Gig</h1>
        <p className="page__subtitle">Been to one, or got tickets for one? Log it here.</p>
      </header>
      {errorMessage && <p className="status-message status-message--error">{errorMessage}</p>}
      <GigForm submitLabel="Save gig" onSubmit={handleCreate} />
    </section>
  );
}

export default AddGigPage;
