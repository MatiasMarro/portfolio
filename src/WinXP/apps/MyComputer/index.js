import React, { useState } from 'react';
import styled from 'styled-components';

import { WindowDropDowns } from 'components';
import dropDownData from './dropDownData';
import go from 'assets/windowsIcons/290.png';
import search from 'assets/windowsIcons/299(32x32).png';
import computer from 'assets/windowsIcons/676(16x16).png';
import back from 'assets/windowsIcons/back.png';
import forward from 'assets/windowsIcons/forward.png';
import up from 'assets/windowsIcons/up.png';
import viewInfo from 'assets/windowsIcons/view-info.ico';
import remove from 'assets/windowsIcons/302(16x16).png';
import control from 'assets/windowsIcons/300(16x16).png';
import network from 'assets/windowsIcons/693(16x16).png';
import document from 'assets/windowsIcons/308(16x16).png';
import folderSmall from 'assets/windowsIcons/318(16x16).png';
import menu from 'assets/windowsIcons/358(32x32).png';
import folder from 'assets/windowsIcons/318(48x48).png';
import folderOpen from 'assets/windowsIcons/337(32x32).png';
import disk from 'assets/windowsIcons/334(48x48).png';
import cd from 'assets/windowsIcons/111(48x48).png';
import dropdown from 'assets/windowsIcons/dropdown.png';
import pullup from 'assets/windowsIcons/pullup.png';
import logo from 'assets/github-logo.png';
import windows from 'assets/windowsIcons/windows.png';

const VIEWS = {
  ROOT: null,
  AI: 'ai',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  STACK: 'stack',
  EDUCATION: 'education',
};

const VIEW_LABELS = {
  ai: 'IA / Machine Learning',
  experience: 'Experiencia',
  projects: 'Proyectos',
  stack: 'Stack Técnico',
  education: 'Educación',
};

const GAME_PROJECTS = [
  {
    title: 'Space Invaders',
    description: 'Juego arcade clásico de los 80s con implementación de sonido.',
    tech: ['C++', 'Allegro'],
    image: 'https://raw.githubusercontent.com/MatiasMarro/PortfolioWeb/main/assets/images/spaceInvaders.gif',
    link: 'https://github.com/MatiasMarro/SpaceInvaders-Cpp',
  },
  {
    title: 'Moon Landing',
    description: 'Interfaz con importación de bitmaps y audio.',
    tech: ['C/C++', 'Allegro'],
    image: 'https://raw.githubusercontent.com/MatiasMarro/PortfolioWeb/main/assets/images/moonLanding.gif',
    link: 'https://github.com/MatiasMarro/MOON-LANDING-GAME-',
  },
  {
    title: 'Game Pong',
    description: 'Pong clásico con oponente algorítmico.',
    tech: ['C++'],
    image: 'https://raw.githubusercontent.com/MatiasMarro/PortfolioWeb/main/assets/images/PONG.gif',
    link: 'https://github.com/MatiasMarro/GAME-PONG-',
  },
  {
    title: 'My First Game',
    description: 'Primer proyecto de juego en C++, open source.',
    tech: ['C++'],
    image: 'https://raw.githubusercontent.com/MatiasMarro/PortfolioWeb/main/assets/images/FirstGame.gif',
    link: 'https://github.com/MatiasMarro/Cpp-FirstGame-',
  },
];

