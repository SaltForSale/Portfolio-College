(function () {
  "use strict";

  var portfolioProjects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderProjectCard(project, index) {
    var technologies = (project.technologies || [])
      .map(function (technology) {
        return '<span class="badge-soft">' + escapeHtml(technology) + "</span>";
      })
      .join("");

    var image = project.image
      ? '<img class="project-image" src="' + escapeHtml(project.image) + '" alt="Screenshot of ' + escapeHtml(project.title) + '" loading="lazy">'
      : "";

    var link = project.url
      ? '<a class="project-link stretched-link" href="' + escapeHtml(project.url) + '" target="_blank" rel="noopener noreferrer">View project <span aria-hidden="true">↗</span></a>'
      : '<span class="project-link text-secondary">' + escapeHtml(project.status || "Project overview") + "</span>";

    var projectNumber = String(index + 1).padStart(2, "0");

    return (
      '<article class="project-card position-relative" data-index="' + projectNumber + '">' +
      image +
      '<div class="project-card-body"><span class="project-number" aria-hidden="true">' + projectNumber + "</span>" +
      '<div class="project-meta"><span>' + escapeHtml(project.type || "Project") + "</span><span>•</span><span>" + escapeHtml(project.year || "") + "</span></div>" +
      "<h3>" + escapeHtml(project.title) + "</h3>" +
      "<p>" + escapeHtml(project.description) + "</p>" +
      '<div class="tech-list mb-3">' + technologies + "</div>" +
      link +
      "</div></article>"
    );
  }

  function loadProjects(containerId, category, limit) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var projects = portfolioProjects.filter(function (project) {
      return project.category === category;
    });

    if (limit) projects = projects.slice(0, limit);

    container.innerHTML = projects
      .map(function (project, index) {
        return '<div class="col">' + renderProjectCard(project, index) + "</div>";
      })
      .join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-current-year]").forEach(function (node) {
      node.textContent = new Date().getFullYear();
    });

    loadProjects("featured-projects", "featured", 3);
    loadProjects("project-archive", "archive");
  });
})();
