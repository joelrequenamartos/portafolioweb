// ============================================================
// DATOS DEL PORTFOLIO
// Edita este archivo para añadir/quitar proyectos, experiencia
// y skills. No hace falta tocar el HTML.
// Cada texto tiene versión es/en para el selector de idioma.
// ============================================================

const PORTFOLIO_DATA = {
  experience: [
    {
      role: { es: "QA Analyst and Automation Tester", en: "QA Analyst and Automation Tester" },
      company: "Rank Holding",
      period: "Abril 2025 — Presente",
      description: {
        es: "Automatización Front-End con Playwright, Back-End y Data Testing con Python, y pruebas de rendimiento con JMeter, integradas en CI/CD.",
        en: "Front-End automation with Playwright, Back-End and Data Testing with Python, and performance testing with JMeter, integrated into CI/CD."
      }
    },
    {
      role: { es: "QA Tester", en: "QA Tester" },
      company: "Zitro Games",
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
        es: "Framework de pruebas end-to-end para web con Playwright y TypeScript: Page Object Model, reporting y ejecución en CI.",
        en: "End-to-end web testing framework with Playwright and TypeScript: Page Object Model, reporting and CI execution."
      },
      tags: ["Playwright", "TypeScript"],
      status: "wip",
      github: "https://github.com/joelrequenamartos/playwright-ts-e2e/tree/develop",
      demo: ""
    },
    {
      title: { es: "Suite Back-End con Python + pytest", en: "Back-End Suite with Python + pytest" },
      description: {
        es: "Suite de pruebas de back-end en Python puro con pytest: fixtures, mocking y validación de lógica de negocio.",
        en: "Pure Python back-end test suite with pytest: fixtures, mocking and business logic validation."
      },
      tags: ["Python", "pytest"],
      status: "planned",
      github: "",
      demo: ""
    },
    {
      title: { es: "Suite de Testing de APIs", en: "API Testing Suite" },
      description: {
        es: "Suite de pruebas de API REST con validación de contratos, casos negativos e integración en pipeline.",
        en: "REST API test suite with contract validation, negative cases and pipeline integration."
      },
      tags: ["Postman", "REST API"],
      status: "planned",
      github: "",
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
