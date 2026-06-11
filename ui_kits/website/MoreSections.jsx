/* Heads Up — section templates (editorial / divider-led).
   Impact stats · Testimonials · Start-a-club steps · Chapters · FAQ
   Scroll-cascade animations re-trigger on every re-entry. */

/* count-up — runs when in view, resets when it leaves so it replays on re-entry */
function CountUp({ to, suffix, dur = 1200 }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const run = () => {
      let start;
      cancelAnimationFrame(raf);
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(eased * to));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) { run(); }
        else { cancelAnimationFrame(raf); setN(0); }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, dur]);
  return <span ref={ref}>{n.toLocaleString()}{suffix ? <span className="suf">{suffix}</span> : null}</span>;
}

/* ---------- 1 · IMPACT STATS ---------- */
function ImpactStats() {
  const stats = [
    { to: 120, suffix: '+', label: 'Active club chapters', foot: 'and counting' },
    { to: 38, suffix: '', label: 'States with a Heads Up club', foot: 'coast to coast' },
    { to: 15000, suffix: '+', label: 'Students reached directly', foot: 'one talk at a time' },
    { to: 92, suffix: '%', label: 'Check their phone less, after', foot: 'our program' },
  ];
  return (
    <section className="section impact" id="impact">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tone="moss" tilt="tilt-l" icon="sparkles">Our impact</Sticker></div>
          <h2>What youth-for-youth adds up to.</h2>
          <p className="sub">No grand claims — just what students have built, school by school, since one club in a single dining hall.</p>
        </Reveal>
        <Cascade className="stat-row" step={90}>
          {stats.map((s, i) => (
            <div className="stat" key={i}>
              <div className="stat-num"><CountUp to={s.to} suffix={s.suffix} /></div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-foot"><Icon name="arrowUpRight" size={17} />{s.foot}</div>
            </div>
          ))}
        </Cascade>
      </div>
    </section>
  );
}

/* ---------- 2 · TESTIMONIALS ---------- */
function Testimonials() {
  const notes = [
    { q: 'Our advisor never lectured us about screens. We figured it out together, and that’s why it actually stuck.', name: 'Maya R.', role: 'Club lead · Austin, TX', ava: 'MR' },
    { q: 'I’ve run a lot of wellness programs. This is the first one students asked to keep going after the pilot ended.', name: 'Mr. Delgado', role: 'Faculty advisor · Boston, MA', ava: 'JD' },
    { q: 'Starting a chapter took one form and a lunch meeting. Two weeks later we had thirty kids showing up.', name: 'Theo K.', role: 'Founder, Lincoln HS chapter', ava: 'TK' },
  ];
  return (
    <section className="section" id="testimonials">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tone="cobalt" tilt="tilt-r" icon="quote">In their words</Sticker></div>
          <h2>Why students keep showing up.</h2>
        </Reveal>
        <Cascade className="quote-row" step={110}>
          {notes.map((t, i) => (
            <figure className="quote" key={i}>
              <span className="qmark"><Icon name="quote" size={32} /></span>
              <blockquote>{t.q}</blockquote>
              <figcaption className="who">
                <div className="ava">{t.ava}</div>
                <div><b>{t.name}</b><span>{t.role}</span></div>
              </figcaption>
            </figure>
          ))}
        </Cascade>
      </div>
    </section>
  );
}

