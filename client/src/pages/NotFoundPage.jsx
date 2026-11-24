import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="page page--narrow empty-state">
      <h1>Wrong venue</h1>
      <p>There's no page here.</p>
      <Link to="/" className="button button--primary">
        Back to my gigs
      </Link>
    </section>
  );
}

export default NotFoundPage;
