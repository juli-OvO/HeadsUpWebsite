/* Heads Up — About page sections.
   Club scrapbook aesthetic: hero polaroid collage, impact stats,
   story + screen-time meter, mission panel, testimonials, youth CTA.
   Cobalt-dominant, sky accents. Shares site.css + extras.css with all pages. */

/* ---- Hero ---- */
function AboutHero() {
  const colRef = useRef(null);
  useEffect(() => {
    const el = colRef.current;
    if (el) requestAnimationFrame(() => el.classList.add('play'));
  }, []);
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div className="kicker-row">
          <Sticker tone="sky" tilt="tilt-l" icon="sparkles">Since 2020</Sticker>
          <Sticker tilt="tilt-r" icon="users">Youth-led · Nationwide</Sticker>
        </div>
        <h1>Building a more <DrawHL>digitally balanced</DrawHL> generation.</h1>
        <p className="lead">
          Heads Up is a student-run nonprofit helping high schoolers across the U.S. take back
          control of their screen time — through peer-led clubs, real mentorship, and honest
          conversations about digital wellness.
        </p>
        <div className="hero-stickers">
          <Sticker tone="cobalt" tilt="tilt-l2" icon="users">40+ clubs</Sticker>
          <Sticker tilt="tilt-r">Youth-led 501(c)(3)</Sticker>
          <Sticker tone="cobalt" tilt="tilt-l" icon="mapPin">Nationwide</Sticker>
        </div>
        <div className="collage" ref={colRef}>
          <Polaroid tape caption="First club, 2020" />
          <Polaroid caption="Students leading the way" />
          <Polaroid tape caption="A session in action" />
        </div>
      </div>
    </header>
  );
}

/* ---- Impact Stats ---- */
const STATS = [
  { num: '40', suf: '+', label: 'Active clubs',       foot: 'and growing every semester' },
  { num: '2K', suf: '+', label: 'Students reached',   foot: 'across the U.S.' },
  { num: '13', suf: '',  label: 'Partners & backers', foot: 'foundations to local brands' },
  { num: '50', suf: '+', label: 'Schools',            foot: 'middle & high school' },
];

