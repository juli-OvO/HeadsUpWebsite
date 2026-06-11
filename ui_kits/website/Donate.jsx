/* Heads Up — Donate page sections.
   Impact explanation + donation CTA linking to headsupclubs.org/donate.
   Uses site.css (.mission, .youth) + extras.css (.sec-head, .stat-row, .casc). */

function DonateHero() {
  return (
    <header className="phero" id="top">
      <div className="wrap">
        <div className="kicker-row">
          <Sticker tone="cobalt" tilt="tilt-l" icon="heart">Donate</Sticker>
          <span className="hand">100% goes to youth programming</span>
        </div>
        <h1>Every dollar funds <DrawHL>student-led change.</DrawHL></h1>
        <p className="lead">Heads Up is a youth-led 501(c)(3). Your donation goes directly into the hands of students — funding curriculum, events, and the infrastructure that keeps chapters running nationwide.</p>
      </div>
    </header>
  );
}

const IMPACT_STATS = [
  { num: '$25',  suf: '',  label: 'Funds one student',      foot: 'a full semester of curriculum' },
  { num: '$50',  suf: '',  label: 'Supports one meeting',   foot: 'materials, guides & activities' },
  { num: '$100', suf: '',  label: 'Launches a chapter',     foot: 'onboarding + first month' },
  { num: '100',  suf: '%', label: 'Back to youth',          foot: 'every dollar, no overhead bloat' },
];

function DonateImpact() {
  return (
    <section className="impact section">
      <div className="wrap">
        <Cascade className="stat-row" step={60}>
          {IMPACT_STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-num">{s.num}<span className="suf">{s.suf}</span></div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-foot"><Icon name="sparkles" size={16} />{s.foot}</div>
            </div>
          ))}
        </Cascade>
      </div>
    </section>
  );
}

const WHAT_IT_FUNDS = [
  { icon: 'bookOpen',  h: 'Curriculum development',  p: 'Writing, designing, and updating the eight-module digital wellness curriculum used by every chapter.' },
  { icon: 'users',     h: 'Mentor program operations', p: 'Running the matching system, orientations, and certification process for mentor-mentee pairs.' },
  { icon: 'megaphone', h: 'Chapter support',          p: 'Onboarding resources, training materials, and ongoing support for chapter founders and leads.' },
  { icon: 'sparkles',  h: 'National events',          p: 'Regional summits, virtual conferences, and the annual Heads Up leadership gathering.' },
  { icon: 'search',    h: 'Research & reporting',     p: 'Partnering with foundations and researchers to publish student-perspective data on digital wellness.' },
  { icon: 'heart',     h: 'Partnerships',             p: 'Building relationships with national foundations and brands so more of their funding reaches students directly.' },
];

function WhatItFunds() {
  return (
    <section className="section" id="impact">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tone="cobalt" tilt="tilt-r" icon="heart">What your gift funds</Sticker></div>
          <h2>Where the money goes.</h2>
          <p className="sub">No overhead bloat. No administrative fat. Your donation funds exactly what it says it does.</p>
        </Reveal>
        <Cascade className="feature-grid" step={70}>
          {WHAT_IT_FUNDS.map((f) => (
            <div className="feature" key={f.h}>
              <div className="fic"><Icon name={f.icon} size={22} /></div>
              <h3>{f.h}</h3>
              <p>{f.p}</p>
            </div>
          ))}
        </Cascade>
      </div>
    </section>
  );
}

function DonateCTA() {
  return (
    <section className="youth" id="give">
      <div className="wrap">
        <Reveal>
          <div className="big">
            invest<br />in<br /><DrawHL>youth.</DrawHL>
          </div>
          <p className="sub">A tax-deductible gift to a 501(c)(3) — and a real investment in the next generation.</p>
          <div className="cta-row">
            <a href="https://www.headsupclubs.org/donate" target="_blank" rel="noopener">
              <Button variant="primary" size="lg" iconRight="arrowRight">Donate now</Button>
            </a>
            <a href="partners.html">
              <Button variant="secondary" size="lg">Partner with us</Button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { DonateHero, DonateImpact, WhatItFunds, DonateCTA });
