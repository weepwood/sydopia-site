/**
 * Sydopia-inspired, dependency-free UI components.
 * Import this module and the matching sydopia-ui.css file.
 * No Webflow/jQuery/runtime dependency.
 */
const MARQUEE_DEFAULTS = {
  items: [], speed: 48, direction: 'left', gap: 32, cardWidth: 440,
  aspectRatio: '16 / 9', radius: 5, pauseOnHover: true,
  hoverLift: 12, showTags: false, reducedMotion: 'system'
};

const PAPER_DEFAULTS = {
  items: [], colors: ['#f5f3a1', '#ffacc4', '#2fa15b', '#9bc4ff'],
  angles: [-1, -4.87, -6.85, 2.25], maxWidth: 1050, cardHeight: 500,
  padding: 36, fontSize: 34, duration: 500, label: 'TESTIMONIALS',
  stickerText: 'Rave Reviews', stickerSrc: '', stickerColor: '#ff4141',
  draggableSticker: true, reducedMotion: 'system'
};

function hostFor(target) {
  const node = typeof target === 'string' ? document.querySelector(target) : target;
  if (!(node instanceof Element)) throw new TypeError('Provide an existing target element.');
  return node;
}
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = String(text);
  return node;
}
function limit(value, fallback, min, max) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : fallback;
}
function urlFor(value, allowMail = false) {
  if (typeof value !== 'string' || !value.trim()) return '';
  try {
    const url = new URL(value, document.baseURI);
    if (url.protocol === 'https:' || url.protocol === 'http:' || (allowMail && url.protocol === 'mailto:')) return url.href;
  } catch (_) {}
  return '';
}
function reduced(option) {
  if (option === 'always') return true;
  if (option === 'never') return false;
  return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}
function externalLink(a, href) {
  const url = urlFor(href, true);
  if (!url) { a.removeAttribute('href'); return; }
  a.href = url;
  if (a.protocol === 'http:' || a.protocol === 'https:') {
    if (a.origin !== window.location.origin) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  }
}
function imageNode(src, alt, className) {
  const image = el('img', className);
  image.alt = alt || '';
  image.loading = 'lazy';
  image.decoding = 'async';
  const safe = urlFor(src);
  if (safe) image.src = safe;
  return image;
}

