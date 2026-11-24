const tallyValues = (values) =>
  values.reduce((tally, value) => {
    tally[value] = (tally[value] || 0) + 1;
    return tally;
  }, {});

export const findMostFrequent = (values) => {
  const rankedEntries = Object.entries(tallyValues(values)).sort(
    (first, second) => second[1] - first[1]
  );
  if (rankedEntries.length === 0) return null;
  const [value, count] = rankedEntries[0];
  return { value, count };
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
