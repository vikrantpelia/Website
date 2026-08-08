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
    return <span style={{ width: '4.25rem', height: '1rem', display: 'inline-block' }} />;
  }

  return (
    <button
      role="switch"
      aria-checked={dark}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
      className="tap-target"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '0.35rem',
        width: '4.25rem',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '2px',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.6875rem',
        fontWeight: '500',
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
      }}
    >
      <span aria-hidden="true">{dark ? '◑' : '◐'}</span>
      <span>{dark ? 'Dark' : 'Light'}</span>
    </button>
  );
}
