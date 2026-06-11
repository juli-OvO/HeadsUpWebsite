/* Heads Up — footer */
function Footer() {
  const cols = [
    { h: 'Heads Up', items: [
      { t: 'Home', href: 'home.html' },
      { t: 'About', href: 'index.html' },
      { t: 'Initiatives', href: 'initiatives.html' },
      { t: 'Mentor Program', href: 'mentor-program.html' },
    ] },
    { h: 'Get involved', items: [
      { t: 'Start a club', href: 'initiatives.html' },
      { t: 'Become a mentor', href: 'mentor-program.html' },
      { t: 'Partners', href: 'partners.html' },
      { t: 'Donate', href: '#' },
    ] },
  ];
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <a className="brand" href="#top">
              <img src="../../assets/logo-mark-white.png" alt="Heads Up" style={{ height: 30 }} />
              <span className="wm" style={{ fontSize: 22 }}>Heads Up</span>
            </a>
            <p className="blurb">A youth-for-youth movement helping high schoolers across the U.S. build a more digitally balanced life — built by students, for students.</p>
            <div className="socials">
              <a href="https://www.instagram.com/headsupcampaign_/" aria-label="Instagram"><Icon name="instagram" size={18} /></a>
              <a href="https://www.linkedin.com/company/heads-up-campaign/" aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h5>{c.h}</h5>
              <ul>{c.items.map((i) => <li key={i.t}><a href={i.href}>{i.t}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 Heads Up · A youth-led 501(c)(3)</span>
          <span className="hand">For a more digitally balanced life.</span>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
