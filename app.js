const DATA_URL = 'data.json';

function setText(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text || '';
  }
}

function setHTML(id, html) {
  const element = document.getElementById(id);
  if (element) {
    element.innerHTML = html || '';
  }
}

function clearChildren(id) {
  const element = document.getElementById(id);
  if (element) {
    element.innerHTML = '';
    return element;
  }
  return null;
}

function renderNav(navItems) {
  const navList = clearChildren('nav-list');
  if (!navList || !Array.isArray(navItems)) return;
  navItems.forEach((item) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    li.appendChild(a);
    navList.appendChild(li);
  });
}

function renderFooter(footer) {
  if (!footer) return;
  setText('footer-text', footer.text);
  const footerNav = clearChildren('footer-nav');
  if (!footerNav || !Array.isArray(footer.nav)) return;
  footer.nav.forEach((item) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    li.appendChild(a);
    footerNav.appendChild(li);
  });
}

function renderStars(count, altText) {
  const container = clearChildren('stars-container');
  if (!container) return;
  for (let i = 0; i < count; i += 1) {
    const img = document.createElement('img');
    img.src = 'assets/image/360_F_955940886_GfoYpchaBcF2rtXmcuvzsKQ4KvORqh4H-removebg-preview.png';
    img.alt = altText || 'floating star';
    container.appendChild(img);
  }
}

function renderIndex(pageData) {
  if (!pageData) return;
  setText('hero-title', pageData.hero.title);
  setText('hero-description', pageData.hero.description);
  setText('about-heading', pageData.about.heading);
  setHTML('about-paragraphs', pageData.about.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join(''));
  setText('our-team-heading', pageData.team.heading);

  const teamGrid = clearChildren('team-grid');
  if (teamGrid) {
    pageData.team.members.forEach((member) => {
      const card = document.createElement('div');
      card.className = 'team-card';

      const image = document.createElement('img');
      image.src = member.image;
      image.alt = member.alt;
      card.appendChild(image);

      const info = document.createElement('div');
      info.className = 'team-info';

      const name = document.createElement('h3');
      name.textContent = member.name;
      info.appendChild(name);

      const role = document.createElement('p');
      role.textContent = member.role;
      info.appendChild(role);

      const link = document.createElement('a');
      link.href = member.link;
      link.textContent = member.linkText;
      info.appendChild(link);

      card.appendChild(info);
      teamGrid.appendChild(card);
    });
  }

  renderStars(pageData.backgroundAnimation.count, pageData.backgroundAnimation.alt);
}

function renderResume(pageData) {
  if (!pageData) return;
  setText('intro-heading', pageData.intro.heading);
  setHTML('intro-paragraphs', pageData.intro.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join(''));
  setText('intro-languages', pageData.intro.languages);
  setText('intro-education', pageData.intro.education);

  const introLinks = clearChildren('intro-links');
  if (introLinks) {
    pageData.intro.links.forEach((link) => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.innerHTML = `<i class="${link.icon}"></i> ${link.label}`;
      introLinks.appendChild(anchor);
    });
  }

  const carousel = clearChildren('carousel');
  if (carousel) {
    pageData.carousel.forEach((text) => {
      const group = document.createElement('div');
      group.className = 'group';
      const card = document.createElement('div');
      card.className = 'card';
      card.textContent = text;
      group.appendChild(card);
      carousel.appendChild(group);
    });
  }

  setText('skills-heading', pageData.skills.heading);
  const skillsContainer = clearChildren('skills-items');
  if (skillsContainer) {
    pageData.skills.items.forEach((item) => {
      const block = document.createElement('div');
      block.textContent = item;
      skillsContainer.appendChild(block);
    });
  }

  setText('experience-heading', pageData.experience.heading);
  const experienceContainer = clearChildren('experience-items');
  if (experienceContainer) {
    pageData.experience.items.forEach((item) => {
      const p = document.createElement('p');
      p.textContent = item;
      experienceContainer.appendChild(p);
    });
  }

  setText('contact-heading', pageData.contact.heading);
  setText('contact-description', pageData.contact.description);
  setText('label-name', pageData.contact.form.labels.name);
  setText('label-email', pageData.contact.form.labels.email);
  setText('label-message', pageData.contact.form.labels.message);
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  if (nameInput) nameInput.placeholder = pageData.contact.form.placeholders.name;
  if (emailInput) emailInput.placeholder = pageData.contact.form.placeholders.email;
  if (messageInput) messageInput.placeholder = pageData.contact.form.placeholders.message;
  setText('contact-button', pageData.contact.form.button);
}

