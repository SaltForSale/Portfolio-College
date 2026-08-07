(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  root.classList.add("motion-ready");

  function makeElement(tag, className, attributes) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    Object.keys(attributes || {}).forEach(function (key) {
      element.setAttribute(key, attributes[key]);
    });
    return element;
  }

  function createPageTransition() {
    var transition = makeElement("div", "page-transition", { "aria-hidden": "true" });
    transition.innerHTML =
      '<div class="page-transition__grid"></div>' +
      '<div class="page-transition__ring"></div>' +
      '<div class="page-transition__label"><span>EL</span><small>DIVE INTO THE WORK</small></div>';
    document.body.prepend(transition);

    if (reduceMotion) {
      transition.classList.add("is-ready");
      return transition;
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        transition.classList.add("is-ready");
      });
    });

    return transition;
  }

  function createScrollProgress() {
    var progress = makeElement("div", "scroll-progress", { "aria-hidden": "true" });
    progress.appendChild(makeElement("span", "scroll-progress__bar"));
    document.body.appendChild(progress);

    var bar = progress.firstElementChild;
    var ticking = false;

    function updateProgress() {
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var percent = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      bar.style.transform = "scaleX(" + percent + ")";
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });

    updateProgress();
  }

  function createAmbientWater() {
    var layer = makeElement("div", "ambient-water", { "aria-hidden": "true" });
    var bubbleCount = window.innerWidth < 768 ? 7 : 14;

    for (var i = 0; i < bubbleCount; i += 1) {
      var bubble = makeElement("span", "ambient-bubble");
      bubble.style.setProperty("--bubble-x", ((i * 37 + 11) % 100) + "%");
      bubble.style.setProperty("--bubble-size", (5 + (i % 5) * 4) + "px");
      bubble.style.setProperty("--bubble-delay", (-1 * (i % 8) * 1.7) + "s");
      bubble.style.setProperty("--bubble-duration", (13 + (i % 6) * 2.25) + "s");
      layer.appendChild(bubble);
    }

    document.body.prepend(layer);
  }

  function createHeroScene(hero, index) {
    var scene = makeElement("div", "p3-scene", { "aria-hidden": "true" });
    scene.innerHTML =
      '<span class="p3-orbit p3-orbit--outer"></span>' +
      '<span class="p3-orbit p3-orbit--middle"></span>' +
      '<span class="p3-orbit p3-orbit--inner"></span>' +
      '<span class="p3-orbit-dot p3-orbit-dot--one"></span>' +
      '<span class="p3-orbit-dot p3-orbit-dot--two"></span>' +
      '<span class="p3-shard p3-shard--one"></span>' +
      '<span class="p3-shard p3-shard--two"></span>' +
      '<span class="p3-shard p3-shard--three"></span>' +
      '<span class="p3-wave p3-wave--one"></span>' +
      '<span class="p3-wave p3-wave--two"></span>' +
      '<span class="p3-wave p3-wave--three"></span>' +
      '<span class="p3-crosshair"><i></i><i></i></span>' +
      '<span class="p3-interface-tag">' + (index === 0 ? "PORTFOLIO // 2026" : "SECTION // 0" + (index + 1)) + '</span>';
    hero.prepend(scene);
  }

  function setupHeroScenes() {
    document.querySelectorAll(".hero, .page-hero").forEach(createHeroScene);
  }

  function setupRevealAnimations() {
    var selectors = [
      ".hero .eyebrow",
      ".hero .display-title",
      ".hero .hero-lead",
      ".hero .btn",
      ".hero-panel",
      ".page-hero .section-kicker",
      ".page-hero .page-title",
      ".page-hero .page-lead",
      ".section-block .section-kicker",
      ".section-block .section-title",
      ".section-block .section-intro",
      ".experience-card",
      ".project-card",
      ".featured-project",
      ".surface-card",
      ".timeline-item",
      ".contact-card",
      ".profile-photo-wrap",
      ".bio-copy",
      ".cta-panel"
    ].join(",");

    var nodes = Array.prototype.slice.call(document.querySelectorAll(selectors));
    nodes.forEach(function (node, index) {
      node.classList.add("reveal-item");
      node.style.setProperty("--reveal-delay", ((index % 5) * 70) + "ms");
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach(function (node) { node.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    nodes.forEach(function (node) { observer.observe(node); });
  }

  function setupParallax() {
    if (reduceMotion || !finePointer) return;

    document.querySelectorAll(".hero, .page-hero").forEach(function (hero) {
      var frame = null;

      hero.addEventListener("pointermove", function (event) {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(function () {
          var rect = hero.getBoundingClientRect();
          var x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
          var y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
          hero.style.setProperty("--pointer-x", x.toFixed(3));
          hero.style.setProperty("--pointer-y", y.toFixed(3));
        });
      });

      hero.addEventListener("pointerleave", function () {
        hero.style.setProperty("--pointer-x", "0");
        hero.style.setProperty("--pointer-y", "0");
      });
    });
  }

  function setupCardTilt() {
    if (reduceMotion || !finePointer) return;

    var cards = document.querySelectorAll(".experience-card, .project-card, .featured-project, .contact-card, .info-card");
    cards.forEach(function (card) {
      card.classList.add("tilt-card");

      card.addEventListener("pointermove", function (event) {
        var rect = card.getBoundingClientRect();
        var px = (event.clientX - rect.left) / rect.width;
        var py = (event.clientY - rect.top) / rect.height;
        var rotateY = (px - 0.5) * 5;
        var rotateX = (0.5 - py) * 4;
        card.style.setProperty("--tilt-x", rotateX.toFixed(2) + "deg");
        card.style.setProperty("--tilt-y", rotateY.toFixed(2) + "deg");
        card.style.setProperty("--glow-x", (px * 100).toFixed(1) + "%");
        card.style.setProperty("--glow-y", (py * 100).toFixed(1) + "%");
      });

      card.addEventListener("pointerleave", function () {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--glow-x", "50%");
        card.style.setProperty("--glow-y", "50%");
      });
    });
  }

  function setupButtonRipples() {
    if (reduceMotion) return;

    document.querySelectorAll(".btn, .contact-card").forEach(function (target) {
      target.addEventListener("pointerdown", function (event) {
        var rect = target.getBoundingClientRect();
        var ripple = makeElement("span", "ui-ripple", { "aria-hidden": "true" });
        ripple.style.left = (event.clientX - rect.left) + "px";
        ripple.style.top = (event.clientY - rect.top) + "px";
        target.appendChild(ripple);
        window.setTimeout(function () { ripple.remove(); }, 650);
      });
    });
  }

  function setupPageTransitions(transition) {
    if (!transition || reduceMotion) return;

    document.addEventListener("click", function (event) {
      var link = event.target.closest("a[href]");
      if (!link) return;
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target === "_blank" || link.hasAttribute("download")) return;
      if (link.protocol === "mailto:" || link.protocol === "tel:") return;

      var destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname === window.location.pathname && destination.hash) return;

      event.preventDefault();
      transition.classList.remove("is-ready");
      transition.classList.add("is-leaving");
      window.setTimeout(function () {
        window.location.href = destination.href;
      }, 430);
    });

    window.addEventListener("pageshow", function () {
      transition.classList.remove("is-leaving");
      requestAnimationFrame(function () { transition.classList.add("is-ready"); });
    });
  }

  function setupNavbarMotion() {
    var navbar = document.querySelector(".site-navbar");
    if (!navbar) return;

    var lastY = window.scrollY;
    var ticking = false;

    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var currentY = window.scrollY;
        navbar.classList.toggle("is-scrolled", currentY > 20);
        navbar.classList.toggle("is-hidden", currentY > lastY && currentY > 160);
        if (Math.abs(currentY - lastY) > 6) lastY = currentY;
        ticking = false;
      });
    }, { passive: true });
  }

  function setupMobileNav() {
    var collapseElement = document.getElementById("siteNav");
    if (!collapseElement || typeof bootstrap === "undefined") return;

    document.querySelectorAll("#siteNav .nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 992 && collapseElement.classList.contains("show")) {
          bootstrap.Collapse.getOrCreateInstance(collapseElement).hide();
        }
      });
    });
  }

  var transition = createPageTransition();
  createAmbientWater();

  document.addEventListener("DOMContentLoaded", function () {
    createScrollProgress();
    setupHeroScenes();
    setupRevealAnimations();
    setupParallax();
    setupCardTilt();
    setupButtonRipples();
    setupPageTransitions(transition);
    setupNavbarMotion();
    setupMobileNav();
  });
})();
