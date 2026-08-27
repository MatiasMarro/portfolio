import React, { useState } from 'react';
import styled from 'styled-components';

import { WindowDropDowns } from 'components';
import dropDownData from './dropDownData';

export default function Notepad({ onClose }) {
  const [docText, setDocText] = useState(
`================================================
  MATÍAS MARRO — Curriculum Vitae
  AI Engineer & Full Stack Developer
================================================
Email       : m.m.caseros.386@gmail.com
Teléfono    : +54 3573 495499
Ubicación   : Córdoba, Argentina — Remoto
GitHub      : github.com/MatiasMarro
LinkedIn    : linkedin.com/in/matias-marro-30344b194/
Hugging Face: huggingface.co/MatiasMarro
Portfolio   : matiasmarro.github.io/portfolio/

------------------------------------------------
  PERFIL PROFESIONAL
------------------------------------------------
Ingeniero de software con más de 4 años de experiencia
full stack (Angular, React, Node.js, C# / .NET) y
especialización aplicada en Inteligencia Artificial
(LLMs, RAG, fine-tuning con LoRA, deep learning).

Mi diferencial es cerrar todo el ciclo: entreno o integro
un modelo, lo despliego como API y lo conecto a una
aplicación real que la gente usa. Vengo de construir
sistemas en producción (POS desplegados en locales, apps
de gestión empresarial) y hoy aplico esa misma mentalidad
de "que funcione y se pueda mantener" a los proyectos de IA.

------------------------------------------------
  TECNOLOGÍAS
------------------------------------------------
IA & GenAI     : Fine-tuning LoRA / PEFT, RAG, LangChain
                 (LCEL), LangServe, Hugging Face, OpenAI
                 API, ChromaDB, prompt engineering,
                 evaluación de LLMs

ML / Deep      : PyTorch, TensorFlow, Keras, Scikit-learn,
Learning         XGBoost, CNN, transfer learning, visión
                 por computadora, CLIP

Frontend       : Angular, React, TypeScript, JavaScript,
                 HTML5, CSS3, Figma

Backend & APIs : Node.js, C# / .NET, FastAPI, ElectronJS,
                 REST APIs, SQL, C

DevOps & Datos : Docker, CI/CD (GitHub Actions), Git,
                 Railway, Hugging Face Spaces, Pandas,
                 NumPy, Jira

------------------------------------------------
  PROYECTOS DESTACADOS — IA / MACHINE LEARNING
------------------------------------------------
Fine-tuning LoRA para Salida Estructurada
API en producción
  PyTorch · PEFT · Transformers · FastAPI · Docker
  > Fine-tuning con LoRA sobre Qwen2.5-0.5B para que un
    asistente de soporte devolviera siempre salida
    estructurada.
  > Precisión de formato: 0% (modelo base) -> 87%,
    superando al few-shot prompting (55%) con mucho
    menos consumo de tokens.
  > Partición de datos sin fuga entre train y test, con
    un producto entero fuera del entrenamiento para
    observar cómo generalizaba a casos no vistos.
  > Desplegado como API con FastAPI + Docker en
    Hugging Face Spaces.
  Demo: huggingface.co/spaces/MatiasMarro/nimbus-lora-format-tuning

Chatbot RAG sobre documentación corporativa
Despliegue en producción
  FastAPI · LangChain · ChromaDB · OpenAI · Railway
  > Indexación de web + PDFs en ChromaDB y generación
    con gpt-4o-mini.
  > Prompt diseñado para no alucinar (respuesta fija
    cuando la información no está), verificado con tests.
  > Expuesto con FastAPI + LangServe y streaming,
    desplegado en Railway.
  App : promtior-rag-challenge-production.up.railway.app
  Repo: github.com/MatiasMarro/promptior-rag-challenge

Predicción de Churn & Visión por Computadora
  Scikit-learn · XGBoost · TensorFlow · PyTorch
  > Predicción de churn sobre dataset desbalanceado con
    validación cruzada estratificada (AUC-ROC = 0.84).
  > Segmentación semántica de escenas urbanas con FCN-8
    (~85% accuracy).
  > Búsqueda de imágenes por texto con CLIP.
  Repo: github.com/MatiasMarro/Deep-Learning

------------------------------------------------
  EXPERIENCIA PROFESIONAL
------------------------------------------------
Leistung Ingeniería SRL (Sept 2024 – Presente)
  Full Stack Developer (Freelance) — Córdoba, Argentina
  > Aplicación web de gestión empresarial: Angular +
    TypeScript en el frontend, C# / .NET en el backend.
  > Traducción de diseños Figma a interfaz final.
  > Coordinación directa con el cliente vía Jira.

FK Tech SRL — Cliente: McDonald's Corporation
(Mar 2022 – Sept 2024)
  Software Engineer — Córdoba, Argentina
  > Apps de escritorio y servicios para los sistemas POS
    desplegados en locales de McDonald's, con ElectronJS,
    Node.js, React y C.
  > Integración con hardware del local (USB, DLLs nativas,
    comunicación COM) y construcción de APIs REST.
  > Apps productivas entregadas: conteo automatizado de
    productos, monitor de delivery en tiempo real e
    interfaz de carga de ventas externas.
  > Documentación técnica en Confluence y seguimiento de
    sprints en Jira.

M&M Digital Factory (Ene 2015 – Mar 2022)
  Diseño y Carpintería — Luque, Córdoba
  > Diseño de muebles con software CAD Fusion 360.
  > Operación de máquinas CNC.

------------------------------------------------
  OTROS PROYECTOS
------------------------------------------------
Monitor de Recuento de Carnes (McDonald's — FK Tech)
  > ElectronJS + Node.js para conteo de productos desde
    el POS, con lectura de puertos USB.

Monitor de Pedidos de Delivery (McDonald's — FK Tech)
  > Monitor en tiempo real con integración a dispositivos
    externos del local (DLL / COM).

Foreign Entry Order (McDonald's — FK Tech)
  > Windows Forms para carga de ventas externas en el POS.

Reconocimiento facial LFW: MLP vs CNN (UTN / UBA)
  > Comparación MLP vs CNN sobre Labeled Faces in the
    Wild, con data augmentation y matriz de confusión.

OpenCV — Visión por Computadora (UTN FRC)
  > Clasificación de imágenes con redes convolucionales.

Juegos en C / C++ con Allegro
  > Space Invaders, Moon Landing, Pong y My First Game.
  > github.com/MatiasMarro

------------------------------------------------
  EDUCACIÓN Y CERTIFICACIONES
------------------------------------------------
Ingeniería Electrónica (estudiante avanzado)
  Universidad Tecnológica Nacional — FRC, Córdoba
  > Formación orientada a visión por computadora y
    deep learning.

Bachiller en Economía y Gestión (2010 – 2015)
  Inst. Sec. Dr. Raúl Loza Luque — Luque, Córdoba

Curso de Deep Learning — UTN / BA
  validator.centrodeelearning.com/validator/VzfVf7OLmX

Curso de Machine Learning — UTN / BA
  validator.centrodeelearning.com/validator/nXd7S7gU8g

------------------------------------------------
  IDIOMAS
------------------------------------------------
Español : Nativo
Inglés  : Avanzado — lectura técnica, documentación y
          comunicación profesional

================================================
`);
  const [wordWrap, setWordWrap] = useState(false);

  function onClickOptionItem(item) {
    switch (item) {
      case 'Exit':
        onClose();
        break;
      case 'Word Wrap':
        setWordWrap(!wordWrap);
        break;
      case 'Time/Date':
        const date = new Date();
        setDocText(
          `${docText}${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
        );
        break;
      default:
    }
  }
  function onTextAreaKeyDown(e) {
    // handle tabs in text area
    if (e.which === 9) {
      e.preventDefault();
      e.persist();
      var start = e.target.selectionStart;
      var end = e.target.selectionEnd;
      setDocText(`${docText.substring(0, start)}\t${docText.substring(end)}`);

      // asynchronously update textarea selection to include tab
      // workaround due to https://github.com/facebook/react/issues/14174
      requestAnimationFrame(() => {
        e.target.selectionStart = start + 1;
        e.target.selectionEnd = start + 1;
      });
    }
  }

  return (
    <Div>
      <section className="np__toolbar">
        <WindowDropDowns items={dropDownData} onClickItem={onClickOptionItem} />
      </section>
      <StyledTextarea
        wordWrap={wordWrap}
        value={docText}
        onChange={e => setDocText(e.target.value)}
        onKeyDown={onTextAreaKeyDown}
        spellCheck={false}
      />
    </Div>
  );
}

const Div = styled.div`
  height: 100%;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .np__toolbar {
    position: relative;
    height: 21px;
    flex-shrink: 0;
    border-bottom: 1px solid white;
  }
`;

const StyledTextarea = styled.textarea`
  flex: auto;
  outline: none;
  font-family: 'Lucida Console', monospace;
  font-size: 13px;
  line-height: 14px;
  resize: none;
  padding: 2px;
  ${props => (props.wordWrap ? '' : 'white-space: nowrap; overflow-x: scroll;')}
  overflow-y: scroll;
  border: 1px solid #96abff;
`;
