function StatTile({ label, value, detail }) {
  return (
    <div className="stat-tile">
      <span className="stat-tile__label">{label}</span>
      <span className="stat-tile__value">{value}</span>
      {detail && <span className="stat-tile__detail">{detail}</span>}
    </div>
  );
}

export default StatTile;
