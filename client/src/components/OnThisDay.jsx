import { isOnThisDay } from '../utils/gigDates';

function OnThisDay({ gigs }) {
  const memories = gigs.filter((gig) => isOnThisDay(gig.date));

  if (memories.length === 0) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <aside className="on-this-day">
      <h2 className="on-this-day__title">On this day</h2>
      {memories.map((gig) => {
        const yearsAgo = currentYear - new Date(gig.date).getUTCFullYear();
        return (
          <p key={gig._id}>
            {yearsAgo} {yearsAgo === 1 ? 'year' : 'years'} ago you saw <strong>{gig.artist}</strong> at {gig.venue}.
          </p>
        );
      })}
    </aside>
  );
}

export default OnThisDay;
