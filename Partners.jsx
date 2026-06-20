/* Heads Up — Partners page sections.
   Modern-editorial: gallery marquee · logo wall · collab CTA.
   Cobalt-dominant, moss/sky accents. */

/* All partner names — drives the scrolling gallery. */
const PARTNER_LOGOS = [
  'Taco Bell Foundation', "Hershey's", 'T-Mobile Foundation', 'Power of Youth',
  'Ashoka', 'Lookup', 'Hopelab', 'Starbucks', 'MOD Pizza', 'Holiday Inn',
  "Dunkin'", 'Kendra Scott', 'Just Gametime',
];

/* Combined partner data — logo wall + description list. */
const ALL_PARTNERS = [
  { name: 'Taco Bell Foundation', initials: 'TB', role: 'Ambition Accelerator Program',
    desc: 'Awarded funding to scale youth-driven projects focused on leadership, innovation, and real-world impact.' },
  { name: "Hershey's", initials: 'H', role: 'Heartwarming Grant Recipient',
    desc: 'Grant support for community-based programs centered on kindness, service, and positive youth development.' },
  { name: 'T-Mobile Foundation', initials: 'TM', role: 'Changemaker Challenge Finalist',
    desc: 'Recognized as a top finalist for meaningful social impact through youth-led innovation and digital inclusion.' },
  { name: 'Power of Youth', initials: 'PY', role: 'Community Grant Recipient',
    desc: 'Funded initiatives that empower young people to lead local projects and create measurable community change.' },
  { name: 'Ashoka', initials: 'A', role: 'Changemaker Finalist',
    desc: 'Selected among top social-impact leaders for advancing youth entrepreneurship and long-term systems change.' },
  { name: 'Lookup', initials: 'LK', role: 'Innovation Challenge Finalist',
    desc: 'Finalist for designing creative solutions that blend technology, service, and youth empowerment.' },
  { name: 'Hopelab', initials: 'HL', role: 'National Contribution Project Award',
    desc: 'Recognized for building programs that support youth mental health, wellbeing, and resilience nationwide.' },
  { name: 'Starbucks', initials: 'SB', role: 'Partner · Sponsor',
    desc: 'Corporate partner providing funding, resources, and community support to expand youth-focused initiatives.' },
  { name: 'MOD Pizza', initials: 'MP', role: 'Partner · Sponsor',
    desc: 'Provided sponsorship and logistical support to help scale our programming and outreach efforts.' },
  { name: 'Holiday Inn', initials: 'HI', role: 'Partner · Sponsor',
    desc: 'Supported events, fundraising efforts, and community-engagement initiatives across chapters.' },
  { name: "Dunkin'", initials: 'DK', role: 'Partner · Sponsor',
    desc: 'Contributed sponsorship and product support for events and youth programs.' },
  { name: 'Kendra Scott', initials: 'KS', role: 'Partner · Sponsor',
    desc: 'Partnered through fundraising collaborations and community-driven campaigns.' },
  { name: 'Just Gametime', initials: 'JG', role: 'Strategic Partner',
    desc: 'Supporting youth engagement, outreach, and program expansion through sports and media platforms.' },
];

/* Three collaboration pathways shown in PartnerCTA. */
const COLLAB_WAYS = [
  {
    icon: '$',
    title: 'Fund a Chapter',
    desc: 'Sponsor the launch of a Heads Up chapter at a school in your community — fully named, fully funded, fully reported.',
    bullets: ['Naming rights at the chapter', 'Quarterly impact reports', 'Tax-deductible (501c3 · EIN 99-1479158)'],
  },
  {
    icon: '★',
    title: 'Co-Brand a Campaign',
    desc: 'Lend your brand to a Heads Up campaign — screen-time competitions, awareness drives, or learning modules co-released with your name.',
    bullets: ['Co-branded merch & assets', 'Joint social presence', 'Direct line to Gen Z, on their terms'],
  },
  {
    icon: '↗',
    title: 'Provide a Resource',
    desc: 'Give us the thing only you can — distribution, venue space, prize stock, technology, professional expertise, or platform reach.',
    bullets: ['Goods & services partnerships', 'Venue or platform access', 'Professional services (pro-bono)'],
  },
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

/* ---------- Multi-row auto-scrolling gallery ---------- */
function LogoGallery() {
  const fwd = [...PARTNER_LOGOS, ...PARTNER_LOGOS];
  const rev = [...PARTNER_LOGOS].reverse().concat([...PARTNER_LOGOS].reverse());
  const rows = [
    { items: fwd, cls: 'gallery-row--fwd' },
    { items: rev, cls: 'gallery-row--rev' },
    { items: fwd, cls: 'gallery-row--fwd gallery-row--slow' },
  ];
  return (
    <section className="gallery-band" aria-label="Partners">
      <div className="logostrip-cap">
        <span className="ln" />
        <span>Trusted &amp; supported by</span>
        <span className="ln" />
      </div>
      <div className="gallery-rows">
        {rows.map(({ items, cls }, ri) => (
          <div className="gallery-row-track" key={ri}>
            <div className={`gallery-row ${cls}`}>
              {items.map((name, i) => (
                <span className="logo-chip" key={i}><span className="dot" />{name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Logo wall + hover-triggered detail ---------- */
function LogoWall() {
  const [active, setActive] = React.useState(0);
  const p = ALL_PARTNERS[active];
  return (
    <section className="section lw-section" id="recognition">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tone="cobalt" tilt="tilt-r" icon="sparkles">Partners &amp; recognition</Sticker></div>
          <h2>Every organization behind the mission.</h2>
        </Reveal>
        <div className="lw-layout">
          <div className="lw-grid-col">
            <div className="lw-grid">
              {ALL_PARTNERS.map((partner, i) => (
                <div
                  className={`lw-tile${active === i ? ' lw-tile--active' : ''}`}
                  key={partner.name}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="lw-initials">{partner.initials}</span>
                  <span className="lw-tile-name">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lw-detail" key={active}>
            <div className="lw-detail-num">{String(active + 1).padStart(2, '0')}</div>
            <h3 className="lw-detail-name">{p.name}</h3>
            <span className="lw-detail-role">{p.role}</span>
            <p className="lw-detail-desc">{p.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Partner-with-us CTA (Three ways to collaborate) ---------- */
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
            <div className="collab-intro">
              <h2>Three ways to collaborate.</h2>
              <p className="sub">We work with foundations, brands, and educators. If any of these fit your organization, the form below routes straight to our partnership lead.</p>
            </div>
            <div className="collab-grid">
              {COLLAB_WAYS.map((w) => (
                <div className="collab-card" key={w.title}>
                  <div className="collab-icon">{w.icon}</div>
                  <h3 className="collab-title">{w.title}</h3>
                  <p className="collab-desc">{w.desc}</p>
                  <ul className="collab-list">
                    {w.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="partner-open-actions" style={{ marginTop: 36 }}>
              <a href="https://www.headsupclubs.org/donate" target="_blank" rel="noopener">
                <Button variant="primary" size="lg" iconRight="arrowRight">Partner with us</Button>
              </a>
              <a className="ghost-link" href="https://www.headsupclubs.org/donate" target="_blank" rel="noopener">…or just say hello</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { PartnersHero, LogoGallery, LogoWall, PartnerCTA });
