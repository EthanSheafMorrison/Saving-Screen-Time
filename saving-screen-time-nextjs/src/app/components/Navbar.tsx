import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <Link href="/" className="nav-logo">
        Saving Screen Time
      </Link>
      <div className="nav-links">
        <Link href="/about">About</Link>
        <Link href="/archive">Archive</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
