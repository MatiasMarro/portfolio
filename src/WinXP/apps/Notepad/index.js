import React, { useState } from 'react';
import styled from 'styled-components';

import { WindowDropDowns } from 'components';
import dropDownData from './dropDownData';

export default function Notepad({ onClose }) {
  const [docText, setDocText] = useState(
`================================================
  MATIAS MARRO — Curriculum Vitae
================================================
Email    : m.m.caseros.386@gmail.com
Teléfono : +54-3573-495499
GitHub   : github.com/MatiasMarro
LinkedIn : linkedin.com/in/matias-marro-30344b194/
Web      : MMportafolioweb.com

------------------------------------------------
  EDUCACIÓN
------------------------------------------------
Ingeniería Electrónica (2016 – Actualidad)
  Universidad Tecnológica Nacional — Córdoba

Bachiller en Economía y Gestión (2010 – 2015)
  Inst. Sec. Dr. Raúl Loza Luque — Luque, Córdoba

------------------------------------------------
  EXPERIENCIA PROFESIONAL
------------------------------------------------
Leistung Ingeniería SRL (Sept 2024 – Actualidad)
  Freelance Full Stack Developer — Córdoba, Argentina
  > Desarrollo web con Angular, TypeScript y C#
  > Implementación de diseños basados en Figma
  > Gestión de proyectos con Jira
  > Coordinación con equipo para entrega de calidad

FK TECH SRL (Mar 2022 – Sept 2024)
  Software Engineer — Córdoba, Argentina
  > Backend para sistemas POS (Point Of Sales)
  > APIs en múltiples lenguajes y plataformas
  > JavaScript, C, ElectronJS, Node.js, React, CSS
  > Herramientas Atlassian: Jira y Confluence
  > Soporte técnico y resolución de incidencias

M&M Digital Factory (Ene 2015 – Mar 2022)
  Diseño y Carpintería — Luque, Córdoba
  > Diseño de muebles con CAD Fusion 360
  > Operación de máquinas CNC

------------------------------------------------
  PROYECTOS
------------------------------------------------
Reconocimiento facial LFW: MLP vs CNN
  Deep Learning — UTN UBA
  > MLP vs CNN sobre dataset Labeled Faces in the Wild
  > Data augmentation, matriz de confusión
  > TensorFlow, Keras, NumPy, Pandas, Matplotlib

OpenCV — Visión por Computadora
  UTN FRC
  > Clasificación de imágenes con CNN
  > Python, OpenCV, aprendizaje automático

Monitor de Recuento de Carnes (McDonald's — FKTECH)
  > ElectronJS para conteo de productos desde POS
  > Node.js, JSON, XML, lectura de puertos USB

Monitor de Pedidos de Delivery (McDonald's — FKTECH)
  > Gestión de pedidos delivery con ElectronJS
  > Integración con dispositivos externos (DLL/COM)

Foreign Entry Order (McDonald's — FKTECH)
  > Windows Forms para emular ventas externas en POS

------------------------------------------------
  STACK TÉCNICO
------------------------------------------------
Frontend : JavaScript, React, Angular, TypeScript, CSS
Backend  : Node.js, C#, C, ElectronJS, Python
AI / ML  : TensorFlow, Keras, OpenCV, NumPy, Pandas
Tools    : Jira, Confluence, Figma, Git, POSTMAN

------------------------------------------------
  HABILIDADES
------------------------------------------------
> Análisis de requerimientos y estimación de tiempos
> Jira y Confluence para seguimiento de proyectos
> Inglés avanzado — comunicación en entornos internacionales
> Aprendizaje rápido · Adaptabilidad a nuevos entornos

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