function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        event.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function initTheme() {
  const themeButton = document.getElementById('themeButton');
  if (!themeButton) return;
  const savedTheme = localStorage.getItem('duofolioTheme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  themeButton.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('duofolioTheme', isDark ? 'dark' : 'light');
  });
}

function initCurrentDate() {
  const currentDate = document.getElementById('current-date');
  if (!currentDate) return;
  const date = new Date();
  currentDate.textContent = date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

function setupRevealObserver() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (prefersReducedMotion) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

function setupRevealGroups() {
  const groups = document.querySelectorAll('[data-reveal-group]');
  groups.forEach((group) => {
    const children = Array.from(group.children);
    children.forEach((child, index) => {
      child.classList.add('reveal-item');
      child.style.setProperty('--reveal-delay', `${index * 90}ms`);
    });

    if (prefersReducedMotion) {
      children.forEach((child) => child.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    children.forEach((child) => observer.observe(child));
  });
}

function setupParallax() {
  const layers = Array.from(document.querySelectorAll('[data-parallax]'));
  if (!layers.length || prefersReducedMotion) return;

  let ticking = false;
  function update() {
    const viewportH = window.innerHeight;
    layers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.parallax) || 0.2;
      const rect = layer.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - viewportH / 2;
      layer.style.transform = `translate3d(0, ${(-centerOffset * speed).toFixed(2)}px, 0)`;
    });
    ticking = false;
  }
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

function applyTilt(el, maxTilt = 10) {
  el.classList.add('tilt-el');
  function handleMove(event) {
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${(-y * maxTilt).toFixed(2)}deg) rotateY(${(x * maxTilt).toFixed(2)}deg) translateZ(10px)`;
  }
  function reset() {
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  }
  el.addEventListener('mousemove', handleMove);
  el.addEventListener('mouseleave', reset);
}

function setupTilt() {
  if (!hasFinePointer || prefersReducedMotion) return;
  document.querySelectorAll('[data-tilt]').forEach((el) => applyTilt(el, 8));
  document.querySelectorAll('[data-tilt-group]').forEach((group) => {
    Array.from(group.children).forEach((child) => applyTilt(child, 10));
  });
  document.querySelectorAll('.team-card').forEach((card) => applyTilt(card, 10));
}

function setupScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${percent}%`;
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

function setupCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || !hasFinePointer || prefersReducedMotion) {
    if (glow) glow.style.display = 'none';
    return;
  }
  window.addEventListener('mousemove', (event) => {
    glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    glow.classList.add('is-active');
  });
  window.addEventListener('mouseleave', () => glow.classList.remove('is-active'));
}

function setupBackToTop() {
  const button = document.getElementById('backToTop');
  if (!button) return;
  function toggleVisibility() {
    button.classList.toggle('is-visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', toggleVisibility, { passive: true });
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  toggleVisibility();
}

/* CHANGE: Added entirely new function to calculate scroll position and swing the lanyard accordingly */
function initLanyardSwing() {
  const lanyard = document.getElementById('lanyard');
  if (!lanyard || prefersReducedMotion) return;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Calculate a gentle left/right swing using sine wave based on scroll pixels
    const swingAngle = Math.sin(scrollY * 0.005) * 12; 
    lanyard.style.transform = `rotate(${swingAngle}deg)`;
  }, { passive: true });
}

function initImmersiveStatic() {
  setupParallax();
  setupScrollProgress();
  setupCursorGlow();
  setupBackToTop();
  setupRevealObserver();
}

function initImmersiveDynamic() {
  setupRevealGroups();
  setupTilt();
  /* CHANGE: Initializing the new lanyard swing dynamic */
  initLanyardSwing(); 
}

