/* Heads Up — Team page */

/* ── Update names/roles/initials below to match the real roster ── */
const LEADERSHIP = [
  { name: 'Diana Bishopp',  role: 'Founder & Chair',               init: 'DB' },
  { name: 'First Last',     role: 'Executive Director',             init: 'FL' },
  { name: 'First Last',     role: 'Chief Marketing Officer',        init: 'FL' },
  { name: 'First Last',     role: 'Chief Financial Officer',        init: 'FL' },
  { name: 'First Last',     role: 'Chief Communications Officer',   init: 'FL' },
  { name: 'First Last',     role: 'Chief Strategy Officer',         init: 'FL' },
];

const DIRECTORS = [
  { name: 'First Last', role: 'Director of Strategy',        init: 'FL' },
  { name: 'First Last', role: 'Director of Finance',         init: 'FL' },
  { name: 'First Last', role: 'Director of Finance',         init: 'FL' },
  { name: 'First Last', role: 'Director of Marketing',       init: 'FL' },
  { name: 'First Last', role: 'Director of Marketing',       init: 'FL' },
  { name: 'First Last', role: 'Director of Technology',      init: 'FL' },
  { name: 'First Last', role: 'Director of Communications',  init: 'FL' },
  { name: 'First Last', role: 'Director of Communications',  init: 'FL' },
  { name: 'First Last', role: 'Director of Strategy',        init: 'FL' },
  { name: 'First Last', role: 'Director of Finance',         init: 'FL' },
  { name: 'First Last', role: 'Director of Marketing',       init: 'FL' },
  { name: 'First Last', role: 'Director of Technology',      init: 'FL' },
  { name: 'First Last', role: 'Technology & Finance',        init: 'FL' },
  { name: 'First Last', role: 'Technology & Finance',        init: 'FL' },
];

function MemberCard({ name, role, init }) {
  return (
    <div className="team-card">
      <div className="team-photo">
        <span className="team-init">{init}</span>
      </div>
      <div className="team-name">{name}</div>
      <div className="team-role">{role}</div>
    </div>
  );
}

function TeamHero() {
  return (
    <header className="phero" id="top">
      <div className="wrap">
        <Reveal>
          <div className="kicker-row">
            <Sticker tone="cobalt" tilt="tilt-l" icon="users">The team</Sticker>
          </div>
          <h1>Youth <DrawHL>for youth.</DrawHL></h1>
          <p className="lead">Every person on this team is a student — building the movement from the inside.</p>
        </Reveal>
      </div>
    </header>
  );
}

function TeamSection() {
  return (
    <section className="section team-section">
      <div className="wrap">

        <div className="team-tier">
          <div className="team-tier-head">
            <span className="eyebrow">Leadership</span>
          </div>
          <Cascade className="team-grid team-grid-leaders" step={70}>
            {LEADERSHIP.map((m, i) => <MemberCard key={i} {...m} />)}
          </Cascade>
        </div>

        <div className="team-tier">
          <div className="team-tier-head">
            <span className="eyebrow">Directors</span>
          </div>
          <Cascade className="team-grid team-grid-directors" step={50}>
            {DIRECTORS.map((m, i) => <MemberCard key={i} {...m} />)}
          </Cascade>
        </div>

        <div className="team-alumni">
          <span className="eyebrow" style={{ color: 'var(--ink-400)' }}>Also</span>
          <a className="textlink" href="#">
            Meet our Alumni <Icon name="arrowRight" size={14} />
          </a>
          <span className="team-youth-tag">Youth for youth</span>
        </div>

      </div>
    </section>
  );
}

window.TeamHero = TeamHero;
window.TeamSection = TeamSection;
