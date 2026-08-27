import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

/*
 * TODO matias: configurá la variable de entorno en un archivo ".env" (raíz del proyecto).
 * Copiá ".env.example" → ".env" y completá el valor de Formspree.
 * Mientras no esté configurada, el botón Send mostrará un error claro.
 *
 * Variable necesaria:
 *   REACT_APP_FORMSPREE_ID=tu_form_id
 *
 * Para el deploy en GitHub Actions, agregá el secret en:
 * Settings → Secrets and variables → Actions → New repository secret
 *   Name:  REACT_APP_FORMSPREE_ID
 *   Value: tu_form_id
 */

const FORMSPREE_ID = process.env.REACT_APP_FORMSPREE_ID;

const TO_EMAIL = 'm.m.caseros.386@gmail.com';

const FOLDERS = [
  { id: 'inbox',   label: 'Inbox',         unread: 1 },
  { id: 'outbox',  label: 'Outbox',        unread: 0 },
  { id: 'sent',    label: 'Sent Items',    unread: 0 },
  { id: 'deleted', label: 'Deleted Items', unread: 0 },
  { id: 'drafts',  label: 'Drafts',        unread: 0 },
];

const WELCOME_MSG = {
  from: 'Matías Marro <m.m.caseros.386@gmail.com>',
  subject: 'Bienvenido a mi portfolio',
  date: 'Aug 27, 2026',
  body:
`Hola! Gracias por visitar mi portfolio.

Soy Matías Marro, AI Engineer y Full Stack Developer.
Trabajo con LLMs (RAG, fine-tuning con LoRA), PyTorch y
FastAPI, con más de 4 años construyendo software en
producción con Angular, React, Node.js y C# / .NET.

Mi diferencial es cerrar todo el ciclo: entreno o integro
un modelo, lo despliego como API y lo conecto a una
aplicación real que la gente usa.

Dos proyectos que podés ver funcionando ahora mismo:

  > Fine-tuning LoRA para salida estructurada
    (precisión de formato: 0% -> 87%)
    huggingface.co/spaces/MatiasMarro/nimbus-lora-format-tuning

  > Chatbot RAG en producción sobre documentación
    corporativa, con FastAPI + LangServe y streaming
    promtior-rag-challenge-production.up.railway.app

Usá el botón "New Message" para escribirme directamente.
Podés editar el asunto y el mensaje como quieras.

El resto está en la carpeta "My Computer" del escritorio,
empezando por "IA / Machine Learning".

— Matías`,
};

const VIEWS = { INBOX: 'inbox', COMPOSE: 'compose' };

