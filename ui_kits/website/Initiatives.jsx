/* Heads Up — Initiatives page sections (divider-led).
   Content from headsupclubs.org/initiatives. Blue-dominant, moss/cream accent. */

function InitiativesHero() {
  return (
    <header className="phero" id="top">
      <div className="wrap">
        <div className="kicker-row">
          <Sticker tone="cobalt" tilt="tilt-l" icon="sparkles">Our Initiatives</Sticker>
          <span className="hand">pick your way in</span>
        </div>
        <h1>So many ways to <DrawHL>take action.</DrawHL></h1>
        <p className="lead">From founding a club at your school to flexible ambassador roles, learning modules, and podcasts — every Heads Up initiative is youth-led and built to fight the digital-addiction crisis from the inside.</p>
        <div className="hero-stickers">
          <Sticker tilt="tilt-r" icon="users">Club Champions</Sticker>
          <Sticker tone="sky" tilt="tilt-l2" icon="megaphone">Ambassadors</Sticker>
          <Sticker tilt="tilt-l" icon="bookOpen">Learning modules</Sticker>
        </div>
      </div>
    </header>
  );
}

/* Club Champions ‖ Ambassadors — two parallel, equal roles */
function GetInvolved() {
  const steps = [
    'Fill out our Club Champion Form to join the Heads Up club database',
    'Watch our orientation videos to begin your Heads Up onboarding',
    'Meet with our CCO to set your goals and get any resources you need',
    'Recruit a leadership board and general members',
    'Make your plan for impact clear, with goals for every semester',
    'Reach out to our national board with any questions you have',
  ];
  return (
    <section className="section" id="get-involved" style={{ paddingBottom: 64 }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tone="cobalt" tilt="tilt-r" icon="users">Two ways to lead</Sticker></div>
          <h2>Champion or Ambassador.</h2>
          <p className="sub">Two parallel roles for getting involved — pick the commitment that fits you.</p>
        </Reveal>
        <Cascade className="parallel" step={140}>
          <div className="par-col">
            <div className="meta"><Icon name="users" size={15} />01 · Found &amp; lead a club</div>
            <h2 className="ttl">Club Champions</h2>
            <p className="desc">Dedicated youth advocates who form Heads Up Clubs to take action against the digital-addiction crisis. Champions work consistently to support other youth in their transition to a healthier way of life.</p>
            <a href="https://forms.gle/ouoSaTopzCem2Uv88" target="_blank" rel="noopener">
              <Button variant="primary" size="lg" iconRight="arrowRight">Register your club</Button>
            </a>
          </div>
          <div className="par-col">
            <div className="meta"><Icon name="megaphone" size={15} />02 · Flexible, on your schedule</div>
            <h2 className="ttl">Ambassadors</h2>
            <p className="desc">Driven students passionate about promoting productive use of technology. A lighter commitment — ideal for those eager to join the community but not ready to run their own club.</p>
            <a href="https://forms.gle/RhWoWnRb8b3PjZJm9" target="_blank" rel="noopener">
              <Button variant="moss" size="lg" iconRight="arrowRight">Become an Ambassador</Button>
            </a>
          </div>
        </Cascade>

        <Hr style={{ margin: '52px 0 36px' }} />

        <div className="howto-head">
          <span className="eyebrow">How to start a club at your school</span>
        </div>
        <Cascade className="howto" as="ol" step={70}>
          {steps.map((s, i) => (
            <li className="howto-step" key={i}>
              <span className="n">{i + 1}</span>
              <p>{s}</p>
            </li>
          ))}
        </Cascade>
      </div>
    </section>
  );
}

/* Other programming — divided feature columns */
function OtherProgramming() {
  const cards = [
    { icon: 'bookOpen', h: 'Learning Modules', p: 'Learn about 10+ digital-wellness topics and spread our mission. Complete the modules to earn a Heads Up certification.', cta: 'Explore modules' },
    { icon: 'music', h: 'Podcasts', p: 'Five podcast lessons made with GoYogi, focused on tips and tricks you can use daily to improve your relationship with technology.', cta: 'Listen now' },
    { icon: 'users', h: 'Mentorship', p: 'A brand-new mentee and mentor program helping middle schoolers build a healthy relationship with social media.', cta: 'See the program', href: 'mentor-program.html' },
  ];
  return (
    <section className="section" id="programming" style={{ paddingTop: 32, borderTop: '1.5px solid var(--divider)' }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tone="moss" tilt="tilt-l2" icon="sparkles">More programming</Sticker></div>
          <h2>Other ways Heads Up shows up.</h2>
        </Reveal>
        <Cascade className="feature-grid" step={110} style={{ '--cols': 3 }}>
          {cards.map((c, i) => {
            const inner = (
              <React.Fragment>
                <span className="fic"><Icon name={c.icon} size={30} /></span>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
                <span className="more">{c.cta}<Icon name="arrowRight" size={15} /></span>
              </React.Fragment>
            );
            return c.href
              ? <a className="feature" href={c.href} key={i}>{inner}</a>
              : <div className="feature" key={i}>{inner}</div>;
          })}
        </Cascade>
      </div>
    </section>
  );
}

const INITIATIVES_FAQ = [
  { q: "How many people should I have on my club's board?", a: 'Heads Up requires at least 2 board members: a President and a Vice President. You can always add more positions as you see fit.' },
  { q: 'How can I join the national board?', a: 'Navigate to our Team page and fill out the form linked at the bottom.' },
  { q: "I don't have a lot of time — how else can I help?", a: 'Our Ambassador program is very flexible and lets you contribute whenever you have time.' },
  { q: "I can't think of any activities to do with my club?", a: 'We’ve prepared a toolkit of activities for when you feel stuck. You can also meet with our Communications team to talk through options.' },
  { q: 'Can my club start its own social media page?', a: 'Yes! As long as you follow Heads Up’s social-media guidelines, you’re welcome to start an account for your school.' },
  { q: 'What is the time commitment to join the board?', a: 'National-board Directors spend ~2–3 hours/week and Chief Officers ~3–4 hours; general members ~1 hour/week. We lighten the load across all roles during exam season and college apps.' },
];

Object.assign(window, { InitiativesHero, GetInvolved, OtherProgramming, INITIATIVES_FAQ });
