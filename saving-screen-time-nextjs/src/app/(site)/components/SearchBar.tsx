'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar({ onSubmit }: { onSubmit?: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setQuery('');
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="nav-search" role="search">
      <input
        type="search"
        placeholder="Search"
        aria-label="Search site"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="nav-search-input"
      />
    </form>
  );
}
