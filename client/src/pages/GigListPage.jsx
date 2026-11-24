import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GigCard from '../components/GigCard';
import SearchBar from '../components/SearchBar';
import OnThisDay from '../components/OnThisDay';
import { fetchAllGigs, deleteGig } from '../api/gigApi';
import { isUpcomingGig } from '../utils/gigDates';

const viewTabs = [
  { id: 'upcoming', label: 'Upcoming', emptyText: 'No upcoming gigs. Got tickets for something?' },
  { id: 'past', label: 'Past gigs', emptyText: 'No past gigs logged yet.' }
];

const matchesSearch = (gig, searchTerm) => {
  const normalisedSearch = searchTerm.trim().toLowerCase();
  return [gig.artist, gig.venue, gig.city].some((field) => field.toLowerCase().includes(normalisedSearch));
};

function GigListPage() {
  const [gigs, setGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTabId, setActiveTabId] = useState('upcoming');

  useEffect(() => {
    fetchAllGigs()
      .then(setGigs)
      .catch(() => setErrorMessage('Could not reach the server. Is it running on port 4000?'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (gigId) => {
    try {
      await deleteGig(gigId);
      setGigs((currentGigs) => currentGigs.filter((gig) => gig._id !== gigId));
    } catch {
      setErrorMessage('That gig could not be deleted. Please try again.');
    }
  };

  const matchingGigs = gigs.filter((gig) => matchesSearch(gig, searchTerm));
  const gigsByTab = {
    upcoming: matchingGigs
      .filter((gig) => isUpcomingGig(gig.date))
      .sort((first, second) => new Date(first.date) - new Date(second.date)),
    past: matchingGigs.filter((gig) => !isUpcomingGig(gig.date))
  };
  const activeTab = viewTabs.find((tab) => tab.id === activeTabId);
  const visibleGigs = gigsByTab[activeTabId];

  return (
    <section className="page">
      <header className="page__header">
        <h1>My Gigs</h1>
        <p className="page__subtitle">
          {gigs.length} {gigs.length === 1 ? 'gig' : 'gigs'} in the diary
        </p>
      </header>

      <OnThisDay gigs={gigs} />

      <div className="toolbar">
        <div className="tabs">
          {viewTabs.map((tab) => (
            <button
              key={tab.id}
              className={`tabs__button ${tab.id === activeTabId ? 'tabs__button--active' : ''}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.label} <span className="tabs__count">{gigsByTab[tab.id].length}</span>
            </button>
          ))}
        </div>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {isLoading && <p className="status-message">Loading your gigs…</p>}
      {errorMessage && <p className="status-message status-message--error">{errorMessage}</p>}

      {!isLoading && !errorMessage && visibleGigs.length === 0 && (
        <div className="empty-state">
          <p>{searchTerm ? 'No gigs match your search.' : activeTab.emptyText}</p>
          <Link to="/add" className="button button--primary">
            Add a gig
          </Link>
        </div>
      )}

      <div className="gig-list">
        {visibleGigs.map((gig) => (
          <GigCard key={gig._id} gig={gig} onDelete={handleDelete} />
        ))}
      </div>
    </section>
  );
}

export default GigListPage;
