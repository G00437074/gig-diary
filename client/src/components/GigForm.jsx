import { useState } from 'react';
import StarRating from './StarRating';

const blankGig = {
  artist: '',
  venue: '',
  city: '',
  date: '',
  rating: 0
};

const buildFormState = (gig) =>
  Object.fromEntries(
    Object.keys(blankGig).map((fieldName) => [fieldName, gig[fieldName] ?? blankGig[fieldName]])
  );

function GigForm({ initialGig = blankGig, submitLabel, onSubmit }) {
  const [gigDetails, setGigDetails] = useState(() => buildFormState(initialGig));
  const [isSaving, setIsSaving] = useState(false);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setGigDetails((currentDetails) => ({ ...currentDetails, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setGigDetails((currentDetails) => ({ ...currentDetails, rating: newRating }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    await onSubmit({ ...gigDetails, rating: gigDetails.rating || null });
    setIsSaving(false);
  };

  return (
    <form className="gig-form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span className="form-field__label">Artist</span>
        <input name="artist" value={gigDetails.artist} onChange={handleFieldChange} placeholder="e.g. Fontaines D.C." required />
      </label>

      <div className="form-row">
        <label className="form-field">
          <span className="form-field__label">Venue</span>
          <input name="venue" value={gigDetails.venue} onChange={handleFieldChange} placeholder="e.g. 3Arena" required />
        </label>
        <label className="form-field">
          <span className="form-field__label">City</span>
          <input name="city" value={gigDetails.city} onChange={handleFieldChange} placeholder="e.g. Dublin" required />
        </label>
      </div>

      <label className="form-field">
        <span className="form-field__label">Date</span>
        <input type="date" name="date" value={gigDetails.date} onChange={handleFieldChange} required />
      </label>

      <div className="form-field">
        <span className="form-field__label">Rating</span>
        <StarRating value={gigDetails.rating} onChange={handleRatingChange} />
        <span className="form-field__hint">Leave empty for gigs you haven't been to yet.</span>
      </div>

      <button type="submit" className="button button--primary" disabled={isSaving}>
        {isSaving ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}

export default GigForm;
