// localStorage lanza en modo privado o con cookies bloqueadas: nunca debe romper la página
const store = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* sin persistencia */ }
  }
};

// Sin preferencia guardada, se usa el idioma del navegador (español y cooficiales → es)
const browserLang = /^(es|ca|gl|eu)\b/i.test(navigator.language || "") ? "es" : "en";
let currentLang = store.get("lang") || browserLang;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function t(key) {
  return TRANSLATIONS[currentLang][key] || key;
}

// Los datos aceptan texto plano o un objeto { es, en }
const tr = (value) => (typeof value === "string" ? value : value[currentLang]);

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nLabel));
  });
  document.documentElement.lang = currentLang;
  document.querySelector('meta[name="description"]').content = t("meta.description");
  document.getElementById("lang-toggle").textContent = currentLang === "es" ? "EN" : "ES";
}

function renderExperience() {
  const list = document.getElementById("experience-list");
  list.innerHTML = PORTFOLIO_DATA.experience
    .map(
      (exp, i) => `
      <li class="reveal-item" style="--i: ${i}">
        <div class="exp-head">
          <h4 class="exp-role">${tr(exp.role)} · <span class="exp-company">${exp.company}</span></h4>
          <span class="exp-period">${tr(exp.period)}</span>
        </div>
        <p class="exp-desc">${tr(exp.description)}</p>
      </li>`
    )
    .join("");
}

// Mismo trazo que el favicon: el check se dibuja al revelarse la sección
const PROJECT_ICONS = {
  done: '<svg viewBox="0 0 24 24"><path pathLength="1" d="M5 12.5l4.5 4.5L19 7.5" /></svg>',
  wip: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" /></svg>',
  planned: "···"
};

const projectStatus = (p) => p.status || "done";

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = PORTFOLIO_DATA.projects
    .map((p, i) => {
      const status = projectStatus(p);
      const isPlanned = status === "planned";
      const url = !isPlanned && (p.github || p.demo);
      const title = url
        ? `<a href="${url}" target="_blank" rel="noopener" class="project-link">${tr(p.title)}</a>`
        : tr(p.title);

      const links = isPlanned
        ? ""
        : [
            p.github ? `<a href="${p.github}" target="_blank" rel="noopener">${t("projects.code")} ↗</a>` : "",
            p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">${t("projects.demo")} ↗</a>` : ""
          ].join("");

      const statusLabel = { wip: t("projects.wip.label"), planned: t("projects.planned") }[status];

      return `
      <article class="project-row reveal-item is-${status}" style="--i: ${i}">
        <span class="project-check" aria-hidden="true">${PROJECT_ICONS[status]}</span>
        <div>
          <h3>${title}</h3>
          ${statusLabel ? `<span class="project-status mono">${statusLabel}</span>` : ""}
          <p>${tr(p.description)}</p>
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
        <h3>${tr(group.group)}</h3>
        <ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>`
    )
    .join("");
  grid.querySelectorAll(".skill-group").forEach(enableTilt);
}

// Resumen de cada sección calculado a partir de data.js, con el vocabulario de un reporter
function renderSectionStatuses() {
  const count = (status) => PORTFOLIO_DATA.projects.filter((p) => projectStatus(p) === status).length;
  const projectParts = [`${count("done")} passed`];
  if (count("wip")) projectParts.push(`${count("wip")} running`);
  if (count("planned")) projectParts.push(`${count("planned")} skipped`);
  const skillCount = PORTFOLIO_DATA.skills.reduce((n, group) => n + group.items.length, 0);

  const detail = (text) => ` <span class="status-detail">— ${text}</span>`;
  document.querySelector('[data-status="projects"]').innerHTML = `✓ PASS${detail(projectParts.join(" · "))}`;
  document.querySelector('[data-status="skills"]').innerHTML = `✓ PASS${detail(`${skillCount} passed`)}`;
}

function render() {
  applyTranslations();
  renderExperience();
  renderProjects();
  renderSkills();
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  const swap = () => {
    currentLang = currentLang === "es" ? "en" : "es";
    store.set("lang", currentLang);
    render();
  };
  // Fundido entre idiomas donde el navegador lo soporte
  if (document.startViewTransition && !reducedMotion) document.startViewTransition(swap);
  else swap();
});

// Menú móvil
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const setMenu = (open) => {
  navLinks.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
};
menuToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navLinks.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav")) setMenu(false);
});

// ============================================================
// Ejecución de tests: cada sección pasa al llegar a ella.
// Contacto falla (missing_contact) hasta que el visitante usa
// un medio de contacto; entonces pasa "en el reintento".
// ============================================================
const RUN_ORDER = ["about", "projects", "skills", "contact"];
const RUN_ICONS = { pending: "○", passed: "✓", failed: "✗" };
const runState = Object.fromEntries(RUN_ORDER.map((id) => [id, "pending"]));
const runStartedAt = performance.now();
let runDuration = null;
let contacted = false;

const runner = document.getElementById("runner");
const runnerSummary = document.getElementById("runner-summary");
const progressBar = document.getElementById("scroll-progress");

