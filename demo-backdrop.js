/* ==========================================================================
   StudioDrop — backdrop & shape playground
   Shows exactly what the app outputs: your item, your backdrop, your shape,
   with the studio shadow. No dependencies, no images required.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.getElementById('backdrop-demo');
  if (!root) return;

  /* the nine curated colours, plus white and transparent — as in the app */
  var BACKDROPS = [
    { id: 'white',       label: 'Pure white',  css: '#ffffff' },
    { id: 'transparent', label: 'Transparent PNG', css: null },
    { id: 'grey',        label: 'Grey',     css: '#e8eaed' },
    { id: 'cream',       label: 'Cream',    css: '#f5eee1' },
    { id: 'blush',       label: 'Blush',    css: '#f6e2e2' },
    { id: 'sage',        label: 'Sage',     css: '#dde7dc' },
    { id: 'sky',         label: 'Sky',      css: '#dbe8f5' },
    { id: 'lavender',    label: 'Lavender', css: '#e6e0f2' },
    { id: 'sand',        label: 'Sand',     css: '#ece0cc' },
    { id: 'navy',        label: 'Navy',     css: '#1e2b45' },
    { id: 'black',       label: 'Black',    css: '#15171b' }
  ];

  /* aspect ratios, with where each one is used */
  var SHAPES = [
    { id: 'square',    label: '1:1',  ratio: '1 / 1',   px: '2000 × 2000', use: 'Marketplace listings' },
    { id: 'portrait',  label: '4:5',  ratio: '4 / 5',   px: '1600 × 2000', use: 'Instagram feed' },
    { id: 'tall',      label: '2:3',  ratio: '2 / 3',   px: '1333 × 2000', use: 'Pin boards' },
    { id: 'vertical',  label: '9:16', ratio: '9 / 16',  px: '1125 × 2000', use: 'Stories & short video' },
    { id: 'wide',      label: '16:9', ratio: '16 / 9',  px: '2000 × 1125', use: 'Banners & web' }
  ];

  var stage    = root.querySelector('.pg-stage');
  var swatches = root.querySelector('.pg-swatches');
  var shapes   = root.querySelector('.pg-shapes');
  var readout  = root.querySelector('.pg-readout');
  var useout   = root.querySelector('.pg-use');

  /* ---- build the swatch row --------------------------------------------- */
  BACKDROPS.forEach(function (b, i) {
    var el = document.createElement('button');
    el.type = 'button';
    el.className = 'swatch' + (b.css === null ? ' checker' : '');
    el.dataset.bg = b.id;
    if (b.css) el.style.background = b.css;
    el.title = b.label;
    el.setAttribute('aria-label', 'Backdrop: ' + b.label);
    el.setAttribute('aria-pressed', String(i === 0));
    swatches.appendChild(el);
  });

  /* ---- build the shape row ---------------------------------------------- */
  SHAPES.forEach(function (s, i) {
    var el = document.createElement('button');
    el.type = 'button';
    el.className = 'shape-btn';
    el.dataset.shape = s.id;
    el.textContent = s.label;
    el.setAttribute('aria-label', s.label + ' — ' + s.use);
    el.setAttribute('aria-pressed', String(i === 0));
    shapes.appendChild(el);
  });

  /* ---- the "product" — a cut-out item with a soft studio shadow ---------- */
  stage.insertAdjacentHTML('beforeend', [
    '<svg viewBox="0 0 260 260" role="img" aria-label="A cut-out product photo sitting on the chosen backdrop with a soft studio shadow">',
      '<defs>',
        '<radialGradient id="sd-shadow" cx="50%" cy="50%" r="50%">',
          '<stop offset="0%"  stop-color="#000" stop-opacity=".26"/>',
          '<stop offset="65%" stop-color="#000" stop-opacity=".08"/>',
          '<stop offset="100%" stop-color="#000" stop-opacity="0"/>',
        '</radialGradient>',
        '<linearGradient id="sd-body" x1="0" y1="0" x2="1" y2="1">',
          '<stop offset="0%"  stop-color="#e86b4a"/>',
          '<stop offset="52%" stop-color="#d1502f"/>',
          '<stop offset="100%" stop-color="#a83a20"/>',
        '</linearGradient>',
        '<linearGradient id="sd-gloss" x1="0" y1="0" x2="1" y2="0">',
          '<stop offset="0%"   stop-color="#fff" stop-opacity=".42"/>',
          '<stop offset="38%"  stop-color="#fff" stop-opacity=".05"/>',
          '<stop offset="100%" stop-color="#fff" stop-opacity="0"/>',
        '</linearGradient>',
      '</defs>',

      /* studio shadow */
      '<ellipse cx="130" cy="216" rx="66" ry="15" fill="url(#sd-shadow)"/>',

      /* a vase-ish product silhouette — recognisable, neutral, sells the idea */
      '<path d="M112 40 h36 a6 6 0 0 1 6 6 v18 c0 10 26 26 26 60 v52 a36 36 0 0 1-36 36 h-28 a36 36 0 0 1-36-36 v-52 c0-34 26-50 26-60 v-18 a6 6 0 0 1 6-6 z"',
            ' fill="url(#sd-body)"/>',
      '<path d="M112 40 h36 a6 6 0 0 1 6 6 v18 c0 10 26 26 26 60 v52 a36 36 0 0 1-36 36 h-28 a36 36 0 0 1-36-36 v-52 c0-34 26-50 26-60 v-18 a6 6 0 0 1 6-6 z"',
            ' fill="url(#sd-gloss)"/>',
      '<rect x="106" y="62" width="48" height="7" rx="3.5" fill="#8d2f18" opacity=".55"/>',
    '</svg>'
  ].join(''));

  /* ---- state ------------------------------------------------------------- */
  var current = { bg: BACKDROPS[0], shape: SHAPES[0] };

  function render() {
    if (current.bg.css === null) {
      stage.classList.add('transparent');
      stage.style.backgroundColor = '';
    } else {
      stage.classList.remove('transparent');
      stage.style.backgroundColor = current.bg.css;
    }
    stage.style.aspectRatio = current.shape.ratio;
    readout.textContent = current.bg.label + '  ·  ' + current.shape.px + ' px';
    useout.textContent = current.shape.use;
  }

  swatches.addEventListener('click', function (e) {
    var b = e.target.closest('.swatch');
    if (!b) return;
    current.bg = BACKDROPS.filter(function (x) { return x.id === b.dataset.bg; })[0];
    Array.prototype.forEach.call(swatches.children, function (el) {
      el.setAttribute('aria-pressed', String(el === b));
    });
    render();
  });

  shapes.addEventListener('click', function (e) {
    var b = e.target.closest('.shape-btn');
    if (!b) return;
    current.shape = SHAPES.filter(function (x) { return x.id === b.dataset.shape; })[0];
    Array.prototype.forEach.call(shapes.children, function (el) {
      el.setAttribute('aria-pressed', String(el === b));
    });
    render();
  });

  render();
})();
