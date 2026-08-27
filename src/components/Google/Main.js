import React, { useState } from 'react';
import styled from 'styled-components';

const SECTION_LABELS = {
  about: 'About',
  experience: 'Experience',
  ai: 'AI / ML',
  projects: 'Projects',
  skills: 'Skills',
};

const stack = [
  {
    category: 'IA & GenAI',
    items: [
      'Fine-tuning LoRA / PEFT',
      'RAG',
      'LangChain (LCEL)',
      'LangServe',
      'Hugging Face',
      'OpenAI API',
      'ChromaDB',
      'Prompt engineering',
      'Evaluación de LLMs',
    ],
  },
  {
    category: 'ML / Deep Learning',
    items: [
      'PyTorch',
      'TensorFlow',
      'Keras',
      'Scikit-learn',
      'XGBoost',
      'CNN',
      'Transfer learning',
      'Visión por computadora',
      'CLIP',
    ],
  },
  {
    category: 'Frontend',
    items: [
      'Angular',
      'React',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Figma',
    ],
  },
  {
    category: 'Backend & APIs',
    items: [
      'Node.js',
      'C# / .NET',
      'FastAPI',
      'ElectronJS',
      'REST APIs',
      'SQL',
      'C',
    ],
  },
  {
    category: 'DevOps & Datos',
    items: [
      'Docker',
      'CI/CD (GitHub Actions)',
      'Git',
      'Railway',
      'Hugging Face Spaces',
      'Pandas',
      'NumPy',
      'Jira',
    ],
  },
];

const aiProjects = [
  {
    name: 'Fine-tuning LoRA para Salida Estructurada',
    context: 'API en producción — Hugging Face Spaces',
    tech: 'PyTorch · PEFT · Transformers · FastAPI · Docker',
    metric: 'Precisión de formato: 0% → 87%',
    desc:
      'Fine-tuning con LoRA sobre Qwen2.5-0.5B para que un asistente de soporte devuelva siempre salida estructurada. Superó al few-shot prompting (55%) con mucho menos consumo de tokens. Partición de datos sin fuga entre train y test, dejando un producto entero fuera del entrenamiento para medir cómo generalizaba a casos no vistos.',
    links: [
      {
        label: 'Demo',
        url:
          'https://huggingface.co/spaces/MatiasMarro/nimbus-lora-format-tuning',
      },
      {
        label: 'Código',
        url:
          'https://huggingface.co/spaces/MatiasMarro/nimbus-lora-format-tuning/tree/main',
      },
    ],
  },
  {
    name: 'Chatbot RAG sobre documentación corporativa',
    context: 'Despliegue en producción — Railway',
    tech: 'FastAPI · LangChain · ChromaDB · OpenAI · Railway',
    metric: 'Prompt anti-alucinación verificado con tests',
    desc:
      'Indexación de web y PDFs en ChromaDB, con generación vía gpt-4o-mini. El prompt está diseñado para no alucinar: devuelve una respuesta fija cuando la información no está en el corpus. Expuesto con FastAPI + LangServe y streaming.',
    links: [
      {
        label: 'App',
        url: 'https://promtior-rag-challenge-production.up.railway.app/',
      },
      {
        label: 'Código',
        url: 'https://github.com/MatiasMarro/promptior-rag-challenge',
      },
    ],
  },
  {
    name: 'Predicción de Churn & Visión por Computadora',
    context: 'Machine Learning y Deep Learning',
    tech: 'Scikit-learn · XGBoost · TensorFlow · PyTorch',
    metric: 'AUC-ROC 0.84 · FCN-8 ~85% accuracy',
    desc:
      'Predicción de churn sobre un dataset desbalanceado con validación cruzada estratificada; segmentación semántica de escenas urbanas con FCN-8; y búsqueda de imágenes por texto con CLIP.',
    links: [
      { label: 'Código', url: 'https://github.com/MatiasMarro/Deep-Learning' },
    ],
  },
];

