/* Heads Up — Webflow Inspector v2
   Shift+I  or  click "⬡ WF Inspect" to toggle
   Hover to preview · Click any element to LOCK the panel · Click again or press Esc to unlock */
(function () {
  'use strict';

  // ── Design token map: computed hex → variable name ─────────────────────────
  const TOKENS = {
    '#eaf0fb':'--cobalt-50','#d4e1f7':'--cobalt-100','#afc6ee':'--cobalt-200',
    '#87a9e2':'--cobalt-300','#5a82cc':'--cobalt-400','#2955ac':'--cobalt-500',
    '#234a97':'--cobalt-600','#1d3d7e':'--cobalt-700','#173063':'--cobalt-800',
    '#f0f6fe':'--sky-50','#e1eefc':'--sky-100','#c7def9':'--sky-200',
    '#97bdf1':'--sky-300','#6e9fe6':'--sky-400',
    '#f4f7fc':'--ink-50','#e8ecf3':'--ink-100','#d6dce7':'--ink-200',
    '#b4bccb':'--ink-300','#8a94a6':'--ink-400','#687284':'--ink-500',
    '#4c5566':'--ink-600','#333b49':'--ink-700','#1e2430':'--ink-800',
    '#12161f':'--ink-900',
    '#5c7667':'--moss','#45594d':'--moss-700','#34453b':'--moss-800',
    '#a9bbaf':'--moss-300','#dce5dd':'--moss-100',
    '#ffffff':'#ffffff (white)',
  };

  // ── Component registry: CSS class → display info ───────────────────────────
  const COMPS = {
    'landing-hero':     { n:'LandingHero',    r:false, d:'Full-viewport home-only hero with background image' },
    'hhero':            { n:'HomeHero',        r:false, d:'Animated headline hero — home page only' },
    'phero':            { n:'PageHero',        r:true,  d:'Standard page header with title and subtitle' },
    'nav':              { n:'NavBar',          r:true,  d:'Sticky top navigation — make this a Symbol in Webflow' },
    'mobile-menu':      { n:'MobileMenu',      r:false, d:'Burger dropdown — lives inside NavBar' },
    'brand':            { n:'Brand Logo',      r:false, d:'Logo image + wordmark link in the nav' },
    'footer':           { n:'Footer',          r:true,  d:'Site-wide footer — make this a Symbol in Webflow' },
    'wrap':             { n:'Wrap (container)',r:true,  d:'Centers content — max 1120px wide, 28px padding each side' },
    'section':          { n:'Section',         r:false, d:'One content block — 92px padding top and bottom' },
    'sec-head':         { n:'Section Header',  r:true,  d:'The eyebrow + heading + subtitle group at the top of a section' },
    'impact':           { n:'ImpactStats',     r:true,  d:'Row of three big numbers (stat counters)' },
    'feature-grid':     { n:'FeatureGrid',     r:false, d:'"What We Do" — 3-column icon card grid' },
    'feature':          { n:'FeatureCard',     r:true,  d:'Single icon + heading + description card' },
    'testimonial-card': { n:'TestimonialCard', r:true,  d:'Quote card with avatar circle and attribution' },
    'chapter-card':     { n:'ChapterCard',     r:true,  d:'Club chapter location listing card' },
    'team-card':        { n:'TeamMemberCard',  r:true,  d:'Portrait placeholder + name + role' },
    'team-grid':        { n:'TeamGrid',        r:false, d:'Responsive grid of team member cards' },
    'sticker':          { n:'Sticker Badge',   r:true,  d:'Hand-cut organic badge — hard shadow, slight tilt' },
    'btn':              { n:'Button',          r:true,  d:'Pill-shaped button — add a combo class for the color variant' },
    'eyebrow':          { n:'Eyebrow Label',   r:true,  d:'Small all-caps label that sits above a heading' },
    'kicker-row':       { n:'Kicker Row',      r:true,  d:'Horizontal row that holds the sticker badge(s)' },
    'faq-item':         { n:'FAQ Item',        r:true,  d:'Expandable accordion question + answer' },
    'mission-panel':    { n:'Mission Panel',   r:false, d:'Full-width cobalt blue gradient block' },
    'story-pair':       { n:'Story Pair',      r:false, d:'Two-column side-by-side story layout' },
    'story-pair-col':   { n:'Story Column',    r:false, d:'One column inside the story pair' },
    'textlink':         { n:'Text Link',       r:true,  d:'Inline link with a right-arrow icon' },
    'first-club':       { n:'First Club',      r:false, d:'About page — founding story section' },
    'donate-grid':      { n:'Donate Grid',     r:false, d:'Two-column donate form layout' },
    'team-section':     { n:'Team Section',    r:false, d:'Full team listing section' },
    'team-tier':        { n:'Team Tier',       r:false, d:'A tier group such as Leadership or Directors' },
    'hl':               { n:'Highlight Span',  r:true,  d:'Inline span with the sky-blue highlighter-marker effect' },
  };

  // ── Helpers ────────────────────────────────────────────────────────────────
  function hexOf(rgb) {
    if (!rgb || rgb === 'rgba(0, 0, 0, 0)') return null;
    const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return null;
    return '#' + [m[1],m[2],m[3]].map(n => (+n).toString(16).padStart(2,'0')).join('');
  }

  function colorLabel(raw) {
    if (!raw || raw === 'rgba(0, 0, 0, 0)') return null;
    const h = hexOf(raw);
    if (!h) return raw;
    const tok = TOKENS[h.toLowerCase()];
    return tok ? `${tok}  →  ${h}` : h;
  }

  function fontLabel(ff) {
    if (/Bricolage/i.test(ff))    return 'Bricolage Grotesque  (var --f-display)';
    if (/Hanken/i.test(ff))       return 'Hanken Grotesk  (var --f-sans)';
    if (/Space.?Mono/i.test(ff))  return 'Space Mono  (var --f-mono)';
    if (/Caveat/i.test(ff))       return 'Caveat  (var --f-hand)';
    return ff.split(',')[0].replace(/['"]/g,'').trim();
  }

  function weightLabel(w) {
    return w === '100' ? '100 — Thin'
         : w === '200' ? '200 — Extra Light'
         : w === '300' ? '300 — Light'
         : w === '400' ? '400 — Regular'
         : w === '500' ? '500 — Medium'
         : w === '600' ? '600 — Semi Bold'
         : w === '700' ? '700 — Bold'
         : w === '800' ? '800 — Extra Bold'
         : w === '900' ? '900 — Black'
         : w;
  }

  function displayLabel(d) {
    return d === 'block'        ? 'block  (full width, stacks vertically)'
         : d === 'flex'         ? 'flex  (children lay out in a row or column)'
         : d === 'inline-flex'  ? 'inline-flex  (flex, but shrinks to content width)'
         : d === 'grid'         ? 'grid  (children lay out in a defined grid)'
         : d === 'inline'       ? 'inline  (sits inside text, no width/height control)'
         : d === 'inline-block' ? 'inline-block  (inline, but allows width/height)'
         : d === 'none'         ? 'none  (hidden — not on page at all)'
         : d;
  }

  function positionLabel(p) {
    return p === 'static'   ? 'static  (normal document flow, default)'
         : p === 'relative' ? 'relative  (normal flow, can nudge with top/left)'
         : p === 'absolute' ? 'absolute  (removed from flow, anchored to nearest positioned parent)'
         : p === 'fixed'    ? 'fixed  (anchored to browser window, stays on scroll)'
         : p === 'sticky'   ? 'sticky  (normal flow, then sticks when you scroll past it)'
         : p;
  }

  function lhRatio(lh, fs) {
    const l = parseFloat(lh), f = parseFloat(fs);
    return (l && f) ? (l/f).toFixed(2) : null;
  }

  // ── CSS declaration lookup: finds the formula as written in the stylesheet ─
  // Returns the raw declared value (e.g. "clamp(48px, 5vw, 84px)") before
  // the browser resolves it to pixels. Checks inline styles first, then all
  // loaded stylesheets (respects active @media queries, one level deep).
  function getDeclaredValue(el, prop) {
    // 1. Inline style wins outright
    const inl = el.style.getPropertyValue(prop);
    if (inl) return inl;

    // 2. Walk all stylesheets, collect every matching rule's value
    const hits = [];

    function walkRules(rules) {
      for (const rule of rules) {
        if (rule.type === CSSRule.STYLE_RULE) {
          try {
            if (el.matches(rule.selectorText)) {
              const v = rule.style.getPropertyValue(prop);
              if (v) hits.push(v);
            }
          } catch (_) { /* invalid selector */ }
        } else if (rule.type === CSSRule.MEDIA_RULE) {
          try {
            if (window.matchMedia(rule.conditionText).matches) {
              walkRules(rule.cssRules);
            }
          } catch (_) { /* bad conditionText */ }
        }
      }
    }

    for (const sheet of document.styleSheets) {
      try { walkRules(sheet.cssRules); } catch (_) { /* cross-origin sheet */ }
    }

    // Last matching rule wins (CSS cascade)
    return hits.length ? hits[hits.length - 1] : null;
  }

  // Formats a size row showing both the rendered pixel value and either:
  //   a) the original CSS formula when one exists (clamp, %, min/max, etc.)
  //   b) an explanation when no formula exists (size is computed by layout)
  function sizeRow(label, renderedVal, formula) {
    let sub = '';
    if (formula && formula !== renderedVal) {
      // A CSS formula was found and it differs from the resolved px value
      sub = `<br><span style="color:#5A82CC;font-size:8px">formula → ${formula}</span>`;
    } else if (!formula) {
      // No CSS rule sets this property — the browser computed it from layout
      sub = `<br><span style="color:#4C5566;font-size:8px">no CSS formula — browser sized this automatically via ${_layoutSource()}</span>`;
    }
    return `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-bottom:4px">
      <span style="color:#687284;flex-shrink:0;min-width:0">${label}</span>
      <span style="text-align:right;flex-shrink:1;word-break:break-all"><span style="color:#E1EEFC">${renderedVal}</span>${sub}</span>
    </div>`;
  }

  // Tiny helper used inside sizeRow — reads _currentEl set just before renderPanel
  // to give a human-readable reason why the browser chose the size it did.
  let _currentEl = null;
  function _layoutSource() {
    if (!_currentEl) return 'layout';
    const cs = window.getComputedStyle(_currentEl);
    const parentCs = _currentEl.parentElement ? window.getComputedStyle(_currentEl.parentElement) : null;
    if (parentCs) {
      if (parentCs.display === 'grid')             return 'grid column/row assignment';
      if (parentCs.display === 'flex' || parentCs.display === 'inline-flex') return 'flex distribution';
    }
    if (cs.display === 'block' || cs.display === 'list-item') return 'block flow (fills container width)';
    if (cs.display === 'inline' || cs.display === 'inline-block') return 'inline flow (shrinks to content)';
    return 'layout';
  }

  function getComp(el) {
    for (const cls of el.classList) { if (COMPS[cls]) return COMPS[cls]; }
    switch (el.tagName.toLowerCase()) {
      case 'nav':     return COMPS.nav;
      case 'footer':  return COMPS.footer;
      case 'h1':      return { n:'Heading 1 (H1)', r:false, d:'Largest heading — Bricolage 800, clamp(48px → 84px), letter-spacing -0.02em' };
      case 'h2':      return { n:'Heading 2 (H2)', r:false, d:'Section title — Bricolage 800, clamp(33px → 51px), letter-spacing -0.02em' };
      case 'h3':      return { n:'Heading 3 (H3)', r:false, d:'Card or sub-section title — Bricolage 700, 24px, letter-spacing -0.01em' };
      case 'h4':      return { n:'Heading 4 (H4)', r:false, d:'Small heading — Bricolage 700, 20px' };
      case 'p':       return { n:'Paragraph', r:false, d:'Body text — Hanken Grotesk 400, 17px, line-height 1.62, color ink-700' };
      case 'button':  return { n:'Button', r:true, d:'Clickable button — class "btn" + combo class for variant (primary/moss/etc.)' };
      case 'a':       return { n:'Link', r:false, d:'Clickable link — set href, color, and hover state in Webflow' };
      case 'img':     return { n:'Image', r:false, d:'Image — always set width, height, and alt text in Webflow' };
      case 'section': return { n:'Section', r:false, d:'Content section — 92px padding top + bottom by default' };
      case 'header':  return { n:'Header / Hero', r:false, d:'Page header or hero area' };
      case 'main':    return { n:'Main Content Area', r:false, d:'Wraps all page sections between nav and footer' };
      case 'div':     return { n:'Div Block', r:false, d:'Generic container — check the class name for its purpose' };
      case 'span':    return { n:'Text Span', r:false, d:'Inline wrapper — used for highlight effects or partial styling inside text' };
      case 'ul':      return { n:'List (UL)', r:false, d:'Unordered bullet list' };
      case 'li':      return { n:'List Item (LI)', r:false, d:'One item inside a list' };
      case 'em':      return { n:'Italic / Em', r:false, d:'Italic text — used for hand-accent words in headings' };
      default:        return { n:`<${el.tagName.toLowerCase()}>`, r:false, d:'Standard HTML element' };
    }
  }

  // ── Build UI elements ──────────────────────────────────────────────────────
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = '⬡ WF Inspect';
  Object.assign(toggleBtn.style, {
    position:'fixed', bottom:'20px', left:'20px', zIndex:'99999',
    background:'#2955AC', color:'#fff', border:'none', borderRadius:'999px',
    padding:'9px 16px', fontFamily:"'Space Mono',monospace", fontSize:'10px',
    fontWeight:'700', letterSpacing:'.08em', textTransform:'uppercase',
    cursor:'pointer', boxShadow:'0 3px 0 #1D3D7E', lineHeight:'1', userSelect:'none',
  });

  const panel = document.createElement('div');
  Object.assign(panel.style, {
    position:'fixed', bottom:'20px', right:'20px', zIndex:'99999',
    background:'rgba(18,22,31,.97)', color:'#E8ECF3', borderRadius:'12px',
    padding:'14px 16px', fontFamily:"'Space Mono',monospace", fontSize:'9px',
    lineHeight:'1.75', width:'360px',
    boxShadow:'0 12px 40px rgba(0,0,0,.6)',
    display:'none', border:'1px solid rgba(255,255,255,.1)',
    maxHeight:'80vh', overflowY:'auto', pointerEvents:'auto',
  });

  const ring = document.createElement('div');
  Object.assign(ring.style, {
    position:'fixed', zIndex:'99998', pointerEvents:'none', display:'none',
    outlineOffset:'2px', borderRadius:'2px',
  });

  document.body.appendChild(toggleBtn);
  document.body.appendChild(panel);
  document.body.appendChild(ring);

  // ── State ──────────────────────────────────────────────────────────────────
  let active = false;
  let locked = false;
  let cur    = null;

  function updateRing(el, isLocked) {
    const r = el.getBoundingClientRect();
    Object.assign(ring.style, {
      display:  'block',
      top:      r.top    + 'px',
      left:     r.left   + 'px',
      width:    r.width  + 'px',
      height:   r.height + 'px',
      outline:  isLocked ? '2px solid #F59E0B' : '2px solid #97BDF1',
      background: isLocked ? 'rgba(245,158,11,.07)' : 'rgba(151,189,241,.07)',
    });
  }

  // ── Panel rendering ────────────────────────────────────────────────────────
  function sec(label) {
    return `<div style="color:#4C5566;font-size:7.5px;letter-spacing:.12em;text-transform:uppercase;margin:10px 0 5px;padding-top:8px;border-top:1px solid rgba(255,255,255,.07)">${label}</div>`;
  }

  function row(label, value) {
    return `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-bottom:3px">
      <span style="color:#687284;flex-shrink:0;min-width:0">${label}</span>
      <span style="color:#E1EEFC;text-align:right;word-break:break-all;flex-shrink:1">${value}</span>
    </div>`;
  }

  function renderPanel(el, isLocked) {
    _currentEl = el;
    const cs  = window.getComputedStyle(el);
    const comp = getComp(el);
    const classes = Array.from(el.classList);
    let h = '';

    // ── Lock indicator ─────────────────────────────────────────────────────
    if (isLocked) {
      h += `<div style="background:#F59E0B;color:#12161F;border-radius:6px;padding:4px 10px;font-size:7.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;text-align:center">LOCKED · click element to unlock · or press Esc</div>`;
    }

    // ── Component / element identity ───────────────────────────────────────
    if (comp) {
      const badge = comp.r
        ? `<span style="background:#234A97;color:#fff;border-radius:3px;padding:1px 6px;font-size:7.5px;margin-left:6px;letter-spacing:.04em">REUSABLE COMPONENT</span>`
        : `<span style="background:#45594D;color:#fff;border-radius:3px;padding:1px 6px;font-size:7.5px;margin-left:6px;letter-spacing:.04em">SINGLE-USE ELEMENT</span>`;
      h += `<div style="color:#97BDF1;font-weight:700;font-size:10.5px;margin-bottom:3px">${comp.n}${badge}</div>`;
      h += `<div style="color:#687284;font-size:8.5px;margin-bottom:7px;padding-bottom:7px;border-bottom:1px solid rgba(255,255,255,.08);line-height:1.5">${comp.d}</div>`;
    }

    // ── CSS classes ────────────────────────────────────────────────────────
    if (classes.length) {
      h += `<div style="color:#4C5566;font-size:8px;margin-bottom:8px;word-break:break-all;line-height:1.6">CSS class${classes.length > 1 ? 'es' : ''}: <span style="color:#687284">.${classes.join('  .') }</span></div>`;
    } else {
      h += `<div style="color:#4C5566;font-size:8px;margin-bottom:8px">HTML tag: &lt;${el.tagName.toLowerCase()}&gt; (no custom class)</div>`;
    }

    // ── Typography ─────────────────────────────────────────────────────────
    h += sec('Typography');
    h += row('Font Family', fontLabel(cs.fontFamily));
    h += row('Font Size', cs.fontSize);
    h += row('Font Weight', weightLabel(cs.fontWeight));
    const lhr = lhRatio(cs.lineHeight, cs.fontSize);
    h += row('Line Height', `${cs.lineHeight}${lhr ? `  (${lhr} × font size)` : ''}`);
    const ls = parseFloat(cs.letterSpacing);
    h += row('Letter Spacing', ls !== 0 ? cs.letterSpacing : '0px  (no extra spacing)');
    if (cs.textTransform !== 'none') {
      h += row('Text Transform', cs.textTransform);
    }
    if (cs.fontStyle !== 'normal') {
      h += row('Font Style', cs.fontStyle);
    }
    const textColor = colorLabel(cs.color);
    h += row('Text Color', textColor || cs.color);

    // ── Background ─────────────────────────────────────────────────────────
    const bgColor = colorLabel(cs.backgroundColor);
    const bgImage = cs.backgroundImage !== 'none' ? cs.backgroundImage : null;
    if (bgColor || bgImage) {
      h += sec('Background');
      if (bgColor) h += row('Background Color', bgColor);
      if (bgImage) {
        const short = bgImage.length > 70 ? bgImage.slice(0,70)+'…' : bgImage;
        h += row('Background Image', short);
        if (cs.backgroundSize  !== 'auto') h += row('Background Size', cs.backgroundSize);
        if (cs.backgroundRepeat !== 'repeat') h += row('Background Repeat', cs.backgroundRepeat);
        if (cs.backgroundPosition !== '0% 0%') h += row('Background Position', cs.backgroundPosition);
      }
    }

    // ── Spacing ────────────────────────────────────────────────────────────
    const mt=cs.marginTop, mr=cs.marginRight, mb=cs.marginBottom, ml=cs.marginLeft;
    const pt=cs.paddingTop, pr=cs.paddingRight, pb=cs.paddingBottom, pl=cs.paddingLeft;
    const nonzeroMargin  = [mt,mr,mb,ml].some(v => parseFloat(v) !== 0);
    const nonzeroPadding = [pt,pr,pb,pl].some(v => parseFloat(v) !== 0);

    if (nonzeroMargin || nonzeroPadding) {
      h += sec('Spacing  (margin = outer gap from neighbors · padding = inner breathing room)');
      h += row('Margin Top — outer space above', mt);
      h += row('Margin Right — outer space to the right', mr);
      h += row('Margin Bottom — outer space below', mb);
      h += row('Margin Left — outer space to the left', ml);
      h += row('Padding Top — inner space above content', pt);
      h += row('Padding Right — inner space to the right', pr);
      h += row('Padding Bottom — inner space below content', pb);
      h += row('Padding Left — inner space to the left', pl);
    }

    // ── Size ───────────────────────────────────────────────────────────────
    h += sec('Size  (rendered px value  +  the original CSS formula if different)');
    h += sizeRow('Width', cs.width,     getDeclaredValue(el, 'width'));
    h += sizeRow('Height', cs.height,   getDeclaredValue(el, 'height'));
    h += sizeRow(
      'Min Width  (will never shrink past this)',
      cs.minWidth  === '0px'  ? '0px  (no minimum set)' : cs.minWidth,
      getDeclaredValue(el, 'min-width')
    );
    h += sizeRow(
      'Max Width  (will never grow past this)',
      cs.maxWidth  === 'none' ? 'none  (no maximum set)' : cs.maxWidth,
      getDeclaredValue(el, 'max-width')
    );
    h += sizeRow(
      'Min Height  (will never shrink past this)',
      cs.minHeight === '0px'  ? '0px  (no minimum set)' : cs.minHeight,
      getDeclaredValue(el, 'min-height')
    );
    h += sizeRow(
      'Max Height  (will never grow past this)',
      cs.maxHeight === 'none' ? 'none  (no maximum set)' : cs.maxHeight,
      getDeclaredValue(el, 'max-height')
    );

    // ── Visual ─────────────────────────────────────────────────────────────
    const hasRadius  = cs.borderRadius !== '0px';
    const hasShadow  = cs.boxShadow !== 'none';
    const hasBorder  = parseFloat(cs.borderTopWidth) > 0;
    const hasOpacity = cs.opacity !== '1';
    const hasOutline = cs.outline !== 'none' && cs.outline !== '';

    if (hasRadius || hasShadow || hasBorder || hasOpacity || hasOutline) {
      h += sec('Visual Styling');
      if (hasRadius) h += row('Corner Radius  (border-radius)', cs.borderRadius);
      if (hasShadow) {
        const s = cs.boxShadow;
        h += row('Box Shadow', s.length > 65 ? s.slice(0,65)+'…' : s);
      }
      if (hasBorder) {
        h += row('Border Width', cs.borderTopWidth);
        h += row('Border Style', cs.borderTopStyle);
        h += row('Border Color', colorLabel(cs.borderTopColor) || cs.borderTopColor);
      }
      if (hasOutline) h += row('Outline', cs.outline);
      if (hasOpacity) h += row('Opacity  (1 = fully visible · 0 = invisible)', cs.opacity);
    }

    // ── Layout ─────────────────────────────────────────────────────────────
    h += sec('Layout & Position');
    h += row('Display  (how element lays out)', displayLabel(cs.display));
    h += row('Position Type', positionLabel(cs.position));

    if (cs.display === 'flex' || cs.display === 'inline-flex') {
      h += row('Flex Direction  (which way children flow)', cs.flexDirection === 'row' ? 'row  (left to right)' : cs.flexDirection === 'column' ? 'column  (top to bottom)' : cs.flexDirection);
      h += row('Align Items  (alignment on the cross axis)', cs.alignItems);
      h += row('Justify Content  (spacing on the main axis)', cs.justifyContent);
      if (cs.flexWrap !== 'nowrap') h += row('Flex Wrap', cs.flexWrap);
      if (cs.gap && cs.gap !== 'normal' && cs.gap !== '0px') h += row('Gap  (space between child elements)', cs.gap);
    }

    if (cs.display === 'grid') {
      h += row('Grid Columns', cs.gridTemplateColumns);
      if (cs.gridTemplateRows && cs.gridTemplateRows !== 'none') h += row('Grid Rows', cs.gridTemplateRows);
      if (cs.gap && cs.gap !== 'normal' && cs.gap !== '0px') h += row('Gap  (space between grid cells)', cs.gap);
    }

    if (cs.position !== 'static') {
      if (cs.top    !== 'auto') h += row('Top   (distance from top edge)', cs.top);
      if (cs.right  !== 'auto') h += row('Right  (distance from right edge)', cs.right);
      if (cs.bottom !== 'auto') h += row('Bottom  (distance from bottom edge)', cs.bottom);
      if (cs.left   !== 'auto') h += row('Left   (distance from left edge)', cs.left);
    }

    if (cs.zIndex !== 'auto') h += row('Z-Index  (stack order, higher = in front)', cs.zIndex);
    if (cs.overflow !== 'visible') h += row('Overflow  (what happens when content is too big)', cs.overflow);

    // ── Animation & Motion ─────────────────────────────────────────────────
    const transProp     = cs.transitionProperty;
    const transDur      = parseFloat(cs.transitionDuration);
    const hasTransition = transProp && transProp !== 'none' && transDur > 0;
    const hasTransform  = cs.transform && cs.transform !== 'none' && !cs.transform.startsWith('matrix(1, 0, 0, 1, 0, 0)');
    const hasAnimation  = cs.animationName && cs.animationName !== 'none';

    if (hasTransition || hasTransform || hasAnimation) {
      h += sec('Animation & Motion  (for Webflow Interactions panel)');

      if (hasTransition) {
        h += row('What animates on hover/interaction', transProp);
        h += row('Transition Duration  (how long the animation takes)', cs.transitionDuration);
        h += row('Easing Curve  (how it speeds up / slows down)', cs.transitionTimingFunction);
        const del = parseFloat(cs.transitionDelay);
        if (del > 0) h += row('Transition Delay  (waits this long before starting)', cs.transitionDelay);
      }

      if (hasTransform) {
        const tx = cs.transform;
        h += row('Transform  (rotation, scale, or position offset)', tx.length > 65 ? tx.slice(0,65)+'…' : tx);
        if (cs.transformOrigin !== '50% 50% 0px') h += row('Transform Origin  (pivot point)', cs.transformOrigin);
      }

      if (hasAnimation) {
        h += row('Animation Name  (keyframe animation class)', cs.animationName);
        h += row('Animation Duration  (one full cycle takes)', cs.animationDuration);
        h += row('Animation Timing  (speed curve)', cs.animationTimingFunction);
        h += row('Animation Iteration  (how many times it plays)', cs.animationIterationCount);
        h += row('Animation Fill Mode  (state after animation ends)', cs.animationFillMode);
      }
    }

    // ── Footer ─────────────────────────────────────────────────────────────
    h += `<div style="color:#333B49;font-size:8px;margin-top:10px;padding-top:6px;border-top:1px solid rgba(255,255,255,.07)">HTML tag: &lt;${el.tagName.toLowerCase()}&gt;</div>`;

    panel.innerHTML = h;
    panel.style.display = 'block';
  }

  // ── Toggle on/off ──────────────────────────────────────────────────────────
  toggleBtn.addEventListener('click', () => {
    active = !active;
    locked = false;
    cur    = null;
    if (active) {
      Object.assign(toggleBtn.style, { background:'#5C7667', boxShadow:'0 3px 0 #34453B' });
      toggleBtn.textContent = '⬡ ON  ·  Shift+I to exit';
    } else {
      Object.assign(toggleBtn.style, { background:'#2955AC', boxShadow:'0 3px 0 #1D3D7E' });
      toggleBtn.textContent = '⬡ WF Inspect';
      panel.style.display = 'none';
      ring.style.display  = 'none';
    }
  });

  // ── Click = lock / unlock ──────────────────────────────────────────────────
  document.addEventListener('click', e => {
    if (!active) return;
    const t = e.target;
    if (t === toggleBtn || panel.contains(t)) return;

    e.preventDefault();
    e.stopPropagation();

    if (locked && cur === t) {
      // Click the same element → unlock
      locked = false;
      updateRing(t, false);
      renderPanel(t, false);
    } else {
      // Click new (or first) element → lock
      locked = true;
      cur    = t;
      updateRing(t, true);
      renderPanel(t, true);
    }
  }, true);

  // ── Hover = preview (only when not locked) ─────────────────────────────────
  document.addEventListener('mouseover', e => {
    if (!active || locked) return;
    const t = e.target;
    if (t === toggleBtn || t === panel || t === ring || panel.contains(t)) return;
    if (t === cur) return;
    cur = t;
    updateRing(t, false);
    renderPanel(t, false);
  }, true);

  // ── Keep ring on element when page scrolls ─────────────────────────────────
  window.addEventListener('scroll', () => {
    if (active && cur) updateRing(cur, locked);
  }, { passive:true, capture:true });

  // ── Keyboard: Shift+I toggle · Esc to unlock ──────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.shiftKey && e.key === 'I') { e.preventDefault(); toggleBtn.click(); }
    if (e.key === 'Escape' && locked) {
      locked = false;
      if (cur) { updateRing(cur, false); renderPanel(cur, false); }
    }
  });

  console.log('%c[WF Inspector v2] loaded  ·  Shift+I to toggle  ·  Click element to lock  ·  Esc to unlock', 'color:#97BDF1;font-family:monospace;font-size:11px');
})();