const AI_PROJECTS = [
  {
    title: 'Fine-tuning LoRA para Salida Estructurada',
    context: 'API en producción — Hugging Face Spaces',
    metric: 'Precisión de formato: 0% → 87%',
    description:
      'Fine-tuning con LoRA sobre Qwen2.5-0.5B para que un asistente de soporte devuelva siempre salida estructurada. Superó al few-shot prompting (55%) con mucho menos consumo de tokens. Partición de datos sin fuga entre train y test, dejando un producto entero fuera del entrenamiento para medir cómo generalizaba a casos no vistos.',
    tech: ['PyTorch', 'PEFT', 'Transformers', 'FastAPI', 'Docker'],
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
    title: 'Chatbot RAG sobre documentación corporativa',
    context: 'Despliegue en producción — Railway',
    metric: 'Prompt anti-alucinación verificado con tests',
    description:
      'Indexación de web y PDFs en ChromaDB, con generación vía gpt-4o-mini. El prompt está diseñado para no alucinar: devuelve una respuesta fija cuando la información no está en el corpus. Expuesto con FastAPI + LangServe y streaming.',
    tech: ['FastAPI', 'LangChain', 'LangServe', 'ChromaDB', 'OpenAI'],
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
    title: 'Predicción de Churn & Visión por Computadora',
    context: 'Machine Learning y Deep Learning',
    metric: 'AUC-ROC 0.84 · FCN-8 ~85% accuracy',
    description:
      'Predicción de churn sobre un dataset desbalanceado con validación cruzada estratificada; segmentación semántica de escenas urbanas con FCN-8; y búsqueda de imágenes por texto con CLIP.',
    tech: ['Scikit-learn', 'XGBoost', 'TensorFlow', 'PyTorch', 'CLIP'],
    links: [
      { label: 'Código', url: 'https://github.com/MatiasMarro/Deep-Learning' },
    ],
  },
];

const CERTIFICATIONS = [
  {
    name: 'Curso de Deep Learning',
    school: 'UTN / BA',
    url: 'https://validator.centrodeelearning.com/validator/VzfVf7OLmX',
  },
  {
    name: 'Curso de Machine Learning',
    school: 'UTN / BA',
    url: 'https://validator.centrodeelearning.com/validator/nXd7S7gU8g',
  },
];

const PROFESSIONAL_PROJECTS = [
  {
    title: "Monitor de Recuento de Carnes (McDonald's)",
    description:
      'Conteo automatizado de productos a partir de los pedidos del POS, con lectura de puertos USB.',
    tech: ['ElectronJS', 'Node.js', 'JSON', 'XML'],
    context: 'FK Tech SRL',
  },
  {
    title: "Monitor de Pedidos de Delivery (McDonald's)",
    description:
      'Monitor en tiempo real de pedidos de delivery, con integración a dispositivos externos del local.',
    tech: ['ElectronJS', 'Node.js', 'DLL/COM'],
    context: 'FK Tech SRL',
  },
  {
    title: 'Foreign Entry Order',
    description:
      'Interfaz de carga de ventas externas sobre el sistema POS del local.',
    tech: ['C#', 'Windows Forms'],
    context: 'FK Tech SRL',
  },
  {
    title: 'Reconocimiento Facial LFW: MLP vs CNN',
    description:
      'Implementación y comparación de MLP contra CNN sobre el dataset Labeled Faces in the Wild, con data augmentation y matriz de confusión.',
    tech: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'Pandas'],
    context: 'Deep Learning — UTN / UBA',
  },
  {
    title: 'OpenCV — Visión por Computadora',
    description:
      'Reconocimiento y clasificación de imágenes con redes neuronales convolucionales.',
    tech: ['Python', 'OpenCV', 'CNN'],
    context: 'UTN FRC',
  },
];

