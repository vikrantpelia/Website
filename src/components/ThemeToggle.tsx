import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const html = document.documentElement;
    const next = !dark;

    // Apply transition class, then flip, then remove
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      html.classList.add('theme-transitioning');
      setTimeout(() => html.classList.remove('theme-transitioning'), 200);
    }

    if (next) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    setDark(next);
  }

  if (!mounted) {
    // Render a placeholder the same size to avoid layout shift
    return <span style={{ width: '2rem', height: '1.25rem', display: 'inline-block' }} />;
  }

  return (
    <button
      role="switch"
      aria-checked={dark}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '2px',
        color: 'var(--color-stone)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6875rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
    >
      <span aria-hidden="true">{dark ? '◑' : '◐'}</span>
      <span>{dark ? 'Dark' : 'Light'}</span>
    </button>
  );
}