/* ---------- 3 · START A CLUB (how it works) ---------- */
function StartAClub() {
  const steps = [
    { n: '01', h: 'Apply in 5 minutes', p: 'One short form tells us your school and who’s leading. No fees, no experience needed.' },
    { n: '02', h: 'Get your starter kit', p: 'Slides, meeting plans, and a real student mentor who’s done it before — all ready to go.' },
    { n: '03', h: 'Run your first meeting', p: 'Pick a date, post a flyer, and host. We’re on call the whole way through your first month.' },
  ];
  return (
    <section className="section" id="start">
      <div className="wrap">
        <div className="steps">
          <Reveal className="sec-head">
            <div className="row"><div className="eyebrow">Start a chapter</div></div>
            <h2>From zero to your first meeting.</h2>
            <p className="sub">Three steps, fully supported. Most clubs go from sign-up to their opening session in under two weeks.</p>
          </Reveal>
          <Cascade className="step-row" step={120}>
            {steps.map((s, i) => (
              <div className="step" key={i}>
                <div className="num">{s.n}</div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </Cascade>
          <div className="cta-row">
            <Button variant="white" size="lg" iconRight="arrowRight">Start your club</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4 · WHERE WE ARE (interactive chapter map) ---------- */
function Chapters() {
  const pins = [
    { name: 'Lakeside School',   city: 'Seattle, WA',     n: 340, x: 205, y: 60 },
    { name: 'Palo Alto HS',      city: 'Palo Alto, CA',   n: 580, x: 165, y: 270 },
    { name: 'New Trier',         city: 'Winnetka, IL',    n: 520, x: 625, y: 200 },
    { name: 'Lincoln HS',        city: 'Lincoln, NE',     n: 410, x: 545, y: 250 },
    { name: 'Austin High',       city: 'Austin, TX',      n: 700, x: 545, y: 445 },
    { name: 'Westlake HS',       city: 'Atlanta, GA',     n: 360, x: 775, y: 375 },
    { name: 'Berkeley Prep',     city: 'Tampa, FL',       n: 300, x: 862, y: 480 },
    { name: 'Stuyvesant',        city: 'New York, NY',    n: 540, x: 898, y: 205 },
    { name: 'Choate',            city: 'Wallingford, CT', n: 290, x: 915, y: 188 },
    { name: 'Deerfield Academy', city: 'Deerfield, MA',   n: 380, x: 905, y: 165 },
    { name: 'Phillips Exeter',   city: 'Exeter, NH',      n: 460, x: 945, y: 145 },
    { name: 'Boston Latin',      city: 'Boston, MA',      n: 620, x: 948, y: 168 },
  ];
  const maxN = 700;
  const [active, setActive] = useState(8);
  const sel = pins[active];
  return (
    <section className="section chapters" id="chapters">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tone="moss" tilt="tilt-l2" icon="mapPin">On the map</Sticker></div>
          <h2>Where Heads Up is showing up.</h2>
          <p className="sub">Every pin is a student-led chapter. Hover one to see who started it and how many peers they've reached.</p>
        </Reveal>
        <Reveal className="chap-layout">
          <div className="map-panel">
            <div className="map-canvas">
              <img className="map-usa-img" src="us-map.png" alt="Map of the United States" />

              {pins.map((p, i) => (
                <button
                  key={p.name}
                  className={'map-pin' + (i === active ? ' on' : '')}
                  style={{ left: (p.x / 10) + '%', top: (p.y / 5.89) + '%' }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-label={p.name + ', ' + p.city}
                >
                  <span className="pin-pulse" />
                  <span className="pin-dot" />
                  <span className="pin-tag">{p.name}</span>
                </button>
              ))}

              <div className="map-count"><span className="live" />120+ chapters live</div>
              <div className="map-legend">
                <span className="lg"><span className="sw" style={{ background: 'var(--cobalt-500)' }} />student chapter</span>
              </div>
            </div>
            <div className="map-fig">
              <span className="fig-no">Fig. 01</span>
              <span className="fig-cap">Student-led Heads Up chapters — 38 states, 120+ campuses, mapped spring 2026.</span>
            </div>
          </div>

          <aside className="chap-side">
            <div className="spotlight">
              <div className="sl-head"><span className="sl-live" />Now viewing</div>
              <div className="sl-name">{sel.name}</div>
              <div className="sl-city"><Icon name="mapPin" size={14} />{sel.city}</div>
              <div className="sl-metric">
                <b>{sel.n}</b>
                <span>students reached at this chapter</span>
              </div>
              <div className="sl-hint"><Icon name="arrowUpRight" size={16} />Hover any pin to explore another</div>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 5 · FAQ ---------- */
function FAQ({ items, eyebrow = 'Good questions', title = 'The things students ask first.' }) {
  const fallback = [
    { q: 'Who can start a Heads Up club?', a: 'Any high school student in the U.S. You don’t need to be a club president or have run anything before — just a willingness to host a first meeting. We pair every new chapter with a student mentor.' },
    { q: 'Does it cost anything?', a: 'No. Heads Up is a youth-led 501(c)(3). The starter kit, slides, and mentorship are all free. Optional merch and event materials are available at cost.' },
    { q: 'How much time does it take?', a: 'Most chapters meet once or twice a month. Leading a club runs about an hour or two a week, and the starter kit means you’re never building a meeting from scratch.' },
    { q: 'Is this anti-technology?', a: 'Not at all. We’re about balance, not bans. The whole point is helping students make intentional choices about their own time — designed by people their own age, with no middleman.' },
  ];
  const list = items || fallback;
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tone="sky" tilt="tilt-r" icon="search">{eyebrow}</Sticker></div>
          <h2>{title}</h2>
        </Reveal>
        <Cascade className="faq-wrap" step={70}>
          {list.map((it, i) => (
            <div className={'faq-item' + (open === i ? ' open' : '')} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                {it.q}<span className="tog">+</span>
              </button>
              <div className="faq-a"><div className="faq-a-in">{it.a}</div></div>
            </div>
          ))}
        </Cascade>
      </div>
    </section>
  );
}

Object.assign(window, { CountUp, ImpactStats, Testimonials, StartAClub, Chapters, FAQ });
