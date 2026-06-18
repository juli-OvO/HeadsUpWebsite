/* Heads Up — night-theme toggle (sticky, persisted across pages) */
(function () {
  var KEY = 'headsup-theme';
  var root = document.documentElement;

  // apply saved preference as early as possible to avoid a flash
  try {
    if (localStorage.getItem(KEY) === 'dark') root.setAttribute('data-theme', 'dark');
  } catch (e) {}

  var MOON = '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var SUN = '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.1"/><path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M2 12h2.5M19.5 12H22M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7"/></svg>';

  function build() {
    if (document.querySelector('.theme-toggle')) return;
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle night theme');
    btn.innerHTML = MOON + SUN;
    btn.addEventListener('click', function () {
      var dark = root.getAttribute('data-theme') === 'dark';
      if (dark) { root.removeAttribute('data-theme'); }
      else { root.setAttribute('data-theme', 'dark'); }
      try { localStorage.setItem(KEY, dark ? 'light' : 'dark'); } catch (e) {}
    });
    document.body.appendChild(btn);
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
