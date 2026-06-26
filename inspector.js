/* Heads Up — Webflow Inspector Dev Tool
   Toggle: click "⬡ WF Inspect" button (bottom-left) or press Shift+I
   Shows computed styles + Webflow context on hover */
(function () {
  'use strict';

  // ── Token map: lowercase hex → CSS variable name ──────────────────────────
  const TOKENS = {
    '#eaf0fb':'--cobalt-50', '#d4e1f7':'--cobalt-100', '#afc6ee':'--cobalt-200',
    '#87a9e2':'--cobalt-300', '#5a82cc':'--cobalt-400', '#2955ac':'--cobalt-500',
    '#234a97':'--cobalt-600', '#1d3d7e':'--cobalt-700', '#173063':'--cobalt-800',
    '#f0f6fe':'--sky-50',    '#e1eefc':'--sky-100',    '#c7def9':'--sky-200',
    '#97bdf1':'--sky-300',   '#6e9fe6':'--sky-400',
    '#f4f7fc':'--ink-50',    '#e8ecf3':'--ink-100',    '#d6dce7':'--ink-200',
    '#b4bccb':'--ink-300',   '#8a94a6':'--ink-400',    '#687284':'--ink-500',
    '#4c5566':'--ink-600',   '#333b49':'--ink-700',    '#1e2430':'--ink-800',
    '#12161f':'--ink-900',
    '#5c7667':'--moss',      '#45594d':'--moss-700',   '#34453b':'--moss-800',
    '#a9bbaf':'--moss-300',  '#dce5dd':'--moss-100',
    '#ffffff':'#fff',
  };

  // ── Known components: CSS class → info ────────────────────────────────────
  const COMPS = {
    'landing-hero':     { n:'LandingHero',     r:false, d:'Full-viewport home hero with BG image' },
    'hhero':            { n:'HomeHero',         r:false, d:'Animated text hero — home only' },
    'phero':            { n:'PageHero',         r:true,  d:'Standard page hero header (reusable)' },
    'nav':              { n:'NavBar',           r:true,  d:'Sticky nav — Symbol in Webflow' },
    'mobile-menu':      { n:'MobileMenu',       r:false, d:'Burger dropdown — child of NavBar' },
    'brand':            { n:'BrandLogo',        r:false, d:'Logo + wordmark link' },
    'footer':           { n:'Footer',           r:true,  d:'Site footer — Symbol in Webflow' },
    'wrap':             { n:'Wrap',             r:true,  d:'Max-width container: 1120px, gutter 28px' },
    'section':          { n:'Section',          r:false, d:'Content section — 92px top/bottom padding' },
    'sec-head':         { n:'SectionHead',      r:true,  d:'Centered heading block (h2 + sub)' },
    'impact':           { n:'ImpactStats',      r:true,  d:'Stat counter row (3-col)' },
    'feature-grid':     { n:'FeatureGrid',      r:false, d:'WhatWeDo 3-col icon-card grid' },
    'feature':          { n:'FeatureCard',      r:true,  d:'Icon + heading + text card' },
    'testimonial-card': { n:'TestimonialCard',  r:true,  d:'Quote card with avatar (reusable)' },
    'chapter-card':     { n:'ChapterCard',      r:true,  d:'Location chapter listing card' },
    'team-card':        { n:'TeamMemberCard',   r:true,  d:'Portrait placeholder + name + role' },
    'team-grid':        { n:'TeamGrid',         r:false, d:'Responsive card grid' },
    'sticker':          { n:'Sticker',          r:true,  d:'Organic badge — hard shadow, slight rotation' },
    'btn':              { n:'Button',           r:true,  d:'Pill button — use combo class for variant' },
    'eyebrow':          { n:'Eyebrow',          r:true,  d:'Space Mono uppercase label above headings' },
    'kicker-row':       { n:'KickerRow',        r:true,  d:'Row holding sticker badge(s)' },
    'faq-item':         { n:'FAQItem',          r:true,  d:'Accordion Q&A item' },
    'mission-panel':    { n:'MissionPanel',     r:false, d:'Full-width cobalt gradient block' },
    'story-pair':       { n:'StoryPair',        r:false, d:'Two-column story layout' },
    'story-pair-col':   { n:'StoryColumn',      r:false, d:'One column of story pair' },
    'textlink':         { n:'TextLink',         r:true,  d:'Inline link with right-arrow icon' },
    'first-club':       { n:'FirstClub',        r:false, d:'About page founding story section' },
    'donate-grid':      { n:'DonateGrid',       r:false, d:'Donate form layout (2-col)' },
    'team-section':     { n:'TeamSection',      r:false, d:'Full team grid section' },
    'team-tier':        { n:'TeamTier',         r:false, d:'Tier group (Leadership / Directors)' },
  };

  // ── Helpers ────────────────────────────────────────────────────────────────
  function rgbToHex(rgb) {
    if (!rgb || rgb === 'rgba(0, 0, 0, 0)') return null;
    const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return null;
    return '#' + [m[1],m[2],m[3]].map(n => (+n).toString(16).padStart(2,'0')).join('');
  }

  function tok(color) {
    if (!color || color === 'rgba(0, 0, 0, 0)') return 'transparent';
    const h = rgbToHex(color);
    if (!h) return color;
    return TOKENS[h.toLowerCase()] || h;
  }

  function fontTok(ff) {
    if (/Bricolage/i.test(ff))  return '--f-display · Bricolage Grotesque';
    if (/Hanken/i.test(ff))     return '--f-sans · Hanken Grotesk';
    if (/Space.?Mono/i.test(ff)) return '--f-mono · Space Mono';
    if (/Caveat/i.test(ff))     return '--f-hand · Caveat';
    return ff.split(',')[0].replace(/['"]/g,'').trim();
  }

  function lh(lineHeight, fontSize) {
    const l = parseFloat(lineHeight), f = parseFloat(fontSize);
    return (l && f) ? (l/f).toFixed(2) : lineHeight;
  }

  function getComp(el) {
    for (const cls of el.classList) { if (COMPS[cls]) return COMPS[cls]; }
    switch (el.tagName.toLowerCase()) {
      case 'nav':     return COMPS['nav'];
      case 'footer':  return COMPS['footer'];
      case 'h1':      return { n:'H1', r:false, d:'Display heading (Bricolage 800, clamp 48→84px)' };
      case 'h2':      return { n:'H2', r:false, d:'Section heading (Bricolage 800, clamp 33→51px)' };
      case 'h3':      return { n:'H3', r:false, d:'Sub-heading (Bricolage 700, 24px)' };
      case 'p':       return { n:'Paragraph', r:false, d:'Body text — Hanken 400, 17px, lh 1.62, ink-700' };
      case 'button':  return { n:'Button',    r:true,  d:'Interactive button element' };
      case 'a':       return { n:'Link',      r:false, d:'Anchor link' };
      case 'img':     return { n:'Image',     r:false, d:'Image element' };
      case 'section': return { n:'Section',   r:false, d:'Content section' };
      case 'header':  return { n:'Header',    r:false, d:'Page header / hero' };
      case 'main':    return { n:'Main',      r:false, d:'Page content area' };
      default:        return null;
    }
  }

  // ── Build DOM ──────────────────────────────────────────────────────────────
  const btn = document.createElement('button');
  btn.textContent = '⬡ WF Inspect';
  Object.assign(btn.style, {
    position:'fixed', bottom:'20px', left:'20px', zIndex:'99998',
    background:'#2955AC', color:'#fff', border:'none', borderRadius:'999px',
    padding:'9px 16px', fontFamily:"'Space Mono',monospace", fontSize:'10px',
    fontWeight:'700', letterSpacing:'.08em', textTransform:'uppercase',
    cursor:'pointer', boxShadow:'0 3px 0 #1D3D7E', lineHeight:'1', userSelect:'none',
  });

  const pnl = document.createElement('div');
  Object.assign(pnl.style, {
    position:'fixed', bottom:'20px', right:'20px', zIndex:'99998',
    background:'rgba(18,22,31,.97)', color:'#E8ECF3', borderRadius:'12px',
    padding:'14px 16px', fontFamily:"'Space Mono',monospace", fontSize:'9.5px',
    lineHeight:'1.7', maxWidth:'320px', minWidth:'230px',
    boxShadow:'0 12px 40px rgba(0,0,0,.55)', pointerEvents:'none',
    display:'none', border:'1px solid rgba(255,255,255,.1)',
  });

  const ring = document.createElement('div');
  Object.assign(ring.style, {
    position:'fixed', zIndex:'99997', pointerEvents:'none', display:'none',
    outline:'2px solid #97BDF1', outlineOffset:'2px',
    background:'rgba(151,189,241,.06)', borderRadius:'2px',
    transition:'top .08s,left .08s,width .08s,height .08s',
  });

  document.body.appendChild(btn);
  document.body.appendChild(pnl);
  document.body.appendChild(ring);

  // ── State ──────────────────────────────────────────────────────────────────
  let on = false;
  let cur = null;

  function setRing(el) {
    const r = el.getBoundingClientRect();
    Object.assign(ring.style, {
      display:'block', top:r.top+'px', left:r.left+'px',
      width:r.width+'px', height:r.height+'px',
    });
  }

  function r(label, val, dim) {
    const vc = dim ? '#4C5566' : '#E1EEFC';
    return `<div><span style="color:#687284;display:inline-block;min-width:52px;flex-shrink:0">${label}</span><span style="color:${vc}">${val}</span></div>`;
  }

  function render(el) {
    const cs = window.getComputedStyle(el);
    const comp = getComp(el);
    const cls = Array.from(el.classList).join(' .');

    let h = '';

    if (comp) {
      const badge = `<span style="background:${comp.r?'#234A97':'#45594D'};color:#fff;border-radius:3px;padding:1px 5px;font-size:8px;margin-left:5px;letter-spacing:.04em">${comp.r?'COMPONENT':'ELEMENT'}</span>`;
      h += `<div style="color:#97BDF1;font-weight:700;margin-bottom:5px;padding-bottom:5px;border-bottom:1px solid rgba(255,255,255,.08)">${comp.n}${badge}</div>`;
      h += `<div style="color:#687284;font-size:8.5px;margin-bottom:7px">${comp.d}</div>`;
    }

    if (cls) {
      h += `<div style="color:#333B49;font-size:8.5px;margin-bottom:7px;word-break:break-all">.${cls}</div>`;
    }

    const ff = fontTok(cs.fontFamily);
    const col = tok(cs.color);
    const bg  = tok(cs.backgroundColor);
    const mt=cs.marginTop, mr=cs.marginRight, mb=cs.marginBottom, ml=cs.marginLeft;
    const pt=cs.paddingTop, pr=cs.paddingRight, pb=cs.paddingBottom, pl=cs.paddingLeft;

    h += r('font', ff);
    h += r('size', `${cs.fontSize} · wt ${cs.fontWeight} · lh ${lh(cs.lineHeight, cs.fontSize)}`);
    if (parseFloat(cs.letterSpacing)) h += r('tracking', cs.letterSpacing);
    h += r('color', col);
    if (bg !== 'transparent') h += r('bg', bg);
    const mg = `${mt} ${mr} ${mb} ${ml}`;
    if (mg !== '0px 0px 0px 0px') h += r('margin', mg);
    const pd = `${pt} ${pr} ${pb} ${pl}`;
    if (pd !== '0px 0px 0px 0px') h += r('padding', pd);
    if (cs.borderRadius !== '0px') h += r('radius', cs.borderRadius);
    if (cs.boxShadow !== 'none') {
      const s = cs.boxShadow;
      h += r('shadow', s.length > 44 ? s.slice(0,44)+'…' : s);
    }
    if (cs.maxWidth !== 'none') h += r('max-w', cs.maxWidth, true);
    if (cs.width !== 'auto') h += r('width', cs.width, true);
    if (cs.gap && cs.gap !== 'normal' && cs.gap !== '0px') h += r('gap', cs.gap, true);
    h += r('el', `&lt;${el.tagName.toLowerCase()}&gt; · ${cs.display} · ${cs.position}`, true);

    pnl.innerHTML = h;
    pnl.style.display = 'block';
  }

  // ── Events ─────────────────────────────────────────────────────────────────
  btn.addEventListener('click', () => {
    on = !on;
    if (on) {
      Object.assign(btn.style, { background:'#5C7667', boxShadow:'0 3px 0 #34453B' });
      btn.textContent = '⬡ ON — click to off';
    } else {
      Object.assign(btn.style, { background:'#2955AC', boxShadow:'0 3px 0 #1D3D7E' });
      btn.textContent = '⬡ WF Inspect';
      pnl.style.display = 'none';
      ring.style.display = 'none';
      cur = null;
    }
  });

  document.addEventListener('mouseover', e => {
    if (!on) return;
    const t = e.target;
    if (t === btn || t === pnl || t === ring || pnl.contains(t)) return;
    if (t === cur) return;
    cur = t;
    setRing(t);
    render(t);
  }, true);

  window.addEventListener('scroll', () => {
    if (on && cur) setRing(cur);
  }, true);

  document.addEventListener('keydown', e => {
    if (e.shiftKey && e.key === 'I') { e.preventDefault(); btn.click(); }
  });

  console.log('%c[WF Inspector] loaded — Shift+I to toggle', 'color:#97BDF1;font-family:monospace');
})();
