/* Heads Up — Webflow Inspector v3
   Shift+I or click "⬡ WF Inspect" to toggle
   Hover to preview · Click element to LOCK panel · Click again or Esc to unlock */
(function () {
  'use strict';

  // ── Design token map: computed hex → CSS variable name ────────────────────
  const TOKENS = {
    '#eaf0fb':'--cobalt-50','#d4e1f7':'--cobalt-100','#afc6ee':'--cobalt-200',
    '#87a9e2':'--cobalt-300','#5a82cc':'--cobalt-400','#2955ac':'--cobalt-500',
    '#234a97':'--cobalt-600','#1d3d7e':'--cobalt-700','#173063':'--cobalt-800',
    '#f0f6fe':'--sky-50','#e1eefc':'--sky-100','#c7def9':'--sky-200',
    '#97bdf1':'--sky-300','#6e9fe6':'--sky-400',
    '#f4f7fc':'--ink-50','#e8ecf3':'--ink-100','#d6dce7':'--ink-200',
    '#b4bccb':'--ink-300','#8a94a6':'--ink-400','#687284':'--ink-500',
    '#4c5566':'--ink-600','#333b49':'--ink-700','#1e2430':'--ink-800',
    '#12161f':'--ink-900','#ffffff':'white',
  };

  // ── Component registry: CSS class → Webflow-meaning ───────────────────────
  const COMPS = {
    'landing-hero':     { n:'LandingHero',      r:false, d:'Full-viewport home-only hero with background image' },
    'hhero':            { n:'HomeHero',          r:false, d:'Animated headline hero — home page only' },
    'phero':            { n:'PageHero',          r:true,  d:'Standard page header — reusable across pages' },
    'nav':              { n:'NavBar',            r:true,  d:'Sticky top navigation — make this a Symbol in Webflow' },
    'mobile-menu':      { n:'MobileMenu',        r:false, d:'Burger dropdown — lives inside NavBar' },
    'brand':            { n:'Brand Logo',        r:false, d:'Logo + wordmark link in the nav' },
    'footer':           { n:'Footer',            r:true,  d:'Site-wide footer — make this a Symbol in Webflow' },
    'wrap':             { n:'Wrap (container)',  r:true,  d:'Centers content — max-width: 1120px, padding: 0 28px' },
    'wrap-narrow':      { n:'Wrap Narrow',       r:true,  d:'Narrower container — max-width: 820px' },
    'section':          { n:'Section',           r:false, d:'Content block — 92px padding top and bottom' },
    'sec-head':         { n:'Section Header',    r:true,  d:'Eyebrow + heading + subtitle group' },
    'impact':           { n:'ImpactStats',       r:true,  d:'Row of big stat counters' },
    'feature-grid':     { n:'FeatureGrid',       r:false, d:'3-column icon card grid' },
    'feature':          { n:'FeatureCard',       r:true,  d:'Icon + heading + description card' },
    'testimonial-card': { n:'TestimonialCard',   r:true,  d:'Quote card with avatar and attribution' },
    'chapter-card':     { n:'ChapterCard',       r:true,  d:'Club chapter listing card' },
    'story-grid':       { n:'StoryGrid',         r:false, d:'2-column story layout (grid: 0.9fr 1.1fr)' },
    'collage':          { n:'Collage',           r:false, d:'Overlapping polaroid photo group' },
    'polaroid':         { n:'PolaroidCard',      r:true,  d:'Photo card with caption strip — white bg, 6px padding' },
    'sticker':          { n:'Sticker Badge',     r:true,  d:'Hand-cut organic badge — hard shadow, slight tilt' },
    'btn':              { n:'Button',            r:true,  d:'Pill button — add combo class for color variant' },
    'btn-primary':      { n:'Button Primary',    r:true,  d:'Cobalt-500 fill button — combo of btn + btn-primary' },
    'btn-secondary':    { n:'Button Secondary',  r:true,  d:'White fill + cobalt outline — combo class' },
    'btn-sm':           { n:'Button Small',      r:true,  d:'Smaller button — 9px/16px padding, 13px font' },
    'btn-lg':           { n:'Button Large',      r:true,  d:'Larger button — 16px/30px padding, 16px font' },
    'eyebrow':          { n:'Eyebrow Label',     r:true,  d:'Small all-caps mono label above headings' },
    'kicker-row':       { n:'Kicker Row',        r:true,  d:'Flex row holding sticker badge(s)' },
    'mission':          { n:'Mission Panel',     r:false, d:'Full-width cobalt gradient block' },
    'founder':          { n:'Founder Card',      r:false, d:'Avatar + name + role callout card' },
    'youth':            { n:'Youth Band',        r:false, d:'Big centered display text section' },
    'faq-item':         { n:'FAQ Item',          r:true,  d:'Expandable accordion question + answer' },
    'meter':            { n:'Screen Time Meter', r:false, d:'Animated bar chart showing screen time stats' },
    'prose':            { n:'Prose Block',       r:true,  d:'Long-form body text area — 17.5px, lh 1.65' },
    'hl':               { n:'Highlight Span',    r:true,  d:'Inline sky-blue marker highlight effect' },
    'hand':             { n:'Hand Text',         r:true,  d:'Caveat handwritten font accent' },
    'ic':               { n:'Icon Wrapper',      r:true,  d:'Inline-flex icon container — 1em × 1em' },
  };

  // ─── CSS Inspection ────────────────────────────────────────────────────────

  // Returns all CSS rules from stylesheets that match el, in cascade order.
  // Each item: { selector, style (CSSStyleDeclaration), mediaQuery (string|null) }
  function getMatchedRules(el) {
    const results = [];
    function walkRules(rules, mq) {
      for (const rule of rules) {
        if (rule.type === CSSRule.STYLE_RULE) {
          try {
            if (el.matches(rule.selectorText)) {
              results.push({ selector: rule.selectorText, style: rule.style, mediaQuery: mq || null });
            }
          } catch (_) {}
        } else if (rule.type === CSSRule.MEDIA_RULE) {
          try {
            if (window.matchMedia(rule.conditionText).matches) {
              walkRules(rule.cssRules, rule.conditionText);
            }
          } catch (_) {}
        }
      }
    }
    for (const sheet of document.styleSheets) {
      try { walkRules(sheet.cssRules, null); } catch (_) {}
    }
    return results;
  }

  // Returns {value, source, selector, mediaQuery} of the winning CSS declaration
  // for a property on el. Checks inline first, then all matching stylesheet rules.
  // Returns null if the property is not explicitly declared anywhere.
  function getDeclaredPropertySource(el, prop) {
    const inl = el.style.getPropertyValue(prop);
    if (inl) return { value: inl, source: 'inline', selector: 'style=""', mediaQuery: null };

    const rules = getMatchedRules(el);
    let last = null;
    for (const r of rules) {
      const v = r.style.getPropertyValue(prop);
      if (v) last = { value: v, source: 'stylesheet', selector: r.selector, mediaQuery: r.mediaQuery };
    }
    return last;
  }

  // CSS properties that inherit from parent by default
  const INHERITABLE = new Set([
    'color','font-family','font-size','font-weight','font-style','line-height',
    'letter-spacing','text-align','text-transform','text-decoration',
    'word-spacing','white-space','cursor','visibility','list-style-type',
  ]);

  // Walks the parent chain to find where a property is explicitly declared.
  // Returns {el, tag, classes, value} or null.
  function detectInheritance(el, prop) {
    if (!INHERITABLE.has(prop)) return null;
    let node = el.parentElement;
    while (node && node.tagName !== 'HTML') {
      const src = getDeclaredPropertySource(node, prop);
      if (src) {
        return { el: node, tag: node.tagName.toLowerCase(), classes: Array.from(node.classList), value: src.value };
      }
      node = node.parentElement;
    }
    return null;
  }

  // Describes how the parent container affects this element's dimensions.
  function detectLayoutContext(el) {
    const parent = el.parentElement;
    if (!parent) return { type: 'root', desc: 'Root element — no parent.' };
    const pcs = window.getComputedStyle(parent);
    const cs  = window.getComputedStyle(el);
    const pd  = pcs.display;

    if (pd === 'flex' || pd === 'inline-flex') {
      return {
        type: 'flex-child',
        parentDisplay: pd,
        flexDirection: pcs.flexDirection,
        flexGrow:      parseFloat(cs.flexGrow),
        flexShrink:    parseFloat(cs.flexShrink),
        flexBasis:     cs.flexBasis,
        gap:           pcs.gap,
        alignItems:    pcs.alignItems,
        justifyContent:pcs.justifyContent,
        desc: `Flex child in a ${pcs.flexDirection === 'row' ? 'horizontal' : 'vertical'} flex container`,
      };
    }
    if (pd === 'grid' || pd === 'inline-grid') {
      return {
        type: 'grid-child',
        columns: pcs.gridTemplateColumns,
        rows:    pcs.gridTemplateRows,
        gap:     pcs.gap,
        area:    cs.gridArea,
        desc: 'Grid child — column track width assigned by parent grid-template-columns',
      };
    }

    const pos = cs.position;
    if (pos === 'absolute' || pos === 'fixed') {
      return {
        type: 'positioned',
        position: pos,
        desc: `${pos} positioned — removed from normal document flow`,
      };
    }

    const selfDisplay = cs.display;
    if (selfDisplay === 'inline' || selfDisplay === 'inline-block' || selfDisplay === 'inline-flex') {
      return { type: 'inline', desc: 'Inline element — width shrinks to fit content, does not fill parent' };
    }

    return {
      type: 'block-child',
      desc: 'Block child — fills 100% of parent width automatically (no explicit width needed)',
    };
  }

  // Returns {computed, badge, badgeColor, explanation} for width or height.
  // This is the core logic that avoids lying about "FIXED" when no CSS is set.
  function explainSizeLogic(el, axis) {
    const cs       = window.getComputedStyle(el);
    const computed = cs[axis];
    const decl     = getDeclaredPropertySource(el, axis);
    const ctx      = detectLayoutContext(el);

    if (decl) {
      const v = decl.value;
      const isResp = /(%|vw|vh|vmin|vmax|clamp\(|calc\(|min\(|max\()/.test(v);
      return {
        computed,
        badge:      isResp ? 'RESPONSIVE' : 'EXPLICIT FIXED',
        badgeColor: isResp ? '#234A97'    : '#687284',
        explanation: `Declared: ${v}`,
        hasDecl: true,
      };
    }

    // No explicit CSS — explain why the browser chose this size
    if (axis === 'width') {
      if (ctx.type === 'flex-child') {
        const grow   = ctx.flexGrow;
        const shrink = ctx.flexShrink;
        const basis  = ctx.flexBasis;
        return {
          computed,
          badge: 'LAYOUT-DETERMINED',
          badgeColor: '#45594D',
          explanation: `No explicit width. Determined by parent flex layout — basis: ${basis}, grow: ${grow}, shrink: ${shrink}, direction: ${ctx.flexDirection}`,
          hasDecl: false,
        };
      }
      if (ctx.type === 'grid-child') {
        return {
          computed,
          badge: 'LAYOUT-DETERMINED',
          badgeColor: '#45594D',
          explanation: `No explicit width. Assigned by parent grid column track (grid-template-columns: ${ctx.columns})`,
          hasDecl: false,
        };
      }
      if (ctx.type === 'block-child') {
        return {
          computed,
          badge: 'LAYOUT-DETERMINED',
          badgeColor: '#234A97',
          explanation: 'No explicit width. Block element fills 100% of parent container width.',
          hasDecl: false,
        };
      }
      if (ctx.type === 'inline') {
        return {
          computed,
          badge: 'CONTENT-SIZED',
          badgeColor: '#4C5566',
          explanation: 'No explicit width. Inline element shrinks to fit its content.',
          hasDecl: false,
        };
      }
    }

    // height (almost always auto / content)
    return {
      computed,
      badge: 'AUTO / CONTENT',
      badgeColor: '#4C5566',
      explanation: `No explicit ${axis}. Grows to fit content inside.`,
      hasDecl: false,
    };
  }

  // ─── Webflow Remake Step Generator ────────────────────────────────────────

  function generateWebflowRemakeSteps(el) {
    const cs    = window.getComputedStyle(el);
    const ctx   = detectLayoutContext(el);
    const tag   = el.tagName.toLowerCase();
    const cls   = Array.from(el.classList);
    const steps = [];

    // 1. Element type
    const wfType = {
      section:'Section', nav:'Navbar', footer:'Footer', main:'Div Block (main)',
      h1:'Heading (H1)', h2:'Heading (H2)', h3:'Heading (H3)', h4:'Heading (H4)',
      p:'Text Block', button:'Button', a:'Link Block or Text Link',
      img:'Image', ul:'List', li:'List Item', span:'Text Span',
    }[tag] || 'Div Block';
    steps.push(`Add a ${wfType} element`);

    // 2. Class assignment
    if (cls.length) {
      steps.push(`Add class: "${cls[0]}"` + (cls.length > 1 ? ` + combo: "${cls.slice(1).join('", "')}"` : ''));
    }

    // 3. Display mode
    const d = cs.display;
    if (d === 'flex' || d === 'inline-flex') {
      steps.push(`Set Display: Flex${d === 'inline-flex' ? ' (inline)' : ''}`);
      steps.push(`Direction: ${cs.flexDirection === 'row' ? 'Horizontal' : 'Vertical'}`);
      if (cs.flexWrap !== 'nowrap') steps.push(`Wrap: ${cs.flexWrap}`);
      if (cs.alignItems !== 'normal') steps.push(`Align Items: ${cs.alignItems}`);
      if (cs.justifyContent !== 'normal') steps.push(`Justify Content: ${cs.justifyContent}`);
      const g = cs.gap;
      if (g && g !== '0px' && g !== 'normal') steps.push(`Gap: ${g}`);
    } else if (d === 'grid' || d === 'inline-grid') {
      steps.push(`Set Display: Grid`);
      steps.push(`Columns: ${cs.gridTemplateColumns}`);
      const g = cs.gap;
      if (g && g !== '0px' && g !== 'normal') steps.push(`Gap: ${g}`);
    } else if (d === 'block') {
      steps.push(`Display: Block (default for div — no change needed)`);
    }

    // 4. Flex child behavior
    if (ctx.type === 'flex-child') {
      const grow   = ctx.flexGrow;
      const shrink = ctx.flexShrink;
      const basis  = ctx.flexBasis;
      steps.push(`Flex child: Grow=${grow > 0 ? 'Yes' : 'No'}, Shrink=${shrink > 0 ? 'Yes' : 'No'}, Basis=${basis}`);
    }

    // 5. Explicit size
    const wDecl = getDeclaredPropertySource(el, 'width');
    if (wDecl) steps.push(`Width: ${wDecl.value}`);
    else if (ctx.type === 'block-child') steps.push(`Width: leave as Auto (block fills parent automatically)`);
    else if (ctx.type === 'flex-child') steps.push(`Width: Auto (flex parent determines it)`);

    const mwDecl = getDeclaredPropertySource(el, 'max-width');
    if (mwDecl) steps.push(`Max Width: ${mwDecl.value}`);

    const hDecl = getDeclaredPropertySource(el, 'height');
    if (hDecl) steps.push(`Height: ${hDecl.value}`);

    // 6. Spacing
    const pt = parseFloat(cs.paddingTop),   pb = parseFloat(cs.paddingBottom);
    const pl = parseFloat(cs.paddingLeft),  pr = parseFloat(cs.paddingRight);
    if (pt || pb || pl || pr) {
      if (pt === pb && pl === pr) {
        steps.push(`Padding: ${pt}px top/bottom · ${pl}px left/right`);
      } else {
        steps.push(`Padding: ${pt}px top · ${pr}px right · ${pb}px bottom · ${pl}px left`);
      }
    }
    const mt = parseFloat(cs.marginTop);
    const mb = parseFloat(cs.marginBottom);
    if (mt && mt > 0) steps.push(`Margin Top: ${mt}px`);
    if (mb && mb > 0) steps.push(`Margin Bottom: ${mb}px`);

    // 7. Position
    if (cs.position !== 'static') {
      steps.push(`Position: ${cs.position}`);
      if (cs.top    !== 'auto') steps.push(`Top: ${cs.top}`);
      if (cs.right  !== 'auto') steps.push(`Right: ${cs.right}`);
      if (cs.bottom !== 'auto') steps.push(`Bottom: ${cs.bottom}`);
      if (cs.left   !== 'auto') steps.push(`Left: ${cs.left}`);
      if (cs.zIndex !== 'auto') steps.push(`Z-Index: ${cs.zIndex}`);
    }

    // 8. Typography (for text-bearing elements)
    const textTags = new Set(['p','h1','h2','h3','h4','h5','h6','span','a','button','li','label','em','strong']);
    if (textTags.has(tag)) {
      const ffDecl = getDeclaredPropertySource(el, 'font-family');
      const fsDecl = getDeclaredPropertySource(el, 'font-size');
      const fwDecl = getDeclaredPropertySource(el, 'font-weight');
      const lhDecl = getDeclaredPropertySource(el, 'line-height');
      const ttDecl = getDeclaredPropertySource(el, 'text-transform');
      if (ffDecl) steps.push(`Font: ${ffDecl.value.split(',')[0].replace(/['"]/g,'').trim()}`);
      if (fsDecl) steps.push(`Font Size: ${fsDecl.value}`);
      if (fwDecl) steps.push(`Font Weight: ${fwDecl.value}`);
      if (lhDecl) steps.push(`Line Height: ${lhDecl.value}`);
      if (ttDecl) steps.push(`Text Transform: ${ttDecl.value}`);

      const colDecl = getDeclaredPropertySource(el, 'color');
      if (colDecl) steps.push(`Text Color: ${colDecl.value}`);
      else {
        const inh = detectInheritance(el, 'color');
        steps.push(inh
          ? `Text Color: Inherited from <${inh.tag}>${inh.classes[0] ? '.'+inh.classes[0] : ''} (${inh.value}) — no override needed`
          : `Text Color: Browser default (black)`);
      }
    }

    // 9. Background
    const bgDecl = getDeclaredPropertySource(el, 'background-color');
    if (bgDecl && bgDecl.value !== 'transparent' && bgDecl.value !== 'rgba(0, 0, 0, 0)') {
      steps.push(`Background Color: ${bgDecl.value}`);
    }
    const bgImgDecl = getDeclaredPropertySource(el, 'background-image');
    if (bgImgDecl && bgImgDecl.value !== 'none') steps.push(`Background Image: set in Style panel`);

    // 10. Border & radius
    const brDecl = getDeclaredPropertySource(el, 'border-radius');
    if (brDecl) steps.push(`Border Radius: ${brDecl.value}`);
    if (parseFloat(cs.borderTopWidth) > 0) {
      steps.push(`Border: ${cs.borderTopWidth} ${cs.borderTopStyle} (set color in Style panel)`);
    }
    if (cs.boxShadow !== 'none') steps.push(`Box Shadow: set in Effects panel`);

    // 11. Overflow
    if (cs.overflow !== 'visible') steps.push(`Overflow: ${cs.overflow}`);

    return steps;
  }

  // ─── Utility formatting ────────────────────────────────────────────────────

  function hexOf(rgb) {
    if (!rgb || rgb === 'rgba(0, 0, 0, 0)') return null;
    const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return null;
    return '#' + [m[1],m[2],m[3]].map(n => (+n).toString(16).padStart(2,'0')).join('');
  }

  function colorLabel(raw) {
    if (!raw || raw === 'rgba(0, 0, 0, 0)') return null;
    const h = hexOf(raw);
    const tok = h && TOKENS[h.toLowerCase()];
    return tok ? `${tok}  (${h})` : (h || raw);
  }

  function fontLabel(ff) {
    if (/Bricolage/i.test(ff))   return 'Bricolage Grotesque  (--font-display)';
    if (/Hanken/i.test(ff))      return 'Hanken Grotesk  (--font-sans)';
    if (/Space.?Mono/i.test(ff)) return 'Space Mono  (--font-mono)';
    if (/Caveat/i.test(ff))      return 'Caveat  (--font-hand)';
    return ff.split(',')[0].replace(/['"]/g,'').trim();
  }

  function weightLabel(w) {
    const map = {'100':'Thin','200':'Extra Light','300':'Light','400':'Regular',
      '500':'Medium','600':'Semi Bold','700':'Bold','800':'Extra Bold','900':'Black'};
    return map[w] ? `${w} — ${map[w]}` : w;
  }

  function getComp(el) {
    for (const cls of el.classList) { if (COMPS[cls]) return COMPS[cls]; }
    const tagMap = {
      nav:    { n:'NavBar',            r:true,  d:'Sticky top navigation' },
      footer: { n:'Footer',            r:true,  d:'Site-wide footer' },
      h1:     { n:'Heading 1',         r:false, d:'Bricolage 800, clamp fluid size' },
      h2:     { n:'Heading 2',         r:false, d:'Bricolage 800, section title' },
      h3:     { n:'Heading 3',         r:false, d:'Bricolage 700, 24px' },
      h4:     { n:'Heading 4',         r:false, d:'Bricolage 700, 20px' },
      p:      { n:'Paragraph',         r:false, d:'Hanken Grotesk 400, ~17px, lh 1.6' },
      button: { n:'Button',            r:true,  d:'Pill button — use .btn + combo class' },
      a:      { n:'Link',              r:false, d:'Anchor element' },
      img:    { n:'Image',             r:false, d:'Set width, height, alt in Webflow' },
      section:{ n:'Section',           r:false, d:'92px padding top/bottom by default' },
      main:   { n:'Main Content Area', r:false, d:'Wraps page sections' },
      div:    { n:'Div Block',         r:false, d:'Generic container — check class name' },
      span:   { n:'Text Span',         r:false, d:'Inline wrapper for partial text styling' },
      ul:     { n:'List (UL)',         r:false, d:'Unordered list' },
      li:     { n:'List Item',         r:false, d:'One list item' },
    };
    const c = tagMap[el.tagName.toLowerCase()];
    return c || { n:`<${el.tagName.toLowerCase()}>`, r:false, d:'Standard HTML element' };
  }

  // ─── Panel HTML primitives ─────────────────────────────────────────────────

  function mkBadge(text, color) {
    return `<span style="background:${color};color:#fff;border-radius:3px;padding:1px 5px;font-size:6.5px;font-weight:700;letter-spacing:.07em;margin-left:4px;vertical-align:middle;text-transform:uppercase;white-space:nowrap">${text}</span>`;
  }

  function sec(label) {
    return `<div style="color:#4C5566;font-size:7.5px;letter-spacing:.12em;text-transform:uppercase;margin:12px 0 5px;padding-top:8px;border-top:1px solid rgba(255,255,255,.07)">${label}</div>`;
  }

  function row(label, value, badgeText, badgeColor) {
    const b = badgeText ? mkBadge(badgeText, badgeColor || '#4C5566') : '';
    return `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;margin-bottom:4px">
      <span style="color:#687284;flex-shrink:0;max-width:45%">${label}</span>
      <span style="color:#E1EEFC;text-align:right;word-break:break-all;flex-shrink:1">${value}${b}</span>
    </div>`;
  }

  // Size display: renders computed value + source explanation + badge
  function sizeBlock(label, el, cssProp) {
    const info = explainSizeLogic(el, cssProp);
    let inner = '';

    inner += `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;margin-bottom:2px">
      <span style="color:#687284;flex-shrink:0">${label}</span>
      <span style="color:#E1EEFC">${info.computed}</span>
    </div>`;

    inner += `<div style="color:${info.hasDecl ? '#5A82CC' : '#687284'};font-size:7.5px;padding-left:4px;line-height:1.5;margin-bottom:5px">
      ${info.explanation}${mkBadge(info.badge, info.badgeColor)}
    </div>`;

    return inner;
  }

  // ─── Main panel renderer ───────────────────────────────────────────────────

  function renderPanel(el, isLocked) {
    const cs    = window.getComputedStyle(el);
    const comp  = getComp(el);
    const cls   = Array.from(el.classList);
    const ctx   = detectLayoutContext(el);
    const tag   = el.tagName.toLowerCase();
    let h       = '';

    // Lock banner
    if (isLocked) {
      h += `<div style="background:#F59E0B;color:#12161F;border-radius:6px;padding:5px 10px;font-size:7.5px;font-weight:700;letter-spacing:.1em;text-align:center;margin-bottom:10px;text-transform:uppercase">LOCKED · click element to unlock · Esc to exit</div>`;
    }

    // ── 1. Element Summary ───────────────────────────────────────────────────
    const reuseBadge = comp.r
      ? `<span style="background:#234A97;color:#fff;border-radius:3px;padding:1px 6px;font-size:6.5px;margin-left:6px">REUSABLE</span>`
      : `<span style="background:#4C5566;color:#fff;border-radius:3px;padding:1px 6px;font-size:6.5px;margin-left:6px">SINGLE-USE</span>`;
    h += `<div style="color:#97BDF1;font-weight:700;font-size:11px;margin-bottom:3px">${comp.n}${reuseBadge}</div>`;
    h += `<div style="color:#687284;font-size:8px;margin-bottom:5px;line-height:1.5">${comp.d}</div>`;
    h += `<div style="color:#4C5566;font-size:7.5px">Tag: <span style="color:#E8ECF3">&lt;${tag}&gt;</span></div>`;

    // ── 2. Classes & Reuse ───────────────────────────────────────────────────
    h += sec('Classes & Reuse');
    if (cls.length) {
      const base   = cls[0];
      const combos = cls.slice(1);
      h += `<div style="margin-bottom:4px"><span style="color:#687284">Base class: </span><span style="color:#97BDF1;font-weight:700">.${base}</span></div>`;
      if (combos.length) {
        h += `<div style="margin-bottom:4px"><span style="color:#687284">Combo modifiers: </span><span style="color:#5A82CC">.${combos.join('  .')}</span>${mkBadge('COMBO', '#234A97')}</div>`;
        h += `<div style="color:#4C5566;font-size:7.5px;margin-bottom:4px;line-height:1.5">In Webflow: set base styles on ".${base}", then layer combo classes to add variants without repeating properties.</div>`;
      }

      const isLikelyReusable = /^(btn|card|wrap|section|nav|footer|eyebrow|sticker|ic|tag|pill|hero|modal|icon|feature|polaroid|meter|founder)/.test(base);
      const isManyClasses    = cls.length >= 4;
      const isPageSpecific   = cls.length === 1 && !isLikelyReusable && base.length > 8;

      if (isLikelyReusable) {
        h += `<div style="color:#5A82CC;font-size:7.5px;line-height:1.5">✓ "${base}" looks like a reusable component class. Style it once, then use combo classes for variations.</div>`;
      } else if (isManyClasses) {
        h += `<div style="color:#F59E0B;font-size:7.5px;line-height:1.5">⚠ ${cls.length} classes on one element. In Webflow, fewer classes are easier to maintain. Consider consolidating.</div>`;
      } else if (isPageSpecific) {
        h += `<div style="color:#687284;font-size:7.5px;line-height:1.5">⚠ One unique class. If this pattern repeats, make it reusable in Webflow.</div>`;
      }
    } else {
      h += `<div style="color:#4C5566;font-size:8px">No CSS class — styled via tag rule or browser default. In Webflow this element has no class set.</div>`;
    }

    // ── 3. Layout Context ────────────────────────────────────────────────────
    h += sec('Layout Context (how parent positions this element)');
    h += `<div style="color:#E8ECF3;font-size:8.5px;margin-bottom:6px;line-height:1.6;border-left:2px solid #2955AC;padding-left:8px">${ctx.desc}</div>`;

    if (ctx.type === 'flex-child') {
      h += row('Parent direction', ctx.flexDirection === 'row' ? 'Horizontal (row)' : 'Vertical (column)');
      h += row('Parent gap', ctx.gap && ctx.gap !== 'normal' ? ctx.gap : '0px (no gap)');
      h += row('Parent align-items', ctx.alignItems);
      h += row('Parent justify-content', ctx.justifyContent);
      h += row('My flex-grow', ctx.flexGrow > 0 ? `${ctx.flexGrow} — stretches to fill leftover space` : '0 — does NOT stretch');
      h += row('My flex-shrink', ctx.flexShrink > 0 ? `${ctx.flexShrink} — will shrink if space is tight` : '0 — does NOT shrink');
      h += row('My flex-basis', ctx.flexBasis === 'auto' ? 'auto (size from content or explicit width)' : ctx.flexBasis);
    } else if (ctx.type === 'grid-child') {
      h += row('Parent columns', ctx.columns);
      h += row('Parent gap', ctx.gap && ctx.gap !== 'normal' ? ctx.gap : '0px');
      const a = ctx.area;
      h += row('My grid-area', a && a !== 'auto / auto / auto / auto' ? a : 'auto (placed by grid flow)');
    } else if (ctx.type === 'block-child') {
      h += `<div style="color:#5A82CC;font-size:7.5px;margin-top:2px;line-height:1.5">Width = parent content-box width. This is why you see a large pixel width even without any width CSS.</div>`;
    }

    // This element's own display/position
    h += `<div style="margin-top:6px"></div>`;
    const dispLabel = {
      flex:         'flex — children in a row or column',
      'inline-flex':'inline-flex — flex, but shrinks to content width',
      grid:         'grid — children on a named grid',
      block:        'block — stacks vertically, fills parent width',
      inline:       'inline — sits in text flow, no width/height control',
      'inline-block':'inline-block — inline but accepts width/height',
      none:         'none — hidden entirely (takes no space)',
    }[cs.display] || cs.display;
    h += row('My display', dispLabel);

    const posLabel = {
      static:   'static (normal document flow)',
      relative: 'relative (normal flow, offsets with top/left allowed)',
      absolute: 'absolute (out of flow, anchored to nearest positioned ancestor)',
      fixed:    'fixed (anchored to viewport, stays on scroll)',
      sticky:   'sticky (normal flow until scroll threshold, then sticks)',
    }[cs.position] || cs.position;
    h += row('My position', posLabel);

    if (cs.position !== 'static') {
      if (cs.top    !== 'auto') h += row('top', cs.top);
      if (cs.right  !== 'auto') h += row('right', cs.right);
      if (cs.bottom !== 'auto') h += row('bottom', cs.bottom);
      if (cs.left   !== 'auto') h += row('left', cs.left);
      if (cs.zIndex !== 'auto') h += row('z-index', cs.zIndex);
    }

    // Flex container settings (if this element IS the flex parent)
    if (cs.display === 'flex' || cs.display === 'inline-flex') {
      h += sec('Flex Container Settings (my children obey these)');
      h += row('Direction', cs.flexDirection === 'row' ? 'Horizontal (row)' : 'Vertical (column)');
      h += row('Align Items', cs.alignItems);
      h += row('Justify Content', cs.justifyContent);
      if (cs.flexWrap !== 'nowrap') h += row('Wrap', cs.flexWrap);
      const fg = cs.gap;
      if (fg && fg !== '0px' && fg !== 'normal') h += row('Gap', fg);
    }

    if (cs.display === 'grid' || cs.display === 'inline-grid') {
      h += sec('Grid Container Settings');
      h += row('Columns', cs.gridTemplateColumns);
      if (cs.gridTemplateRows && cs.gridTemplateRows !== 'none') h += row('Rows', cs.gridTemplateRows);
      const gg = cs.gap;
      if (gg && gg !== '0px' && gg !== 'normal') h += row('Gap', gg);
    }

    // ── 4. Size Logic ────────────────────────────────────────────────────────
    h += sec('Size Logic');
    h += sizeBlock('Width', el, 'width');
    h += sizeBlock('Height', el, 'height');

    const mwDecl = getDeclaredPropertySource(el, 'max-width');
    if (mwDecl) {
      const isResp = /(%|vw|clamp|calc)/.test(mwDecl.value);
      h += row('Max Width',
        `${cs.maxWidth} <span style="color:#4C5566;font-size:7px">(declared: ${mwDecl.value})</span>`,
        isResp ? 'RESPONSIVE' : 'EXPLICIT FIXED',
        isResp ? '#234A97' : '#687284');
    }
    const minWDecl = getDeclaredPropertySource(el, 'min-width');
    if (minWDecl) h += row('Min Width', `${cs.minWidth} (declared: ${minWDecl.value})`);
    const mhDecl = getDeclaredPropertySource(el, 'max-height');
    if (mhDecl) h += row('Max Height', `${cs.maxHeight} (declared: ${mhDecl.value})`);

    // ── 5. Spacing ───────────────────────────────────────────────────────────
    const mt=cs.marginTop, mr=cs.marginRight, mb=cs.marginBottom, ml=cs.marginLeft;
    const pt=cs.paddingTop, pr=cs.paddingRight, pb_=cs.paddingBottom, pl=cs.paddingLeft;
    const anyMargin  = [mt,mr,mb,ml].some(v => parseFloat(v) !== 0);
    const anyPadding = [pt,pr,pb_,pl].some(v => parseFloat(v) !== 0);

    if (anyMargin || anyPadding) {
      h += sec('Spacing');
      if (anyMargin) {
        h += `<div style="color:#4C5566;font-size:7px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:3px">Margin — outer gap from neighbors</div>`;
        h += row('Top', mt);
        h += row('Right', mr);
        h += row('Bottom', mb);
        h += row('Left', ml);
      }
      if (anyPadding) {
        h += `<div style="color:#4C5566;font-size:7px;letter-spacing:.08em;text-transform:uppercase;margin-top:5px;margin-bottom:3px">Padding — inner breathing room</div>`;
        h += row('Top', pt);
        h += row('Right', pr);
        h += row('Bottom', pb_);
        h += row('Left', pl);
      }
    }

    // ── 6. Typography ────────────────────────────────────────────────────────
    h += sec('Typography');

    const ffDecl = getDeclaredPropertySource(el, 'font-family');
    h += row('Font Family', fontLabel(cs.fontFamily), ffDecl ? null : 'INHERITED', '#5A82CC');

    const fsDecl = getDeclaredPropertySource(el, 'font-size');
    const fsIsResp = fsDecl && /clamp|vw|%|calc/.test(fsDecl.value);
    h += row('Font Size', cs.fontSize + (fsDecl && fsDecl.value !== cs.fontSize ? ` <span style="color:#4C5566;font-size:7px">(${fsDecl.value})</span>` : ''),
      fsDecl ? (fsIsResp ? 'RESPONSIVE' : 'EXPLICIT') : 'INHERITED',
      fsDecl ? (fsIsResp ? '#234A97' : '#687284') : '#5A82CC');

    const fwDecl = getDeclaredPropertySource(el, 'font-weight');
    h += row('Font Weight', weightLabel(cs.fontWeight), fwDecl ? 'EXPLICIT' : 'INHERITED', fwDecl ? '#687284' : '#5A82CC');

    const lhRatio = (parseFloat(cs.lineHeight) / parseFloat(cs.fontSize)).toFixed(2);
    h += row('Line Height', `${cs.lineHeight} <span style="color:#4C5566;font-size:7px">(×${lhRatio})</span>`);

    const ls = parseFloat(cs.letterSpacing);
    if (ls !== 0) h += row('Letter Spacing', cs.letterSpacing);
    if (cs.textTransform !== 'none') h += row('Text Transform', cs.textTransform);
    if (cs.fontStyle !== 'normal') h += row('Font Style', cs.fontStyle);

    const colDecl = getDeclaredPropertySource(el, 'color');
    const colInh  = !colDecl ? detectInheritance(el, 'color') : null;
    const colBadge = colDecl ? 'EXPLICIT'
      : colInh ? `INHERITED from .${colInh.classes[0] || colInh.tag}` : 'BROWSER DEFAULT';
    h += row('Text Color', colorLabel(cs.color) || cs.color, colBadge, colDecl ? '#687284' : '#5A82CC');

    // ── 7. Colors & Effects ──────────────────────────────────────────────────
    const bgColor  = colorLabel(cs.backgroundColor);
    const bgImg    = cs.backgroundImage !== 'none' ? cs.backgroundImage : null;
    const hasRad   = cs.borderRadius !== '0px';
    const hasShadow= cs.boxShadow !== 'none';
    const hasBorder= parseFloat(cs.borderTopWidth) > 0;
    const hasOpac  = cs.opacity !== '1';
    const hasTrans = cs.transform !== 'none' && !cs.transform.startsWith('matrix(1, 0, 0, 1, 0, 0)');

    if (bgColor || bgImg || hasRad || hasShadow || hasBorder || hasOpac || hasTrans) {
      h += sec('Colors & Effects');
      const bgDecl = getDeclaredPropertySource(el, 'background-color');
      if (bgColor) h += row('Background', bgColor, bgDecl ? 'EXPLICIT' : null, '#687284');
      if (bgImg) {
        const s = bgImg.length > 60 ? bgImg.slice(0,60)+'…' : bgImg;
        h += row('BG Image', s);
        if (cs.backgroundSize  !== 'auto') h += row('BG Size', cs.backgroundSize);
        if (cs.backgroundPosition !== '0% 0%') h += row('BG Position', cs.backgroundPosition);
      }
      if (hasRad)    h += row('Border Radius', cs.borderRadius);
      if (hasShadow) h += row('Box Shadow', cs.boxShadow.length > 55 ? cs.boxShadow.slice(0,55)+'…' : cs.boxShadow);
      if (hasBorder) h += row('Border', `${cs.borderTopWidth} ${cs.borderTopStyle} ${colorLabel(cs.borderTopColor) || cs.borderTopColor}`);
      if (hasOpac)   h += row('Opacity', cs.opacity);
      if (hasTrans)  h += row('Transform', cs.transform.length > 55 ? cs.transform.slice(0,55)+'…' : cs.transform);
    }

    // Animations / transitions
    const transDur = parseFloat(cs.transitionDuration);
    const transProp = cs.transitionProperty;
    const hasAnim  = cs.animationName && cs.animationName !== 'none';
    if (transDur > 0 || hasAnim) {
      h += sec('Animation & Motion');
      if (transDur > 0) {
        h += row('Transitions', transProp);
        h += row('Duration', cs.transitionDuration);
        h += row('Easing', cs.transitionTimingFunction);
        const del = parseFloat(cs.transitionDelay);
        if (del > 0) h += row('Delay', cs.transitionDelay);
      }
      if (hasAnim) {
        h += row('Animation', cs.animationName);
        h += row('Duration', cs.animationDuration);
        h += row('Timing', cs.animationTimingFunction);
        h += row('Fill Mode', cs.animationFillMode);
      }
    }

    // ── 8. Inheritance Chain ─────────────────────────────────────────────────
    h += sec('Inheritance Chain');
    const iprops = ['font-family','font-size','font-weight','color','line-height'];
    let anyInherited = false;
    for (const prop of iprops) {
      const decl = getDeclaredPropertySource(el, prop);
      if (!decl) {
        const inh = detectInheritance(el, prop);
        if (inh) {
          const clsLabel = inh.classes.length ? `.${inh.classes[0]}` : `<${inh.tag}>`;
          h += row(prop, `← ${clsLabel}: ${inh.value}`, 'INHERITED', '#5A82CC');
          anyInherited = true;
        }
      }
    }
    if (!anyInherited) {
      h += `<div style="color:#4C5566;font-size:7.5px">All key properties are explicitly set on this element — no inheritance to report.</div>`;
    }

    // ── 9. Responsive Notes ──────────────────────────────────────────────────
    h += sec('Responsive Notes');
    const responsiveFound = [];
    const checkProps = ['width','height','font-size','max-width','min-width','padding','gap','margin'];
    for (const p of checkProps) {
      const d = getDeclaredPropertySource(el, p);
      if (d && /clamp\(|%|vw|vh|calc\(|min\(|max\(/.test(d.value)) {
        responsiveFound.push(`${p}: ${d.value}`);
      }
    }

    // Check @media rules
    const mediaFound = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.type === CSSRule.MEDIA_RULE) {
            for (const sr of rule.cssRules) {
              try {
                if (sr.type === CSSRule.STYLE_RULE && el.matches(sr.selectorText)) {
                  const body = sr.cssText.replace(/[^{]+\{/, '').replace(/\}.*$/, '').trim();
                  mediaFound.push(`@media ${rule.conditionText} → ${body.length > 55 ? body.slice(0,55)+'…' : body}`);
                }
              } catch (_) {}
            }
          }
        }
      } catch (_) {}
    }

    if (responsiveFound.length) {
      h += `<div style="color:#4C5566;font-size:7px;margin-bottom:3px;text-transform:uppercase;letter-spacing:.07em">Responsive CSS values:</div>`;
      responsiveFound.forEach(p => { h += `<div style="color:#5A82CC;font-size:7.5px;margin-bottom:2px">✓ ${p}</div>`; });
    }
    if (mediaFound.length) {
      h += `<div style="color:#4C5566;font-size:7px;margin-top:4px;margin-bottom:3px;text-transform:uppercase;letter-spacing:.07em">Breakpoint overrides:</div>`;
      mediaFound.slice(0,4).forEach(m => { h += `<div style="color:#687284;font-size:7px;margin-bottom:2px;line-height:1.5">📐 ${m}</div>`; });
    }
    if (!responsiveFound.length && !mediaFound.length) {
      h += `<div style="color:#4C5566;font-size:7.5px;line-height:1.5">No explicitly responsive CSS on this element. It may still respond to viewport changes via its layout context (${ctx.type}).</div>`;
    }

    // ── 10. Webflow Remake Instructions ──────────────────────────────────────
    h += sec('Webflow Remake Instructions');
    const steps = generateWebflowRemakeSteps(el);
    steps.forEach((step, i) => {
      h += `<div style="display:flex;gap:6px;margin-bottom:5px;align-items:flex-start">
        <span style="color:#97BDF1;font-size:7px;flex-shrink:0;min-width:14px;margin-top:1px">${i+1}.</span>
        <span style="color:#E1EEFC;font-size:7.5px;line-height:1.5;flex:1">${step}</span>
      </div>`;
    });

    // Footer bar
    const r = el.getBoundingClientRect();
    h += `<div style="color:#333B49;font-size:7px;margin-top:10px;padding-top:6px;border-top:1px solid rgba(255,255,255,.07)">
      Rendered: ${Math.round(r.width)}×${Math.round(r.height)}px · &lt;${tag}&gt;${cls.length ? ' · .'+cls[0] : ''}
    </div>`;

    panel.innerHTML = h;
    panel.style.display = 'block';
  }

  // ─── UI elements ──────────────────────────────────────────────────────────

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
    lineHeight:'1.75', width:'390px',
    boxShadow:'0 12px 40px rgba(0,0,0,.6)',
    display:'none', border:'1px solid rgba(255,255,255,.1)',
    maxHeight:'82vh', overflowY:'auto', pointerEvents:'auto',
  });

  const ring = document.createElement('div');
  Object.assign(ring.style, {
    position:'fixed', zIndex:'99998', pointerEvents:'none', display:'none',
    outlineOffset:'2px', borderRadius:'2px',
  });

  document.body.appendChild(toggleBtn);
  document.body.appendChild(panel);
  document.body.appendChild(ring);

  // ─── State ────────────────────────────────────────────────────────────────

  let active = false;
  let locked = false;
  let cur    = null;

  function updateRing(el, isLocked) {
    const r = el.getBoundingClientRect();
    Object.assign(ring.style, {
      display:    'block',
      top:        r.top    + 'px',
      left:       r.left   + 'px',
      width:      r.width  + 'px',
      height:     r.height + 'px',
      outline:    isLocked ? '2px solid #F59E0B' : '2px solid #97BDF1',
      background: isLocked ? 'rgba(245,158,11,.07)' : 'rgba(151,189,241,.07)',
    });
  }

  // ─── Event handlers ───────────────────────────────────────────────────────

  toggleBtn.addEventListener('click', () => {
    active = !active;
    locked = false;
    cur    = null;
    if (active) {
      Object.assign(toggleBtn.style, { background:'#1D3D7E', boxShadow:'0 3px 0 #112447' });
      toggleBtn.textContent = '⬡ ON  ·  Shift+I to exit';
    } else {
      Object.assign(toggleBtn.style, { background:'#2955AC', boxShadow:'0 3px 0 #1D3D7E' });
      toggleBtn.textContent = '⬡ WF Inspect';
      panel.style.display = 'none';
      ring.style.display  = 'none';
    }
  });

  document.addEventListener('click', e => {
    if (!active) return;
    const t = e.target;
    if (t === toggleBtn || panel.contains(t)) return;
    e.preventDefault();
    e.stopPropagation();
    if (locked && cur === t) {
      locked = false;
      updateRing(t, false);
      renderPanel(t, false);
    } else {
      locked = true;
      cur    = t;
      updateRing(t, true);
      renderPanel(t, true);
    }
  }, true);

  document.addEventListener('mouseover', e => {
    if (!active || locked) return;
    const t = e.target;
    if (t === toggleBtn || t === panel || t === ring || panel.contains(t)) return;
    if (t === cur) return;
    cur = t;
    updateRing(t, false);
    renderPanel(t, false);
  }, true);

  window.addEventListener('scroll', () => {
    if (active && cur) updateRing(cur, locked);
  }, { passive:true, capture:true });

  document.addEventListener('keydown', e => {
    if (e.shiftKey && e.key === 'I') { e.preventDefault(); toggleBtn.click(); }
    if (e.key === 'Escape' && locked) {
      locked = false;
      if (cur) { updateRing(cur, false); renderPanel(cur, false); }
    }
  });

  console.log('%c[WF Inspector v3] loaded  ·  Shift+I to toggle  ·  Click element to lock  ·  Esc to unlock', 'color:#97BDF1;font-family:monospace;font-size:11px');
})();