/** Create an independently configurable infinite portfolio marquee. */
export function createProjectMarquee(target, initialOptions = {}) {
  const host = hostFor(target);
  let options = { ...MARQUEE_DEFAULTS, ...initialOptions };
  let dispose = () => {};

  function render() {
    dispose();
    const disposers = [];
    let alive = true;
    const items = Array.isArray(options.items) ? options.items : [];
    host.classList.add('sui-project-root');
    host.style.setProperty('--sui-gap', limit(options.gap, 32, 0, 120) + 'px');
    host.style.setProperty('--sui-card-width', limit(options.cardWidth, 440, 180, 1000) + 'px');
    host.style.setProperty('--sui-radius', limit(options.radius, 5, 0, 60) + 'px');
    host.style.setProperty('--sui-lift', limit(options.hoverLift, 12, 0, 70) + 'px');
    // CSS syntax is checked: an invalid aspect ratio falls back to 16 / 9.
    const aspect = String(options.aspectRatio);
    host.style.setProperty('--sui-aspect', /^([1-9]\d{0,2})\s*\/\s*([1-9]\d{0,2})$/.test(aspect) ? aspect : '16 / 9');

    const viewport = el('div', 'sui-project-viewport');
    viewport.setAttribute('aria-label', 'Projects');
    viewport.setAttribute('role', 'region');
    const track = el('div', 'sui-project-track');
    const originals = [];
    items.forEach((item) => {
      const card = el('article', 'sui-project-card');
      const media = el('a', 'sui-project-media');
      externalLink(media, item.href);
      if (!media.hasAttribute('href')) {
        media.removeAttribute('tabindex');
        media.setAttribute('role', 'img');
        media.setAttribute('aria-label', item.title || 'Project image');
      } else {
        media.setAttribute('aria-label', 'Open ' + (item.title || 'project'));
      }
      media.appendChild(imageNode(item.image, item.alt || item.title, 'sui-project-image'));
      if (item.hoverImage) media.appendChild(imageNode(item.hoverImage, '', 'sui-project-image sui-project-image--hover'));
      const meta = el('div', 'sui-project-meta');
      const title = el('h3', 'sui-project-title', item.title || 'Untitled');
      meta.appendChild(title);
      if (urlFor(item.href, true)) {
        const link = el('a', 'sui-project-link', item.linkLabel || 'View project');
        externalLink(link, item.href);
        meta.appendChild(link);
      }
      card.append(media, meta);
      if (options.showTags && Array.isArray(item.tags) && item.tags.length) {
        const tags = el('div', 'sui-project-tags');
        item.tags.forEach((tag) => tags.appendChild(el('span', 'sui-project-tag', tag)));
        card.appendChild(tags);
      }
      originals.push(card);
      track.appendChild(card);
    });
    viewport.appendChild(track);
    host.replaceChildren(viewport);

    let animation = null;
    let clones = [];
    const removeClones = () => {
      if (animation) { animation.cancel(); animation = null; }
      clones.forEach(node => node.remove());
      clones = [];
    };
    function rebuild() {
      if (!alive) return;
      removeClones();
      if (!originals.length || reduced(options.reducedMotion) || items.length < 1 || !track.animate) {
        viewport.classList.add('sui-project-viewport--static');
        return;
      }
      viewport.classList.remove('sui-project-viewport--static');
      // Append a full duplicate so the animation can wrap without a visible seam.
      const appendCycle = () => originals.forEach((node) => {
        const clone = node.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('a, button, [tabindex]').forEach((interactive) => {
          // Keep the pointer link usable, but skip duplicate cards in keyboard navigation.
          interactive.tabIndex = -1;
          interactive.setAttribute('aria-hidden', 'true');
        });
        track.appendChild(clone);
        clones.push(clone);
      });
      appendCycle();
      const firstClone = clones[0];
      const distance = firstClone ? firstClone.offsetLeft - originals[0].offsetLeft : 0;
      if (distance < 1) return;
      // The viewport can be wider than the data: fill it with further cycles.
      let safety = 0;
      while (track.scrollWidth < viewport.clientWidth + distance && safety++ < 16) appendCycle();
      const sign = options.direction === 'right' ? 1 : -1;
      const from = sign === 1 ? -distance : 0;
      const to = sign === 1 ? 0 : -distance;
      animation = track.animate([
        { transform: 'translate3d(' + from + 'px, 0, 0)' },
        { transform: 'translate3d(' + to + 'px, 0, 0)' }
      ], {
        duration: Math.max(500, distance / limit(options.speed, 48, 5, 250) * 1000),
        easing: 'linear', iterations: Infinity
      });
      if (options.pauseOnHover && (viewport.matches(':hover') || viewport.contains(document.activeElement))) animation.pause();
    }
    const pause = () => { if (animation && options.pauseOnHover) animation.pause(); };
    const resume = () => { if (animation && options.pauseOnHover && !viewport.matches(':hover') && !viewport.contains(document.activeElement)) animation.play(); };
    viewport.addEventListener('pointerenter', pause);
    viewport.addEventListener('pointerleave', resume);
    viewport.addEventListener('focusin', pause);
    viewport.addEventListener('focusout', resume);
    disposers.push(() => {
      viewport.removeEventListener('pointerenter', pause);
      viewport.removeEventListener('pointerleave', resume);
      viewport.removeEventListener('focusin', pause);
      viewport.removeEventListener('focusout', resume);
    });

    let observer;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => rebuild());
      observer.observe(viewport);
      disposers.push(() => observer.disconnect());
    }
    const media = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    const motionChange = () => rebuild();
    if (media && media.addEventListener) {
      media.addEventListener('change', motionChange);
      disposers.push(() => media.removeEventListener('change', motionChange));
    }
    rebuild();
    dispose = () => { alive = false; disposers.forEach(fn => fn()); removeClones(); };
  }
  render();
  return {
    update(next = {}) { options = { ...options, ...next }; render(); },
    destroy() { dispose(); host.replaceChildren(); host.classList.remove('sui-project-root'); ['--sui-gap','--sui-card-width','--sui-radius','--sui-lift','--sui-aspect'].forEach(key => host.style.removeProperty(key)); }
  };
}

