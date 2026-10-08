/* ==========================================================================
   Alex Rivera — Portfolio
   Shared behaviour: rendering, theme, nav, reveal, filtering, form.
   Vanilla JS, no dependencies.
   ========================================================================== */

(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     Utilities
     ---------------------------------------------------------------------- */

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /** Escapes text for safe interpolation into innerHTML. */
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /** Runs fn once the DOM is parsed. */
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  /* ----------------------------------------------------------------------
     Theme — set before paint via the inline <head> snippet; toggled here
     ---------------------------------------------------------------------- */

  const THEME_KEY = "portfolio-theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = $("#theme-toggle");
    if (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
      btn.setAttribute("aria-pressed", String(theme === "dark"));
    }
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  }

  function initTheme() {
    applyTheme(currentTheme());

    const btn = $("#theme-toggle");
    if (!btn) return;

    btn.addEventListener("click", function () {
      const next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (err) {
        /* Storage unavailable (private mode) — theme still applies for this page. */
      }
    });
  }

  /* ----------------------------------------------------------------------
     Navigation — scrolled state, mobile drawer, active link
     ---------------------------------------------------------------------- */

  function initNav() {
    const nav = $("#nav");
    const links = $("#nav-links");
    const toggle = $("#nav-toggle");

    if (!links || !toggle) return;

    const close = () => {
      document.body.classList.remove("nav-open");
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    const open = () => {
      document.body.classList.add("nav-open");
      links.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", function () {
      document.body.classList.contains("nav-open") ? close() : open();
    });

    $$("a", links).forEach(function (a) {
      a.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        close();
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (!document.body.classList.contains("nav-open")) return;
      if (links.contains(e.target) || toggle.contains(e.target)) return;
      close();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 767) close();
    });

    // Hairline appears once the page scrolls
    const onScroll = () => {
      if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /** Marks the nav link matching the current file as active. */
  function markActiveLink() {
    const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    $$(".nav-link").forEach(function (link) {
      const href = (link.getAttribute("href") || "").split("/").pop().toLowerCase();
      if (href === here) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ----------------------------------------------------------------------
     Scroll reveal
     ---------------------------------------------------------------------- */

  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach(function (el) {
      if (el.dataset.revealBound) return;
      el.dataset.revealBound = "true";

      // Stagger by position within its parent group
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"))
        : [];
      const idx = siblings.indexOf(el);
      if (idx > 0) el.style.setProperty("--reveal-delay", idx * 70 + "ms");

      // Never observe an element that has already been revealed
      if (el.classList.contains("is-visible")) return;

      io.observe(el);
    });
  }

  /* ----------------------------------------------------------------------
     Rendering — injects data-driven sections
     ---------------------------------------------------------------------- */

  function renderNavBrand() {
    $$("[data-bind='monogram']").forEach(function (el) {
      el.textContent = PROFILE.monogram;
    });
    $$("[data-bind='name']").forEach(function (el) {
      el.textContent = PROFILE.name;
    });
    $$("[data-bind='email']").forEach(function (el) {
      el.textContent = PROFILE.email;
      if (el.tagName === "A") el.setAttribute("href", "mailto:" + PROFILE.email);
    });
    $$("[data-bind='role']").forEach(function (el) {
      el.textContent = PROFILE.role;
    });
  }

  function projectCardHTML(p, i) {
    const featured = p.featured ? " project-card-featured" : "";
    const tags = p.tags.map((t) => `<li class="tag">${esc(t)}</li>`).join("");
    return `
      <article class="project-card${featured} reveal" data-category="${esc(p.category)}" data-index="${i}">
        <div class="project-thumb">
          ${projectArtwork(p.tint, i + 1)}
          <span class="project-thumb-index">${esc(p.index || String(i + 1).padStart(2, "0"))}</span>
        </div>
        <div class="project-body">
          <div class="project-title-row">
            <h3 class="project-title">${esc(p.title)}</h3>
            <span class="project-arrow">${icon("arrow", 16)}</span>
          </div>
          <p class="project-desc">${esc(p.description)}</p>
          <div class="project-tags">${tags}</div>
          <div class="project-meta">
            <span>${esc(p.role)}</span>
            <span>${esc(p.year)}</span>
          </div>
        </div>
      </article>`;
  }

  function renderFeaturedWork() {
    const grid = $("[data-project-grid='featured']");
    if (!grid) return;
    const picks = PROJECTS.filter((p) => p.featured).slice(0, 3);
    const list = picks.length ? picks : PROJECTS.slice(0, 3);
    grid.innerHTML = list.map(projectCardHTML).join("");
  }

  function renderAllProjects() {
    const grid = $("[data-project-grid='all']");
    if (!grid) return;
    grid.innerHTML = PROJECTS.map(projectCardHTML).join("");
    initReveal();
  }

  function renderStats() {
    const el = $("[data-stats]");
    if (!el) return;
    el.innerHTML = STATS.map(
      (s) => `<div class="stat reveal"><div class="stat-value">${esc(s.value)}</div><div class="stat-label">${esc(s.label)}</div></div>`
    ).join("");
  }

  function renderMarquee() {
    const el = $("[data-marquee]");
    if (!el) return;
    // Duplicated once for a seamless -100% translate loop
    const items = TOOLKIT.map((t) => `<span class="marquee-item">${esc(t)}</span>`).join("");
    el.innerHTML = items + items;
  }

  function renderSkills() {
    const el = $("[data-skills]");
    if (!el) return;
    el.innerHTML = SKILLS.map(
      (s, i) => `
      <div class="skill-card reveal">
        <div class="skill-icon">${icon(s.icon, 18)}</div>
        <div class="skill-name">${esc(s.name)}</div>
        <div class="skill-bar"><div class="skill-fill" data-level="${s.level}" style="transition-delay:${i * 60}ms"></div></div>
        <span class="skill-level">${String(s.level).padStart(2, " ")}% proficiency</span>
      </div>`
    ).join("");
  }

  function renderExperience() {
    const el = $("[data-experience]");
    if (!el) return;
    el.innerHTML = EXPERIENCE.map(
      (e) => `
      <li class="timeline-item reveal">
        <div class="timeline-period">${esc(e.period)}</div>
        <h3 class="timeline-role">${esc(e.role)}</h3>
        <div class="timeline-company">${esc(e.company)}</div>
        <ul class="timeline-list">
          ${e.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}
        </ul>
      </li>`
    ).join("");
  }

  function renderFacts() {
    const el = $("[data-facts]");
    if (!el) return;
    el.innerHTML = PROFILE.facts
      .map(
        (f) =>
          `<li class="fact"><span class="fact-key">${esc(f.key)}</span><span class="fact-value">${esc(f.value)}</span></li>`
      )
      .join("");
  }

  function renderBio() {
    const el = $("[data-bio]");
    if (!el) return;
    el.innerHTML = PROFILE.bio.map((p) => `<p>${p}</p>`).join("");
  }

  function renderPortrait() {
    const el = $("[data-portrait]");
    if (!el) return;
    el.insertAdjacentHTML("afterbegin", portraitArtwork());
  }

  function renderContactMethods() {
    const el = $("[data-contact-methods]");
    if (!el) return;
    const rows = [
      { icon: "mail", label: "Email", value: PROFILE.email, href: "mailto:" + PROFILE.email },
      { icon: "pin", label: "Location", value: PROFILE.location },
      { icon: "clock", label: "Timezone", value: PROFILE.timezone },
      ...PROFILE.socials.slice(0, 2).map((s) => ({ icon: s.icon || s.label.toLowerCase(), label: s.label, value: s.handle, href: s.url }))
    ];
    el.innerHTML = rows
      .map((r) => {
        const inner = `<span class="contact-method-icon">${icon(r.icon, 16)}</span><span><span class="contact-method-label">${esc(r.label)}</span><span class="contact-method-value">${esc(r.value)}</span></span>`;
        return r.href
          ? `<a class="contact-method" href="${esc(r.href)}" target="_blank" rel="noopener noreferrer">${inner}</a>`
          : `<div class="contact-method">${inner}</div>`;
      })
      .join("");
  }

  function renderFooterSocials() {
    const el = $("[data-footer-socials]");
    if (!el) return;
    el.innerHTML = PROFILE.socials
      .map(
        (s) =>
          `<a class="social-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.label)}" title="${esc(s.label)}">${icon(s.icon || s.label.toLowerCase(), 15)}</a>`
      )
      .join("");
  }

  /* ----------------------------------------------------------------------
     Project filtering
     ---------------------------------------------------------------------- */

  function initFilters() {
    const bar = $("[data-filters]");
    const grid = $("[data-project-grid='all']");
    if (!bar || !grid) return;

    const empty = $("[data-filter-empty]");
    const pills = $$(".filter-pill", bar);
    const cards = $$(".project-card", grid);

    function apply(key) {
      let shown = 0;
      cards.forEach(function (card) {
        const match = key === "all" || card.dataset.category === key;
        card.hidden = !match;
        if (match) shown++;
        if (match) {
          // Re-trigger the reveal animation on re-entry
          card.classList.remove("is-visible");
          requestAnimationFrame(function () {
            card.classList.add("is-visible");
          });
        }
      });

      if (empty) empty.hidden = shown !== 0;

      pills.forEach(function (p) {
        const active = p.dataset.filter === key;
        p.classList.toggle("is-active", active);
        p.setAttribute("aria-pressed", String(active));
      });

      // Update the URL without a reload so filters are shareable
      const url = new URL(location.href);
      if (key === "all") url.searchParams.delete("filter");
      else url.searchParams.set("filter", key);
      history.replaceState(null, "", url);
    }

    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        apply(pill.dataset.filter);
      });
    });

    // Restore from ?filter= on load
    const initial = new URL(location.href).searchParams.get("filter");
    if (initial && pills.some((p) => p.dataset.filter === initial)) apply(initial);
    else pills.forEach(function (p) {
      p.classList.toggle("is-active", p.dataset.filter === "all");
      p.setAttribute("aria-pressed", String(p.dataset.filter === "all"));
    });
  }

  /* ----------------------------------------------------------------------
     Skill bars — fill once scrolled into view
     ---------------------------------------------------------------------- */

  function initSkillBars() {
    const fills = $$(".skill-fill");
    if (!fills.length) return;

    function fill() {
      fills.forEach(function (f) {
        f.style.width = f.dataset.level + "%";
      });
    }

    if (!("IntersectionObserver" in window)) return fill();

    const io = new IntersectionObserver(
      function (entries) {
        if (entries.some((e) => e.isIntersecting)) {
          fill();
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(fills[0]);
  }

  /* ----------------------------------------------------------------------
     Card spotlight — tracks cursor for the radial hover glow
     ---------------------------------------------------------------------- */

  function initSpotlight() {
    const cards = $$(".project-card");
    if (!cards.length || window.matchMedia("(hover: none)").matches) return;

    cards.forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
      });
    });
  }

  /* ----------------------------------------------------------------------
     Contact form — validation + simulated submit
     ---------------------------------------------------------------------- */

  function initForm() {
    const form = $("#contact-form");
    if (!form) return;

    const success = $("#form-success");
    const submitBtn = $("#form-submit");

    const rules = {
      name: function (v) {
        if (!v.trim()) return "Please enter your name.";
        if (v.trim().length < 2) return "Name must be at least 2 characters.";
        return "";
      },
      email: function (v) {
        if (!v.trim()) return "Please enter your email.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "Enter a valid email address.";
        return "";
      },
      message: function (v) {
        if (!v.trim()) return "Please add a message.";
        if (v.trim().length < 10) return "Message must be at least 10 characters.";
        return "";
      }
    };

    function showError(field, msg) {
      const wrap = field.closest(".field");
      if (!wrap) return false;
      const errorEl = $(".field-error", wrap);
      if (msg) {
        wrap.classList.add("has-error");
        if (errorEl) errorEl.textContent = msg;
        field.setAttribute("aria-invalid", "true");
        return true;
      }
      wrap.classList.remove("has-error");
      if (errorEl) errorEl.textContent = "";
      field.removeAttribute("aria-invalid");
      return false;
    }

    function validateField(input) {
      const rule = rules[input.name];
      if (!rule) return true;
      return !showError(input, rule(input.value));
    }

    // Validate on blur; clear errors as the user corrects them
    $$("input[name], textarea[name]", form).forEach(function (input) {
      input.addEventListener("blur", function () {
        validateField(input);
      });
      input.addEventListener("input", function () {
        const wrap = input.closest(".field");
        if (wrap && wrap.classList.contains("has-error")) validateField(input);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let ok = true;
      let firstBad = null;
      Object.keys(rules).forEach(function (key) {
        const input = form.elements[key];
        if (!input) return;
        if (!validateField(input)) {
          ok = false;
          if (!firstBad) firstBad = input;
        }
      });

      if (!ok) {
        if (firstBad) firstBad.focus();
        return;
      }

      // No backend configured — simulate the request, then confirm.
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add("is-loading");
        submitBtn.innerHTML = `<span class="spinner"></span> Sending…`;
      }

      const payload = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        subject: (form.elements.subject && form.elements.subject.value.trim()) || "",
        message: form.elements.message.value.trim()
      };

      // eslint-disable-next-line no-console
      console.log("[portfolio] Contact form submission:", payload);

      window.setTimeout(function () {
        form.hidden = true;
        if (success) {
          success.hidden = false;
          success.querySelector("h3").focus();
        }
      }, 900);
    });
  }

  /* ----------------------------------------------------------------------
     Footer year
     ---------------------------------------------------------------------- */

  function initYear() {
    $$("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ----------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */

  ready(function () {
    initTheme();
    markActiveLink();
    renderNavBrand();
    renderStats();
    renderFeaturedWork();
    renderAllProjects();
    renderMarquee();
    renderSkills();
    renderExperience();
    renderPortrait();
    renderFacts();
    renderBio();
    renderContactMethods();
    renderFooterSocials();
    initNav();
    initReveal();
    initFilters();
    initSkillBars();
    initSpotlight();
    initForm();
    initYear();
  });
})();
