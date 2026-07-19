// ============================================================
// DATOS DEL PORTFOLIO
// Edita este archivo para añadir/quitar proyectos, experiencia
// y skills. No hace falta tocar el HTML.
// Cada texto tiene versión es/en para el selector de idioma.
// ============================================================

const PORTFOLIO_DATA = {
  experience: [
    {
      role: { es: "QA Automation Engineer", en: "QA Automation Engineer" },
      company: "Empresa Ejemplo",
      period: "2024 — Presente",
      description: {
        es: "Automatización de pruebas E2E y de API, integración en CI/CD.",
        en: "E2E and API test automation, CI/CD integration."
      }
    },
    {
      role: { es: "QA Tester", en: "QA Tester" },
      company: "Otra Empresa",
      period: "2022 — 2024",
      description: {
        es: "Testing manual y funcional, diseño de casos de prueba.",
        en: "Manual and functional testing, test case design."
      }
    }
  ],

  projects: [
    {
      title: { es: "Framework E2E con Playwright", en: "E2E Framework with Playwright" },
      description: {
        es: "Framework de pruebas end-to-end con Playwright y TypeScript: Page Object Model, reporting y ejecución en CI.",
        en: "End-to-end testing framework with Playwright and TypeScript: Page Object Model, reporting and CI execution."
      },
      tags: ["Playwright", "TypeScript", "GitHub Actions"],
      github: "https://github.com/USERNAME/proyecto-1",
      demo: ""
    },
    {
      title: { es: "API Testing con Postman/Newman", en: "API Testing with Postman/Newman" },
      description: {
        es: "Suite de pruebas de API REST con colecciones de Postman ejecutadas en pipeline con Newman.",
        en: "REST API test suite with Postman collections run in a pipeline with Newman."
      },
      tags: ["Postman", "Newman", "REST API"],
      github: "https://github.com/USERNAME/proyecto-2",
      demo: ""
    },
    {
      title: { es: "Automatización con Selenium + Java", en: "Automation with Selenium + Java" },
      description: {
        es: "Proyecto de automatización web con Selenium WebDriver, Java, TestNG y patrón Page Object.",
        en: "Web automation project with Selenium WebDriver, Java, TestNG and the Page Object pattern."
      },
      tags: ["Selenium", "Java", "TestNG"],
      github: "https://github.com/USERNAME/proyecto-3",
      demo: ""
    }
  ],

  skills: [
    {
      group: { es: "Automatización", en: "Automation" },
      items: ["Playwright", "Selenium", "Cypress", "Appium"]
    },
    {
      group: { es: "API Testing", en: "API Testing" },
      items: ["Postman", "REST Assured", "Newman"]
    },
    {
      group: { es: "Lenguajes", en: "Languages" },
      items: ["JavaScript / TypeScript", "Java", "Python", "SQL"]
    },
    {
      group: { es: "CI/CD & Herramientas", en: "CI/CD & Tools" },
      items: ["GitHub Actions", "Jenkins", "Docker", "Jira / Xray", "Git"]
    }
  ]
};
