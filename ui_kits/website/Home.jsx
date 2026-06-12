/* Heads Up — Home page sections. Blue-dominant, moss/cream accent. */

function HomeHero() {
  return (
    <header className="hhero" id="top">
      <div className="wrap">
        <div className="grid">
          <div>
            <div className="kicker-row" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <Sticker tone="cobalt" tilt="tilt-l" icon="heart">Youth-for-youth · est. 2020</Sticker>
            </div>
            <h1>Helping students <DrawHL>look up.</DrawHL></h1>
            <p className="lead">Heads Up is a student-led movement for digital balance. We started in one dining hall and a single club — now we run clubs, mentorship, and campaigns across the country, built entirely by the people Big Tech is trying hardest to keep scrolling.</p>
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
    </header>
  );
}

/* Origin + approach — alternating image/text rows (image-led, St-Jude-style) */
function HomeStory() {
  const rows = [
    {
      num: '01', eyebrow: 'Where it started',
      h: 'One dining hall. One club. One honest conversation.',
      p: 'Heads Up began at a single school, when a handful of students got real about how much their phones were running their days — and decided to do something about it together. That first club became a blueprint other schools could pick up and run with.',
      cut: 'Fig. 01 — Where Heads Up began.',
      cta: 'Read our story', href: 'index.html',
    },
    {
      num: '02', eyebrow: 'Why youth-for-youth works',
      h: 'The people Big Tech targets, designing the way out.',
      p: "We’re the audience these platforms are built to keep scrolling, so we know what actually lands with our peers. Every club, campaign, and module is shaped by students — no middleman, and no lectures from adults who don’t quite get it.",
      cut: 'Fig. 02 — Students leading a session.',
      cta: 'See our programs', href: 'initiatives.html',
    },
  ];
  return (
    <section className="section" id="story">
      <div className="wrap">
        <div className="story-rows">
          {rows.map((r, i) => (
            <Reveal key={i}>
              <div className={'storyrow' + (i % 2 ? ' flip' : '')}>
                <div className="storyrow-media">
                  <figure>
                    <Placeholder ratio="5/4" />
                    <figcaption className="rowcut">{r.cut}</figcaption>
                  </figure>
                </div>
                <div className="storyrow-body">
                  <div className="eyebrow"><span className="fig">{r.num}</span>{r.eyebrow}</div>
                  <h2>{r.h}</h2>
                  <p>{r.p}</p>
                  <a className="textlink" href={r.href}>{r.cta}<Icon name="arrowRight" size={15} /></a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* What we do — links to the other pages */
function WhatWeDo() {
  const cards = [
    { icon: 'users', h: 'Club Champions', p: 'Found a Heads Up club at your school and lead the change locally.', cta: 'Start a club', href: 'initiatives.html' },
    { icon: 'megaphone', h: 'Ambassadors', p: 'A flexible role for students who want to help without running a club.', cta: 'Join in', href: 'initiatives.html' },
    { icon: 'heart', h: 'Mentor Program', p: 'Guide a middle schooler — or get guided — toward healthier tech habits.', cta: 'Mentor or mentee', href: 'mentor-program.html' },
    { icon: 'bookOpen', h: 'Learning Modules', p: 'Explore 10+ digital-wellness topics and earn a certification.', cta: 'Explore', href: 'initiatives.html' },
  ];
  return (
    <section className="section" id="what-we-do" style={{ paddingBottom: 56 }}>
      <div className="wrap">
        <div className="intro">
          <div className="row"><Sticker tone="cobalt" tilt="tilt-r" icon="sparkles">What we do</Sticker></div>
          <h2>Find your way in.</h2>
          <p>Whatever your time and energy, there's a Heads Up role that fits — every one of them youth-led.</p>
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

/* Mission band (home variant) */
function HomeMission() {
  return (
    <section className="section" id="mission" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <Reveal>
          <div className="mission">
            <img className="bgmark" src="../../assets/logo-mark-white.png" alt="" />
            <div className="eyebrow">Our mission</div>
            <h2>Why we put our phones down first.</h2>
            <p className="mtext">We empower high school communities across the U.S. to lead more digitally balanced lifestyles with our <DrawHL>youth-for-youth</DrawHL> programming.</p>
            <p className="mtext">As Big Tech's target audience, we've learned through experience what actually motivates our peers — <strong>there's no middleman.</strong> We use that to design our clubs, campaigns, and programming for the most impact possible.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { HomeHero, HomeStory, WhatWeDo, HomeMission });
