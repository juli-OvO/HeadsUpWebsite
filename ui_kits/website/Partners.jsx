/* Heads Up — Partners page sections.
   Content from headsupclubs.org/partners. Modern-editorial:
   floating logo marquee · divided recognition rows · sponsor cards.
   Cobalt-dominant, moss/sky accents. */

/* All partner names — drives the floating marquee strip. */
const PARTNER_LOGOS = [
  'Taco Bell Foundation', "Hershey's", 'T-Mobile Foundation', 'Power of Youth',
  'Ashoka', 'Lookup', 'Hopelab', 'Starbucks', 'MOD Pizza', 'Holiday Inn',
  "Dunkin'", 'Kendra Scott', 'Just Gametime',
];

/* Grants, awards & finalist recognitions. */
const RECOGNITION = [
  { name: 'Taco Bell Foundation', tag: 'Ambition Accelerator Program', icon: 'sparkles',
    desc: 'Awarded funding to scale youth-driven projects focused on leadership, innovation, and real-world impact.' },
  { name: "Hershey's", tag: 'Heartwarming Grant Recipient', icon: 'heart',
    desc: 'Grant support for community-based programs centered on kindness, service, and positive youth development.' },
  { name: 'T-Mobile Foundation', tag: 'Changemaker Challenge Finalist', icon: 'sparkles',
    desc: 'Recognized as a top finalist for meaningful social impact through youth-led innovation and digital inclusion.' },
  { name: 'Power of Youth', tag: 'Community Grant Recipient', icon: 'users',
    desc: 'Funded initiatives that empower young people to lead local projects and create measurable community change.' },
  { name: 'Ashoka', tag: 'Changemaker Finalist', icon: 'sparkles',
    desc: 'Selected among top social-impact leaders for advancing youth entrepreneurship and long-term systems change.' },
  { name: 'Lookup', tag: 'Innovation Challenge Finalist', icon: 'search',
    desc: 'Finalist for designing creative solutions that blend technology, service, and youth empowerment.' },
  { name: 'Hopelab', tag: 'National Contribution Project Award', icon: 'heart',
    desc: 'Recognized for building programs that support youth mental health, wellbeing, and resilience nationwide.' },
];

/* Corporate partners & sponsors. */
const SPONSORS = [
  { name: 'Starbucks', kind: 'Partner · Sponsor',
    desc: 'Corporate partner providing funding, resources, and community support to expand youth-focused initiatives.' },
  { name: 'MOD Pizza', kind: 'Partner · Sponsor',
    desc: 'Provided sponsorship and logistical support to help scale our programming and outreach efforts.' },
  { name: 'Holiday Inn', kind: 'Partner · Sponsor',
    desc: 'Supported events, fundraising efforts, and community-engagement initiatives across chapters.' },
  { name: "Dunkin'", kind: 'Partner · Sponsor',
    desc: 'Contributed sponsorship and product support for events and youth programs.' },
  { name: 'Kendra Scott', kind: 'Partner · Sponsor',
    desc: 'Partnered through fundraising collaborations and community-driven campaigns.' },
  { name: 'Just Gametime', kind: 'Strategic Partner',
    desc: 'Supporting youth engagement, outreach, and program expansion through sports and media platforms.' },
];

/* ---------- Hero ---------- */
function PartnersHero() {
  return (
    <header className="phero" id="top">
      <div className="wrap">
        <div className="kicker-row">
          <Sticker tone="cobalt" tilt="tilt-l" icon="heart">Our Partners</Sticker>
          <span className="hand">we don't do this alone</span>
        </div>
        <h1>The people who <DrawHL>back youth-for-youth.</DrawHL></h1>
        <p className="lead">From national foundations and changemaker awards to local sponsors, these partners fund, fuel, and believe in student-led digital balance — so our clubs can keep showing up, school by school.</p>
        <div className="ptally">
          <div className="chip"><b>13</b><span>Partners &amp; backers</span></div>
          <div className="chip"><b>7</b><span>Grants &amp; award nods</span></div>
          <div className="chip"><b>100%</b><span>Reinvested in youth</span></div>
        </div>
      </div>
    </header>
  );
}

