const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

const startOfToday = () => {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
};

const startOfGigDay = (gigDate) => {
  const date = new Date(gigDate);
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
};

export const daysUntilGig = (gigDate) =>
  Math.round((startOfGigDay(gigDate) - startOfToday()) / MILLISECONDS_PER_DAY);

export const isUpcomingGig = (gigDate) => daysUntilGig(gigDate) >= 0;

export const describeCountdown = (daysAway) => {
  if (daysAway === 0) return 'Tonight!';
  if (daysAway === 1) return 'Tomorrow';
  return `${daysAway} days to go`;
};

export const isOnThisDay = (gigDate) => {
  const date = new Date(gigDate);
  const today = new Date();
  return (
    date.getUTCDate() === today.getDate() &&
    date.getUTCMonth() === today.getMonth() &&
    date.getUTCFullYear() < today.getFullYear()
  );
};

export const toDateInputValue = (gigDate) => new Date(gigDate).toISOString().slice(0, 10);

export const formatShortMonth = (gigDate) =>
  new Date(gigDate).toLocaleDateString('en-IE', { month: 'short', timeZone: 'UTC' });
