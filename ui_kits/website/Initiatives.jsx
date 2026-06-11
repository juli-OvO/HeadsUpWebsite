/* Heads Up — Initiatives page sections.
   All programs: feature grid, start-a-club steps, interactive chapter map, FAQ.
   Uses pages.css (.phero, .feature-grid) + extras.css (.steps, .chap-layout, .faq-wrap). */

function InitiativesHero() {
  return (
    <header className="phero" id="top">
      <div className="wrap">
        <div className="kicker-row">
          <Sticker tone="cobalt" tilt="tilt-l" icon="sparkles">Initiatives</Sticker>
          <span className="hand">what we're actually doing</span>
        </div>
        <h1>Programs built by students, <DrawHL>for students.</DrawHL></h1>
        <p className="lead">From school clubs and peer mentorship to research and digital detox challenges — every Heads Up initiative is student-designed, student-run, and student-measured.</p>
      </div>
    </header>
  );
}

const FEATURES = [
  { icon: 'users',     h: 'School Clubs',            p: 'Student-run chapters holding weekly meetings, tracking habits, and building peer accountability — school by school.' },
  { icon: 'heart',     h: 'Mentor Match',            p: 'Experienced members paired with newer students for 1-on-1 support, habit coaching, and leadership development.' },
  { icon: 'smartphone',h: 'Digital Detox Challenges',p: 'School-wide and national screen-free events that make reducing phone use a social, shared experience — not a punishment.' },
  { icon: 'bookOpen',  h: 'Curriculum Library',      p: 'Self-paced learning modules for clubs, classrooms, and individuals covering everything from social media to sleep.' },
  { icon: 'search',    h: 'Research & Reports',      p: 'We publish data on teen digital wellness trends, partnering with foundations to put student voices in the conversation.' },
  { icon: 'megaphone', h: 'Speaker Network',         p: 'Student speakers visit schools, conferences, and events to share the Heads Up story and inspire new chapters.' },
];

