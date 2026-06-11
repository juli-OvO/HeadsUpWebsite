/* Heads Up — Mentor Program page sections.
   Program overview: mentor + mentee blocks, whiteboard flow, parallel roles, howto steps.
   Uses pages.css (.phero, .prog-block, .parallel, .howto) + extras.css (.wb-*). */

function MentorHero() {
  return (
    <header className="phero" id="top">
      <div className="wrap">
        <div className="kicker-row">
          <Sticker tone="cobalt" tilt="tilt-l" icon="users">Mentor Program</Sticker>
          <span className="hand">students teaching students</span>
        </div>
        <h1>Lead the change. <DrawHL>Mentor someone</DrawHL> who needs it.</h1>
        <p className="lead">The Heads Up mentor program pairs experienced club leaders with newer members — building a self-sustaining pipeline of peer support, school by school.</p>
      </div>
    </header>
  );
}

const MENTOR_PERKS = [
  'Co-lead weekly club meetings alongside your mentee',
  'Access the full Heads Up mentor toolkit and curriculum',
  'Earn a Heads Up peer leadership certification',
  'Join the national mentor community and events',
  'Build leadership and communication skills for college apps',
];

const MENTEE_PERKS = [
  'Personalized 1-on-1 guidance from a peer your own age',
  'Monthly check-ins and habit-tracking accountability',
  'Priority access to workshops and club events',
  'Clear path to becoming a mentor next semester',
  'A safe, judgment-free space to work on digital habits',
];