export default function Mail({ onClose }) {
  const [view,            setView]      = useState(VIEWS.COMPOSE);
  const [selectedFolder,  setFolder]    = useState('inbox');
  const [selectedMsg,     setMsg]       = useState(WELCOME_MSG);
  const [status,          setStatus]    = useState('idle'); // idle | sending | sent | error
  const [errorText,       setErrorText] = useState('');

  // Compose fields
  const [fromName,  setFromName]  = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [subject,   setSubject]   = useState('');
  const [body,      setBody]      = useState('');

  const formRef = useRef(null);

  const messages = selectedFolder === 'inbox' ? [WELCOME_MSG] : [];

  function openCompose() {
    setStatus('idle');
    setErrorText('');
    setView(VIEWS.COMPOSE);
  }

  function closeCompose() {
    setView(VIEWS.INBOX);
    setStatus('idle');
  }

  async function handleSend(e) {
    e.preventDefault();

    if (!FORMSPREE_ID) {
      setStatus('error');
      setErrorText(
        'Formspree no está configurado.\n' +
        'Completá REACT_APP_FORMSPREE_ID en el archivo .env\n' +
        '(ver TODO matias en Mail/index.js o .env.example)'
      );
      return;
    }

    if (!fromName.trim() || !fromEmail.trim() || !subject.trim() || !body.trim()) {
      setStatus('error');
      setErrorText('Por favor completá todos los campos antes de enviar.');
      return;
    }

    setStatus('sending');
    setErrorText('');

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name:     fromName.trim(),
          email:    fromEmail.trim(),
          _replyto: fromEmail.trim(),
          subject:  subject.trim(),
          message:  body.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors?.[0]?.message || 'Error desconocido');
      }

      setStatus('sent');
      setFolder('sent');
      setView(VIEWS.INBOX);
      setFromName('');
      setFromEmail('');
      setSubject('');
      setBody('');
    } catch (err) {
      setStatus('error');
      setErrorText(`No se pudo enviar el mensaje: ${err.message}`);
    }
  }

  return (
    <Div>
      {/* ══ TOOLBAR ══ */}
      <div className="oe__toolbar">
        {view === VIEWS.INBOX ? (
          <>
            <ToolBtn primary onClick={openCompose}>
              <BtnIcon>✉</BtnIcon>
              <span>New Message</span>
            </ToolBtn>
            <ToolSep />
            <ToolBtn disabled><BtnIcon>↩</BtnIcon><span>Reply</span></ToolBtn>
            <ToolBtn disabled><BtnIcon>↪</BtnIcon><span>Forward</span></ToolBtn>
            <ToolSep />
            <ToolBtn disabled><BtnIcon>✂</BtnIcon><span>Print</span></ToolBtn>
            <ToolSep />
            <ToolBtn disabled><BtnIcon>⇅</BtnIcon><span>Send/Recv</span></ToolBtn>
          </>
        ) : (
          <>
            <ToolBtn primary onClick={handleSend} disabled={status === 'sending'}>
              <BtnIcon>{status === 'sending' ? '⏳' : '📤'}</BtnIcon>
              <span>{status === 'sending' ? 'Sending...' : 'Send'}</span>
            </ToolBtn>
            <ToolSep />
            <ToolBtn disabled><BtnIcon>✂</BtnIcon><span>Cut</span></ToolBtn>
            <ToolBtn disabled><BtnIcon>📋</BtnIcon><span>Copy</span></ToolBtn>
            <ToolBtn disabled><BtnIcon>📌</BtnIcon><span>Paste</span></ToolBtn>
            <ToolSep />
            <ToolBtn onClick={closeCompose}>
              <BtnIcon>✖</BtnIcon>
              <span>Close</span>
            </ToolBtn>
          </>
        )}
      </div>

      {/* ══ BODY ══ */}
      <div className="oe__body">

        {/* Left: folder tree */}
        <div className="oe__folders">
          <div className="oe__folders__header">Folders</div>
          <div className="oe__folders__tree">
            <div className="oe__folders__group">📁 Local Folders</div>
            {FOLDERS.map(f => (
              <div
                key={f.id}
                className={`oe__folders__item${selectedFolder === f.id ? ' active' : ''}`}
                onClick={() => { setFolder(f.id); setMsg(null); setView(VIEWS.INBOX); }}
              >
                <span>
                  {f.label}
                  {f.id === 'inbox' && status === 'idle'
                    ? <strong> ({f.unread})</strong>
                    : null}
                  {f.id === 'sent' && status === 'sent'
                    ? <strong> (1)</strong>
                    : null}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="oe__right">

          {/* ── INBOX VIEW ── */}
          {view === VIEWS.INBOX && (
            <>
              {/* message list */}
              <div className="oe__list">
                <div className="oe__list__head">
                  <span className="col col--from">From</span>
                  <span className="col col--subject">Subject</span>
                  <span className="col col--date">Date</span>
                </div>
                {messages.length === 0 ? (
                  <div className="oe__list__empty">No messages</div>
                ) : (
                  messages.map((m, i) => (
                    <div
                      key={i}
                      className={`oe__list__row${selectedMsg === m ? ' active' : ''}`}
                      onClick={() => setMsg(m)}
                    >
                      <span className="col col--from">{m.from}</span>
                      <span className="col col--subject">{m.subject}</span>
                      <span className="col col--date">{m.date}</span>
                    </div>
                  ))
                )}
                {selectedFolder === 'sent' && status === 'sent' && (
                  <div className="oe__list__row">
                    <span className="col col--from">Me</span>
                    <span className="col col--subject">{subject || '(sin asunto)'}</span>
                    <span className="col col--date">just now</span>
                  </div>
                )}
                {selectedFolder !== 'inbox' && selectedFolder !== 'sent' && (
                  <div className="oe__list__empty">No messages</div>
                )}
              </div>

              {/* preview */}
              <div className="oe__preview">
                {status === 'sent' && selectedFolder === 'inbox' && (
                  <SentBanner>
                    ✅ Mensaje enviado con éxito. Voy a responderte a la brevedad.
                  </SentBanner>
                )}
                {selectedMsg ? (
                  <>
                    <div className="oe__preview__head">
                      <div><strong>From:</strong> {selectedMsg.from}</div>
                      <div><strong>Subject:</strong> {selectedMsg.subject}</div>
                      <div><strong>Date:</strong> {selectedMsg.date}</div>
                    </div>
                    <div className="oe__preview__body">{selectedMsg.body}</div>
                  </>
                ) : (
                  <div className="oe__preview__empty" />
                )}
              </div>
            </>
          )}

          {/* ── COMPOSE VIEW ── */}
          {view === VIEWS.COMPOSE && (
            <ComposeForm ref={formRef} onSubmit={handleSend}>
              <div className="compose__fields">
                <div className="compose__row">
                  <label className="compose__label">To:</label>
                  <div className="compose__to">{TO_EMAIL}</div>
                </div>
                <div className="compose__divider" />
                <div className="compose__row">
                  <label className="compose__label">From:</label>
                  <input
                    className="compose__input"
                    type="email"
                    placeholder="tu@email.com"
                    value={fromEmail}
                    onChange={e => setFromEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="compose__divider" />
                <div className="compose__row">
                  <label className="compose__label">Name:</label>
                  <input
                    className="compose__input"
                    type="text"
                    placeholder="Tu nombre"
                    value={fromName}
                    onChange={e => setFromName(e.target.value)}
                    required
                  />
                </div>
                <div className="compose__divider" />
                <div className="compose__row">
                  <label className="compose__label">Subject:</label>
                  <input
                    className="compose__input"
                    type="text"
                    placeholder="Asunto del mensaje"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="compose__toolbar2">
                {/* TODO matias: podés agregar botones de formato (Bold, Italic) acá si querés */}
                <span className="compose__toolbar2__hint">Plain text</span>
              </div>

              <textarea
                className="compose__body"
                placeholder="Escribí tu mensaje acá..."
                value={body}
                onChange={e => setBody(e.target.value)}
                required
                spellCheck={false}
              />

              {status === 'error' && (
                <ErrorBanner>
                  ⚠️ {errorText}
                </ErrorBanner>
              )}
            </ComposeForm>
          )}

        </div>
      </div>

      {/* ══ STATUS BAR ══ */}
      <div className="oe__statusbar">
        <span>
          {view === VIEWS.COMPOSE
            ? (status === 'sending' ? 'Enviando mensaje...' : 'New Message')
            : `${messages.length} message(s)`}
        </span>
        <StatusOnline>🌐 Online</StatusOnline>
      </div>
    </Div>
  );
}

/* ─── Toolbar ─── */
const ToolBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 3px 8px;
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};
  opacity: ${p => (p.disabled ? 0.42 : 1)};
  font-size: 10px;
  font-family: Tahoma, sans-serif;
  color: #000;
  min-width: 48px;
  gap: 2px;
  ${p => p.primary && 'font-weight: 700;'}
  &:hover:not([disabled]) {
    border-color: #a0a8c0;
    background: linear-gradient(to bottom, #f8faff 0%, #e0e8f8 100%);
  }
  &:active:not([disabled]) {
    background: #ccd8f0;
  }
`;
const ToolSep = styled.div`
  width: 1px; height: 36px;
  background: #b0bcd0; margin: 0 3px; flex-shrink: 0;
`;
const BtnIcon = styled.span`font-size: 16px; line-height: 1;`;

/* ─── Compose ─── */
const ComposeForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  .compose__fields {
    background: #f4f6fd;
    border-bottom: 2px solid #a8b8d8;
    flex-shrink: 0;
  }
  .compose__row {
    display: flex;
    align-items: center;
    padding: 0 8px;
    min-height: 22px;
  }
  .compose__label {
    width: 56px;
    font-size: 11px;
    font-weight: 700;
    color: #334;
    flex-shrink: 0;
    font-family: Tahoma, sans-serif;
  }
  .compose__to {
    font-size: 11px;
    color: #333;
    padding: 2px 4px;
    font-family: Tahoma, sans-serif;
  }
  .compose__input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 11px;
    font-family: Tahoma, sans-serif;
    background: transparent;
    padding: 2px 4px;
    color: #111;
    &:focus {
      background: #fff;
      border-bottom: 1px solid #6080d0;
    }
  }
  .compose__divider {
    height: 1px;
    background: #c8d4e8;
    margin: 0 8px;
  }
  .compose__toolbar2 {
    display: flex;
    align-items: center;
    padding: 2px 8px;
    background: linear-gradient(to bottom, #e0e8f8 0%, #d0daf0 100%);
    border-bottom: 1px solid #b0bcd8;
    flex-shrink: 0;
    font-size: 10px;
    color: #666;
  }
  .compose__toolbar2__hint { margin-left: auto; font-style: italic; }
  .compose__body {
    flex: 1;
    resize: none;
    border: none;
    outline: none;
    padding: 8px 10px;
    font-size: 12px;
    font-family: 'Courier New', Courier, monospace;
    line-height: 1.5;
    color: #111;
    background: white;
  }
`;

const pulse = keyframes`
  0%,100% { opacity:1; }
  50%      { opacity:0.6; }
`;

const ErrorBanner = styled.div`
  background: #fff3cd;
  border-top: 1px solid #e0b060;
  color: #7a4a00;
  font-size: 11px;
  padding: 6px 12px;
  white-space: pre-wrap;
  flex-shrink: 0;
  font-family: Tahoma, sans-serif;
`;

const SentBanner = styled.div`
  background: #d4edda;
  border-bottom: 1px solid #82c887;
  color: #1a5c2a;
  font-size: 11px;
  padding: 6px 12px;
  font-family: Tahoma, sans-serif;
  animation: ${pulse} 2s ease 1;
`;

const StatusOnline = styled.span`color: #1a7a1a; font-weight: 700;`;

/* ─── Main shell ─── */
const Div = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: Tahoma, 'Noto Sans', sans-serif;
  font-size: 11px;
  background: #d0daf0;
  overflow: hidden;

  .oe__toolbar {
    display: flex;
    align-items: center;
    padding: 2px 4px;
    background: linear-gradient(to bottom, #e8eef8 0%, #d0d8ec 100%);
    border-bottom: 1px solid #a0b0cc;
    flex-shrink: 0;
    gap: 1px;
  }

  .oe__body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  /* ── Folders ── */
  .oe__folders {
    width: 155px;
    min-width: 155px;
    background: #f2f4fc;
    border-right: 1px solid #a0b0cc;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    flex-shrink: 0;
  }
  .oe__folders__header {
    background: linear-gradient(to right, #4060c0, #2a48a0);
    color: white;
    font-weight: 700;
    font-size: 10px;
    padding: 3px 8px;
    flex-shrink: 0;
  }
  .oe__folders__tree { padding: 4px 0; }
  .oe__folders__group {
    font-size: 10px;
    font-weight: 700;
    color: #334;
    padding: 2px 8px;
  }
  .oe__folders__item {
    display: flex;
    align-items: center;
    padding: 2px 8px 2px 20px;
    cursor: pointer;
    font-size: 11px;
    white-space: nowrap;
    &:hover { background: #dce8ff; }
    &.active {
      background: #2a50b8;
      color: white;
      &:hover { background: #2448a8; }
    }
  }

  /* ── Right panel ── */
  .oe__right {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: white;
  }

  /* ── Message list ── */
  .oe__list {
    height: 108px;
    min-height: 108px;
    border-bottom: 2px solid #a0b0cc;
    overflow-y: auto;
    flex-shrink: 0;
  }
  .oe__list__head {
    display: flex;
    background: linear-gradient(to bottom, #e8ecf8 0%, #d8e0f0 100%);
    border-bottom: 1px solid #b0bcd8;
    font-weight: 700;
    font-size: 10px;
    color: #334;
    padding: 2px 4px;
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .col {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 4px;
    &--from    { width: 175px; flex-shrink: 0; }
    &--subject { flex: 1; }
    &--date    { width: 80px; flex-shrink: 0; text-align: right; }
  }
  .oe__list__row {
    display: flex;
    padding: 3px 4px;
    cursor: pointer;
    border-bottom: 1px solid #eef0f8;
    font-weight: 700;
    &:hover { background: #eef2ff; }
    &.active {
      background: #2a50b8;
      color: white;
      &:hover { background: #2448a8; }
    }
  }
  .oe__list__empty {
    padding: 12px;
    color: #888;
    text-align: center;
    font-size: 11px;
  }

  /* ── Preview ── */
  .oe__preview {
    flex: 1;
    overflow-y: auto;
    background: white;
    display: flex;
    flex-direction: column;
  }
  .oe__preview__head {
    background: #f0f4ff;
    border-bottom: 1px solid #c0d0ec;
    padding: 6px 12px;
    font-size: 11px;
    line-height: 1.8;
    color: #222;
    flex-shrink: 0;
  }
  .oe__preview__body {
    padding: 12px 14px;
    font-size: 12px;
    line-height: 1.6;
    color: #222;
    white-space: pre-wrap;
    font-family: 'Courier New', Courier, monospace;
    flex: 1;
  }
  .oe__preview__empty { flex: 1; background: #f8faff; }

  /* ── Status bar ── */
  .oe__statusbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 8px;
    font-size: 10px;
    color: #444;
    background: linear-gradient(to bottom, #d8e0f0 0%, #c8d4e8 100%);
    border-top: 1px solid #a0b0cc;
    flex-shrink: 0;
  }
`;