function InitiativeFeatures() {
  return (
    <section className="section" id="programs">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tone="cobalt" tilt="tilt-r" icon="sparkles">What we run</Sticker></div>
          <h2>Six programs. One mission.</h2>
          <p className="sub">Every initiative is designed to work at the school level — run by students, scaled by students.</p>
        </Reveal>
        <Cascade className="feature-grid" step={70}>
          {FEATURES.map((f) => (
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

const INIT_STEPS = [
  { num: '01', h: 'Talk to your school',  p: 'Find a faculty advisor and get approval from your administration. Most schools say yes within a week.' },
  { num: '02', h: 'Register your chapter', p: 'Complete the short registration form on headsupclubs.org. Unlock the full curriculum and community.' },
  { num: '03', h: 'Run your first meeting', p: 'Use our ready-made agenda, activities, and discussion guides. Your first meeting is already planned for you.' },
];

function InitStartAClub() {
  return (
    <section className="section" id="start">
      <div className="wrap">
        <div className="steps">
          <Reveal className="sec-head">
            <Eyebrow>Start a club</Eyebrow>
            <h2>Launch a chapter at your school.</h2>
            <p className="sub">No budget, no equipment, no prior experience — just students who want to make a difference.</p>
          </Reveal>
          <Cascade className="step-row" step={80}>
            {INIT_STEPS.map((s) => (
              <div className="step" key={s.num}>
                <div className="num">{s.num}</div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </Cascade>
          <div className="cta-row">
            <a href="https://www.headsupclubs.org/start-a-club" target="_blank" rel="noopener">
              <Button variant="white" size="lg" iconRight="arrowRight">Start a club</Button>
            </a>
            <a href="mentor-program.html">
              <Button variant="secondary" size="lg">Mentor program</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const CHAPTERS = [
  { id: 'ca',  name: 'Newport Harbor HS',     city: 'Newport Beach, CA', x:  8, y: 55, members: 24 },
  { id: 'wa',  name: 'Roosevelt HS',          city: 'Seattle, WA',       x:  9, y: 18, members: 16 },
  { id: 'tx',  name: 'Austin High School',    city: 'Austin, TX',        x: 42, y: 68, members: 19 },
  { id: 'il',  name: 'Naperville Central HS', city: 'Naperville, IL',    x: 60, y: 38, members: 22 },
  { id: 'nj',  name: 'Haddonfield Memorial',  city: 'Haddonfield, NJ',   x: 80, y: 31, members: 27 },
  { id: 'fl',  name: 'Coral Gables HS',       city: 'Coral Gables, FL',  x: 72, y: 78, members: 14 },
  { id: 'ma',  name: 'Newton South HS',       city: 'Newton, MA',        x: 86, y: 22, members: 18 },
];

function ChapterMap() {
  const [active, setActive] = useState(CHAPTERS[0]);
  return (
    <section className="section chapters" id="chapters">
      <div className="wrap">
        <Reveal className="sec-head" style={{ marginBottom: 36 }}>
          <div className="row"><Sticker tone="cobalt" tilt="tilt-l" icon="mapPin">Where we are</Sticker></div>
          <h2>Chapters across the country.</h2>
          <p className="sub">Student-run clubs in schools from Seattle to Miami — and growing every semester.</p>
        </Reveal>
        <div className="chap-layout">
          <div className="map-panel">
            <div className="map-canvas">
              <img className="map-usa-img" src="us-map.png" alt="US map showing chapter locations" />
              {CHAPTERS.map((c) => (
                <button
                  key={c.id}
                  className={'map-pin' + (active.id === c.id ? ' on' : '')}
                  style={{ left: c.x + '%', top: c.y + '%' }}
                  onClick={() => setActive(c)}
                  aria-label={c.name}
                >
                  <span className="pin-dot" />
                  <span className="pin-pulse" />
                  <span className="pin-tag">{c.name}</span>
                </button>
              ))}
              <div className="map-legend">
                <span className="lg">
                  <span className="sw" style={{ background: 'var(--cobalt-500)' }} />
                  Active chapter
                </span>
              </div>
              <div className="map-count">
                <span className="live" />
                40+ chapters nationwide
              </div>
            </div>
            <div className="map-fig">
              <span className="fig-no">Fig. 01</span>
              <span className="fig-cap">Active Heads Up chapters as of Spring 2026. New clubs added each semester as students register.</span>
            </div>
          </div>
          <div className="chap-side">
            <div className="spotlight">
              <div className="sl-head"><span className="sl-live" />Now viewing</div>
              <div className="sl-name">{active.name}</div>
              <div className="sl-city"><Icon name="mapPin" size={14} />{active.city}</div>
              <div className="sl-metric">
                <b>{active.members}</b>
                <span>Active members this semester</span>
              </div>
              <div className="sl-hint"><Icon name="mapPin" size={16} />Click a pin to explore</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  { q: 'How do I start a Heads Up club at my school?', a: 'Register at headsupclubs.org/start-a-club. You\'ll need a faculty advisor and basic school approval — most chapters get started within a couple of weeks. We provide the full curriculum, meeting guides, and ongoing support.' },
  { q: 'Do I need a teacher or adult to run the club?', a: 'You need a faculty advisor on paper (most schools require it for any extracurricular), but the club is entirely student-run. Your advisor doesn\'t need to attend every meeting or lead anything — that\'s your job.' },
  { q: 'What does a typical Heads Up meeting look like?', a: 'Most meetings run 45–60 minutes and include a check-in, a habit-tracking activity, a short discussion or lesson from the curriculum, and time for peer support. The exact format is yours to adapt.' },
  { q: 'Is there a cost to join or start a chapter?', a: 'No. Heads Up is completely free for students and schools. Our partners and donors cover all curriculum, training, and community costs so you never have to pay to participate.' },
  { q: 'Can I start a club if I\'m the only interested student?', a: 'Yes — many chapters started with one person and a vision. We\'ll help you recruit. Our onboarding materials include tips for building interest, running a launch event, and growing your first roster.' },
  { q: 'How is Heads Up different from other wellness programs?', a: 'Heads Up is peer-led, not adult-imposed. Research consistently shows that teenagers are more receptive to behavior change when it comes from peers their own age. Every Heads Up facilitator is a student.' },
];

function InitiativesFAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tilt="tilt-r" icon="search">FAQ</Sticker></div>
          <h2>Common questions.</h2>
          <p className="sub">Everything you need to know before your first meeting.</p>
        </Reveal>
        <div className="faq-wrap">
          {FAQ_ITEMS.map((item, i) => (
            <div className={'faq-item' + (openIdx === i ? ' open' : '')} key={i}>
              <button className="faq-q" onClick={() => toggle(i)}>
                {item.q}
                <span className="tog">+</span>
              </button>
              <div className="faq-a">
                <div className="faq-a-in">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { InitiativesHero, InitiativeFeatures, InitStartAClub, ChapterMap, InitiativesFAQ });