function initLandingIntro() {
  const overlay = document.getElementById('landing-overlay');
  if (!overlay) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('overlay-active');

  let vortex = null;
  if (!prefersReducedMotion) {
    const canvas = document.getElementById('vortex-canvas');
    const ctx = canvas.getContext('2d');
    let width, height, centerX, centerY;
    let particles = [];
    let speedMultiplier = 1;
    let animationFrame;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;
    }

    function createParticles() {
      const count = Math.min(160, Math.floor((width * height) / 9000));
      particles = Array.from({ length: count }, () => {
        const arm = Math.floor(Math.random() * 3);
        return {
          angle: (arm / 3) * Math.PI * 2 + Math.random() * 0.6,
          radius: 40 + Math.random() * Math.max(width, height) * 0.55,
          spin: 0.15 + Math.random() * 0.35,
          size: 1 + Math.random() * 2.2,
          hue: Math.random() < 0.5 ? '202,234,245' : '255,255,255'
        };
      });
    }

    function draw() {
      ctx.fillStyle = 'rgba(10, 14, 40, 0.18)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.angle += 0.006 * p.spin * speedMultiplier;
        p.radius -= 0.18 * speedMultiplier;
        if (p.radius < 10) {
          p.radius = Math.max(width, height) * 0.55;
          p.angle = Math.random() * Math.PI * 2;
        }
        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * p.radius * 0.7;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue}, ${0.55 + Math.random() * 0.3})`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    ctx.fillStyle = 'rgba(10, 14, 40, 1)';
    ctx.fillRect(0, 0, width, height);
    draw();
    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    vortex = {
      setSpeed(multiplier) { speedMultiplier = multiplier; },
      stop() { cancelAnimationFrame(animationFrame); }
    };
  }

  const countdownEl = document.getElementById('countdown');
  const statusEl = document.getElementById('landingStatus');
  const skipBtn = document.getElementById('skipIntro');
  let isDone = false;

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function showIntroText() {
    overlay.querySelectorAll('[data-intro]').forEach((el, i) => {
      setTimeout(() => el.classList.add('shown'), i * 220);
    });
  }

  function renderTick(label) {
    countdownEl.innerHTML = '';
    const span = document.createElement('span');
    span.textContent = label;
    countdownEl.appendChild(span);
  }

  function collapseOverlay() {
    if (isDone) return;
    isDone = true;
    overlay.classList.add('landing-collapsing');
    if (vortex) vortex.setSpeed(9);
    
    /* CHANGE: Extended timeout slightly to allow the smooth CSS opacity dissolve rather than the jarring whiteout */
    setTimeout(() => {
      if (vortex) vortex.stop();
      overlay.remove();
      document.body.classList.remove('overlay-active');
    }, prefersReducedMotion ? 450 : 1200); 
  }

  async function runSequence() {
    showIntroText();
    await wait(1100);
    if (isDone) return;

    statusEl.textContent = 'Entering in';
    statusEl.classList.add('shown');

    const ticks = ['3', '2', '1'];
    for (let i = 0; i < ticks.length; i += 1) {
      if (isDone) return;
      renderTick(ticks[i]);
      if (vortex) vortex.setSpeed(1 + i * 1.4);
      await wait(700);
    }

    if (isDone) return;
    statusEl.textContent = 'Welcome aboard';
    collapseOverlay();
  }

  skipBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    collapseOverlay();
  });
  overlay.addEventListener('click', collapseOverlay);
  document.addEventListener('keydown', function onKey(event) {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') {
      collapseOverlay();
      document.removeEventListener('keydown', onKey);
    }
  });

  if (prefersReducedMotion) {
    showIntroText();
    statusEl.textContent = 'Entering site…';
    statusEl.classList.add('shown');
    setTimeout(collapseOverlay, 1400);
  } else {
    runSequence();
  }
}

function renderPageData(page, data) {
  const pageKey = page === 'i_resume' ? 'cv' : page;
  if (!data || !data[pageKey]) return;
  const pageData = data[pageKey];
  document.title = pageData.title || document.title;
  renderNav(pageData.nav);
  renderFooter(pageData.footer);
  if (pageKey === 'index') renderIndex(pageData);
  else if (pageKey === 'cv') renderResume(pageData);
}

async function getPageData() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`Failed to fetch ${DATA_URL}: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}



/* CHANGE: New comments guestbook. Persists in localStorage so visitors can see each other's notes without a backend. */
function initCommentsGuestbook() {
  const list = document.getElementById('comments-list');
  const form = document.getElementById('add-comment-form');
  const input = document.getElementById('comment-input');
  if (!list || !form || !input) return;

  const STORAGE_KEY = 'isabelle-portfolio-comments';
  const SEED = [
    { name: 'Aria',  text: 'This portfolio feels alive — love the lanyard swing!' },
    { name: 'Ken',   text: 'Beautifully crafted. The intro overlay set the tone.' },
    { name: 'Priya', text: 'Clean code vibes across the whole site. Great work.' }
  ];

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed) && parsed.length) return parsed;
    } catch (e) { /* ignore */ }
    return SEED.slice();
  }
  function save(items) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (e) { /* ignore */ }
  }
  function render(items) {
    list.innerHTML = '';
    items.forEach((c) => {
      const bubble = document.createElement('div');
      bubble.className = 'comment-bubble';
      const author = document.createElement('strong');
      author.className = 'comment-author';
      author.textContent = c.name || 'Visitor';
      const body = document.createElement('p');
      body.textContent = c.text;
      bubble.appendChild(author);
      bubble.appendChild(body);
      list.appendChild(bubble);
    });
    list.scrollTop = list.scrollHeight;
  }

  let items = load();
  render(items);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = (input.value || '').trim();
    if (!text) return;
    const nameEl = document.getElementById('name');
    const name = (nameEl && nameEl.value.trim()) || 'Anonymous';
    items = items.concat([{ name, text }]);
    save(items);
    render(items);
    input.value = '';
  });
}



