/* Heads Up — Learning Modules page sections.
   Self-paced curriculum: module grid + CTA.
   Uses pages.css (.phero, .feature-grid) + extras.css (.sec-head, .casc). */

function ModulesHero() {
  return (
    <header className="phero" id="top">
      <div className="wrap">
        <div className="kicker-row">
          <Sticker tone="cobalt" tilt="tilt-l" icon="bookOpen">Learning Modules</Sticker>
          <span className="hand">go at your own pace</span>
        </div>
        <h1>The curriculum behind <DrawHL>every Heads Up club.</DrawHL></h1>
        <p className="lead">Eight self-paced modules covering the real science and lived experience of digital wellness — designed by students, reviewed by researchers, used in clubs nationwide.</p>
      </div>
    </header>
  );
}

const MODULES = [
  { num: '01', icon: 'smartphone', h: 'Screen Time 101',              p: 'What the data actually says about teen screen use — and why awareness is the first step toward change.' },
  { num: '02', icon: 'heart',      h: 'Social Media & Mood',          p: 'The research on social comparison, FOMO, and how feeds are designed to keep you scrolling.' },
  { num: '03', icon: 'clock',      h: 'Setting Personal Limits',      p: 'Practical frameworks for identifying your own patterns and building habits that stick.' },
  { num: '04', icon: 'sparkles',   h: 'Digital Mindfulness',          p: 'Techniques from mindfulness research adapted for the specific challenges of always-on devices.' },
  { num: '05', icon: 'moon',       h: 'Sleep & Screen Habits',        p: 'How blue light, notifications, and bedtime scrolling affect sleep — and what to do about it.' },
  { num: '06', icon: 'users',      h: 'Peer Pressure Online',         p: 'Navigating group chats, social validation, and the subtle pressure to stay constantly connected.' },
  { num: '07', icon: 'megaphone',  h: 'Conversations That Change Habits', p: 'How to talk about digital wellness with friends and family without it turning into a lecture.' },
  { num: '08', icon: 'bookOpen',   h: 'Building a Healthier Feed',    p: 'Practical steps to audit, curate, and reshape your digital environment to support your goals.' },
];

function ModuleGrid() {
  return (
    <section className="section" id="modules">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="row"><Sticker tone="cobalt" tilt="tilt-r" icon="bookOpen">8 modules</Sticker></div>
          <h2>One module per week. One semester of change.</h2>
          <p className="sub">Each module includes a 20-minute reading, a discussion guide for club meetings, and a personal reflection activity.</p>
        </Reveal>
        <Cascade className="feature-grid" style={{ '--cols': 4 }} step={60}>
          {MODULES.map((m) => (
            <div className="feature" key={m.num}>
              <div className="fic"><Icon name={m.icon} size={20} /></div>
              <h3>{m.num} — {m.h}</h3>
              <p>{m.p}</p>
            </div>
          ))}
        </Cascade>
      </div>
    </section>
  );
}

function ModulesCTA() {
  return (
    <section className="section" id="access" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal>
          <div className="mission">
            <img className="bgmark" src="../../assets/logo-mark-white.png" alt="" aria-hidden="true" />
            <div className="eyebrow">Access the curriculum</div>
            <h2>Free for every registered Heads Up chapter.</h2>
            <p className="mtext">
              All eight modules — plus facilitator guides, discussion prompts, and activity sheets — are available free to any <strong>registered Heads Up club.</strong>
              Start a chapter and get instant access.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
              <a href="https://www.headsupclubs.org/start-a-club" target="_blank" rel="noopener">
                <Button variant="white" size="lg" iconRight="arrowRight">Start a club</Button>
              </a>
              <a href="index.html">
                <Button variant="secondary" size="lg">About Heads Up</Button>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { ModulesHero, ModuleGrid, ModulesCTA });
