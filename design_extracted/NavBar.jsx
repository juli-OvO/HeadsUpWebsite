/* Sticky nav — Heads Up. Condenses on scroll, mobile burger menu.
   `active` highlights the current page; cross-page links resolve to the kit's files. */
function NavBar({ active = 'About' }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const HOME = 'index.html';
  const links = [
    { label: 'Home', href: 'home.html' },
    { label: 'About', href: 'index.html' },
    { label: 'Mentor Program', href: 'mentor-program.html' },
    { label: 'Initiatives', href: 'initiatives.html' },
    { label: 'Learning Modules', href: '#' },
    { label: 'Partners', href: 'partners.html' },
    { label: 'Donate', href: '#' },
    { label: 'Team', href: '#' },
  ];
  const brandHref = 'home.html';
  return (
    <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
      <div className="wrap">
        <div className="nav-inner">
          <a className="brand" href={brandHref}>
            <img src="../../assets/logo-mark.png" alt="Heads Up" />
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
