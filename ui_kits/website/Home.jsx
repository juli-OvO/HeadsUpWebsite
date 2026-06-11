/* Heads Up — Home page sections.
   Main landing page: split hero, story rows (editorial), start-a-club steps.
   Uses pages.css (.hhero, .storyrow, .intro, .steps) + extras.css (.casc). */

function HomeHero() {
  const colRef = useRef(null);
  useEffect(() => {
    const el = colRef.current;
    if (el) requestAnimationFrame(() => el.classList.add('play'));
  }, []);
  return (
    <header className="hhero" id="top">
      <div className="wrap">
        <div className="grid">
          <div>
            <Sticker tone="sky" tilt="tilt-l" icon="sparkles">Youth-for-youth</Sticker>
            <h1>The student-led movement for <DrawHL>digital balance.</DrawHL></h1>
            <p className="lead">High schoolers across the U.S. are building healthier relationships with technology — peer by peer, club by club.</p>
            <div className="cta-row">
              <a href="https://www.headsupclubs.org/start-a-club" target="_blank" rel="noopener">
                <Button variant="primary" size="lg" iconRight="arrowRight">Start a club</Button>
              </a>
              <a href="index.html">
                <Button variant="secondary" size="lg">Our story</Button>
              </a>
            </div>
            <div className="trust">
              <div><b>40+</b><span>Active clubs</span></div>
              <div><b>2K+</b><span>Students</span></div>
              <div><b>13</b><span>Partners</span></div>
            </div>
          </div>
          <div className="hhero-collage" ref={colRef}>
            <Polaroid tape caption="Weekly meeting" />
            <Polaroid caption="Club kickoff" />
            <Polaroid tape caption="Student leaders" />
          </div>
        </div>
      </div>
    </header>
  );
}

const ROWS = [
  {
    eyebrow: 'Clubs', fig: '01', flip: false,
    h2: 'Every chapter is 100% student-run.',
    p: 'Heads Up clubs hold weekly meetings where members track habits, share strategies, and lift each other up — without any adult running the show.',
    href: 'initiatives.html', link: 'See all initiatives',
  },
  {
    eyebrow: 'Mentorship', fig: '02', flip: true,
    h2: 'Older students mentor younger ones.',
    p: 'Our mentor program pairs experienced chapter leaders with newer members, creating a sustainable pipeline of digital wellness advocates across grade levels.',
    href: 'mentor-program.html', link: 'Mentor program',
  },
  {
    eyebrow: 'Impact', fig: '03', flip: false,
    h2: 'Real change, measured in hours.',
    p: 'Members report cutting recreational screen time by an average of 1.5 hours per day within the first semester — not by willpower, but by community.',
    href: 'partners.html', link: 'Our partners',
  },
];

function HomeStories() {
  return (
    <section className="section" id="how-it-works">
      <div className="wrap">
        <Reveal className="intro">
          <div className="row">
            <Sticker tone="cobalt" tilt="tilt-r" icon="users">How it works</Sticker>
          </div>
          <h2>Built by students. Backed by research. Proven by results.</h2>
          <p>Three pillars that make Heads Up actually work — unlike every other screen-time program aimed at teenagers.</p>
        </Reveal>
        <div className="story-rows">
          {ROWS.map((r) => (
            <div className={'storyrow' + (r.flip ? ' flip' : '')} key={r.fig}>
              <div className="storyrow-media">
                <figure>
                  <Placeholder ratio="5/4" />
                  <div className="rowcut">{r.eyebrow} — Fig. {r.fig}</div>
                </figure>
              </div>
              <div className="storyrow-body">
                <div className="eyebrow">{r.eyebrow}<span className="fig">{r.fig}</span></div>
                <h2>{r.h2}</h2>
                <p>{r.p}</p>
                <a className="textlink" href={r.href}>
                  {r.link}<Icon name="arrowRight" size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const HOME_STEPS = [
  { num: '01', h: 'Start the conversation', p: 'Bring the idea to your school — talk to a teacher, advisor, or just friends who get it.' },
  { num: '02', h: 'Register your chapter',  p: 'Fill out our short form and get the full curriculum, meeting guides, and community access.' },
  { num: '03', h: 'Run your first meeting', p: "You lead it. We give you everything you need — agenda, activities, support from chapters nationwide." },
];

function HomeStartAClub() {
  return (
    <section className="section" id="start">
      <div className="wrap">
        <div className="steps">
          <Reveal className="sec-head">
            <Eyebrow>Start a club</Eyebrow>
            <h2>Three steps to your first meeting.</h2>
            <p className="sub">No approval, no budget, no special equipment. Just students who care.</p>
          </Reveal>
          <Cascade className="step-row" step={80}>
            {HOME_STEPS.map((s) => (
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
            <a href="index.html">
              <Button variant="secondary" size="lg">Learn about us</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HomeHero, HomeStories, HomeStartAClub });
