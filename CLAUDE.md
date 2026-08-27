# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Portfolio Windows XP — Guía del Proyecto

Portfolio personal de **Matías Marro** con temática Windows XP. SPA de React (CRA) **sin backend**: todo el contenido del CV está hardcodeado dentro de los componentes. Deploy automático a GitHub Pages en cada push a `main`.

**Live:** https://matiasmarro.github.io/portfolio/ · **Repo:** `MatiasMarro/portfolio`

El objetivo del proyecto no es la simulación de XP (eso ya funciona): es que el **contenido profesional esté al día y venda bien**. La simulación es el envoltorio.

---

## Flujo de Trabajo (OBLIGATORIO ante cualquier objetivo de desarrollo)

Actuar como **AI Engineer + Full Stack Engineer, experto en UX/UI y diseño responsive**.

Cuando el usuario pida desarrollar, fixear, evaluar o analizar algo:

### 1. Analizar antes de codear
- Analizar TODOS los componentes y superficies relacionadas al objetivo. Si el objetivo toca contenido del CV, revisar **las 6 superficies a la vez** (ver [Contenido del CV](#contenido-del-cv--dónde-vive-cada-dato)): están duplicadas y se desincronizan solas.
- **No avanzar sin el modelo mental claro**: si algo del objetivo no se entiende o hay dudas de diseño, PREGUNTAR antes de inventar.
- Nunca inventar datos del CV (empresas, métricas, fechas, links). Si un dato no está en `main.tex` ni en el código, preguntar.

### 2. Armar plan y esperar aprobación
- Presentar un plan con tareas **T1, T2, ...** seccionadas estratégicamente para optimizar resultados.
- Sugerir modelo por tarea: `opus/fable` (rediseño de secciones, arquitectura, refactors grandes), `sonnet` (implementación estándar), `haiku` (cambios de copy o mecánicos).
- **NO codear nada hasta que el usuario indique qué tarea ejecutar.** El usuario decide el orden y el alcance.
- Si el análisis muestra que refactorizar es la mejor opción, proponerlo como tarea dentro del plan (no hacerlo por cuenta propia).

### 3. Reglas de trabajo
- No refactorizar código no relacionado al objetivo.
- Eliminar código en desuso que quede huérfano por el cambio (imports, constantes, styled-components muertos). Los `styled-components` sin usar **no rompen el build ni el lint**: hay que buscarlos a mano.
- **Contenido del portfolio en español** (es el idioma del CV y del público objetivo). Código, variables y funciones en inglés, como el resto del repo.
- **NUNCA USAR EMOJIS DE IA.** Los glifos que ya existen en la UI de Outlook Express son parte del diseño previo: no agregar más ni extenderlos a otras apps.
- SIEMPRE COMENTAR CÓDIGO LO JUSTO Y NECESARIO, DE FORMA ESTÁNDAR Y PROFESIONAL. No comentar lo obvio.
- Ser concreto: explicaciones claras y sin explayarse de más (ahorro de tokens).
- **El usuario testea manualmente**: nunca ejecutar `npm start` ni intentar probar features en el navegador. El gate automatizable es `npm run build` (ver [Comandos](#comandos)).
- Al terminar una tarea DEBES DEJAR SIEMPRE UN TEXTO DE COMMIT BREVE PARA COPIAR DE MENOS DE DOS RENGLONES. El commit y el push los hace siempre el usuario.
- **Cuidado con el push**: cada push a `main` dispara el deploy a producción. Nunca pushear por cuenta propia.

### 4. Tests
Este repo **no tiene tests y no los necesita**: es contenido estático sin lógica de negocio crítica. `react-scripts test` existe pero no hay ningún archivo de test.

- **No crear tests salvo pedido explícito del usuario.**
- La validación de una tarea es: `npm run build` en verde + revisión manual del usuario.
- Si el usuario alguna vez pide tests, montar la infra desde cero es parte del alcance — decirlo antes de arrancar.

### 5. Sincronización con el CV (`main.tex`) — CRÍTICO
`main.tex` (raíz del repo) es el **CV real, mantenido en Overleaf**. Es el núcleo de verdad del contenido profesional.

**Modelo superset**: el CV es el núcleo; el portfolio lo amplía.
- Todo lo que está en `main.tex` **debe** estar en el portfolio y **debe coincidir** (identidad, headline, bio, experiencia, proyectos destacados de IA, métricas, links, educación).
- El portfolio **puede** conservar extras que no entran en una página de CV: juegos en C/C++, proyectos académicos (LFW, OpenCV), educación secundaria, experiencia pre-software (M&M Digital Factory). Estos extras van **después** del núcleo, nunca compitiendo con él.
- Lo que está **comentado** en `main.tex` (hoy: la fila `Cloud & MLOps` con AWS/Airflow/Kubernetes) **no se publica**. Está comentado a propósito.

**Identidad vigente según `main.tex`**: `AI Engineer & Full Stack Developer`. No revertir a "Full Stack Developer · Software Engineer" (posicionamiento viejo).

Si `main.tex` cambia, propagar a las 6 superficies de la tabla de abajo en la misma tarea. Si no se propaga a todas, el portfolio queda contradiciéndose a sí mismo.

---

## Comandos

Todos desde la raíz del repo:

```bash
npm install --legacy-peer-deps   # OBLIGATORIO el flag (ver Áreas de atención)
npm start                        # Dev localhost:3000 (NO ejecutar: el usuario testea manualmente)
npm run build                    # Build de producción a ./build — este es el gate real
npm run lint                     # eslint src (ver caveat en Áreas de atención)
npm test                         # react-scripts test — hoy no hay tests
```

No hay pre-commit, husky ni hooks de git. El formato lo define `.prettierrc` (`singleQuote: true`, `trailingComma: "all"`) y se aplica desde el editor.

---

## Arquitectura

**Stack**: React 16.14 (`ReactDOM.render`, API legacy — **no** `createRoot`), `react-scripts` 5.0.1 (CRA, sin eject), `styled-components` 4.4 (todo el CSS vive en JS), `react-use` (`useMouse`, `useWindowSize`), `lodash.samplesize` (Minesweeper), `webamp` (Winamp, hoy desactivado). Sin router, sin state manager, sin TypeScript, sin backend.

**Imports absolutos**: `jsconfig.json` fija `baseUrl: "src"`. Por eso `import { WindowDropDowns } from 'components'` y `import ie from 'assets/windowsIcons/ie.png'` funcionan sin `../../`. Usar siempre la forma absoluta.

### Ciclo de arranque

`src/index.js` → `src/App.js` → `Loader` → `WinXP`

`App.js` tiene un único `useState` (`loggedIn`). Antes del login renderiza `components/Loader`, que corre una secuencia de fases por `setTimeout` (`step2` barra de carga → `step3` transición azul → `login`). Al hacer click en la tarjeta de usuario se reproduce `assets/sounds/windows-xp-startup.wav` y recién ahí se monta `WinXP`.

> Nota: `Loader` arranca en `'step2'` y el timer `t1` vuelve a setear `'step2'` a los 2000 ms — `step1` es código muerto alcanzable solo cambiando el estado inicial.

### El "sistema operativo" es un solo reducer

**`src/WinXP/index.js`** es el corazón del proyecto: un `useReducer` que modela escritorio, ventanas, foco, selección y apagado. No hay estado global fuera de ahí.

```
state = {
  apps,        // ventanas abiertas: [{ id, component, header, defaultSize, defaultOffset,
               //                       resizable, minimized, maximized, zIndex, injectProps? }]
  nextAppID,   // contador incremental de ids
  nextZIndex,  // contador incremental de z-index — el foco ES el z-index más alto
  focusing,    // FOCUSING.WINDOW | ICON | DESKTOP
  icons,       // iconos del escritorio: [{ id, icon, title, component, isFocus }]
  selecting,   // punto de inicio del rectángulo de selección, o null
  powerState,  // POWER_STATE.START | LOG_OFF | TURN_OFF
}
```

Detalles que hay que entender antes de tocarlo:

- **El foco es derivado, no almacenado**: `getFocusedAppId()` ordena `apps` por `zIndex` descendente y devuelve la primera no minimizada. Enfocar = asignar `nextZIndex` y subir el contador.
- **`DEL_APP`, `MINIMIZE_APP` y `TOGGLE_MAXIMIZE_APP` son no-ops si `focusing !== FOCUSING.WINDOW`.** Un bug de "el botón cerrar no hace nada" casi siempre es esto.
- **`multiInstance`** decide si `ADD_APP` abre otra ventana o solo re-enfoca la existente (busca por identidad de `component`).
- **`onClickMenuItem`** (menú Inicio) mapea strings a `appSettings` con una cadena de `if/else`. **Cualquier string no contemplado abre el `ErrorBox`** — ese es el comportamiento deseado (chiste de XP), no un bug. Al agregar una app hay que sumar su rama acá o no se abre desde el menú Inicio.
- Constantes en `WinXP/constants/` (`FOCUSING`, `POWER_STATE`) y `WinXP/constants/actions.js`.

### Registrar una app nueva

**`src/WinXP/apps/index.js`** es el registry. Una app se declara en hasta tres lugares, según dónde deba aparecer:

| Export | Qué controla |
|---|---|
| `defaultAppState` | Ventanas abiertas al arrancar el escritorio |
| `defaultIconState` | Iconos del escritorio (doble click → `ADD_APP`) |
| `appSettings` | Plantilla usada por el menú Inicio y por `onDoubleClickIcon` |

`appSettings` es lo único obligatorio: `onDoubleClickIcon` busca ahí por identidad de `component`. Si un icono apunta a un componente que no está en `appSettings`, el doble click no hace nada.

Forma de una entrada:

```js
'Outlook Express': {
  header: { icon, title, buttons: ['close'], noFooterWindow: true, invisible: true },
  component: Mail,
  defaultSize:   { width: 680, height: 480 },   // 0 = alto/ancho automatico
  defaultOffset: { x: 160, y: 40 },
  resizable: true,
  minimized: false,
  maximized: window.innerWidth < 800,           // OJO: se evalua al importar el modulo
  multiInstance: false,
}
```

(`buttons`, `noFooterWindow` e `invisible` son opcionales; por defecto la ventana trae los tres botones y sí aparece en la barra de tareas.)

`Winamp` está comentado en las tres listas (la dep `webamp` sigue instalada). Para reactivarlo hay que descomentar los tres bloques, no solo uno.

### Chrome de ventana y drag/resize

- **`src/WinXP/Windows/index.js`** dibuja el marco XP (`header__bg` con los gradientes azules según foco) e **invoca el componente de la app como función**: `component({ onClose, onMinimize, isFocus, ...injectProps })`. **No es JSX** (`<Component />`): los hooks de la app se montan en el árbol de hooks de `Window`, no en uno propio. No convertir a JSX sin entender el impacto.
- Toda app recibe siempre `onClose`, `onMinimize` e `isFocus` como props. `injectProps` inyecta extras (lo usa `ErrorBox` para el `message`).
- **`src/hooks/useElementResize.js`** (~16 KB) implementa arrastre y resize por los 8 bordes con listeners nativos de `mousemove`/`mouseup` sobre `window`, más un `div` "cover" a pantalla completa para que el `iframe` de Paint no se coma los eventos. `dragRef` apunta al `header`; el resto del elemento es la zona de resize (`resizeThreshold: 10 px`).
- El `boundary` que le pasa `Windows` (`bottom: windowHeight - 31`) es lo que impide arrastrar una ventana detrás de la barra de tareas.
- `maximized` no usa el reducer para las medidas: `Windows` calcula `windowWidth + 6` / `windowHeight - 24` y offset `-3,-3` a mano.

### Escritorio, barra de tareas y menú Inicio

- **`WinXP/Icons/`**: cada icono se auto-mide con `getBoundingClientRect()` y reporta su rect a `Icons`, que hace intersección contra el rectángulo de selección (`components/DashedBox`) para el drag-select múltiple.
- **`WinXP/Footer/`**: barra de tareas + reloj (`setInterval` de 1 s) + `Balloon` ("Your computer might be at risk", aparece a los 3 s). `FooterMenuData.js` (~10 KB) es el árbol completo del menú Inicio, puramente decorativo salvo las entradas cableadas en `onClickMenuItem`.
- **`WinXP/Modal/`**: se renderiza con `createPortal` sobre `document.body` para Log Off / Turn Off; ambos botones terminan abriendo un `ErrorBox`.

### Apps

| App | Archivo | Qué es |
|---|---|---|
| Internet Explorer | `apps/InternetExplorer/` | Chrome de IE6 (toolbar, address bar, status bar) envolviendo `components/Google`. **`Google/Main.js` es la home del portfolio.** `Google/Search.js` es el gag de "no results". |
| My Computer | `apps/MyComputer/` | Explorador con navegación por carpetas via `useState(view)` y el enum `VIEWS`. Cada carpeta es una vista de contenido del CV. |
| Notepad | `apps/Notepad/` | `textarea` editable precargada con el CV en texto plano. |
| Outlook Express | `apps/Mail/` | Formulario de contacto real contra **Formspree**. Abre en vista `COMPOSE` por defecto. |
| Minesweeper | `apps/Minesweeper/` | Juego funcional con su propio `useReducer`. Lógica en `index.js`, render en `MinesweeperView.js`. Ajeno al portfolio. |
| Paint | `apps/Paint/` | `iframe` a `jspaint.app` + overlay que traga eventos cuando `!isFocus`. |
| ErrorBox | `apps/ErrorBox/` | Diálogo de error genérico, reproduce `error.wav`. |
| Winamp | `apps/Winamp/` | `webamp` con tracks remotos. **Desactivado.** |

Cada app con menú (`File / Edit / View...`) trae su propio `dropDownData.js` y lo pasa a `components/WindowDropDowns`; los items se manejan por `switch` sobre el string del item.

---

## Contenido del CV — dónde vive cada dato

**No hay CMS ni JSON compartido: el CV está duplicado en 6 superficies.** Tocar una sola las desincroniza. Al actualizar contenido profesional, revisarlas todas:

| # | Superficie | Archivo | Formato del dato |
|---|---|---|---|
| 1 | Home del portfolio (dentro de IE) | `src/components/Google/Main.js` | Arrays `skills`, `experience`, `aiProjects`, `projects` + JSX del hero y del footer |
| 2 | Carpetas de My Computer | `src/WinXP/apps/MyComputer/index.js` | Consts `AI_PROJECTS`, `PROFESSIONAL_PROJECTS`, `GAME_PROJECTS` + arrays inline en las vistas `EXPERIENCE` / `EDUCATION` / `STACK` |
| 3 | CV en texto plano | `src/WinXP/apps/Notepad/index.js` | Un template literal gigante en el `useState` inicial |
| 4 | Mail de bienvenida | `src/WinXP/apps/Mail/index.js` | Const `WELCOME_MSG` |
| 5 | SEO / og tags | `public/index.html` | `title`, `description`, `og:title`, `og:description` |
| 6 | Documentación pública | `README.md` | Bio, stack y tabla de apps |

`main.tex` (raíz) es el origen de todo lo anterior — ver [Sincronización con el CV](#5-sincronización-con-el-cv-maintex--crítico).

**Links canónicos** (usar exactamente estos; hubo links muertos en el pasado):

```
Email        m.m.caseros.386@gmail.com
Teléfono     +54 3573 495499
GitHub       https://github.com/MatiasMarro
LinkedIn     https://www.linkedin.com/in/matias-marro-30344b194/
Portfolio    https://matiasmarro.github.io/portfolio/
HuggingFace  https://huggingface.co/MatiasMarro
Demo LoRA    https://huggingface.co/spaces/MatiasMarro/nimbus-lora-format-tuning
App RAG      https://promtior-rag-challenge-production.up.railway.app/
Repo RAG     https://github.com/MatiasMarro/promptior-rag-challenge
Repo DL      https://github.com/MatiasMarro/Deep-Learning
```

---

## Responsive y diseño

El portfolio se ve en móvil, pero **la simulación de escritorio es mouse-only**.

- `useElementResize` escucha **solo** `mousedown`/`mousemove`/`mouseup`. No hay `touchstart` ni Pointer Events: **en touch no se puede arrastrar ni redimensionar ventanas**. Cualquier tarea de "arreglar mobile" arranca acá.
- El fallback existente es `maximized: window.innerWidth < 800` en `appSettings` y `defaultAppState`. Se evalúa **una sola vez al importar el módulo**: no reacciona a rotación ni a resize.
- Los breakpoints reales del contenido son pocos y viven en styled-components: `Google/Main.js` (`max-width: 600px`, colapsa las grillas a una columna), `Google/Search.js` (`800px`), `Loader/index.js` (`600px`, oculta el logo y el divisor del login).
- Al escribir contenido nuevo dentro de una app, respetar el ancho útil de la ventana (`defaultSize`), no el viewport: una ventana de 680 px de ancho es el espacio real.
- Tipografías: `Tahoma` para el chrome de XP, `Arial` para la home de IE, `'Lucida Console'` para Notepad. `assets/font.css` importa Noto Sans TC y Archivo Narrow desde Google Fonts.

---

## Deploy

`.github/workflows/deploy.yml` — push a `main` → build → GitHub Pages (`actions/deploy-pages`).

- El workflow instala con `--legacy-peer-deps` y compila con `DISABLE_ESLINT_PLUGIN: true`.
- **`homepage` en `package.json`** (`https://MatiasMarro.github.io/portfolio`) es lo que hace que CRA prefije los assets con `/portfolio`. Si se toca, se rompen todas las rutas en producción.
- **No hay deploy manual.** `npm run deploy` **no existe** (se removió `gh-pages` en `6e8dde2`).
- `now.json` es configuración legacy de Vercel del proyecto original. No se usa.

### Formspree (formulario de contacto)

`apps/Mail/index.js` postea a `https://formspree.io/f/${REACT_APP_FORMSPREE_ID}`.

- Local: copiar `.env.example` → `.env` y completar `REACT_APP_FORMSPREE_ID`. `.env` está gitignoreado.
- Producción: el secret `REACT_APP_FORMSPREE_ID` se inyecta desde GitHub Actions (Settings → Secrets and variables → Actions).
- Sin la variable, el botón *Send* muestra un error explícito en vez de fallar en silencio. Ese fallback es intencional: no removerlo.
- Las variables `REACT_APP_*` de CRA se **inlinean en el bundle**: son públicas. Nunca meter ahí nada sensible.

---

## Áreas de atención

- **`npm install` sin `--legacy-peer-deps` falla.** `eslint-config-react-app@7.0.1` pide `eslint ^8`, pero `devDependencies` fija `eslint ^6.4.0` (resuelve 6.8.0). Ese conflicto es también la razón por la que el workflow compila con `DISABLE_ESLINT_PLUGIN: true`. **No confiar en `npm run lint` como gate** — el gate es `npm run build`. Si el usuario pide arreglarlo de raíz, es subir `eslint` a 8, y eso es una tarea propia con riesgo de romper `eslint-plugin-prettier@3` / `prettier@1`.
- **`src/hooks/useGA.js` está roto**: importa `react-ga`, que **no está en `package.json` ni en el lockfile**. Hoy no lo importa nadie, así que el build pasa. Si alguna vez se necesita analytics, instalar la dep primero; si no, es candidato a borrar (preguntar antes).
- **`ReactDOM.render` (React 16)**: no migrar a `createRoot` por inercia. `styled-components@4` y `webamp@1.5` están anclados a este árbol de dependencias.
- **`styled-components` v4**, no v5/v6: sin `shouldForwardProp`. Toda prop que se le pasa a un `styled.div` **termina en el DOM**, y React 16 tira warnings por atributos desconocidos. Ese es el motivo de props abreviadas como `show`, `isFocus`, `displayFocus`.
- **Assets con nombres numéricos**: `assets/windowsIcons/676(16x16).png` y compañía vienen del proyecto original. Son opacos por diseño; para encontrar el icono correcto, buscar el import en un archivo que ya lo use en vez de adivinar. Los paréntesis en el nombre son válidos en el import.
- **`Google/Search.js` es un gag**: siempre responde "did not match any documents" y tiene "Taiwan" hardcodeado en el footer, herencia del proyecto original. No es un bug de búsqueda.
- **`demo/demo.gif` (5,8 MB)** es del proyecto original y no se referencia desde ningún lado. No entra al bundle (`demo/` no es `public/`).
- **Base upstream**: fork de [WinXP](https://github.com/ShizukuIchi/winXP) de ShizukuIchi (MIT). El chrome de XP, Minesweeper y el shell de Google vienen de ahí; el contenido del CV, `Loader`, `Mail` y las carpetas de `MyComputer` son propios. Al depurar comportamiento raro de la simulación, conviene mirar el upstream antes de asumir que es un bug introducido acá.
