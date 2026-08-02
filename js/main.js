let currentLang = localStorage.getItem("lang") || "es";

function t(key) {
  return TRANSLATIONS[currentLang][key] || key;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18n);
  });
  document.documentElement.lang = currentLang;
  document.getElementById("lang-toggle").textContent =
    currentLang === "es" ? "EN" : "ES";
}

function renderExperience() {
  const list = document.getElementById("experience-list");
  list.innerHTML = PORTFOLIO_DATA.experience
    .map(
      (exp, i) => `
      <li class="reveal-item" style="--i: ${i}">
        <div class="exp-role">${exp.role[currentLang]} · <span class="exp-company">${exp.company}</span></div>
        <div class="exp-period">${exp.period}</div>
        <div>${exp.description[currentLang]}</div>
      </li>`
    )
    .join("");
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = PORTFOLIO_DATA.projects
    .map((p, i) => {
      const isWip = p.status === "wip";
      const isPlanned = p.status === "planned";
      const codeLabel = `${t("projects.code")} ↗`;

      let links = "";
      if (isWip) {
        links = `<span class="project-wip mono">${
          p.github ? `<a href="${p.github}" target="_blank" rel="noopener">${codeLabel}</a>` : codeLabel
        } <span class="project-wip-tag">${t("projects.wip")}</span></span>`;
      } else if (!isPlanned) {
        links = [
          p.github ? `<a href="${p.github}" target="_blank" rel="noopener">${codeLabel}</a>` : "",
          p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">${t("projects.demo")} ↗</a>` : ""
        ].join("");
      }

      const icon = isPlanned ? "···" : isWip ? "○" : "✓";
      const statusLabel = isPlanned ? t("projects.planned") : isWip ? t("projects.wip.label") : "";

      return `
      <article class="project-row reveal-item${isPlanned ? " is-planned" : ""}" style="--i: ${i}">
        <span class="project-check${isWip ? " is-wip" : ""}${isPlanned ? " is-planned" : ""}" aria-hidden="true">${icon}</span>
        <div>
          <h3>${p.title[currentLang]}</h3>
          ${statusLabel ? `<span class="project-status mono${isPlanned ? " is-planned" : ""}">${statusLabel}</span>` : ""}
          <p>${p.description[currentLang]}</p>
          <div class="project-meta">
            <div class="project-tags">${p.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
            ${links ? `<div class="project-links">${links}</div>` : ""}
          </div>
        </div>
      </article>`;
    })
    .join("");
}

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  grid.innerHTML = PORTFOLIO_DATA.skills
    .map(
      (group, i) => `
      <div class="skill-group reveal-item" style="--i: ${i}">
        <h3>${group.group[currentLang]}</h3>
        <ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>`
    )
    .join("");
}

function render() {
  applyTranslations();
  renderExperience();
  renderProjects();
  renderSkills();
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  currentLang = currentLang === "es" ? "en" : "es";
  localStorage.setItem("lang", currentLang);
  render();
});

// Menú móvil
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") navLinks.classList.remove("open");
});

render();

// Revelado al hacer scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Tilt 3D en las tarjetas de skills, siguiendo al puntero
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Barra de progreso de scroll
const progressBar = document.getElementById("scroll-progress");
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${pct}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// Aserción del hero, en efecto máquina de escribir
const ASSERTION_ES = { text: 'expect(software).toShipWithConfidence()', status: " // ✓ PASS" };
const ASSERTION_EN = { text: 'expect(software).toShipWithConfidence()', status: " // ✓ PASS" };

function typeAssertion() {
  const typedEl = document.getElementById("assertion-typed");
  const statusEl = document.getElementById("assertion-status");
  const caretEl = document.querySelector(".caret");
  const { text, status } = currentLang === "es" ? ASSERTION_ES : ASSERTION_EN;

  if (reducedMotion) {
    typedEl.innerHTML =
      '<span class="tok-fn">expect</span>(<span class="tok-arg">software</span>).<span class="tok-fn">toShipWithConfidence</span>()';
    statusEl.textContent = status;
    statusEl.classList.add("is-shown");
    caretEl.classList.add("is-done");
    return;
  }

  typedEl.textContent = "";
  statusEl.textContent = "";
  statusEl.classList.remove("is-shown");
  caretEl.classList.remove("is-done");

  let i = 0;
  const speed = 32;
  const tick = () => {
    if (i <= text.length) {
      typedEl.textContent = text.slice(0, i);
      i++;
      setTimeout(tick, speed);
    } else {
      typedEl.innerHTML =
        '<span class="tok-fn">expect</span>(<span class="tok-arg">software</span>).<span class="tok-fn">toShipWithConfidence</span>()';
      caretEl.classList.add("is-done");
      statusEl.textContent = status;
      statusEl.classList.add("is-shown");
    }
  };
  setTimeout(tick, 400);
}
typeAssertion();

// Tirón magnético en botones
if (!reducedMotion) {
  document.querySelectorAll(".btn").forEach((btn) => {
    const strength = 0.35;

    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
    };

    const onLeave = () => {
      btn.style.transform = "translate(0, 0)";
    };

    btn.addEventListener("pointermove", onMove);
    btn.addEventListener("pointerleave", onLeave);
  });
}

if (!reducedMotion) {
  document.querySelectorAll(".skill-group, .contact-card").forEach((card) => {
    const maxTilt = 8; // grados

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - py) * maxTilt * 2;

      card.classList.add("is-tilted");
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      card.style.setProperty("--glare-x", `${px * 100}%`);
      card.style.setProperty("--glare-y", `${py * 100}%`);
    };

    const onLeave = () => {
      card.classList.remove("is-tilted");
      card.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
  });
}