/* ---------- Full-bleed logo marquee (edge to edge, no card) ---------- */
function LogoStrip() {
  const row = PARTNER_LOGOS.concat(PARTNER_LOGOS); // duplicate for seamless loop
  return (
    <section className="logoband" aria-label="Partners">
      <div className="logostrip-cap">
        <span className="ln" />
        <span>Trusted &amp; supported by</span>
        <span className="ln" />
      </div>
      <div className="marquee-track">
        <div className="marquee" aria-hidden="false">
          {row.map((name, i) => (
            <span className="logo-chip" key={i}><span className="dot" />{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Recognition (grants / awards / finalists) ---------- */
function Recognition() {
  return (
    <section className="section" id="recognition" style={{ paddingBottom: 56 }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tone="cobalt" tilt="tilt-r" icon="sparkles">Grants &amp; recognition</Sticker></div>
          <h2>Backed by foundations that fund the future.</h2>
          <p className="sub">National grants, accelerators, and changemaker awards that have invested in Heads Up and recognized youth-led impact.</p>
        </Reveal>
        <Cascade className="awards" step={70}>
          {RECOGNITION.map((r, i) => (
            <div className="award-row" key={r.name}>
              <div className="anum">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <h3 className="award-name">{r.name}</h3>
                <span className="award-tag"><Icon name={r.icon} size={13} />{r.tag}</span>
              </div>
              <p className="award-desc">{r.desc}</p>
            </div>
          ))}
        </Cascade>
      </div>
    </section>
  );
}

/* ---------- Sponsors (corporate partners) ---------- */
function Sponsors() {
  return (
    <section className="section" id="sponsors" style={{ paddingTop: 36, borderTop: '1.5px solid var(--divider)' }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tone="moss" tilt="tilt-l2" icon="users">Partners &amp; sponsors</Sticker></div>
          <h2>Brands that show up for our students.</h2>
          <p className="sub">Companies providing funding, product, and on-the-ground support for events, fundraisers, and programming.</p>
        </Reveal>
        <Cascade className="sponsor-grid" step={80}>
          {SPONSORS.map((s) => (
            <div className="sponsor" key={s.name}>
              <div className="sponsor-mark">{s.name}</div>
              <div className="sponsor-kind"><span className="sw" />{s.kind}</div>
              <p>{s.desc}</p>
            </div>
          ))}
        </Cascade>
      </div>
    </section>
  );
}

/* ---------- Partner-with-us CTA (open / editorial) ---------- */
function PartnerCTA() {
  return (
    <section className="section" id="partner" style={{ paddingTop: 8 }}>
      <div className="wrap">
        <Reveal>
          <div className="partner-open">
            <div className="partner-open-head">
              <Sticker tone="cobalt" tilt="tilt-l" icon="heart">Become a partner</Sticker>
              <span className="hand">there's room for you here</span>
            </div>
            <div className="partner-open-grid">
              <h2>Want to back the next<br />generation of <DrawHL>digital balance?</DrawHL></h2>
              <div className="partner-open-side">
                <p>Foundations, brands, and local partners help us reach more students every semester — every dollar and resource goes straight back into youth-led programming.</p>
                <div className="partner-open-actions">
                  <a href="https://www.headsupclubs.org/donate" target="_blank" rel="noopener">
                    <Button variant="primary" size="lg" iconRight="arrowRight">Partner with us</Button>
                  </a>
                  <a className="ghost-link" href="https://www.headsupclubs.org/donate" target="_blank" rel="noopener">…or just say hello</a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { PartnersHero, LogoStrip, Recognition, Sponsors, PartnerCTA });
