function YearChart({ yearCounts }) {
  const busiestYearCount = Math.max(...yearCounts.map((entry) => entry.count));

  return (
    <section className="year-chart">
      <h2 className="year-chart__title">Gigs per year</h2>
      {yearCounts.map(({ year, count }) => (
        <div className="year-chart__row" key={year}>
          <span className="year-chart__year">{year}</span>
          <div className="year-chart__track">
            <div className="year-chart__bar" style={{ width: `${(count / busiestYearCount) * 100}%` }} />
          </div>
          <span className="year-chart__count">{count}</span>
        </div>
      ))}
    </section>
  );
}

export default YearChart;
