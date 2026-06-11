/* Heads Up — Mentor Program page sections (divider-led).
   Content from headsupclubs.org/new-page. Blue-dominant, moss/cream accent. */

function MentorHero() {
  return (
    <header className="phero" id="top">
      <div className="wrap">
        <div className="kicker-row">
          <Sticker tone="cobalt" tilt="tilt-l" icon="users">Mentor Program</Sticker>
          <span className="hand">youth guiding youth</span>
        </div>
        <h1>Pass it on, <DrawHL>one mentee at a time.</DrawHL></h1>
        <p className="lead">A flexible way for high school and college students to support younger youth on their digital-wellness journeys — and for middle schoolers to learn healthy tech habits from someone who actually gets it.</p>
        <div className="hero-stickers">
          <Sticker tilt="tilt-r" icon="heart">Self-paced learning</Sticker>
          <Sticker tone="sky" tilt="tilt-l2" icon="check">Digital-wellness certified</Sticker>
          <Sticker tilt="tilt-l" icon="users">10K+ community</Sticker>
        </div>
      </div>
    </header>
  );
}

function ProgramBlock({ tone, label, num, title, desc, perksTitle, perks, ctaLabel, ctaHref }) {
  return (
    <div className={'prog-block ' + tone}>
      <Reveal>
        <div className="kicker-row">
          <Sticker tone={tone === 'green' ? 'moss' : 'cobalt'} tilt={num === '01' ? 'tilt-l' : 'tilt-r'}>{num}</Sticker>
          <span className="label">{label}</span>
        </div>
        <h2 className="ttl">{title}</h2>
        <p className="desc">{desc}</p>
        <a href={ctaHref} target="_blank" rel="noopener">
          <Button variant={tone === 'green' ? 'moss' : 'primary'} size="lg" iconRight="arrowRight">{ctaLabel}</Button>
        </a>
      </Reveal>
      <div>
        <div className="perks-h">{perksTitle}</div>
        <Cascade className="perks-list" as="ul" step={90}>
          {perks.map((p, i) => (
            <li key={i}><span className="pk">✺</span><span>{p}</span></li>
          ))}
        </Cascade>
      </div>
    </div>
  );
}

function MentorPrograms() {
  return (
    <section className="prog" id="programs">
      <div className="wrap">
        <ProgramBlock
          tone="blue" num="01" label="For high school & college students"
          title="Become a Mentor"
          desc={<>The Heads Up Mentor Program is a flexible opportunity to support youth on their digital-wellness journeys. Mentors complete <strong>self-paced learning</strong> on digital-wellness topics to better guide and empower their mentees — and give back to their community.</>}
          perksTitle="Perks of joining"
          perks={['Gain leadership & mentorship experience', 'Learn about different digital-wellness topics', 'Join our community of 10K+ students & youth']}
          ctaLabel="Become a Mentor"
          ctaHref="https://docs.google.com/forms/d/e/1FAIpQLSeHSftLNXLcxp4BUtSXoVrYTd6adX_yMpRDX-qzlA8skXVf9Q/viewform"
        />
        <Hr className="prog-sep" />
        <ProgramBlock
          tone="green" num="02" label="For 5th grade & middle schoolers"
          title="Become a Mentee"
          desc={<>The Heads Up Mentee Program helps 5th-graders and middle schoolers build <strong>healthy tech habits</strong> with the support of trained high school or college students. Mentees explore digital-wellness topics and earn a <strong>digital-wellness certification</strong> on completion.</>}
          perksTitle="Perks of joining"
          perks={['Get advice from high school & college students', 'Learn about different digital-wellness topics', 'Join our community of 10K+ students & youth']}
          ctaLabel="Become a Mentee"
          ctaHref="https://docs.google.com/forms/d/e/1FAIpQLSczCtDJAXyBj1xmD9Zk4ncYrtLhlI6pE-S9OlwDIcexHCZkQg/viewform"
        />
      </div>
    </section>
  );
}

/* how the pairing works — dry-erase whiteboard with an o→o→o progress rail */
function MentorHow() {
  const steps = [
    { n: '1', tone: 'cobalt', h: 'Sign up in minutes', p: 'Fill out the mentor or mentee form. No experience required — just a willingness to show up.' },
    { n: '2', tone: 'moss',   h: 'Learn at your own pace', p: 'Work through self-paced digital-wellness modules built by students, for students.' },
    { n: '3', tone: 'sky',    h: 'Get matched & give back', p: 'Mentors guide mentees through the topics; mentees finish with a digital-wellness certification.' },
  ];
  return (
    <section className="section" id="how" style={{ paddingTop: 16 }}>
      <div className="wrap">
        <div className="wb-frame">
          <div className="wb">
            <span className="wb-tape tl" aria-hidden="true"></span>
            <span className="wb-tape br" aria-hidden="true"></span>

            <Reveal className="wb-head">
              <div className="row"><div className="eyebrow">How it works</div></div>
              <h2>From sign-up to <span className="wb-ul">certified.</span></h2>
              <p className="sub">The same self-paced track underpins both sides of the program — so mentors and mentees speak the same language.</p>
              <span className="wb-scrawl">drawn up by students <Icon name="sparkles" size={18} /></span>
            </Reveal>

            <Cascade className="wb-track" step={150}>
              {steps.map((s, i) => (
                <div className={'wb-node ' + s.tone} key={i}>
                  <div className="wb-circle">
                    <span className="wb-num">{s.n}</span>
                    {s.n === '3' ? <span className="wb-flag"><Icon name="check" size={13} />certified</span> : null}
                  </div>
                  <div className="wb-card">
                    <h3>{s.h}</h3>
                    <p>{s.p}</p>
                  </div>
                </div>
              ))}
              <span className="wb-rail" aria-hidden="true">
                <span className="wb-head-arrow a1"></span>
                <span className="wb-head-arrow a2"></span>
              </span>
            </Cascade>
          </div>
          <div className="wb-tray" aria-hidden="true">
            <span className="wb-marker c"></span>
            <span className="wb-marker m"></span>
            <span className="wb-eraser"></span>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { MentorHero, MentorPrograms, MentorHow });