const experience = [
  {
    company: 'Leistung Ingeniería SRL',
    role: 'Full Stack Developer (Freelance)',
    period: 'Sept 2024 – Presente',
    location: 'Córdoba, Argentina',
    items: [
      'Aplicación web de gestión empresarial: Angular + TypeScript en el frontend, C# / .NET en el backend',
      'Traducción de diseños Figma a interfaz final',
      'Coordinación directa con el cliente vía Jira',
    ],
  },
  {
    company: "FK Tech SRL — Cliente: McDonald's Corporation",
    role: 'Software Engineer',
    period: 'Mar 2022 – Sept 2024',
    location: 'Córdoba, Argentina',
    items: [
      "Apps de escritorio y servicios para los sistemas POS desplegados en locales de McDonald's, con ElectronJS, Node.js, React y C",
      'Integración con hardware del local (USB, DLLs nativas, comunicación COM) y construcción de APIs REST',
      'Apps productivas: conteo automatizado de productos, monitor de delivery en tiempo real e interfaz de carga de ventas externas',
      'Documentación técnica en Confluence y seguimiento de sprints en Jira',
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
    name: 'Monitor de Recuento de Carnes',
    context: "McDonald's — FK Tech SRL",
    tech: 'ElectronJS · Node.js · XML · USB',
    desc:
      'Conteo automatizado de productos a partir de los pedidos del POS, con lectura de puertos USB.',
  },
  {
    name: 'Monitor de Pedidos de Delivery',
    context: "McDonald's — FK Tech SRL",
    tech: 'ElectronJS · Node.js · DLL · COM',
    desc:
      'Monitor en tiempo real de pedidos de delivery, con integración a dispositivos externos del local.',
  },
  {
    name: 'Foreign Entry Order',
    context: "McDonald's — FK Tech SRL",
    tech: 'C# · Windows Forms',
    desc: 'Interfaz de carga de ventas externas sobre el sistema POS.',
  },
  {
    name: 'Reconocimiento facial LFW: MLP vs CNN',
    context: 'Deep Learning — UTN / UBA',
    tech: 'TensorFlow · Keras · NumPy · Pandas',
    desc:
      'Implementación y comparación de MLP contra CNN sobre el dataset Labeled Faces in the Wild, con data augmentation y matriz de confusión.',
  },
  {
    name: 'OpenCV — Visión por Computadora',
    context: 'UTN FRC',
    tech: 'Python · OpenCV · CNN',
    desc:
      'Reconocimiento y clasificación de imágenes con redes neuronales convolucionales.',
  },
];

const education = [
  {
    degree: 'Ingeniería Electrónica (estudiante avanzado)',
    school: 'Universidad Tecnológica Nacional — FRC, Córdoba',
    period: 'En curso',
    note: 'Formación orientada a visión por computadora y deep learning.',
  },
  {
    degree: 'Bachiller en Economía y Gestión',
    school: 'Inst. Sec. Dr. Raúl Loza Luque — Luque, Córdoba',
    period: '2010 – 2015',
  },
];

const certifications = [
  {
    name: 'Curso de Deep Learning — UTN / BA',
    url: 'https://validator.centrodeelearning.com/validator/VzfVf7OLmX',
  },
  {
    name: 'Curso de Machine Learning — UTN / BA',
    url: 'https://validator.centrodeelearning.com/validator/nXd7S7gU8g',
  },
];

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

  return (
    <div className={className}>
      <header>
        <div className="header-name">Matías Marro</div>
        <nav className="header-nav">
          {Object.keys(SECTION_LABELS).map(s => (
            <button
              key={s}
              className={`nav-btn ${activeSection === s ? 'active' : ''}`}
              onClick={() => setActiveSection(s)}
            >
              {SECTION_LABELS[s]}
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
            <h1 className="hero-name">Matías Marro</h1>
            <h2 className="hero-role">AI Engineer &amp; Full Stack Developer</h2>
            <p className="hero-bio">
              Ingeniero de software con más de 4 años de experiencia full stack
              (Angular, React, Node.js, C# / .NET) y especialización aplicada en
              Inteligencia Artificial (LLMs, RAG, fine-tuning con LoRA, deep
              learning).
            </p>
            <p className="hero-bio">
              Mi diferencial es cerrar todo el ciclo: entreno o integro un
              modelo, lo despliego como API y lo conecto a una aplicación real
              que la gente usa. Vengo de construir sistemas en producción (POS
              desplegados en locales, apps de gestión empresarial) y hoy aplico
              esa misma mentalidad de &ldquo;que funcione y se pueda
              mantener&rdquo; a los proyectos de IA.
            </p>
            <div className="hero-meta">
              Córdoba, Argentina · Remoto · Inglés avanzado
            </div>
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
              <a
                href="https://huggingface.co/MatiasMarro"
                target="_blank"
                rel="noreferrer"
                className="hero-link"
              >
                Hugging Face
              </a>
              <a href="mailto:m.m.caseros.386@gmail.com" className="hero-link">
                Email
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

        {activeSection === 'ai' && (
          <section className="section">
            <h2 className="section-title">Proyectos de IA / Machine Learning</h2>
            {aiProjects.map((proj, i) => (
              <div className="ai-card" key={i}>
                <div className="ai-name">{proj.name}</div>
                <div className="ai-context">{proj.context}</div>
                <div className="ai-metric">{proj.metric}</div>
                <p className="ai-desc">{proj.desc}</p>
                <div className="ai-tech">{proj.tech}</div>
                <div className="ai-links">
                  {proj.links.map(link => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="ai-link"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {activeSection === 'projects' && (
          <section className="section">
            <h2 className="section-title">Otros Proyectos</h2>
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
            <h2 className="section-title">Tecnologías</h2>
            {stack.map(group => (
              <div className="stack-block" key={group.category}>
                <div className="stack-category">{group.category}</div>
                <div className="skills-grid">
                  {group.items.map(item => (
                    <div className="skill-chip" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <h2 className="section-title" style={{ marginTop: '28px' }}>
              Educación
            </h2>
            {education.map((edu, i) => (
              <div className="exp-card" key={i}>
                <div className="exp-header">
                  <div>
                    <div className="exp-company">{edu.degree}</div>
                    <div className="exp-role">{edu.school}</div>
                  </div>
                  <div className="exp-meta">
                    <div className="exp-period">{edu.period}</div>
                  </div>
                </div>
                {edu.note && <div className="edu-note">{edu.note}</div>}
              </div>
            ))}

            <h2 className="section-title" style={{ marginTop: '28px' }}>
              Certificaciones
            </h2>
            <div className="exp-card">
              <ul className="exp-items">
                {certifications.map(cert => (
                  <li key={cert.url}>
                    {cert.name}{' '}
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-link"
                    >
                      Ver certificado
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="section-title" style={{ marginTop: '28px' }}>
              Idiomas
            </h2>
            <div className="exp-card">
              <ul className="exp-items">
                <li>Español — nativo</li>
                <li>
                  Inglés — avanzado: lectura técnica, documentación y
                  comunicación profesional
                </li>
              </ul>
            </div>
          </section>
        )}
      </div>

      <footer>
        <span>
          Córdoba, Argentina · m.m.caseros.386@gmail.com · +54 3573 495499
        </span>
        <span>© 2026 Matías Marro</span>
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
    padding: 6px 10px;
    font-size: 13px;
    cursor: pointer;
    color: #555;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    white-space: nowrap;
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
    padding-top: 36px;
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
    max-width: 560px;
    margin: 0 auto 12px;
  }

  .hero-meta {
    font-size: 12px;
    color: #888;
    margin: 4px 0 20px;
  }

  .hero-links {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
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
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
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
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
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
    gap: 12px;
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
    white-space: nowrap;
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

  .edu-note {
    font-size: 12px;
    color: #666;
    line-height: 1.5;
  }

  .inline-link {
    color: #1a73e8;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  /* AI PROJECTS */
  .ai-card {
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-left: 3px solid #1a73e8;
    border-radius: 8px;
    padding: 16px 18px;
    margin-bottom: 14px;
  }

  .ai-name {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a2e;
  }

  .ai-context {
    font-size: 12px;
    color: #1a73e8;
    margin-top: 2px;
  }

  .ai-metric {
    display: inline-block;
    background: #e8f0fe;
    color: #1558b0;
    border-radius: 4px;
    padding: 3px 10px;
    font-size: 11px;
    font-weight: 700;
    margin: 8px 0 6px;
  }

  .ai-desc {
    font-size: 12px;
    color: #444;
    line-height: 1.6;
    margin: 0 0 8px;
  }

  .ai-tech {
    font-size: 11px;
    color: #777;
    margin-bottom: 10px;
  }

  .ai-links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .ai-link {
    font-size: 12px;
    color: #1a73e8;
    text-decoration: none;
    border: 1px solid #1a73e8;
    padding: 3px 12px;
    border-radius: 4px;
    &:hover {
      background: #e8f0fe;
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
  .stack-block {
    margin-bottom: 18px;
  }

  .stack-category {
    font-size: 13px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 8px;
  }

  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-chip {
    background: #e8f0fe;
    color: #1a73e8;
    border: 1px solid #c5d8fd;
    border-radius: 16px;
    padding: 5px 14px;
    font-size: 12px;
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
    gap: 12px;
  }

  @media (max-width: 600px) {
    header {
      padding: 0 12px;
    }
    .header-nav {
      overflow-x: auto;
    }
    .projects-grid {
      grid-template-columns: 1fr;
    }
    .search-bar {
      width: 90%;
    }
    .exp-header {
      flex-direction: column;
    }
    .exp-meta {
      text-align: left;
    }
    footer {
      font-size: 10px;
    }
  }
`;
