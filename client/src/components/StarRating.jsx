const STAR_COUNT = 5;

function StarRating({ value, onChange }) {
  const currentRating = value || 0;
  const isEditable = Boolean(onChange);

  if (!isEditable && currentRating === 0) {
    return <p className="star-rating__empty">Not rated yet</p>;
  }

  const starNumbers = Array.from({ length: STAR_COUNT }, (_, index) => index + 1);

  return (
    <div className="star-rating">
      {starNumbers.map((starNumber) => {
        const starClass = `star ${starNumber <= currentRating ? 'star--filled' : ''}`;

        if (!isEditable) {
          return (
            <span key={starNumber} className={starClass}>
              ★
            </span>
          );
        }

        return (
          <button
            key={starNumber}
            type="button"
            className={`${starClass} star--button`}
            aria-label={`Rate ${starNumber} out of ${STAR_COUNT}`}
            onClick={() => onChange(starNumber === currentRating ? 0 : starNumber)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