function formatDuration(ms) {
  const s = Math.round(ms / 1000);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

function renderRunner() {
  runner.querySelectorAll("[data-run]").forEach((link) => {
    const state = runState[link.dataset.run];
    link.dataset.state = state;
    link.querySelector(".runner-icon").textContent = RUN_ICONS[state];
  });

  const count = (state) => RUN_ORDER.filter((id) => runState[id] === state).length;
  const passed = count("passed");
  const failed = count("failed");
  const pending = count("pending");

  if (pending === RUN_ORDER.length) {
    runnerSummary.textContent = `Running ${RUN_ORDER.length} tests…`;
  } else if (passed === RUN_ORDER.length) {
    runnerSummary.innerHTML = `<span class="is-pass">${passed} passed</span> (${formatDuration(runDuration)})`;
  } else {
    runnerSummary.innerHTML = [
      passed && `<span class="is-pass">${passed} passed</span>`,
      failed && `<span class="is-fail">${failed} failed</span>`,
      pending && `${pending} pending`
    ]
      .filter(Boolean)
      .join(" · ");
  }

  progressBar.classList.toggle("has-failure", failed > 0);
}

function setRunState(id, state) {
  if (runState[id] === state || runState[id] === "passed") return;
  runState[id] = state;
  renderRunner();
}

// Los tests corren en orden: llegar a una sección da por ejecutadas las anteriores,
// aunque se hayan saltado (arrastrando la barra de scroll, tecla Fin…)
function markSectionRun(id) {
  RUN_ORDER.slice(0, RUN_ORDER.indexOf(id) + 1).forEach((runId) => {
    setRunState(runId, runId === "contact" && !contacted ? "failed" : "passed");
  });
}

function passContact() {
  if (contacted) return;
  contacted = true;
  runDuration = performance.now() - runStartedAt;

  const status = document.querySelector('[data-status="contact"]');
  status.classList.remove("status-fail");
  status.classList.add("is-flipped");
  status.innerHTML = '✓ PASS <span class="status-detail">— retry #1</span>';
  document.querySelector(".contact-card").classList.add("is-passed");
  setRunState("contact", "passed");
}

document.querySelectorAll("[data-contact]").forEach((link) => {
  link.addEventListener("click", passContact);
  link.addEventListener("auxclick", passContact);
});

// Copiar el correo, para quien no tenga cliente de correo configurado
const copyBtn = document.getElementById("copy-email");
const emailLink = document.getElementById("contact-email");
let copyTimer;
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(emailLink.textContent.trim());
    copyBtn.textContent = t("contact.copied");
    copyBtn.classList.add("is-done");
    passContact();
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copyBtn.textContent = t("contact.copy");
      copyBtn.classList.remove("is-done");
    }, 2200);
  } catch {
    // Sin acceso al portapapeles (p. ej. file://): se selecciona el correo para copiarlo a mano
    const range = document.createRange();
    range.selectNodeContents(emailLink);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
});

renderSectionStatuses();
render();
renderRunner();

// Revelado al hacer scroll; revelar una sección es "ejecutar" su test
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
      if (entry.target.id in runState) markSectionRun(entry.target.id);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Sección actual: resalta el enlace en la cabecera y en el panel de tests
const hero = document.getElementById("top");
const spyLinks = [...document.querySelectorAll(".nav-links a, .runner-list a")];
const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const href = `#${entry.target.id}`;
      spyLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === href;
        link.classList.toggle("is-current", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
[hero, ...document.querySelectorAll("main .section")].forEach((el) => spyObserver.observe(el));

// El panel de tests aparece cuando el hero deja de ocupar la pantalla
new IntersectionObserver(
  ([entry]) => document.body.classList.toggle("is-running", entry.intersectionRatio < 0.5),
  { threshold: 0.5 }
).observe(hero);

// Barra de progreso de scroll (roja mientras haya un test fallando)
let progressQueued = false;
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.transform = `scaleX(${ratio})`;
  progressQueued = false;
};
window.addEventListener(
  "scroll",
  () => {
    if (progressQueued) return;
    progressQueued = true;
    requestAnimationFrame(updateProgress);
  },
  { passive: true }
);
updateProgress();

// Aserción del hero, en efecto máquina de escribir
const ASSERTION_TEXT = "expect(software).toShipWithConfidence()";
const ASSERTION_HTML =
  '<span class="tok-fn">expect</span>(<span class="tok-arg">software</span>).<span class="tok-fn">toShipWithConfidence</span>()';
const ASSERTION_STATUS = " // ✓ PASS";

function typeAssertion() {
  const typedEl = document.getElementById("assertion-typed");
  const statusEl = document.getElementById("assertion-status");
  const caretEl = document.querySelector(".caret");

  const finish = () => {
    typedEl.innerHTML = ASSERTION_HTML;
    caretEl.classList.add("is-done");
    statusEl.textContent = ASSERTION_STATUS;
    statusEl.classList.add("is-shown");
  };

  if (reducedMotion) return finish();

  let i = 0;
  const tick = () => {
    if (i > ASSERTION_TEXT.length) return finish();
    typedEl.textContent = ASSERTION_TEXT.slice(0, i++);
    setTimeout(tick, 32);
  };
  setTimeout(tick, 400);
}
typeAssertion();

// Tirón magnético en botones (solo con ratón)
if (!reducedMotion && finePointer) {
  document.querySelectorAll(".btn").forEach((btn) => {
    const strength = 0.35;

    btn.addEventListener("pointermove", (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });
}

// Tilt 3D siguiendo al puntero. Las tarjetas de skills se vuelven a pintar al
// cambiar de idioma, así que se engancha a cada tarjeta nueva desde renderSkills.
function enableTilt(card) {
  if (reducedMotion || !finePointer || card.dataset.tilt) return;
  card.dataset.tilt = "on";
  const maxTilt = 8; // grados

  card.addEventListener("pointermove", (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - py) * maxTilt * 2;

    card.classList.add("is-tilted");
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.setProperty("--glare-x", `${px * 100}%`);
    card.style.setProperty("--glare-y", `${py * 100}%`);
  });

  card.addEventListener("pointerleave", () => {
    card.classList.remove("is-tilted");
    card.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
  });
}
enableTilt(document.querySelector(".contact-card"));