function MyComputer({ onClose }) {
  const [view, setView] = useState(VIEWS.ROOT);

  function onClickOptionItem(item) {
    switch (item) {
      case 'Close':
        onClose();
        break;
      default:
    }
  }

  function goBack() {
    setView(VIEWS.ROOT);
  }

  function openFolder(v) {
    setView(v);
  }

  const addressText = view ? `My Computer > ${VIEW_LABELS[view]}` : 'My Computer';

  return (
    <Div>
      <section className="com__toolbar">
        <div className="com__options">
          <WindowDropDowns items={dropDownData} onClickItem={onClickOptionItem} />
        </div>
        <img className="com__windows-logo" src={windows} alt="windows" />
      </section>
      <section className="com__function_bar">
        <div
          className={view ? 'com__function_bar__button' : 'com__function_bar__button--disable'}
          onClick={view ? goBack : undefined}
        >
          <img className="com__function_bar__icon" src={back} alt="" />
          <span className="com__function_bar__text">Back</span>
          <div className="com__function_bar__arrow" />
        </div>
        <div className="com__function_bar__button--disable">
          <img className="com__function_bar__icon" src={forward} alt="" />
          <div className="com__function_bar__arrow" />
        </div>
        <div
          className={view ? 'com__function_bar__button' : 'com__function_bar__button--disable'}
          onClick={view ? goBack : undefined}
        >
          <img className="com__function_bar__icon--normalize" src={up} alt="" />
        </div>
        <div className="com__function_bar__separate" />
        <div className="com__function_bar__button">
          <img className="com__function_bar__icon--normalize " src={search} alt="" />
          <span className="com__function_bar__text">Search</span>
        </div>
        <div className="com__function_bar__button">
          <img className="com__function_bar__icon--normalize" src={folderOpen} alt="" />
          <span className="com__function_bar__text">Folders</span>
        </div>
        <div className="com__function_bar__separate" />
        <div className="com__function_bar__button">
          <img className="com__function_bar__icon--margin12" src={menu} alt="" />
          <div className="com__function_bar__arrow" />
        </div>
      </section>
      <section className="com__address_bar">
        <div className="com__address_bar__title">Address</div>
        <div className="com__address_bar__content">
          <img src={computer} alt="ie" className="com__address_bar__content__img" />
          <div className="com__address_bar__content__text">{addressText}</div>
          <img src={dropdown} alt="dropdown" className="com__address_bar__content__img" />
        </div>
        <div className="com__address_bar__go">
          <img className="com__address_bar__go__img" src={go} alt="go" />
          <span className="com__address_bar__go__text">Go</span>
        </div>
      </section>

      <div className="com__content">
        <div className="com__content__inner">
          {/* ── Left sidebar ── */}
          <div className="com__content__left">
            {view === VIEWS.ROOT && (
              <>
                <div className="com__content__left__card">
                  <div className="com__content__left__card__header">
                    <div className="com__content__left__card__header__text">System Tasks</div>
                    <img src={pullup} alt="" className="com__content__left__card__header__img" />
                  </div>
                  <div className="com__content__left__card__content">
                    <div className="com__content__left__card__row">
                      <img className="com__content__left__card__img" src={viewInfo} alt="" />
                      <div className="com__content__left__card__text link">View system information</div>
                    </div>
                    <div className="com__content__left__card__row">
                      <img className="com__content__left__card__img" src={remove} alt="" />
                      <div className="com__content__left__card__text link">Add or remove programs</div>
                    </div>
                    <div className="com__content__left__card__row">
                      <img className="com__content__left__card__img" src={control} alt="" />
                      <div className="com__content__left__card__text link">Change a setting</div>
                    </div>
                  </div>
                </div>
                <div className="com__content__left__card">
                  <div className="com__content__left__card__header">
                    <div className="com__content__left__card__header__text">Other Places</div>
                    <img src={pullup} alt="" className="com__content__left__card__header__img" />
                  </div>
                  <div className="com__content__left__card__content">
                    <div className="com__content__left__card__row">
                      <img className="com__content__left__card__img" src={network} alt="" />
                      <div className="com__content__left__card__text link">My Network Places</div>
                    </div>
                    <div className="com__content__left__card__row">
                      <img className="com__content__left__card__img" src={document} alt="" />
                      <div className="com__content__left__card__text link">My Documents</div>
                    </div>
                    <div className="com__content__left__card__row">
                      <img className="com__content__left__card__img" src={folderSmall} alt="" />
                      <div className="com__content__left__card__text link">Shared Documents</div>
                    </div>
                    <div className="com__content__left__card__row">
                      <img className="com__content__left__card__img" src={control} alt="" />
                      <div className="com__content__left__card__text link">Control Panel</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {view !== VIEWS.ROOT && (
              <div className="com__content__left__card">
                <div className="com__content__left__card__header">
                  <div className="com__content__left__card__header__text">File and Folder Tasks</div>
                  <img src={pullup} alt="" className="com__content__left__card__header__img" />
                </div>
                <div className="com__content__left__card__content">
                  <div className="com__content__left__card__row" onClick={goBack} style={{ cursor: 'pointer' }}>
                    <img className="com__content__left__card__img" src={folderSmall} alt="" />
                    <div className="com__content__left__card__text link">Back to My Computer</div>
                  </div>
                </div>
              </div>
            )}

            <div className="com__content__left__card">
              <div className="com__content__left__card__header">
                <div className="com__content__left__card__header__text">Details</div>
                <img src={pullup} alt="" className="com__content__left__card__header__img" />
              </div>
              <div className="com__content__left__card__content">
                <div className="com__content__left__card__row">
                  <img className="com__content__left__card__img" src={logo} alt="github" />
                  <a
                    href="https://github.com/MatiasMarro"
                    target="_blank"
                    rel="noreferrer"
                    className="com__content__left__card__text link"
                  >
                    GitHub
                  </a>
                </div>
                <div className="com__content__left__card__row">
                  <img
                    className="com__content__left__card__img"
                    src="https://cdn.iconscout.com/icon/free/png-256/linkedin-162-498418.png"
                    alt="linkedin"
                  />
                  <a
                    href="https://www.linkedin.com/in/matias-marro-30344b194/"
                    target="_blank"
                    rel="noreferrer"
                    className="com__content__left__card__text link"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right content ── */}
          <div className="com__content__right">

            {/* ROOT VIEW */}
            {view === VIEWS.ROOT && (
              <>
                <div className="com__content__right__card">
                  <div className="com__content__right__card__header">Files Stored on This Computer</div>
                  <div className="com__content__right__card__content">
                    {[
                      { label: 'IA / Machine Learning', v: VIEWS.AI },
                      { label: 'Experiencia', v: VIEWS.EXPERIENCE },
                      { label: 'Proyectos', v: VIEWS.PROJECTS },
                      { label: 'Stack Técnico', v: VIEWS.STACK },
                      { label: 'Educación', v: VIEWS.EDUCATION },
                    ].map(({ label, v }) => (
                      <div
                        key={v}
                        className="com__content__right__card__item folder-item"
                        onDoubleClick={() => openFolder(v)}
                      >
                        <img src={folder} alt="folder" className="com__content__right__card__img" />
                        <div className="com__content__right__card__text">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="com__content__right__card">
                  <div className="com__content__right__card__header">Hard Disk Drives</div>
                  <div className="com__content__right__card__content">
                    <div className="com__content__right__card__item">
                      <img src={disk} alt="disk" className="com__content__right__card__img" />
                      <div className="com__content__right__card__text">Local Disk (C:)</div>
                    </div>
                  </div>
                </div>
                <div className="com__content__right__card">
                  <div className="com__content__right__card__header">Devices with Removable Storage</div>
                  <div className="com__content__right__card__content">
                    <div className="com__content__right__card__item">
                      <img src={cd} alt="cd" className="com__content__right__card__img" />
                      <div className="com__content__right__card__text">CD Drive (D:)</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* EDUCATION VIEW */}
            {view === VIEWS.EDUCATION && (
              <FolderView>
                <FolderViewTitle>Educación y Certificaciones</FolderViewTitle>
                <EduCard>
                  <EduYear>En curso</EduYear>
                  <EduDegree>Ingeniería Electrónica (estudiante avanzado)</EduDegree>
                  <EduSchool>Universidad Tecnológica Nacional — FRC, Córdoba</EduSchool>
                  <EduNote>Formación orientada a visión por computadora y deep learning.</EduNote>
                </EduCard>
                <EduCard>
                  <EduYear>2010 — 2015</EduYear>
                  <EduDegree>Bachiller en Economía y Gestión</EduDegree>
                  <EduSchool>Inst. Sec. Dr. Raúl Loza Luque — Luque, Córdoba</EduSchool>
                </EduCard>
                <ProjectSectionLabel style={{ marginTop: 16 }}>
                  Certificaciones
                </ProjectSectionLabel>
                {CERTIFICATIONS.map((cert, i) => (
                  <EduCard key={i}>
                    <EduDegree>{cert.name}</EduDegree>
                    <EduSchool>{cert.school}</EduSchool>
                    <ProjectLink href={cert.url} target="_blank" rel="noreferrer">
                      Ver certificado
                    </ProjectLink>
                  </EduCard>
                ))}
              </FolderView>
            )}

            {/* EXPERIENCE VIEW */}
            {view === VIEWS.EXPERIENCE && (
              <FolderView>
                <FolderViewTitle>Experiencia Profesional</FolderViewTitle>
                {[
                  {
                    company: 'Leistung Ingeniería SRL',
                    period: 'Sept 2024 — Presente',
                    role: 'Full Stack Developer (Freelance)',
                    location: 'Córdoba, Argentina',
                    items: [
                      'Aplicación web de gestión empresarial: Angular + TypeScript en el frontend, C# / .NET en el backend',
                      'Traducción de diseños Figma a interfaz final',
                      'Coordinación directa con el cliente vía Jira',
                    ],
                  },
                  {
                    company: "FK Tech SRL — Cliente: McDonald's Corporation",
                    period: 'Mar 2022 — Sept 2024',
                    role: 'Software Engineer',
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
                    period: 'Ene 2015 — Mar 2022',
                    role: 'Diseño y Carpintería',
                    location: 'Luque, Córdoba',
                    items: [
                      'Diseño de muebles con software CAD Fusion 360',
                      'Operación de máquinas CNC',
                    ],
                  },
                ].map((job, i) => (
                  <ExpCard key={i}>
                    <ExpHeader>
                      <ExpCompany>{job.company}</ExpCompany>
                      <ExpPeriod>{job.period}</ExpPeriod>
                    </ExpHeader>
                    <ExpRole>{job.role} — {job.location}</ExpRole>
                    <ExpList>
                      {job.items.map((item, j) => <li key={j}>{item}</li>)}
                    </ExpList>
                  </ExpCard>
                ))}
              </FolderView>
            )}

            {/* PROJECTS VIEW */}
            {view === VIEWS.PROJECTS && (
              <FolderView>
                <FolderViewTitle>Proyectos</FolderViewTitle>
                <ProjectSectionLabel>Juegos (C / C++)</ProjectSectionLabel>
                <ProjectsGrid>
                  {GAME_PROJECTS.map((p, i) => (
                    <ProjectCard key={i}>
                      <ProjectImg src={p.image} alt={p.title} />
                      <ProjectInfo>
                        <ProjectTitle>{p.title}</ProjectTitle>
                        <ProjectDesc>{p.description}</ProjectDesc>
                        <TechRow>
                          {p.tech.map(t => <TechTag key={t}>{t}</TechTag>)}
                        </TechRow>
                        {p.link && (
                          <ProjectLink href={p.link} target="_blank" rel="noreferrer">
                            Ver en GitHub
                          </ProjectLink>
                        )}
                      </ProjectInfo>
                    </ProjectCard>
                  ))}
                </ProjectsGrid>
                <ProjectSectionLabel style={{ marginTop: 16 }}>Proyectos Profesionales</ProjectSectionLabel>
                <ProProjectsGrid>
                  {PROFESSIONAL_PROJECTS.map((p, i) => (
                    <ProProjectCard key={i}>
                      <ProProjectTitle>{p.title}</ProProjectTitle>
                      <ProProjectContext>{p.context}</ProProjectContext>
                      <ProProjectDesc>{p.description}</ProProjectDesc>
                      <TechRow>
                        {p.tech.map(t => <TechTag key={t}>{t}</TechTag>)}
                      </TechRow>
                    </ProProjectCard>
                  ))}
                </ProProjectsGrid>
              </FolderView>
            )}

            {/* AI VIEW */}
            {view === VIEWS.AI && (
              <FolderView>
                <FolderViewTitle>IA / Machine Learning</FolderViewTitle>
                {AI_PROJECTS.map((p, i) => (
                  <AiCard key={i}>
                    <AiTitle>{p.title}</AiTitle>
                    <AiContext>{p.context}</AiContext>
                    <AiMetric>{p.metric}</AiMetric>
                    <AiDesc>{p.description}</AiDesc>
                    <TechRow>
                      {p.tech.map(t => <TechTag key={t}>{t}</TechTag>)}
                    </TechRow>
                    <AiLinks>
                      {p.links.map(link => (
                        <ProjectLink
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.label}
                        </ProjectLink>
                      ))}
                    </AiLinks>
                  </AiCard>
                ))}
              </FolderView>
            )}

            {/* STACK VIEW */}
            {view === VIEWS.STACK && (
              <FolderView>
                <FolderViewTitle>Stack Técnico</FolderViewTitle>
                {[
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
                ].map((section, i) => (
                  <StackSection key={i}>
                    <StackCategory>{section.category}</StackCategory>
                    <StackTags>
                      {section.items.map(item => <StackTag key={item}>{item}</StackTag>)}
                    </StackTags>
                  </StackSection>
                ))}
              </FolderView>
            )}

          </div>
        </div>
      </div>
    </Div>
  );
}

/* ─── Folder View Shared ─── */
const FolderView = styled.div`
  padding: 16px 20px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`;

const FolderViewTitle = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: #0c327d;
  padding-bottom: 6px;
  margin-bottom: 12px;
  border-bottom: 2px solid #70bfff;
`;

/* ─── IA / Machine Learning ─── */
const AiCard = styled.div`
  background: #f5f8ff;
  border: 1px solid #c0d0f8;
  border-left: 3px solid #1a5cd8;
  border-radius: 3px;
  padding: 10px 14px;
  margin-bottom: 10px;
`;

const AiTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #0c327d;
`;

const AiContext = styled.div`
  font-size: 9px;
  color: #888;
  font-style: italic;
  margin-bottom: 5px;
`;

const AiMetric = styled.div`
  display: inline-block;
  background: #dce8ff;
  border: 1px solid #a0b8f0;
  border-radius: 2px;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 700;
  color: #0c327d;
  margin-bottom: 6px;
`;

const AiDesc = styled.div`
  font-size: 10px;
  color: #444;
  line-height: 1.5;
  margin-bottom: 6px;
`;

const AiLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

/* ─── Education ─── */
const EduCard = styled.div`
  background: #f5f8ff;
  border: 1px solid #c0d0f8;
  border-radius: 3px;
  padding: 10px 14px;
  margin-bottom: 10px;
`;
const EduYear = styled.div`
  font-size: 10px;
  color: #666;
  font-family: Tahoma, sans-serif;
`;
const EduDegree = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #0c327d;
  margin: 2px 0;
`;
const EduSchool = styled.div`
  font-size: 11px;
  color: #333;
`;

const EduNote = styled.div`
  font-size: 10px;
  color: #666;
  line-height: 1.5;
  margin-top: 4px;
`;

/* ─── Experience ─── */
const ExpCard = styled.div`
  background: #f5f8ff;
  border: 1px solid #c0d0f8;
  border-radius: 3px;
  padding: 10px 14px;
  margin-bottom: 10px;
`;
const ExpHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 2px;
`;
const ExpCompany = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #0c327d;
`;
const ExpPeriod = styled.div`
  font-size: 10px;
  color: #666;
`;
const ExpRole = styled.div`
  font-size: 11px;
  color: #444;
  margin-bottom: 4px;
`;
const ExpList = styled.ul`
  margin: 0;
  padding-left: 16px;
  font-size: 10px;
  color: #333;
  line-height: 1.6;
`;

/* ─── Projects ─── */
const ProjectSectionLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #0c327d;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProjectsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProjectCard = styled.div`
  display: flex;
  gap: 12px;
  background: #f5f8ff;
  border: 1px solid #c0d0f8;
  border-radius: 3px;
  padding: 8px;
  align-items: flex-start;
`;

const ProjectImg = styled.img`
  width: 100px;
  height: 70px;
  object-fit: cover;
  border: 1px solid #aaa;
  border-radius: 2px;
  flex-shrink: 0;
  background: #000;
`;

const ProjectInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProjectTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #0c327d;
  margin-bottom: 2px;
`;

const ProjectDesc = styled.div`
  font-size: 10px;
  color: #444;
  margin-bottom: 5px;
  line-height: 1.4;
`;

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  margin-bottom: 5px;
`;

const TechTag = styled.span`
  background: #dce8ff;
  border: 1px solid #a0b8f0;
  border-radius: 2px;
  padding: 1px 5px;
  font-size: 9px;
  color: #0c327d;
`;

const ProjectLink = styled.a`
  font-size: 10px;
  color: #1a5cd8;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ProProjectsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ProProjectCard = styled.div`
  background: #f5f8ff;
  border: 1px solid #c0d0f8;
  border-radius: 3px;
  padding: 8px 10px;
  width: 200px;
  flex-shrink: 0;
`;

const ProProjectTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #0c327d;
  margin-bottom: 2px;
`;

const ProProjectContext = styled.div`
  font-size: 9px;
  color: #888;
  margin-bottom: 3px;
  font-style: italic;
`;

const ProProjectDesc = styled.div`
  font-size: 10px;
  color: #444;
  margin-bottom: 5px;
  line-height: 1.4;
`;

/* ─── Stack ─── */
const StackSection = styled.div`
  margin-bottom: 14px;
`;

const StackCategory = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #0c327d;
  margin-bottom: 5px;
`;

const StackTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const StackTag = styled.span`
  background: #dce8ff;
  border: 1px solid #a0b8f0;
  border-radius: 2px;
  padding: 2px 8px;
  font-size: 10px;
  color: #0c327d;
`;

/* ─── Main container ─── */
const Div = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
  .com__toolbar {
    position: relative;
    display: flex;
    align-items: center;
    line-height: 100%;
    height: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    flex-shrink: 0;
  }
  .com__options {
    height: 23px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1px 0 1px 2px;
    border-left: 0;
    flex: 1;
  }
  .com__windows-logo {
    height: 100%;
    border-left: 1px solid white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .com__function_bar {
    height: 36px;
    display: flex;
    align-items: center;
    font-size: 11px;
    padding: 1px 3px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
  }
  .com__function_bar__button {
    display: flex;
    height: 100%;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: inset 0 -1px 1px rgba(0, 0, 0, 0.1);
    }
    &:hover:active {
      border: 1px solid rgb(185, 185, 185);
      background-color: #dedede;
      box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.7);
      color: rgba(255, 255, 255, 0.7);
      & > * {
        transform: translate(1px, 1px);
      }
    }
  }
  .com__function_bar__button--disable {
    filter: grayscale(1);
    opacity: 0.7;
    display: flex;
    height: 100%;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0);
  }
  .com__function_bar__text {
    margin-right: 4px;
  }
  .com__function_bar__icon {
    height: 30px;
    width: 30px;
    &--normalize {
      height: 22px;
      width: 22px;
      margin: 0 4px 0 1px;
    }
    &--margin12 {
      height: 22px;
      width: 22px;
      margin: 0 1px 0 2px;
    }
    &--margin-1 {
      margin: 0 -1px;
      height: 30px;
      width: 30px;
    }
  }
  .com__function_bar__separate {
    height: 90%;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.2);
    margin: 0 2px;
  }
  .com__function_bar__arrow {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 4px;
    &:before {
      content: '';
      display: block;
      border-width: 3px 3px 0;
      border-color: #000 transparent;
      border-style: solid;
    }
  }
  .com__address_bar {
    flex-shrink: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.7);
    height: 20px;
    font-size: 11px;
    display: flex;
    align-items: center;
    padding: 0 2px;
    box-shadow: inset 0 -2px 3px -1px #b0b0b0;
  }
  .com__address_bar__title {
    line-height: 100%;
    color: rgba(0, 0, 0, 0.5);
    padding: 5px;
  }
  .com__address_bar__content {
    border: rgba(122, 122, 255, 0.6) 1px solid;
    height: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    background-color: white;
    position: relative;
    &__img {
      width: 14px;
      height: 14px;
    }
    &__img:last-child {
      width: 15px;
      height: 15px;
      right: 1px;
      position: absolute;
    }
    &__img:last-child:hover {
      filter: brightness(1.1);
    }
    &__text {
      white-space: nowrap;
      position: absolute;
      white-space: nowrap;
      left: 16px;
      right: 17px;
    }
  }
  .com__address_bar__go {
    display: flex;
    align-items: center;
    padding: 0 18px 0 5px;
    height: 100%;
    position: relative;
    &__img {
      height: 95%;
      border: 1px solid rgba(255, 255, 255, 0.2);
      margin-right: 3px;
    }
  }
  .com__content {
    flex: 1;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-top-width: 0;
    background-color: #f1f1f1;
    overflow: auto;
    font-size: 11px;
    position: relative;
  }
  .com__content__inner {
    display: flex;
    height: 100%;
    overflow: auto;
  }
  .com__content__left {
    width: 180px;
    min-width: 180px;
    height: 100%;
    background: linear-gradient(to bottom, #748aff 0%, #4057d3 100%);
    overflow: auto;
    padding: 10px;
  }
  .com__content__left__card {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    width: 100%;
    overflow: hidden;
  }
  .com__content__left__card:not(:last-child) {
    margin-bottom: 12px;
  }
  .com__content__left__card__header {
    display: flex;
    align-items: center;
    height: 23px;
    padding-left: 11px;
    padding-right: 2px;
    cursor: pointer;
    background: linear-gradient(
      to right,
      rgb(240, 240, 255) 0,
      rgb(240, 240, 255) 30%,
      rgb(168, 188, 255) 100%
    );
  }
  .com__content__left__card__header:hover {
    & .com__content__left__card__header__text {
      color: #1c68ff;
    }
  }
  .com__content__left__card__header__text {
    font-weight: 700;
    color: #0c327d;
    flex: 1;
  }
  .com__content__left__card__header__img {
    width: 18px;
    height: 18px;
    filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
  }
  .com__content__left__card__content {
    padding: 5px 10px;
    background: linear-gradient(
      to right,
      rgb(180, 200, 251) 0%,
      rgb(164, 185, 251) 50%,
      rgb(180, 200, 251) 100%
    );
    background-color: rgba(198, 211, 255, 0.87);
  }
  .com__content__left__card__row {
    display: flex;
    margin-bottom: 2px;
  }
  .com__content__left__card__img {
    width: 14px;
    height: 14px;
    margin-right: 5px;
  }
  .com__content__left__card__text {
    font-size: 10px;
    line-height: 14px;
    color: #0c327d;
    &.black {
      color: #000;
    }
    &.bold {
      font-weight: bold;
    }
    &.link:hover {
      cursor: pointer;
      color: #2b72ff;
      text-decoration: underline;
    }
  }
  .com__content__right {
    height: 100%;
    overflow: auto;
    background-color: #fff;
    flex: 1;
  }
  .com__content__right__card__header {
    width: 300px;
    font-weight: 700;
    padding: 2px 0 3px 12px;
    position: relative;
    &:after {
      content: '';
      display: block;
      background: linear-gradient(to right, #70bfff 0, #fff 100%);
      position: absolute;
      bottom: 0;
      left: -12px;
      height: 1px;
      width: 100%;
    }
  }
  .com__content__right__card__content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 15px 15px 0;
  }
  .com__content__right__card__item {
    display: flex;
    align-items: center;
    width: 200px;
    margin-bottom: 15px;
    height: auto;
  }
  .folder-item {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90px;
    cursor: pointer;
    padding: 6px;
    border-radius: 3px;
    border: 1px solid transparent;
    text-align: center;
    &:hover {
      background: rgba(0, 100, 255, 0.08);
      border-color: rgba(0, 100, 255, 0.2);
    }
    &:active {
      background: rgba(0, 100, 255, 0.15);
    }
  }
  .com__content__right__card__img {
    width: 45px;
    height: 45px;
    margin-right: 5px;
  }
  .folder-item .com__content__right__card__img {
    margin-right: 0;
    margin-bottom: 4px;
  }
  .com__content__right__card__text {
    white-space: nowrap;
    height: 100%;
  }
  .folder-item .com__content__right__card__text {
    white-space: normal;
    font-size: 10px;
    text-align: center;
    line-height: 1.3;
  }
`;

export default MyComputer;
