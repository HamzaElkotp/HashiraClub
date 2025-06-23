import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="container mt-6 mb-6">
      <h1 className="title">Dashboard</h1>
      <div className="box">
        <p>Welcome to the dashboard. Choose an option below:</p>
        <div className="buttons mt-4">
          <Link href="/contests" className="button is-primary">
            Go to contest System
          </Link>
          <Link href="/sponsors" className="button is-primary">
            Go to Sponsors System
          </Link>
          <Link href="/associations" className="button is-primary">
            Go to Association System
          </Link>
          <Link href="/contestCategories" className="button is-primary">
            Go to Contest Categories System
          </Link>
        </div>
      </div>
    </div>
  );
}
