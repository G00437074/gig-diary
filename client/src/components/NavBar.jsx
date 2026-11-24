import { NavLink } from 'react-router-dom';

const navigationLinks = [
  { path: '/', label: 'My Gigs' },
  { path: '/add', label: 'Add Gig' },
  { path: '/stats', label: 'Stats' }
];

function NavBar() {
  return (
    <nav className="nav-bar">
      <NavLink to="/" className="nav-bar__brand">
        Gig Diary
      </NavLink>
      <div className="nav-bar__links">
        {navigationLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end
            className={({ isActive }) => `nav-bar__link ${isActive ? 'nav-bar__link--active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
