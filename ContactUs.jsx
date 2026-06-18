/* Heads Up — Contact Us page */
const { useState } = React;

function ContactHero() {
  return (
    <header className="phero" id="top">
      <div className="wrap">
        <Reveal>
          <div className="kicker-row">
            <Sticker tone="cobalt" tilt="tilt-l" icon="mail">Get in touch</Sticker>
          </div>
          <h1>Contact <DrawHL>Us.</DrawHL></h1>
          <p className="lead">Any questions, ideas, inquiries, or feedback? We'd love to hear from you.</p>
        </Reveal>
      </div>
    </header>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', reason: '' });

  const set = (k) => (e) => setForm(Object.assign({}, form, { [k]: e.target.value }));
  const handle = (e) => { e.preventDefault(); setSubmitted(true); };

  const channels = [
    { label: 'Email',     value: 'hello@headsupclubs.org',  href: 'mailto:hello@headsupclubs.org' },
    { label: 'Instagram', value: '@headsupcampaign_',        href: 'https://www.instagram.com/headsupcampaign_/' },
    { label: 'LinkedIn',  value: 'Heads Up Campaign',        href: 'https://www.linkedin.com/company/heads-up-campaign/' },
  ];

  const reasons = ['General question', 'Start a club', 'Mentorship', 'Partnership', 'Press', 'Other'];

  return (
    <section className="section contact-section">
      <div className="wrap">
        <div className="contact-grid">

          <Reveal className="contact-channels-col">
            <div className="eyebrow" style={{ marginBottom: 24 }}>Reach us</div>
            <div className="contact-channels">
              {channels.map((c) => (
                <div className="channel" key={c.label}>
                  <span className="ch-label">{c.label}</span>
                  <a
                    href={c.href}
                    className="ch-value"
                    target={c.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener"
                  >{c.value}</a>
                </div>
              ))}
            </div>
            <p className="contact-note">We're a student-run org — we try to respond within 2–3 business days.</p>
          </Reveal>

          <Reveal delay={80}>
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
                  <label className="cf-label" htmlFor="cf-phone">Phone</label>
                  <input id="cf-phone" className="cf-input" type="tel" placeholder="(optional)" value={form.phone} onChange={set('phone')} />
                </div>
                <div className="cf-field">
                  <label className="cf-label" htmlFor="cf-reason">Reason for contact</label>
                  <select id="cf-reason" className="cf-input cf-select" required value={form.reason} onChange={set('reason')}>
                    <option value="">Select a reason…</option>
                    {reasons.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
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
