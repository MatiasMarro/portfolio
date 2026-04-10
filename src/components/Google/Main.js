import React, { useState } from 'react';
import styled from 'styled-components';

function Main({ onSearch, className }) {
  const [value, setValue] = useState('');
  const [activeSection, setActiveSection] = useState('about');

  function onChange(e) {
    setValue(e.target.value);
  }
  function onClick() {
    if (value.trim()) onSearch(value);
  }
  function onKeyDown(e) {
    if (e.key !== 'Enter') return;
    if (value.trim()) onSearch(value);
  }

  const skills = [
    'JavaScript', 'React', 'Node.js', 'Angular', 'TypeScript',
    'C#', 'ElectronJS', 'Python', 'C', 'CSS', 'TensorFlow', 'Keras', 'OpenCV',
  ];

  const experience = [
    {
      company: 'Leistung Ingeniería SRL',
      role: 'Freelance Full Stack Developer',
      period: 'Sept 2024 – Actualidad',
      location: 'Córdoba, Argentina',
      items: [
        'Desarrollo web con Angular, TypeScript y C#',
        'Implementación de diseños basados en Figma',
        'Gestión de proyectos con Jira',
      ],
    },
    {
      company: 'FK TECH SRL',
      role: 'Software Engineer',
      period: 'Mar 2022 – Sept 2024',
      location: 'Córdoba, Argentina',
      items: [
        'Backend para sistemas POS (Point Of Sales)',
        'APIs en múltiples lenguajes y plataformas',
        'JavaScript, C, ElectronJS, Node.js, React, CSS',
        'Soporte técnico y resolución de incidencias',
      ],
    },
    {
      company: 'M&M Digital Factory',
      role: 'Diseño y Carpintería',
      period: 'Ene 2015 – Mar 2022',
      location: 'Luque, Córdoba',
      items: [
        'Diseño de muebles con software CAD Fusion 360',
        'Operación de máquinas CNC',
      ],
    },
  ];

  const projects = [
    {
      name: 'Reconocimiento facial LFW: MLP vs CNN',
      context: 'Deep Learning — UTN UBA',
      tech: 'TensorFlow · Keras · NumPy · Pandas · Matplotlib',
      desc: 'Implementación y comparación de MLP vs CNN para reconocimiento facial sobre el dataset Labeled Faces in the Wild.',
    },
    {
      name: 'OpenCV — Visión por Computadora',
      context: 'UTN FRC',
      tech: 'Python · OpenCV · CNN',
      desc: 'Reconocimiento y clasificación de imágenes con redes neuronales convolucionales.',
    },
    {
      name: 'Monitor de Recuento de Carnes',
      context: "McDonald's — FKTECH SRL",
      tech: 'ElectronJS · Node.js · XML · USB',
      desc: 'App para contar productos basados en pedidos de POS con lectura de puertos USB.',
    },
    {
      name: 'Monitor de Pedidos de Delivery',
      context: "McDonald's — FKTECH SRL",
      tech: 'ElectronJS · DLL · COM',
      desc: 'App para monitorear y gestionar pedidos de delivery con integración de dispositivos externos.',
    },
    {
      name: 'Foreign Entry Order',
      context: "McDonald's — FKTECH SRL",
      tech: 'Windows Forms',
      desc: 'Interfaz visual para emular ventas externas en una POS.',
    },
  ];

  const sections = ['about', 'experience', 'projects', 'skills'];

  return (
    <div className={className}>
      <header>
        <div className="header-name">Matias Marro</div>
        <nav className="header-nav">
          {sections.map(s => (
            <button
              key={s}
              className={`nav-btn ${activeSection === s ? 'active' : ''}`}
              onClick={() => setActiveSection(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </nav>
        <a className="contact-btn" href="mailto:m.m.caseros.386@gmail.com">
          Contact
        </a>
      </header>

      <div className="body-scroll">
        {activeSection === 'about' && (
          <section className="section hero-section">
            <h1 className="hero-name">Matias Marro</h1>
            <h2 className="hero-role">Full Stack Developer · Software Engineer</h2>
            <p className="hero-bio">
              Developer con experiencia en sistemas POS, APIs, y proyectos de AI/ML.
              Actualmente trabajando con Angular, TypeScript &amp; C# en Córdoba, Argentina.
              Inglés avanzado · Aprendizaje rápido de nuevas tecnologías.
            </p>
            <div className="hero-links">
              <a
                href="https://github.com/MatiasMarro"
                target="_blank"
                rel="noreferrer"
                className="hero-link"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/matias-marro-30344b194/"
                target="_blank"
                rel="noreferrer"
                className="hero-link"
              >
                LinkedIn
              </a>
              <a href="mailto:m.m.caseros.386@gmail.com" className="hero-link">
                Email
              </a>
              <a
                href="https://MMportafolioweb.com"
                target="_blank"
                rel="noreferrer"
                className="hero-link"
              >
                Portfolio
              </a>
            </div>
            <div className="search-area">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Buscar en Google..."
                  onChange={onChange}
                  value={value}
                  onKeyDown={onKeyDown}
                />
              </div>
              <button className="search-btn" onClick={onClick}>
                Google Search
              </button>
            </div>
          </section>
        )}

        {activeSection === 'experience' && (
          <section className="section">
            <h2 className="section-title">Experiencia Profesional</h2>
            {experience.map((exp, i) => (
              <div className="exp-card" key={i}>
                <div className="exp-header">
                  <div>
                    <div className="exp-company">{exp.company}</div>
                    <div className="exp-role">{exp.role}</div>
                  </div>
                  <div className="exp-meta">
                    <div className="exp-period">{exp.period}</div>
                    <div className="exp-location">{exp.location}</div>
                  </div>
                </div>
                <ul className="exp-items">
                  {exp.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {activeSection === 'projects' && (
          <section className="section">
            <h2 className="section-title">Proyectos</h2>
            <div className="projects-grid">
              {projects.map((proj, i) => (
                <div className="proj-card" key={i}>
                  <div className="proj-name">{proj.name}</div>
                  <div className="proj-context">{proj.context}</div>
                  <div className="proj-tech">{proj.tech}</div>
                  <p className="proj-desc">{proj.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'skills' && (
          <section className="section">
            <h2 className="section-title">Stack Técnico</h2>
            <div className="skills-grid">
              {skills.map(skill => (
                <div className="skill-chip" key={skill}>
                  {skill}
                </div>
              ))}
            </div>
            <h2 className="section-title" style={{ marginTop: '28px' }}>
              Educación
            </h2>
            <div className="exp-card">
              <div className="exp-header">
                <div>
                  <div className="exp-company">Ingeniería Electrónica</div>
                  <div className="exp-role">Universidad Tecnológica Nacional — Córdoba</div>
                </div>
                <div className="exp-meta">
                  <div className="exp-period">2016 – Actualidad</div>
                </div>
              </div>
            </div>
            <div className="exp-card">
              <div className="exp-header">
                <div>
                  <div className="exp-company">Bachiller en Economía y Gestión</div>
                  <div className="exp-role">Inst. Sec. Dr. Raúl Loza Luque</div>
                </div>
                <div className="exp-meta">
                  <div className="exp-period">2010 – 2015</div>
                </div>
              </div>
            </div>
            <h2 className="section-title" style={{ marginTop: '28px' }}>
              Habilidades
            </h2>
            <div className="exp-card">
              <ul className="exp-items">
                <li>Análisis de requerimientos y estimación de tiempos de desarrollo</li>
                <li>Uso de Jira y Confluence para seguimiento y documentación</li>
                <li>Inglés avanzado — comunicación efectiva en entornos internacionales</li>
                <li>Adaptabilidad a diferentes entornos y tecnologías</li>
              </ul>
            </div>
          </section>
        )}
      </div>

      <footer>
        <span>Córdoba, Argentina · m.m.caseros.386@gmail.com · +54-3573-495499</span>
        <span>© 2025 Matias Marro</span>
      </footer>
    </div>
  );
}

export default styled(Main)`
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  overflow: hidden;

  header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 48px;
    border-bottom: 1px solid #e0e0e0;
    background: #fff;
    flex-shrink: 0;
    gap: 8px;
  }

  .header-name {
    font-size: 16px;
    font-weight: 700;
    color: #1a1a2e;
    margin-right: 12px;
    white-space: nowrap;
  }

  .header-nav {
    display: flex;
    gap: 2px;
    flex: 1;
  }

  .nav-btn {
    background: none;
    border: none;
    padding: 6px 12px;
    font-size: 13px;
    cursor: pointer;
    color: #555;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    &:hover {
      background: #f0f0f0;
      color: #222;
    }
    &.active {
      color: #1a73e8;
      font-weight: 700;
      border-bottom: 2px solid #1a73e8;
      border-radius: 0;
    }
  }

  .contact-btn {
    font-size: 12px;
    color: #fff;
    background: #1a73e8;
    padding: 5px 14px;
    border-radius: 4px;
    text-decoration: none;
    white-space: nowrap;
    &:hover {
      background: #1558b0;
    }
  }

  .body-scroll {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .section {
    max-width: 720px;
    margin: 0 auto;
    padding: 28px 24px;
  }

  /* HERO */
  .hero-section {
    text-align: center;
    padding-top: 40px;
  }

  .hero-name {
    font-size: 36px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 8px;
  }

  .hero-role {
    font-size: 16px;
    font-weight: 400;
    color: #1a73e8;
    margin: 0 0 16px;
  }

  .hero-bio {
    font-size: 14px;
    color: #555;
    line-height: 1.6;
    max-width: 520px;
    margin: 0 auto 20px;
  }

  .hero-links {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 32px;
  }

  .hero-link {
    font-size: 13px;
    color: #1a73e8;
    text-decoration: none;
    border: 1px solid #1a73e8;
    padding: 5px 14px;
    border-radius: 4px;
    &:hover {
      background: #e8f0fe;
    }
  }

  .search-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .search-bar {
    width: 480px;
    max-width: 100%;
    border: 1px solid #dfe1e5;
    border-radius: 24px;
    padding: 0 16px;
    height: 44px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    &:hover {
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    input {
      border: none;
      outline: none;
      width: 100%;
      font-size: 15px;
      font-family: Arial, sans-serif;
    }
  }

  .search-btn {
    padding: 8px 20px;
    background: #f8f9fa;
    border: 1px solid #dfe1e5;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    color: #444;
    font-family: Arial, sans-serif;
    &:hover {
      border-color: #c6c6c6;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }
  }

  /* SECTION TITLE */
  .section-title {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 18px;
    padding-bottom: 8px;
    border-bottom: 2px solid #1a73e8;
  }

  /* EXPERIENCE */
  .exp-card {
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px 18px;
    margin-bottom: 14px;
  }

  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
  }

  .exp-company {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a2e;
  }

  .exp-role {
    font-size: 13px;
    color: #1a73e8;
    margin-top: 2px;
  }

  .exp-meta {
    text-align: right;
  }

  .exp-period {
    font-size: 12px;
    color: #777;
  }

  .exp-location {
    font-size: 12px;
    color: #999;
  }

  .exp-items {
    margin: 0;
    padding-left: 18px;
    li {
      font-size: 12px;
      color: #444;
      margin-bottom: 4px;
      line-height: 1.5;
    }
  }

  /* PROJECTS */
  .projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .proj-card {
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 14px 16px;
  }

  .proj-name {
    font-size: 13px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 4px;
  }

  .proj-context {
    font-size: 11px;
    color: #1a73e8;
    margin-bottom: 4px;
  }

  .proj-tech {
    font-size: 11px;
    color: #777;
    margin-bottom: 6px;
  }

  .proj-desc {
    font-size: 11px;
    color: #555;
    line-height: 1.5;
    margin: 0;
  }

  /* SKILLS */
  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .skill-chip {
    background: #e8f0fe;
    color: #1a73e8;
    border: 1px solid #c5d8fd;
    border-radius: 16px;
    padding: 6px 16px;
    font-size: 13px;
    font-weight: 600;
  }

  footer {
    height: 36px;
    border-top: 1px solid #e0e0e0;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 11px;
    color: #777;
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
    .search-bar {
      width: 90%;
    }
  }
`;
