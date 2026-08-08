/**
 * Placeholder wireframes for the onboarding-flow case study's before/after
 * toggle. These are schematic — built from divs, not screenshots — so the
 * structure and interaction can be reviewed now. Swap for real product
 * screens (as <img>, same aspect box) when they're ready; the toggle itself
 * doesn't need to change.
 */

const chrome = {
  display: 'flex',
  gap: '4px',
  marginBottom: '14px',
} as const;

function ScreenChrome() {
  return (
    <div style={chrome} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: 'var(--border)',
          }}
        />
      ))}
    </div>
  );
}

function FieldRow({ width }: { width: string }) {
  return (
    <div style={{ marginBottom: 10 }} aria-hidden="true">
      <div
        style={{
          width,
          height: 6,
          borderRadius: 2,
          backgroundColor: 'var(--border)',
          marginBottom: 5,
        }}
      />
      <div
        style={{
          height: 20,
          borderRadius: 3,
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg)',
        }}
      />
    </div>
  );
}

export function OldFormWireframe() {
  return (
    <div
      role="img"
      aria-label="Wireframe of the original onboarding form: a single long, unguided screen requesting twelve fields at once."
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '20px 24px',
      }}
    >
      <ScreenChrome />

      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          Credential Request
        </span>
        <span
          style={{
            fontSize: '0.6875rem',
            color: 'var(--text-muted)',
          }}
        >
          12 required fields
        </span>
      </div>

      <div
        aria-hidden="true"
        style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
          maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
        }}
      >
        <FieldRow width="35%" />
        <FieldRow width="50%" />
        <FieldRow width="30%" />
        <FieldRow width="45%" />
        <FieldRow width="40%" />
        <FieldRow width="55%" />
        <FieldRow width="38%" />
        <FieldRow width="48%" />
        <FieldRow width="33%" />
        <FieldRow width="42%" />
      </div>

      <div
        aria-hidden="true"
        style={{
          marginTop: 14,
          height: 28,
          borderRadius: 3,
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        Submit
      </div>
    </div>
  );
}

export function GuidedFlowWireframe() {
  return (
    <div
      role="img"
      aria-label="Wireframe of the redesigned onboarding flow: one guided step at a time, shown here on step 2 of 4, with contextual help text and a single next action."
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '20px 24px',
      }}
    >
      <ScreenChrome />

      <div aria-hidden="true" style={{ marginBottom: 22 }}>
        <div
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: 6,
          }}
        >
          Step 2 of 4
        </div>
        <div
          style={{
            height: 4,
            borderRadius: 2,
            backgroundColor: 'var(--border)',
            overflow: 'hidden',
          }}
        >
          <div style={{ width: '50%', height: '100%', backgroundColor: 'var(--accent)' }} />
        </div>
      </div>

      <div aria-hidden="true" style={{ flex: 1 }}>
        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text)',
            marginBottom: 8,
          }}
        >
          Where is this operator based?
        </div>
        <div
          style={{
            height: 32,
            borderRadius: 3,
            border: '1px solid var(--accent)',
            marginBottom: 10,
          }}
        />
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          We'll use this to route badge approvals to the right site desk.
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 14 }}
      >
        <div
          style={{
            height: 28,
            padding: '0 14px',
            borderRadius: 3,
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          Back
        </div>
        <div
          style={{
            height: 28,
            padding: '0 14px',
            borderRadius: 3,
            backgroundColor: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--bg)',
          }}
        >
          Continue
        </div>
      </div>
    </div>
  );
}
