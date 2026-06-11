/* Heads Up — Team page sections.
   Leadership and advisors in a divider-led editorial layout.
   Uses site.css + extras.css (.sec-head, .casc, .quote-row). */

const LEADERSHIP = [
  { init: 'BD', name: 'Brinton Donn',    role: 'Founder & Executive Director', bio: 'Started Heads Up in 2020 after noticing the silent screen-time crisis at his own high school. Now leads strategy, partnerships, and national expansion.' },
  { init: 'AK', name: 'Avery Kim',        role: 'Director of Programs',          bio: 'Oversees the mentor program, curriculum development, and chapter onboarding. Joined as a club president in year one.' },
  { init: 'JP', name: 'Jordan Park',      role: 'Director of Partnerships',      bio: 'Manages foundation relationships, grant applications, and corporate sponsor activation for Heads Up nationwide.' },
  { init: 'ML', name: 'Maya Lim',         role: 'Head of Chapter Operations',    bio: 'Supports chapter founders from registration to their first meeting — and keeps 40+ active clubs connected and resourced.' },
  { init: 'RS', name: 'Riley Singh',      role: 'Lead Curriculum Designer',      bio: 'Researches, writes, and iterates on the eight-module digital wellness curriculum used by every Heads Up club.' },
  { init: 'TC', name: 'Taylor Chen',      role: 'Community & Events Manager',    bio: 'Plans regional summits, virtual meetups, and the annual national gathering. Alumni of the original Newport Beach chapter.' },
];

const ADVISORS = [
  { init: 'DM', name: 'Dr. Dana Moore',   role: 'Adolescent Psychologist · Advisory Board',          bio: 'Specialist in teen technology use and mental health. Advises on curriculum accuracy and program safety.' },
  { init: 'PR', name: 'Prof. P. Ramos',   role: 'Education Researcher · Advisory Board',             bio: 'Studies peer-influence models in schools. Helps Heads Up measure and communicate program impact.' },
  { init: 'LN', name: 'Leila Nazari',     role: 'Youth Nonprofit Executive · Advisory Board',        bio: '20 years building student-led nonprofits. Advises on governance, fundraising, and sustainable growth.' },
];

function TeamHero() {
  return (
    <header className="phero" id="top">
      <div className="wrap">
        <div className="kicker-row">
          <Sticker tone="cobalt" tilt="tilt-l" icon="users">Team</Sticker>
          <span className="hand">the people behind the movement</span>
        </div>
        <h1>Built by students. <DrawHL>Run by students.</DrawHL></h1>
        <p className="lead">Every person at Heads Up either started as a club member or joined because they believe deeply in what peer-led change can do. Meet the team keeping the lights on.</p>
      </div>
    </header>
  );
}

function MemberCard({ m, accentIdx }) {
  const accents = ['var(--cobalt-500)', 'var(--moss)', 'var(--cobalt-700)', 'var(--sky-400)', 'var(--moss-700)', 'var(--cobalt-400)'];
  const bg = accents[accentIdx % accents.length];
  return (
    <div style={{ paddingTop: 28, paddingBottom: 28, borderBottom: '1.5px solid var(--divider)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
        <div style={{ width: 48, height: 48, borderRadius: '999px', background: bg, color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, flexShrink: 0, border: '2px solid var(--ink-900)' }}>
          {m.init}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, letterSpacing: '-.01em', color: 'var(--ink-900)', lineHeight: 1.1 }}>{m.name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--cobalt-600)', marginTop: 6 }}>{m.role}</div>
          <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-600)', margin: '10px 0 0', maxWidth: '38ch' }}>{m.bio}</p>
        </div>
      </div>
    </div>
  );
}

function Leadership() {
  return (
    <section className="section" id="leadership">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tone="cobalt" tilt="tilt-r" icon="users">Leadership</Sticker></div>
          <h2>The core team.</h2>
          <p className="sub">Full-time and part-time leaders keeping Heads Up running — all of whom started as students.</p>
        </Reveal>
        <div style={{ borderTop: '1.5px solid var(--ink-900)' }}>
          <Cascade style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 56px' }} step={60}>
            {LEADERSHIP.map((m, i) => <MemberCard key={m.name} m={m} accentIdx={i} />)}
          </Cascade>
        </div>
      </div>
    </section>
  );
}

function Advisors() {
  return (
    <section className="section" id="advisors" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tilt="tilt-l2" icon="sparkles">Advisory board</Sticker></div>
          <h2>Expert voices behind the work.</h2>
          <p className="sub">Researchers, clinicians, and nonprofit leaders who keep us honest, rigorous, and growing.</p>
        </Reveal>
        <div style={{ borderTop: '1.5px solid var(--ink-900)' }}>
          <Cascade style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0 56px' }} step={70}>
            {ADVISORS.map((m, i) => <MemberCard key={m.name} m={m} accentIdx={i + 2} />)}
          </Cascade>
        </div>
      </div>
    </section>
  );
}

function TeamJoin() {
  return (
    <section className="section" id="join" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal>
          <div className="mission">
            <img className="bgmark" src="../../assets/logo-mark-white.png" alt="" aria-hidden="true" />
            <div className="eyebrow">Join the team</div>
            <h2>We're always looking for motivated students.</h2>
            <p className="mtext">
              Heads Up grows because students step up. If you want to go beyond running a club and help build the <strong>organization itself</strong> — reach out.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
              <a href="https://www.headsupclubs.org" target="_blank" rel="noopener">
                <Button variant="white" size="lg" iconRight="arrowRight">Get in touch</Button>
              </a>
              <a href="initiatives.html">
                <Button variant="secondary" size="lg">See our programs</Button>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { TeamHero, Leadership, Advisors, TeamJoin });
