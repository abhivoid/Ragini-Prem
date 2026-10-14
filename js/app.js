/* Ragini & Prem · wedding invite · painted scenes + page-by-page interaction */
(function () {
  'use strict';
  var $ = function (i) { return document.getElementById(i); };
  function cl(x) { return Math.min(1, Math.max(0, x)); }
  function sm(x) { x = cl(x); return x * x * (3 - 2 * x); }
  var useJsVh = !(window.CSS && CSS.supports && CSS.supports('height', '1svh')), lastW = innerWidth;
  function setVh() { if (useJsVh) document.documentElement.style.setProperty('--vh', innerHeight * .01 + 'px'); }
  setVh();

  /* marigold petals drifting through every page */
  (function () {
    var d = $('drift'), cols = ['#E08A2E', '#F0B23C', '#C8742A', '#B33A2B', '#F4D27A'], k, e, z;
    for (k = 0; k < 12; k++) {
      e = document.createElement('i'); z = 6 + Math.random() * 6;
      e.style.cssText = 'left:' + (Math.random() * 100).toFixed(0) + '%;width:' + z.toFixed(1) + 'px;height:' + (z * 1.3).toFixed(1) + 'px;background:' + cols[k % 5] + ';--dx:' + (Math.random() * 90 - 45).toFixed(0) + 'px;--r:' + (Math.random() * 360).toFixed(0) + 'deg;--d:' + (14 + Math.random() * 12).toFixed(1) + 's;animation-delay:' + (-Math.random() * 24).toFixed(1) + 's';
      d.appendChild(e);
    }
  })();

  /* ---------- rolling digits ---------- */
  function build(el) {
    var v = Math.min(99, +el.dataset.count), t = String(v).padStart(2, '0');
    el.setAttribute('aria-label', String(v)); el.innerHTML = ''; el._d = [];
    [0, 1].forEach(function (k) {
      var dg = document.createElement('span'), st = document.createElement('span'), h = '';
      dg.className = 'dg'; st.className = 'st'; dg.setAttribute('aria-hidden', 'true');
      for (var r = 0; r < 20; r++) h += '<i>' + (r % 10) + '</i>';
      st.innerHTML = h; dg.appendChild(st); el.appendChild(dg);
      el._d.push({ st: st, v: +t[k], ones: k === 1 });
    });
  }
  function count(s) {
    [].forEach.call(s.querySelectorAll('[data-count]'), function (el) {
      if (!el._d) return;
      el._d.forEach(function (d) {
        d.st.style.transition = 'none'; d.st.style.transform = 'translateY(0)'; void d.st.offsetWidth;
        setTimeout(function () {
          d.st.style.transition = 'transform ' + (d.ones ? 1.8 : 1.3) + 's cubic-bezier(.2,.8,.1,1)';
          d.st.style.transform = 'translateY(-' + ((d.ones ? 10 + d.v : d.v) * 5) + '%)';
        }, 380);
      });
    });
  }

  /* ---------- date logic: before / on the day / after (India time) ---------- */
  var target = new Date('2026-11-20T07:00:00+05:30').getTime(), dayEnd = new Date('2026-11-21T00:00:00+05:30').getTime();
  var live = $('live'), nd = $('nd');
  function phase() { var n = Date.now(); return n < target ? 0 : n < dayEnd ? 1 : 2; }
  var ph = phase();
  if (ph === 0) nd.dataset.count = Math.floor((target - Date.now()) / 864e5); else nd.style.display = 'none';
  if (ph === 1) { $('cl').textContent = 'Today'; $('cs').textContent = Date.now() < target ? 'The wedding begins at 7:00 AM' : 'The wedding is being celebrated today'; }
  if (ph === 2) { $('cl').textContent = 'With your blessings'; $('cs').textContent = 'We were married on 20 November 2026'; $('bye').textContent = 'Thank you for your blessings.'; }
  [].forEach.call(document.querySelectorAll('[data-count]'), build);
  function tick() {
    if (phase() !== 0) { live.textContent = ''; return; }
    var d = target - Date.now(), H = Math.floor(d % 864e5 / 36e5), M = Math.floor(d % 36e5 / 6e4), S = Math.floor(d % 6e4 / 1e3);
    live.textContent = H + ' hours ' + M + ' minutes ' + S + ' seconds';
  }
  tick(); setInterval(tick, 1000);

  /* ---------- pager ---------- */
  var col = $('col'), nx = $('next'), nl = $('nl'), db = [].slice.call($('dots').children),
      secs = [null, $('s1'), $('s2'), $('s3'), $('s4'), $('s5')], bgs = { a: $('bgA'), b: $('bgB'), c: $('bgC') };
  var idx = 0, busy = false, lock = 0;
  function sceneOf(i) { return i <= 1 ? 'a' : i <= 4 ? 'b' : 'c'; }
  function reset(s, up) { s.style.transition = 'none'; s.classList.toggle('up', up); void s.offsetWidth; s.style.transition = ''; }
  function enter(i, dir) { var s = secs[i]; reset(s, dir < 0); s.classList.remove('up'); s.classList.add('in'); count(s); }
  function leave(i, dir) { var s = secs[i]; s.classList.remove('in', 'drag'); s.style.opacity = ''; s.style.transform = ''; if (dir > 0) s.classList.add('up'); }
  function ui() {
    var sc = sceneOf(Math.max(idx, 1));
    col.dataset.sc = sc;
    Object.keys(bgs).forEach(function (k) { bgs[k].classList.toggle('on', k === sc); });
    col.classList.toggle('opened', idx >= 1);
    db.forEach(function (b, k) { b.className = (k + 1 === idx) ? 'a' : ''; });
    nx.classList.toggle('rev', idx === 5); nl.textContent = idx === 5 ? 'Start over' : 'Next';
  }
  function burst() {
    var fx = $('fx'), cols = ['#C8742A', '#E9B04A', '#E08A2E', '#F4D27A', '#B33A2B'], k, p, a, r, z;
    for (k = 0; k < 30; k++) {
      p = document.createElement('i'); p.className = 'pet'; a = Math.random() * Math.PI * 2; r = 90 + Math.random() * 190; z = 8 + Math.random() * 8;
      p.style.cssText = 'width:' + z + 'px;height:' + z * 1.3 + 'px;background:' + cols[k % 5] + ';--dx:' + (Math.cos(a) * r).toFixed(0) + 'px;--dy:' + (Math.sin(a) * r * .7 + 200 + Math.random() * 160).toFixed(0) + 'px;--r:' + (Math.random() * 720 - 360).toFixed(0) + 'deg;--d:' + (2.6 + Math.random() * 1.6).toFixed(2) + 's;animation-delay:' + (Math.random() * .5).toFixed(2) + 's';
      fx.appendChild(p);
    }
    setTimeout(function () { fx.innerHTML = ''; }, 5000);
  }
  /* music (optional file: assets/music/nadaswaram.mp3) */
  var bgm = $('bgm'), snd = $('snd'), musicOn = true;
  bgm.addEventListener('canplay', function () { snd.classList.add('show'); });
  function fadeTo(v) { var t = setInterval(function () { bgm.volume = Math.min(v, bgm.volume + .03); if (bgm.volume >= v) clearInterval(t); }, 90); }
  function startMusic() { try { bgm.volume = 0; var p = bgm.play(); if (p && p.then) p.then(function () { if (musicOn) fadeTo(.5); }).catch(function () {}); } catch (e) {} }
  snd.addEventListener('click', function () { musicOn = !musicOn; snd.classList.toggle('off', !musicOn); if (musicOn) { bgm.play().catch(function () {}); fadeTo(.5); } else bgm.pause(); });

  function open() {
    if (busy || idx !== 0) return;
    busy = true; idx = 1; ui(); startMusic(); burst();
    setTimeout(function () { enter(1, 1); }, 800);
    setTimeout(function () { busy = false; }, 1600);
  }
  function close() {
    if (busy) return;
    busy = true; leave(idx, -1); idx = 0; ui();
    setTimeout(function () { busy = false; }, 1600);
  }
  function go(n) {
    if (busy || n < 0 || n > 5 || n === idx) return;
    if (idx === 0) { if (n >= 1) open(); return; }
    if (n === 0) { close(); return; }
    busy = true;
    var from = idx, dir = n > from ? 1 : -1;
    idx = n; ui(); leave(from, dir);
    setTimeout(function () { enter(n, dir); }, 360);
    setTimeout(function () { busy = false; }, 1100);
  }
  function next() { go(idx === 5 ? 1 : idx + 1); }

  $('otap').addEventListener('click', open);
  $('open').addEventListener('click', function () { if (idx === 0) open(); });
  nx.addEventListener('click', next);
  db.forEach(function (b, k) { b.addEventListener('click', function () { go(k + 1); }); });
  addEventListener('keydown', function (e) {
    var k = e.key;
    if (k === 'ArrowDown' || k === 'PageDown' || k === ' ' || (k === 'Enter' && idx === 0)) { e.preventDefault(); if (idx < 5) go(idx + 1); }
    else if (k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); go(idx - 1); }
  });
  addEventListener('wheel', function (e) {
    e.preventDefault();
    if (busy || Date.now() < lock || Math.abs(e.deltaY) < 8) return;
    lock = Date.now() + 1200;
    if (e.deltaY > 0) { if (idx < 5) go(idx + 1); } else go(idx - 1);
  }, { passive: false });
  var y0 = 0, t0 = 0, dy = 0, drag = false;
  addEventListener('touchstart', function (e) { y0 = e.touches[0].clientY; t0 = performance.now(); dy = 0; drag = !busy; }, { passive: true });
  addEventListener('touchmove', function (e) {
    e.preventDefault();
    if (!drag) return;
    dy = e.touches[0].clientY - y0;
    if (idx === 0) return;
    var s = secs[idx]; s.classList.add('drag');
    s.style.transform = 'translateY(' + (dy * .3) + 'px)'; s.style.opacity = 1 - Math.min(.5, Math.abs(dy) / 500);
  }, { passive: false });
  addEventListener('touchend', function (e) {
    if (!drag) return;
    drag = false;
    var end = e.changedTouches ? e.changedTouches[0].clientY - y0 : dy;
    var v = end / Math.max(1, performance.now() - t0), fwd = end < -50 || v < -.45, back = end > 50 || v > .45;
    if (idx === 0) { if (fwd) open(); return; }
    var s = secs[idx]; s.classList.remove('drag'); s.style.opacity = ''; s.style.transform = '';
    if (fwd && idx < 5) go(idx + 1); else if (back) go(idx - 1);
  });
  addEventListener('resize', function () { if (innerWidth !== lastW) { lastW = innerWidth; setVh(); } else if (useJsVh) setVh(); });
  ['opening', 'scene-blessing', 'scene-sunrise', 'scene-celebrate'].forEach(function (n) { new Image().src = 'assets/scenes/' + n + '.webp'; });
  ui();
})();