function ProgramBlocks() {
  return (
    <section className="prog" id="program">
      <div className="wrap">
        <div className="prog-block">
          <div>
            <div className="kicker-row">
              <span className="label">For mentors</span>
              <Sticker tilt="tilt-r" icon="sparkles">Lead</Sticker>
            </div>
            <h2 className="ttl">Step up and guide the next generation.</h2>
            <p className="desc">Mentors are experienced club members — usually juniors or seniors — ready to take on a real leadership role. You'll run sessions, coach habits, and model what digital balance looks like day-to-day.</p>
            <div className="perks-h">What you get</div>
            <ul className="perks-list">
              {MENTOR_PERKS.map((p) => (
                <li key={p}><span className="pk"><Icon name="check" size={17} /></span>{p}</li>
              ))}
            </ul>
          </div>
          <Reveal delay={60}>
            <Polaroid tape caption="Mentor leading a session" />
          </Reveal>
        </div>
        <Hr className="prog-sep" />
        <div className="prog-block green">
          <div>
            <div className="kicker-row">
              <span className="label">For mentees</span>
              <Sticker tone="moss" tilt="tilt-l2" icon="heart">Grow</Sticker>
            </div>
            <h2 className="ttl">Get the peer support you've been looking for.</h2>
            <p className="desc">Mentees are students who want <strong>real support</strong> — not a lecture from a parent or teacher. You'll work one-on-one with a peer who gets it and has been there.</p>
            <div className="perks-h">What you get</div>
            <ul className="perks-list">
              {MENTEE_PERKS.map((p) => (
                <li key={p}><span className="pk"><Icon name="check" size={17} /></span>{p}</li>
              ))}
            </ul>
          </div>
          <Reveal delay={60}>
            <Polaroid caption="Mentee and mentor check-in" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const WB_NODES = [
  { num: '1', tone: '',     h: 'Apply',  p: 'Fill out a short profile — takes 5 minutes. Tell us your school, grade, and whether you want to mentor or be mentored.' },
  { num: '2', tone: 'moss', h: 'Match',  p: 'We pair you based on school, interests, and goals. Matches are confirmed within two weeks of each semester start.', flag: 'Done for you' },
  { num: '3', tone: 'sky',  h: 'Lead',   p: 'Start meeting. Mentors guide sessions; mentees build skills. At semester end, mentees become next term\'s mentors.' },
];

function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="wrap">
        <Reveal>
          <div className="wb-frame">
            <div className="wb">
              <span className="wb-tape tl" />
              <span className="wb-tape br" />
              <div className="wb-head">
                <div className="sec-head left" style={{ marginBottom: 0 }}>
                  <div className="row"><Sticker tilt="tilt-r" icon="sparkles">How it works</Sticker></div>
                  <h2>From application to lead in one semester.</h2>
                  <p className="sub">The program runs on a semester cycle — apply once, get matched in weeks.</p>
                </div>
              </div>
              <div className="wb-track">
                <div className="wb-rail" />
                <div className="wb-head-arrow a1" />
                <div className="wb-head-arrow a2" />
                {WB_NODES.map((n) => (
                  <div className={'wb-node' + (n.tone ? ' ' + n.tone : '')} key={n.num}>
                    <div className="wb-circle">
                      {n.flag && <span className="wb-flag"><Icon name="sparkles" size={10} />{n.flag}</span>}
                      <span className="wb-num">{n.num}</span>
                    </div>
                    <div className="wb-card">
                      <h3>{n.h}</h3>
                      <p>{n.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="wb-tray">
              <div className="wb-marker c" />
              <div className="wb-marker m" />
              <div className="wb-eraser" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Roles() {
  return (
    <section className="section" id="roles" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="sec-head" style={{ marginBottom: 40 }}>
          <div className="row"><Sticker tone="cobalt" tilt="tilt-l2" icon="users">Roles</Sticker></div>
          <h2>Two ways to be part of the program.</h2>
          <p className="sub">Whether you lead a chapter or represent the movement at large, there's a role for you.</p>
        </Reveal>
        <Cascade className="parallel" step={100}>
          <div className="par-col">
            <div className="meta"><Icon name="sparkles" size={14} className="ic" />Club Champions</div>
            <h3 className="ttl">Chapter Presidents &amp; Co-Leaders</h3>
            <p className="desc">Club Champions run their school's Heads Up chapter. They plan meetings, recruit members, and serve as the primary mentor figure for their peers.</p>
            <a className="textlink" href="initiatives.html">Start a chapter<Icon name="arrowRight" size={13} /></a>
          </div>
          <div className="par-col">
            <div className="meta"><Icon name="heart" size={14} className="ic" />Ambassadors</div>
            <h3 className="ttl">School &amp; Regional Representatives</h3>
            <p className="desc">Ambassadors spread the Heads Up message beyond their club — to other schools, local organizations, and community events — connecting chapters across regions.</p>
            <a className="textlink" href="https://www.headsupclubs.org" target="_blank" rel="noopener">Apply to be an ambassador<Icon name="arrowRight" size={13} /></a>
          </div>
        </Cascade>
      </div>
    </section>
  );
}

const APPLY_STEPS = [
  'Visit the Mentor Program page at headsupclubs.org',
  'Click "Apply" and choose your role — mentor or mentee',
  'Fill out your profile: school, grade, and interests',
  'Submit before the semester application deadline',
  'Receive your match notification within two weeks',
  'Attend the optional virtual orientation (30 min)',
  'Schedule your first meeting with your partner',
  'Complete the semester and earn your certification',
];

function HowToApply() {
  return (
    <section className="section" id="apply" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="howto-head">
          <span className="eyebrow">Application steps</span>
          <span className="hand" style={{ fontSize: 21, color: 'var(--cobalt-600)' }}>only takes 5 minutes</span>
        </div>
        <ul className="howto">
          {APPLY_STEPS.map((s, i) => (
            <li className="howto-step" key={i}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <p>{s}</p>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: 14, marginTop: 44, flexWrap: 'wrap' }}>
          <a href="https://www.headsupclubs.org/mentor-program" target="_blank" rel="noopener">
            <Button variant="primary" size="lg" iconRight="arrowRight">Apply now</Button>
          </a>
          <a href="index.html">
            <Button variant="secondary" size="lg">Learn about us</Button>
          </a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { MentorHero, ProgramBlocks, HowItWorks, Roles, HowToApply });
