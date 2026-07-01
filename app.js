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

async function init() {
  initTheme();
  initSmoothScroll();
  initCurrentDate();
  const page = document.body.dataset.page;
  if (!page) return;
  const data = await getPageData();
  renderPageData(page, data);
}

document.addEventListener('DOMContentLoaded', init);