/** Create the rotating, clickable editorial paper testimonial stack. */
export function createPaperTestimonials(target, initialOptions = {}) {
  const host = hostFor(target);
  let options = { ...PAPER_DEFAULTS, ...initialOptions };
  let dispose = () => {};
  let advance = () => {};

  function render() {
    dispose();
    let alive = true;
    const callbacks = [];
    let timer = null;
    let animation = null;
    let animating = false;
    const items = Array.isArray(options.items) ? options.items : [];
    const colors = Array.isArray(options.colors) && options.colors.length ? options.colors : PAPER_DEFAULTS.colors;
    const angles = Array.isArray(options.angles) && options.angles.length ? options.angles : PAPER_DEFAULTS.angles;
    host.classList.add('sui-paper-root');
    host.style.setProperty('--sui-paper-max', limit(options.maxWidth, 1050, 300, 1800) + 'px');
    host.style.setProperty('--sui-paper-height', limit(options.cardHeight, 500, 250, 900) + 'px');
    host.style.setProperty('--sui-paper-padding', limit(options.padding, 36, 12, 90) + 'px');
    host.style.setProperty('--sui-paper-font', limit(options.fontSize, 34, 16, 56) + 'px');
    host.style.setProperty('--sui-sticker-color', String(options.stickerColor || '#ff4141'));
    const stage = el('section', 'sui-paper-stage');
    stage.setAttribute('aria-label', 'Testimonials');
    const cards = [];
    items.forEach((item, i) => {
      const card = el('button', 'sui-paper-card');
      card.type = 'button';
      const angle = limit(angles[i % angles.length], 0, -20, 20);
      card.style.setProperty('--sui-paper-angle', angle + 'deg');
      card.style.backgroundColor = colors[i % colors.length];
      card.setAttribute('aria-label', 'Testimonial by ' + (item.author || ('person ' + (i + 1))) + '. Show next testimonial');
      const content = el('span', 'sui-paper-content');
      const heading = el('span', 'sui-paper-label', item.label || options.label);
      const quote = el('span', 'sui-paper-quote', item.quote || '');
      content.append(heading, quote);
      const footer = el('span', 'sui-paper-footer');
      footer.append(
        el('span', 'sui-paper-author', item.author || 'Anonymous'),
        el('span', 'sui-paper-role', item.role || '')
      );
      card.append(content, footer);
      cards.push(card);
      stage.appendChild(card);
    });
    const order = cards.map((_, i) => i).reverse(); // back to front; item 0 starts on top.
    function applyOrder() {
      order.forEach((index, level) => {
        cards[index].style.zIndex = String(level + 1);
        cards[index].tabIndex = level === cards.length - 1 ? 0 : -1;
        cards[index].setAttribute('aria-hidden', level === cards.length - 1 ? 'false' : 'true');
      });
    }
    applyOrder();
    let currentIndex = order[order.length - 1];
    function sendTopToBack() {
      if (!alive || animating || cards.length < 2) return;
      const index = order[order.length - 1];
      const card = cards[index];
      const reorder = () => {
        if (!alive || order[order.length - 1] !== index) return;
        order.pop();
        order.unshift(index);
        applyOrder();
        currentIndex = order[order.length - 1];
        stage.dispatchEvent(new CustomEvent('sui:change', { bubbles: true, detail: { index: currentIndex, item: items[currentIndex] } }));
      };
      if (reduced(options.reducedMotion) || !card.animate) { reorder(); return; }
      animating = true;
      const rotation = card.style.getPropertyValue('--sui-paper-angle');
      const resting = 'rotate(' + rotation + ')';
      animation = card.animate([
        { transform: resting, opacity: 1, offset: 0 },
        { transform: 'translateX(38%) rotate(' + rotation + ') scale(.9)', opacity: .75, offset: .49 },
        { transform: resting, opacity: 1, offset: 1 }
      ], { duration: limit(options.duration, 500, 120, 2000), easing: 'ease-in-out' });
      timer = window.setTimeout(reorder, limit(options.duration, 500, 120, 2000) / 2);
      animation.finished.then(() => {
        if (!alive) return;
        window.clearTimeout(timer);
        reorder(); animating = false; animation = null;
      }, () => { animating = false; });
    }
    advance = sendTopToBack;
    cards.forEach((card, i) => {
      const click = () => { if (order[order.length - 1] === i) sendTopToBack(); };
      card.addEventListener('click', click);
      callbacks.push(() => card.removeEventListener('click', click));
    });

    if (options.stickerSrc || options.stickerText) {
      const sticker = el('span', 'sui-paper-sticker');
      sticker.setAttribute('aria-hidden', 'true');
      const src = urlFor(options.stickerSrc);
      if (src) {
        sticker.classList.add('sui-paper-sticker--image');
        sticker.appendChild(imageNode(src, '', 'sui-paper-sticker-img'));
      } else sticker.textContent = String(options.stickerText);
      stage.appendChild(sticker);
      if (options.draggableSticker) {
        sticker.classList.add('sui-paper-sticker--draggable');
        let active = false;
        let x = 0, y = 0, originX = 0, originY = 0, startX = 0, startY = 0;
        const down = (e) => {
          if (e.button !== 0 && e.pointerType === 'mouse') return;
          active = true; startX = e.clientX; startY = e.clientY; originX = x; originY = y;
          sticker.setPointerCapture(e.pointerId);
        };
        const move = (e) => {
          if (!active) return;
          x = Math.max(-stage.clientWidth * .8, Math.min(stage.clientWidth * .8, originX + e.clientX - startX));
          y = Math.max(-stage.clientHeight * .7, Math.min(stage.clientHeight * .7, originY + e.clientY - startY));
          sticker.style.setProperty('--sui-drag-x', x + 'px');
          sticker.style.setProperty('--sui-drag-y', y + 'px');
        };
        const up = () => { active = false; };
        sticker.addEventListener('pointerdown', down);
        sticker.addEventListener('pointermove', move);
        sticker.addEventListener('pointerup', up);
        sticker.addEventListener('pointercancel', up);
        callbacks.push(() => {
          sticker.removeEventListener('pointerdown', down);
          sticker.removeEventListener('pointermove', move);
          sticker.removeEventListener('pointerup', up);
          sticker.removeEventListener('pointercancel', up);
        });
      }
    }
    host.replaceChildren(stage);
    dispose = () => {
      alive = false;
      window.clearTimeout(timer);
      if (animation) animation.cancel();
      callbacks.forEach(fn => fn());
    };
  }
  render();
  return {
    update(next = {}) { options = { ...options, ...next }; render(); },
    next() { advance(); },
    destroy() { dispose(); host.replaceChildren(); host.classList.remove('sui-paper-root'); ['--sui-paper-max','--sui-paper-height','--sui-paper-padding','--sui-paper-font','--sui-sticker-color'].forEach(key => host.style.removeProperty(key)); }
  };
}
