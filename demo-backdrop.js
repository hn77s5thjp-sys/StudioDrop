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

  /* ---- the product — a real cut-out, exported from StudioDrop ------------ */
  stage.insertAdjacentHTML('beforeend',
    '<div class="pg-item">' +
      '<span class="pg-shadow" aria-hidden="true"></span>' +
      '<img src="shots/hero-cutout.png" width="560" height="560" fetchpriority="high" decoding="async" ' +
           'alt="A Casio G-Shock watch cut out of its background by StudioDrop, sitting on the chosen backdrop with a soft studio shadow">' +
    '</div>');

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
