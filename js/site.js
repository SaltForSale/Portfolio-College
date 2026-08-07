(() => {
  'use strict';

  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];

  const escapeHtml = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const chips = (items) => `<div class="chip-list">${items.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}</div>`;

  const featuredContainer = document.querySelector('#featured-projects');
  if (featuredContainer) {
    const featured = projects.filter((project) => project.category === 'featured').slice(0, 3);
    featuredContainer.innerHTML = featured.map((project, index) => `
      <div class="col-lg-4">
        <a class="featured-project-link" href="projects.html#${encodeURIComponent(project.anchor || '')}" aria-label="Read about ${escapeHtml(project.title)}">
          <article class="featured-project-card" data-index="0${index + 1}">
            <div class="project-card-meta"><span>${escapeHtml(project.type)}</span><span>${escapeHtml(project.year)}</span></div>
            <h3>${escapeHtml(project.title)}</h3>
            <p>${escapeHtml(project.description)}</p>
            ${chips(project.technologies || [])}
            <span class="project-open" aria-hidden="true">↗</span>
          </article>
        </a>
      </div>
    `).join('');
  }

  const archiveContainer = document.querySelector('#project-archive');
  if (archiveContainer) {
    const archive = projects.filter((project) => project.category === 'archive');
    archiveContainer.innerHTML = archive.map((project, index) => `
      <div class="col">
        <a class="archive-link" href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(project.title)}">
          <article class="archive-card">
            <div class="archive-image"><img src="${escapeHtml(project.image)}" alt="Screenshot of ${escapeHtml(project.title)}" loading="lazy" width="900" height="506"></div>
            <div class="archive-body">
              <span class="archive-index">${String(index + 1).padStart(2, '0')}</span>
              <span class="archive-context">${escapeHtml(project.context || 'High school project')}</span>
              <div class="archive-meta"><span>${escapeHtml(project.type)}</span><span>${escapeHtml(project.year)}</span></div>
              <h3>${escapeHtml(project.title)}</h3>
              <p>${escapeHtml(project.description)}</p>
              ${chips(project.technologies || [])}
            </div>
          </article>
        </a>
      </div>
    `).join('');
  }

  const navCollapse = document.querySelector('#mainNav');
  const navToggle = document.querySelector('.menu-toggle');
  if (navCollapse && navToggle) {
    const closeMenu = () => {
      navCollapse.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', () => {
      const willOpen = !navCollapse.classList.contains('show');
      navCollapse.classList.toggle('show', willOpen);
      navToggle.setAttribute('aria-expanded', String(willOpen));
    });

    navCollapse.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) closeMenu();
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992) closeMenu();
    });
  }
})();
