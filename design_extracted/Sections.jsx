/* Heads Up — About sections: First Club, Mission, Youth-for-youth */

/* count-up number, fires when `play` flips true */
function Count({ to, play, delay = 0, dur = 950 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!play) return;
    let raf, start;
    const t = setTimeout(() => {
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        setN(Math.round(p * to));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [play, to, delay, dur]);
  return <React.Fragment>{n}</React.Fragment>;
}

/* screen-time meter: bars grow + numbers count up when scrolled into view */
function ScreenTimeMeter() {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setPlay(true); io.disconnect(); } });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const MAX = 10;
  const bars = [
    { label: '2020', hours: 5 },
    { label: 'During the pandemic', hours: 8, up: true },
  ];
  return (
    <div className="meter" ref={ref}>
      <div className="meter-head">
        <span className="eyebrow">Avg. hours online / day</span>
        <span className="meter-scale">scale 0–{MAX}h</span>
      </div>
      {bars.map((b, i) => (
        <div className={'meter-row' + (b.up ? ' up' : '')} key={i}>
          <div className="meter-label">{b.label}{b.up ? <span className="meter-delta">+3h</span> : null}</div>
          <div className="meter-track">
            <div className="meter-fill" style={{ width: play ? (b.hours / MAX * 100) + '%' : '0%', transitionDelay: (0.15 + i * 0.35) + 's' }}>
              <span className="meter-val"><Count to={b.hours} play={play} delay={150 + i * 350} />h</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FirstClub() {
  return (
    <section className="section" id="first-club">
      <div className="wrap">
        <div className="story-grid">
          <Reveal>
            <Polaroid src={IMG_DEERFIELD} tape alt="Deerfield Academy campus in snow"
              fallback="Deerfield Academy" caption="Deerfield Academy, winter '20" />
          </Reveal>
          <div className="story-col">
            <Reveal delay={120}>
              <div className="section-label">
                <Sticker tone="cobalt" tilt="tilt-l">01</Sticker>
                <h2>Our first club.</h2>
              </div>
            </Reveal>
            <Reveal delay={250}>
              <div className="prose">
                <p>Deerfield Academy branded itself as a "heads-up" campus — a place where putting your phone away when other people are around was supposed to be the norm. The reality looked different.</p>
                <p>A 2020 study on campus found students were averaging about <strong>5 hours online a day.</strong> Then the pandemic hit.</p>
              </div>
            </Reveal>
            <Reveal delay={380}>
              <ScreenTimeMeter />
            </Reveal>
            <Reveal delay={510}>
              <p className="big-callout">…and it only kept climbing.</p>
            </Reveal>
            <Reveal delay={640}>
              <div className="founder">
                <div className="ava">DB</div>
                <div className="who">
                  <b>Diana Bishopp</b>
                  <span>Founder &amp; Chair — started the first-ever Heads Up club, right there at Deerfield.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="section" id="mission">
      <div className="wrap">
        <div className="story-grid flip" style={{ alignItems: 'center' }}>
          <Reveal>
            <div className="mission">
              <img className="bgmark" src="../../assets/logo-mark-white.png" alt="" />
              <div className="eyebrow">Our mission</div>
              <h2>Why we put our phones down first.</h2>
              <p className="mtext">We empower high school communities across the U.S. to lead more digitally balanced lifestyles with our <DrawHL>youth-for-youth</DrawHL> programming.</p>
              <p className="mtext">As Big Tech's target audience, we've learned through experience what actually motivates our peers — <strong>there's no middleman.</strong> We use that to design our clubs, campaigns, and programming for the most impact possible.</p>
            </div>
          </Reveal>
          <Reveal delay={500}>
            <Polaroid src={IMG_CLASSROOM} tape alt="Students giving a Heads Up presentation"
              fallback="A club presentation" caption="running a session, our way" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function YouthBand() {
  return (
    <section className="youth" id="youth">
      <div className="wrap">
        <Reveal>
          <div className="big">Youth <DrawHL>for</DrawHL> youth.</div>
          <div className="cta-row">
            <Button variant="primary" size="lg" iconRight="arrowRight">Start a club</Button>
            <Button variant="secondary" size="lg">Meet the team</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { FirstClub, Mission, YouthBand });
