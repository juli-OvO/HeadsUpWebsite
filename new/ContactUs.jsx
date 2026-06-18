/* Heads Up — Contact Us page sections */
function ContactHero() {
  return (
    <section className="phero section">
      <div className="wrap">
        <Reveal>
          <div className="kicker-row">
            <span className="eyebrow">Get in touch</span>
          </div>
          <h1>Contact Us.</h1>
          <p className="lead">Questions, ideas, or just want to learn more? We'd love to hear from you.</p>
        </Reveal>
      </div>
    </section>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const set = (k) => (e) => setForm(Object.assign({}, form, { [k]: e.target.value }));

  const handle = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const topics = ['General question', 'Start a club', 'Mentorship', 'Partnership', 'Press'];

  return (
    <section className="section contact-section">
      <div className="wrap">
        <div className="contact-grid">

          <Reveal className="contact-info">
            <div className="eyebrow" style={{ marginBottom: 32 }}>Reach us</div>
            <div className="contact-channels">
              <div className="channel">
                <span className="ch-label">Email</span>
                <a href="mailto:hello@headsupclubs.org" className="ch-value">hello@headsupclubs.org</a>
              </div>
              <div className="channel">
                <span className="ch-label">Instagram</span>
                <a href="https://www.instagram.com/headsupcampaign_/" className="ch-value" target="_blank" rel="noopener">@headsupcampaign_</a>
              </div>
              <div className="channel">
                <span className="ch-label">LinkedIn</span>
                <a href="https://www.linkedin.com/company/heads-up-campaign/" className="ch-value" target="_blank" rel="noopener">Heads Up Campaign</a>
              </div>
            </div>
            <p className="contact-note">We're a student-run org — we try to respond within 2–3 business days.</p>
          </Reveal>

          <Reveal delay={80} className="contact-form-wrap">
            {submitted ? (
              <div className="contact-thanks">
                <div className="thanks-icon"><Icon name="check" size={28} /></div>
                <h2>Message sent.</h2>
                <p>Thanks for reaching out — we'll get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handle}>
                <div className="cf-field">
                  <label className="cf-label" htmlFor="cf-name">Full name</label>
                  <input id="cf-name" className="cf-input" type="text" required placeholder="Your name" value={form.name} onChange={set('name')} />
                </div>
                <div className="cf-field">
                  <label className="cf-label" htmlFor="cf-email">Email</label>
                  <input id="cf-email" className="cf-input" type="email" required placeholder="you@example.com" value={form.email} onChange={set('email')} />
                </div>
                <div className="cf-field">
                  <label className="cf-label" htmlFor="cf-subject">Topic</label>
                  <select id="cf-subject" className="cf-input cf-select" required value={form.subject} onChange={set('subject')}>
                    <option value="">Select a topic…</option>
                    {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="cf-field">
                  <label className="cf-label" htmlFor="cf-message">Message</label>
                  <textarea id="cf-message" className="cf-input cf-textarea" required placeholder="What's on your mind?" rows={5} value={form.message} onChange={set('message')} />
                </div>
                <div className="cf-footer">
                  <Button variant="primary" size="lg" type="submit" iconRight="arrowRight">Send message</Button>
                </div>
              </form>
            )}
          </Reveal>

        </div>
      </div>
    </section>
  );
}

window.ContactHero = ContactHero;
window.ContactSection = ContactSection;
