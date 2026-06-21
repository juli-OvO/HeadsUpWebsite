/* Heads Up — Home page sections. Blue-dominant, moss/cream accent. */

function LandingHero() {
  function scrollToNext(e) {
    e.preventDefault();
    const el = document.getElementById('reclaim');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <header className="landing-hero" id="top">
      <div
        className="landing-hero-bg"
        style={{ backgroundImage: "url('ChatGPT Image Jun 21, 2026, 10_39_51 AM.png')" }}
      />
      <div className="landing-hero-overlay" />
      <div className="landing-hero-content">
        <h1 className="landing-hero-h1">
          This is our generation's<br />response to <em>Addicting</em> Tech
        </h1>
        <p className="landing-hero-sub">Big Tech's attempt to steal our time and collect our data.</p>
        <button className="landing-hero-cta" onClick={scrollToNext}>
          GET STARTED
        </button>
      </div>
    </header>
  );
}

function HomeHero() {
  return (
    <section className="hhero section" id="look-up">
      <div className="wrap">
        <div className="grid">
          <div>
            <div className="kicker-row" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <Sticker tone="cobalt" tilt="tilt-l" icon="heart">Youth-for-youth &middot; est. 2020</Sticker>
            </div>
            <h1>Helping students <DrawHL>look up.</DrawHL></h1>
            <p className="lead">Heads Up is a student-led movement for digital balance. We started in one dining hall and a single club &mdash; now we run clubs, mentorship, and campaigns across the country, built entirely by the people Big Tech is trying hardest to keep scrolling.</p>
            <div className="cta-row">
              <a href="initiatives.html"><Button variant="primary" size="lg" iconRight="arrowRight">Start a club</Button></a>
              <a href="mentor-program.html"><Button variant="secondary" size="lg">Become a mentor</Button></a>
            </div>
            <div className="trust">
              <div><b>120+</b><span>chapters</span></div>
              <div><b>38</b><span>states</span></div>
              <div><b>10K+</b><span>students reached</span></div>
            </div>
          </div>
          <div className="hhero-collage">
            <Polaroid src={HU_IMG.deerfield} alt="Deerfield Academy campus in snow" caption="Where it started" />
            <Polaroid src={HU_IMG.classroom} alt="Students giving a Heads Up presentation" caption="Our first meeting" />
            <Polaroid alt="A phone-free club hangout" caption="Add your chapter" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeStory() {
  return (
    <section className="section" id="story">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tone="moss" tilt="tilt-l" icon="heart">Our story</Sticker></div>
          <h2>One dining hall. One movement.</h2>
          <p className="sub">Started by students, built for students — growing across 38 states entirely by the people Big Tech is trying hardest to keep scrolling.</p>
        </Reveal>
        <Cascade className="story-pair" step={110}>
          <div className="story-pair-col">
            <div className="eyebrow" style={{ color: 'var(--cobalt-600)', marginBottom: 14 }}>01 &middot; Where it started</div>
            <h3>One honest conversation changed everything.</h3>
            <p>A handful of students got real about how much their phones were running their days and decided to do something about it together. That first club became a blueprint other schools could pick up and run with.</p>
            <a className="textlink" href="about.html" style={{ marginTop: 22, display: 'inline-flex' }}>Read our story<Icon name="arrowRight" size={15} /></a>
          </div>
          <div className="story-pair-col">
            <div className="eyebrow" style={{ color: 'var(--moss-700)', marginBottom: 14 }}>02 &middot; Why youth-for-youth works</div>
            <h3>The people Big Tech targets, designing the way out.</h3>
            <p>We are the audience these platforms are built to keep scrolling, so we know what actually lands with our peers. Every club and campaign is shaped by students — no middleman, no lectures from adults who don't quite get it.</p>
            <a className="textlink" href="initiatives.html" style={{ color: 'var(--moss-700)', marginTop: 22, display: 'inline-flex' }}>See our programs<Icon name="arrowRight" size={15} /></a>
          </div>
        </Cascade>
      </div>
    </section>
  );
}

function WhatWeDo() {
  const cards = [
    { icon: 'users',     h: 'Club Champions',  p: 'Found a Heads Up club at your school and lead the change locally.',        cta: 'Start a club',     href: 'initiatives.html' },
    { icon: 'megaphone', h: 'Ambassadors',      p: 'A flexible role for students who want to help without running a club.',    cta: 'Join in',          href: 'initiatives.html' },
    { icon: 'heart',     h: 'Mentor Program',   p: 'Guide a middle schooler — or get guided — toward healthier tech habits.',  cta: 'Mentor or mentee', href: 'mentor-program.html' },
    { icon: 'bookOpen',  h: 'Learning Modules', p: 'Explore 10+ digital-wellness topics and earn a certification.',            cta: 'Explore',          href: 'initiatives.html' },
  ];
  return (
    <section className="section" id="what-we-do" style={{ paddingBottom: 56 }}>
      <div className="wrap">
        <div className="intro">
          <div className="row"><Sticker tone="cobalt" tilt="tilt-r" icon="sparkles">What we do</Sticker></div>
          <h2>Find your way in.</h2>
          <p>Whatever your time and energy, there is a Heads Up role that fits — every one of them youth-led.</p>
        </div>
        <Cascade className="feature-grid" step={100} style={{ '--cols': 4 }}>
          {cards.map((c, i) => (
            <a className="feature" href={c.href} key={i}>
              <span className="fic"><Icon name={c.icon} size={30} /></span>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
              <span className="more">{c.cta}<Icon name="arrowRight" size={15} /></span>
            </a>
          ))}
        </Cascade>
      </div>
    </section>
  );
}

function HomeMission() {
  return (
    <section className="section" id="mission" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <Reveal>
          <div className="mission">
            <img className="bgmark" src="assets/logo-mark-white.png" alt="" />
            <div className="eyebrow">Our mission</div>
            <h2>Why we put our phones down first.</h2>
            <p className="mtext">We empower high school communities across the U.S. to lead more digitally balanced lifestyles with our <DrawHL>youth-for-youth</DrawHL> programming.</p>
            <p className="mtext">As Big Tech's target audience, we have learned through experience what actually motivates our peers — <strong>there is no middleman.</strong> We use that to design our clubs, campaigns, and programming for the most impact possible.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { LandingHero, HomeHero, HomeStory, WhatWeDo, HomeMission });
