import { useEffect, useState } from 'react';
import StatTile from '../components/StatTile';
import YearChart from '../components/YearChart';
import { fetchAllGigs } from '../api/gigApi';
import { isUpcomingGig } from '../utils/gigDates';
import { findMostFrequent, describeFavourite, calculateAverageRating, countGigsByYear } from '../utils/gigStats';

function StatsPage() {
  const [gigs, setGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAllGigs()
      .then(setGigs)
      .catch(() => setErrorMessage('Could not reach the server. Is it running on port 4000?'))
      .finally(() => setIsLoading(false));
  }, []);

  const pastGigs = gigs.filter((gig) => !isUpcomingGig(gig.date));
  const upcomingCount = gigs.length - pastGigs.length;
  const topArtist = pastGigs.length > 0 && describeFavourite(findMostFrequent(pastGigs.map((gig) => gig.artist)));
  const topVenue = pastGigs.length > 0 && describeFavourite(findMostFrequent(pastGigs.map((gig) => gig.venue)));
  const averageRating = calculateAverageRating(pastGigs);
  const cityCount = new Set(pastGigs.map((gig) => gig.city.toLowerCase())).size;

  return (
    <section className="page">
      <header className="page__header">
        <h1>Stats</h1>
        <p className="page__subtitle">Your gig-going life in numbers.</p>
      </header>

      {isLoading && <p className="status-message">Crunching the numbers…</p>}
      {errorMessage && <p className="status-message status-message--error">{errorMessage}</p>}

      {!isLoading && !errorMessage && pastGigs.length === 0 && (
        <div className="empty-state">
          <p>Your stats will appear once you've logged a gig you've been to.</p>
        </div>
      )}

      {pastGigs.length > 0 && (
        <>
          <div className="stat-grid">
            <StatTile label="Gigs attended" value={pastGigs.length} detail={`${upcomingCount} coming up`} />
            <StatTile label="Most-seen artist" value={topArtist.value} detail={topArtist.detail} />
            <StatTile label="Favourite venue" value={topVenue.value} detail={topVenue.detail} />
            <StatTile
              label="Average rating"
              value={averageRating ? `${averageRating} ★` : '–'}
              detail={averageRating ? 'across rated gigs' : 'no ratings yet'}
            />
            <StatTile label="Cities" value={cityCount} detail="different cities visited" />
          </div>
          <YearChart yearCounts={countGigsByYear(pastGigs)} />
        </>
      )}
    </section>
  );
}

export default StatsPage;
