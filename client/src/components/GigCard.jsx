import { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { daysUntilGig, describeCountdown, formatShortMonth } from '../utils/gigDates';

function GigCard({ gig, onDelete }) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const gigDate = new Date(gig.date);
  const daysAway = daysUntilGig(gig.date);
  const isUpcoming = daysAway >= 0;

  return (
    <article className={`gig-card ${isUpcoming ? 'gig-card--upcoming' : ''}`}>
      <div className="gig-card__date">
        <span className="gig-card__day">{gigDate.getUTCDate()}</span>
        <span className="gig-card__month">{formatShortMonth(gig.date)}</span>
        <span className="gig-card__year">{gigDate.getUTCFullYear()}</span>
      </div>

      <div className="gig-card__body">
        <h3 className="gig-card__artist">{gig.artist}</h3>
        <p className="gig-card__venue">
          {gig.venue} · {gig.city}
        </p>
        {isUpcoming ? (
          <span className="countdown-badge">{describeCountdown(daysAway)}</span>
        ) : (
          <StarRating value={gig.rating} />
        )}
      </div>

      <div className="gig-card__actions">
        {isConfirmingDelete ? (
          <>
            <button className="button button--danger" onClick={() => onDelete(gig._id)}>
              Yes, delete
            </button>
            <button className="button button--ghost" onClick={() => setIsConfirmingDelete(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <Link to={`/edit/${gig._id}`} className="button button--ghost">
              Edit
            </Link>
            <button className="button button--ghost" onClick={() => setIsConfirmingDelete(true)}>
              Delete
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export default GigCard;