/* CHANGE: Interactive constellation + magnetic hover for the index #about card.
   Purely presentational: no content changes, just something to play with. */
function initAboutPlayground() {
  const section = document.getElementById('about');
  const canvas = document.getElementById('about-constellation');
  if (!section || !canvas) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, dpr = window.devicePixelRatio || 1;
  let dots = [];
  const mouse = { x: -9999, y: -9999, active: false };
  let sparks = [];

  function accentColor() {
    return document.body.classList.contains('dark-mode')
      ? 'rgba(202,234,245,'
      : 'rgba(9,70,111,';
  }

  function resize() {
    const rect = section.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function seed() {
    const count = Math.max(24, Math.min(60, Math.floor((width * height) / 12000)));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1 + Math.random() * 1.6
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);
    const base = accentColor();

    dots.forEach((d) => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > width) d.vx *= -1;
      if (d.y < 0 || d.y > height) d.vy *= -1;

      // Attract toward cursor gently
      if (mouse.active) {
        const dx = mouse.x - d.x;
        const dy = mouse.y - d.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 160) {
          d.x += (dx / dist) * 0.6;
          d.y += (dy / dist) * 0.6;
        }
      }

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = base + '0.7)';
      ctx.fill();
    });

    // Draw connecting lines
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const a = dots[i], b = dots[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110) {
          ctx.strokeStyle = base + (0.25 * (1 - dist / 110)).toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      // Line to cursor
      if (mouse.active) {
        const dx = dots[i].x - mouse.x;
        const dy = dots[i].y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          ctx.strokeStyle = base + (0.35 * (1 - dist / 140)).toFixed(3) + ')';
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    // Sparks
    sparks = sparks.filter((s) => s.life > 0);
    sparks.forEach((s) => {
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.04;
      s.life -= 1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = base + (s.life / s.max).toFixed(3) + ')';
      ctx.fill();
    });

    requestAnimationFrame(step);
  }

  function pointerMove(e) {
    const rect = section.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  }
  function pointerLeave() { mouse.active = false; mouse.x = -9999; mouse.y = -9999; }

  function burst(x, y) {
    const n = 34;
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n + Math.random() * 0.3;
      const speed = 2 + Math.random() * 3;
      sparks.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        r: 1.5 + Math.random() * 2,
        life: 60,
        max: 60
      });
    }
  }

  // Magnetic paragraphs — text follows cursor slightly
  const magneticHost = section.querySelector('[data-magnetic]');
  if (magneticHost && !reduced) {
    section.addEventListener('mousemove', (e) => {
      const rect = magneticHost.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      magneticHost.style.transform = `translate(${(dx * 8).toFixed(2)}px, ${(dy * 6).toFixed(2)}px)`;
    });
    section.addEventListener('mouseleave', () => {
      magneticHost.style.transform = 'translate(0,0)';
    });
  }

  const burstBtn = document.getElementById('about-burst-btn');
  if (burstBtn) {
    burstBtn.addEventListener('click', (e) => {
      const rect = section.getBoundingClientRect();
      const btnRect = burstBtn.getBoundingClientRect();
      burst(btnRect.left - rect.left + btnRect.width / 2, btnRect.top - rect.top + btnRect.height / 2);
    });
  }
  section.addEventListener('click', (e) => {
    if (e.target.closest('.about-play-btn')) return;
    const rect = section.getBoundingClientRect();
    burst(e.clientX - rect.left, e.clientY - rect.top);
  });

  section.addEventListener('mousemove', pointerMove);
  section.addEventListener('mouseleave', pointerLeave);
  window.addEventListener('resize', resize);
  // Re-measure after paragraphs render
  setTimeout(resize, 100);
  resize();
  if (!reduced) step();
}

async function init() {
  initTheme();
  initSmoothScroll();
  initCurrentDate();
  initImmersiveStatic();
  initLandingIntro();
  const page = document.body.dataset.page;
  if (!page) return;
  const data = await getPageData();
  renderPageData(page, data);
  initImmersiveDynamic();
  /* CHANGE: Wire up the new comments guestbook after render. */
  initCommentsGuestbook();
  /* CHANGE: Wire up the interactive About playground on index.html. */
  initAboutPlayground();
}

document.addEventListener('DOMContentLoaded', init);