function ImpactStats() {
  return (
    <section className="impact section">
      <div className="wrap">
        <Cascade className="stat-row" step={60}>
          {STATS.map((s) => (
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

/* ---- Animated screen-time meter ---- */
function ScreenMeter() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fills = Array.from(el.querySelectorAll('.meter-fill'));
    const io = new IntersectionObserver(([e]) => {
      fills.forEach(f => { f.style.width = e.isIntersecting ? f.dataset.w : '0'; });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rows = [
    { label: 'Social media',    val: '4.8h', pct: 60, up: true, delta: '+47%' },
    { label: 'Gaming & apps',   val: '2.3h', pct: 29, up: false },
    { label: 'Video streaming', val: '2.1h', pct: 26, up: false },
    { label: 'Messaging',       val: '1.7h', pct: 21, up: false },
  ];

  return (
    <div className="meter" ref={ref}>
      <div className="meter-head">
        <span className="eyebrow">Avg teen daily screen time</span>
        <span className="meter-scale">0h —————— 8h</span>
      </div>
      {rows.map(r => (
        <div className={'meter-row' + (r.up ? ' up' : '')} key={r.label}>
          <div className="meter-label">
            {r.label}
            {r.delta ? <span className="meter-delta">{r.delta}</span> : null}
          </div>
          <div className="meter-track">
            <div className="meter-fill" data-w={r.pct + '%'} style={{ width: 0 }}>
              <span className="meter-val">{r.val}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- Our story ---- */
function OurStory() {
  return (
    <section className="section" id="story">
      <div className="wrap">
        <div className="story-grid">
          <Reveal>
            <Polaroid tape caption="Founder Brinton Donn, 2020" />
          </Reveal>
          <Reveal delay={80}>
            <div className="section-label">
              <span className="eyebrow">Our story</span>
              <h2>It started with one student asking why.</h2>
            </div>
            <div className="prose">
              <p>In 2020, Brinton Donn noticed something at his high school: everyone — himself included — was glued to their screens and no one was talking about it. So he started a club.</p>
              <p className="big-callout">One club became a movement. Now Heads Up has chapters in high schools across the country, all run by students for students.</p>
            </div>
            <ScreenMeter />
            <div className="founder">
              <div className="ava">BD</div>
              <div className="who">
                <b>Brinton Donn</b>
                <span>Founder &amp; Executive Director</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---- What we do ---- */
function WhatWeDo() {
  return (
    <section className="section" id="what-we-do" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="story-grid flip">
          <Reveal>
            <div className="section-label">
              <span className="eyebrow">What we do</span>
              <h2>Peer-led clubs that actually move the needle.</h2>
            </div>
            <div className="prose">
              <p>Each Heads Up chapter is run entirely by students. Members hold weekly meetings, track their own habits, and support each other toward a healthier relationship with technology.</p>
              <p>We provide the curriculum, training, and national community — students do the rest.</p>
            </div>
            <div className="hero-stickers" style={{ marginTop: 24 }}>
              <Sticker icon="bookOpen">Curriculum</Sticker>
              <Sticker tone="cobalt" icon="users">Peer mentorship</Sticker>
              <Sticker icon="calendar">Weekly meetings</Sticker>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Polaroid caption="Weekly chapter session" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---- Mission ---- */
function Mission() {
  return (
    <section className="section" id="mission" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal>
          <div className="mission">
            <img className="bgmark" src="../../assets/logo-mark-white.png" alt="" aria-hidden="true" />
            <div className="eyebrow">Our mission</div>
            <h2>Empower students to lead healthier digital lives — together.</h2>
            <p className="mtext">
              We believe the best people to teach teenagers about screen balance are{' '}
              <strong>other teenagers.</strong> Heads Up gives students the tools, training,
              and community to build <span className="hl">genuine digital wellness</span> from
              the inside out.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
              <a href="https://www.headsupclubs.org/start-a-club" target="_blank" rel="noopener">
                <Button variant="white" size="lg" iconRight="arrowRight">Start a club</Button>
              </a>
              <a href="https://www.headsupclubs.org/donate" target="_blank" rel="noopener">
                <Button variant="secondary" size="lg">Support us</Button>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- Testimonials ---- */
const QUOTES = [
  {
    q: "Heads Up made me realize I wasn't alone. We all struggled with our phones — and talking about it with friends actually helped.",
    name: 'Mia T.',
    role: 'Club President, CA',
    init: 'MT',
  },
  {
    q: "I joined as a curious sophomore and left as a chapter lead. The peer support model actually works — it's not adults lecturing us.",
    name: 'James R.',
    role: 'Club Member, TX',
    init: 'JR',
  },
  {
    q: "Running a club taught me leadership skills I couldn't have gotten anywhere else. And yeah, I use my phone a lot less now.",
    name: 'Priya S.',
    role: 'Club Founder, NY',
    init: 'PS',
  },
];

function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row">
            <Sticker tone="cobalt" tilt="tilt-r" icon="quote">From members</Sticker>
          </div>
          <h2>Heard it from our students.</h2>
          <p className="sub">Real words from real students — the reason this whole thing exists.</p>
        </Reveal>
        <Cascade className="quote-row" step={80}>
          {QUOTES.map((q) => (
            <div className="quote" key={q.name}>
              <div className="qmark"><Icon name="quote" size={28} /></div>
              <blockquote>{q.q}</blockquote>
              <div className="who">
                <div className="ava">{q.init}</div>
                <div>
                  <b>{q.name}</b>
                  <span>{q.role}</span>
                </div>
              </div>
            </div>
          ))}
        </Cascade>
      </div>
    </section>
  );
}

/* ---- Youth CTA band ---- */
function YouthBand() {
  return (
    <section className="youth">
      <div className="wrap">
        <Reveal>
          <div className="big">
            youth.<br />for.<br /><DrawHL>youth.</DrawHL>
          </div>
          <p className="sub">Students helping students — one club at a time.</p>
          <div className="cta-row">
            <a href="https://www.headsupclubs.org/start-a-club" target="_blank" rel="noopener">
              <Button variant="primary" size="lg" iconRight="arrowRight">Start a club</Button>
            </a>
            <a href="partners.html">
              <Button variant="secondary" size="lg">Our partners</Button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { AboutHero, ImpactStats, OurStory, WhatWeDo, Mission, Testimonials, YouthBand });
