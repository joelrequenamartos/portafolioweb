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
      (exp) => `
      <li>
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
    .map((p) => {
      const links = [
        p.github ? `<a href="${p.github}" target="_blank" rel="noopener">${t("projects.code")} ↗</a>` : "",
        p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">${t("projects.demo")} ↗</a>` : ""
      ].join("");
      return `
      <article class="project-row">
        <span class="project-check" aria-hidden="true">✓</span>
        <div>
          <h3>${p.title[currentLang]}</h3>
          <p>${p.description[currentLang]}</p>
          <div class="project-meta">
            <div class="project-tags">${p.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
            <div class="project-links">${links}</div>
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
      (group) => `
      <div class="skill-group">
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
