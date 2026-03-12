import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <Link href="/" className="nav-logo">
        Saving Screen Time
      </Link>
      <div className="nav-links">
        <Link href="/publications">Publications</Link>
        <Link href="/team">Team</Link>
        <Link href="/current-study">Current Study</Link>
      </div>
    </nav>
  );
}
