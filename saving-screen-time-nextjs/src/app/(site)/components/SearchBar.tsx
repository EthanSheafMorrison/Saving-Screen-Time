'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface SearchResult {
  _id: string;
  _type: 'page' | 'blogPost' | 'publication' | 'mediaItem';
  title: string;
  slug?: { current: string };
  author?: string;
  authors?: string;
  year?: string;
  date?: string;
  outlet?: string;
  link?: string;
  href?: string;
  label?: string;
}

const groupLabels: Record<SearchResult['_type'], string> = {
  page: 'Pages',
  blogPost: 'Blog posts',
  publication: 'Publications',
  mediaItem: 'Press',
};

const groupOrder: SearchResult['_type'][] = [
  'page',
  'blogPost',
  'publication',
  'mediaItem',
];

function resultHref(r: SearchResult): string | null {
  if (r._type === 'page') return r.href ?? null;
  if (r._type === 'blogPost') {
    return r.slug?.current ? `/blog/${r.slug.current}` : null;
  }
  return r.link ?? null;
}

function resultByline(r: SearchResult): string {
  if (r._type === 'page') return r.label ?? '';
  if (r._type === 'blogPost') return r.author ?? '';
  if (r._type === 'publication') return r.authors ?? '';
  if (r._type === 'mediaItem') return r.outlet ?? '';
  return '';
}

export default function SearchBar({ onSubmit }: { onSubmit?: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const trimmed = query.trim();

  // Debounced live fetch as the user types.
  useEffect(() => {
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (!cancelled) {
          setResults(data.results ?? []);
          setActiveIndex(-1);
        }
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 200);

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [trimmed]);

  // Close the dropdown on outside click.
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const goToSearchPage = () => {
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setQuery('');
    setOpen(false);
    onSubmit?.();
  };

  const goToResult = (r: SearchResult) => {
    const href = resultHref(r);
    if (!href) {
      goToSearchPage();
      return;
    }
    if (href.startsWith('/')) {
      router.push(href);
    } else if (typeof window !== 'undefined') {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
    setQuery('');
    setOpen(false);
    onSubmit?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIndex >= 0 && results[activeIndex]) {
      goToResult(results[activeIndex]);
    } else {
      goToSearchPage();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
    }
  };

  const showPanel = open && trimmed.length > 0;
  const hasResults = results.length > 0;

  // Flatten the grouped order back to a single index so keyboard nav lines up
  // with what's rendered.
  let flatIndex = -1;

  return (
    <div className="nav-search" ref={containerRef}>
      <form onSubmit={handleSubmit} role="search" className="nav-search-form">
        <input
          type="search"
          placeholder="Search"
          aria-label="Search site"
          aria-expanded={showPanel}
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className="nav-search-input"
        />
      </form>

      {showPanel && (
        <div className="search-results-panel" role="listbox">
          {loading && !hasResults && (
            <p className="search-results-status">Searching…</p>
          )}

          {!loading && !hasResults && (
            <p className="search-results-status">
              No matches for “{trimmed}”.
            </p>
          )}

          {hasResults &&
            groupOrder.map((type) => {
              const items = results.filter((r) => r._type === type);
              if (items.length === 0) return null;
              return (
                <div className="search-results-group" key={type}>
                  <div className="search-results-group-label">
                    {groupLabels[type]}
                  </div>
                  {items.map((r) => {
                    flatIndex += 1;
                    const idx = flatIndex;
                    const byline = resultByline(r);
                    return (
                      <button
                        type="button"
                        key={r._id}
                        role="option"
                        aria-selected={idx === activeIndex}
                        className={`search-result-item ${
                          idx === activeIndex ? 'active' : ''
                        }`}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => goToResult(r)}
                      >
                        <span className="search-result-title">{r.title}</span>
                        {byline && (
                          <span className="search-result-byline">{byline}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}

          {hasResults && (
            <button
              type="button"
              className="search-results-all"
              onClick={goToSearchPage}
            >
              See all results for “{trimmed}” →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
