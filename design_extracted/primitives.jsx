/* Shared primitives for the IRL website kit */
const { useState, useEffect, useRef } = React;

function Button({ variant = 'primary', size, children, icon, iconRight, onClick, type, className }) {
  const cls = ['btn', 'btn-' + variant, size ? 'btn-' + size : '', className || ''].join(' ').trim();
  return (
    <button className={cls} onClick={onClick} type={type || 'button'}>
      {icon ? <Icon name={icon} size={18} /> : null}
      {variant === 'ghost' ? <span className="u">{children}</span> : children}
      {iconRight ? <Icon name={iconRight} size={18} /> : null}
    </button>
  );
}

function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

function Pill({ tone = 'soft', children }) {
  return <span className={'pill pill-' + tone}>{children}</span>;
}

function Photo({ caption, duotone, icon = 'image', className, style }) {
  return (
    <div className={'photo' + (duotone ? ' photo-duotone' : '') + (className ? ' ' + className : '')} style={style}>
      <div className="ph-in">
        <Icon name={icon} size={30} />
        <div className="ph-cap">{caption}</div>
      </div>
    </div>
  );
}

/* Sticker badge — club / scrapbook accent */
function Sticker({ tone, tilt, icon, children }) {
  const cls = ['sticker', tone || '', tilt || ''].join(' ').trim();
  return (
    <span className={cls}>
      {icon ? <Icon name={icon} size={14} /> : <span className="dot" />}
      {children}
    </span>
  );
}

/* Photo card — modern & minimal: clean rounded frame, soft shadow, small caption.
   Falls back to a blank placeholder with faint "img" text. Pass `tape` for a subtle scrapbook accent. */
function Polaroid({ src, alt, caption, tape, fallback, style, className }) {
  const [ok, setOk] = useState(!!src);
  return (
    <figure className={'polaroid' + (className ? ' ' + className : '')} style={style}>
      {tape ? <span className="tape" /> : null}
      <div className="pic">
        {src && ok
          ? <img src={src} alt={alt || ''} onError={() => setOk(false)} />
          : <span className="ph-fallback">img</span>}
      </div>
      {caption ? <figcaption className="cap">{caption}</figcaption> : null}
    </figure>
  );
}

/* Blank image placeholder — a clean box with faint "img" text. Size it with CSS (4/3 by default). */
function Placeholder({ label = 'img', ratio, className, style }) {
  return (
    <div
      className={'imgph' + (className ? ' ' + className : '')}
      style={{ ...(ratio ? { aspectRatio: ratio } : {}), ...(style || {}) }}
    >
      <span>{label}</span>
    </div>
  );
}

/* scroll reveal — re-triggers each time the element enters the viewport (not one-shot) */
function Reveal({ children, delay = 0, as = 'div', className, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          t = setTimeout(() => el.classList.add('in'), delay);
        } else {
          clearTimeout(t);
          el.classList.remove('in');
        }
      });
    }, { threshold: 0.14 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [delay]);
  const Tag = as;
  return <Tag ref={ref} className={'reveal' + (className ? ' ' + className : '')} style={style}>{children}</Tag>;
}

/* Cascade — staggers its direct children in/out as the group enters/leaves view.
   Re-triggers on every re-entry. Children animate with a per-index delay. */
function Cascade({ children, className, step = 80, as = 'div', style, threshold = 0.14 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    Array.from(el.children).forEach((c, i) => c.style.setProperty('--ci', i));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        el.classList.toggle('casc-in', e.isIntersecting);
      });
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [step, threshold]);
  const Tag = as;
  return <Tag ref={ref} className={'casc' + (className ? ' ' + className : '')} style={{ '--step': step + 'ms', ...(style || {}) }}>{children}</Tag>;
}

/* hairline divider */
function Hr({ className, style }) {
  return <div className={'hr' + (className ? ' ' + className : '')} style={style} />;
}

/* DrawHL — highlighter that draws on (left→right) when scrolled into view.
   Resting (drawn) state is the fallback for reduced-motion / print. */
function DrawHL({ children, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { el.classList.add('drawn'); io.disconnect(); } });
    }, { threshold: 0.7 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <span ref={ref} className={'hl draw' + (className ? ' ' + className : '')}>{children}</span>;
}

Object.assign(window, { Button, Eyebrow, Pill, Photo, Placeholder, Sticker, Polaroid, Reveal, Cascade, Hr, DrawHL });
