/* Sticky nav — Heads Up. Condenses on scroll, mobile burger menu.
   `active` highlights the current page; paths are resolved via window.HU_BASE. */
function NavBar({ active = 'About' }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const b = window.HU_BASE || '';
  const homeHref = b ? 'index.html' : '../index.html';
  const links = [
    { label: 'Home',             href: homeHref },
    { label: 'About',            href: b + 'index.html' },
    { label: 'Mentor Program',   href: b + 'mentor-program.html' },
    { label: 'Initiatives',      href: b + 'initiatives.html' },
    { label: 'Learning Modules', href: '#' },
    { label: 'Partners',         href: b + 'partners.html' },
    { label: 'Donate',           href: '#' },
    { label: 'Team',             href: '#' },
    { label: 'Contact',          href: b + 'contact.html' },
  ];
  return (
    <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
      <div className="wrap">
        <div className="nav-inner">
          <a className="brand" href={homeHref}>
            <img src={b + 'assets/logo-mark.png'} alt="Heads Up" />
            <span className="wm">Heads Up</span>
          </a>
          <div className="nav-links">
            {links.map((l) => <a key={l.label} href={l.href} className={l.label === active ? 'active' : ''}>{l.label}</a>)}
          </div>
          <button className="nav-burger" aria-label="Menu" onClick={() => setOpen(!open)}>
            <Icon name={open ? 'x' : 'menu'} size={24} />
          </button>
        </div>
        <div className={'mobile-menu' + (open ? ' open' : '')}>
          {links.map((l) => <a key={l.label} href={l.href} className={l.label === active ? 'active' : ''} onClick={() => setOpen(false)}>{l.label}</a>)}
        </div>
      </div>
    </nav>
  );
}
window.NavBar = NavBar;
