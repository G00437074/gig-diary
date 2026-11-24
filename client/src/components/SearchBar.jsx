function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder="Search by artist, venue or city"
      aria-label="Search gigs"
      value={searchTerm}
      onChange={(event) => onSearchChange(event.target.value)}
    />
  );
}

export default SearchBar;
