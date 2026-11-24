const tallyValues = (values) =>
  values.reduce((tally, value) => {
    tally[value] = (tally[value] || 0) + 1;
    return tally;
  }, {});

export const findMostFrequent = (values) => {
  const tallyEntries = Object.entries(tallyValues(values));
  if (tallyEntries.length === 0) return null;
  const highestCount = Math.max(...tallyEntries.map(([, count]) => count));
  const leaders = tallyEntries.filter(([, count]) => count === highestCount).map(([value]) => value);
  return { leaders, count: highestCount };
};

export const describeFavourite = (mostFrequent) => {
  if (mostFrequent.count === 1) {
    return { value: 'No repeats yet', detail: 'everything seen once so far' };
  }
  const times = `${mostFrequent.count} times`;
  if (mostFrequent.leaders.length === 1) {
    return { value: mostFrequent.leaders[0], detail: times };
  }
  return { value: mostFrequent.leaders.join(' & '), detail: `tied on ${times} each` };
};

export const calculateAverageRating = (gigs) => {
  const ratedGigs = gigs.filter((gig) => gig.rating);
  if (ratedGigs.length === 0) return null;
  const ratingTotal = ratedGigs.reduce((total, gig) => total + gig.rating, 0);
  return (ratingTotal / ratedGigs.length).toFixed(1);
};

export const countGigsByYear = (gigs) => {
  const years = gigs.map((gig) => new Date(gig.date).getUTCFullYear());
  return Object.entries(tallyValues(years))
    .map(([year, count]) => ({ year, count }))
    .sort((first, second) => second.year - first.year);
};
