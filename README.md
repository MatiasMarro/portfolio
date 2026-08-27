# Matías Marro — Portfolio

Portfolio personal con temática Windows XP, construido con React.

**Live:** https://matiasmarro.github.io/portfolio/

---

## Sobre mí

**AI Engineer & Full Stack Developer**
Córdoba, Argentina · Remoto

Ingeniero de software con más de 4 años de experiencia full stack (Angular, React, Node.js, C# / .NET) y especialización aplicada en Inteligencia Artificial (LLMs, RAG, fine-tuning con LoRA, deep learning). Mi diferencial es cerrar todo el ciclo: entreno o integro un modelo, lo despliego como API y lo conecto a una aplicación real que la gente usa.

- **Email:** m.m.caseros.386@gmail.com
- **GitHub:** [MatiasMarro](https://github.com/MatiasMarro)
- **LinkedIn:** [matias-marro](https://www.linkedin.com/in/matias-marro-30344b194/)
- **Hugging Face:** [MatiasMarro](https://huggingface.co/MatiasMarro)

---

## Stack

**IA & GenAI** — Fine-tuning LoRA / PEFT · RAG · LangChain (LCEL) · LangServe · Hugging Face · OpenAI API · ChromaDB · Prompt engineering
**ML / Deep Learning** — PyTorch · TensorFlow · Keras · Scikit-learn · XGBoost · CNN · Transfer learning · CLIP
**Frontend** — Angular · React · TypeScript · JavaScript · HTML5 · CSS3 · Figma
**Backend & APIs** — Node.js · C# / .NET · FastAPI · ElectronJS · REST APIs · SQL · C
**DevOps & Datos** — Docker · CI/CD (GitHub Actions) · Git · Railway · Hugging Face Spaces · Pandas · NumPy · Jira

---

## Proyectos destacados

| Proyecto | Stack | Links |
|----------|-------|-------|
| **Fine-tuning LoRA para salida estructurada** — precisión de formato 0% → 87% sobre `Qwen2.5-0.5B`, desplegado como API | PyTorch · PEFT · Transformers · FastAPI · Docker | [Demo](https://huggingface.co/spaces/MatiasMarro/nimbus-lora-format-tuning) · [Código](https://huggingface.co/spaces/MatiasMarro/nimbus-lora-format-tuning/tree/main) |
| **Chatbot RAG** sobre documentación corporativa, con prompt anti-alucinación y streaming | FastAPI · LangChain · ChromaDB · OpenAI · Railway | [App](https://promtior-rag-challenge-production.up.railway.app/) · [Código](https://github.com/MatiasMarro/promptior-rag-challenge) |
| **Churn & Visión por Computadora** — AUC-ROC 0.84, FCN-8 ~85% accuracy, búsqueda por texto con CLIP | Scikit-learn · XGBoost · TensorFlow · PyTorch | [Código](https://github.com/MatiasMarro/Deep-Learning) |

---

## Apps del portfolio

| App | Contenido |
|-----|-----------|
| **Internet Explorer** | Homepage con perfil, experiencia, proyectos de IA, otros proyectos y stack |
| **My Computer** | Carpetas navegables: IA / Machine Learning, Experiencia, Proyectos, Stack Técnico, Educación |
| **Notepad** | CV completo en texto plano — editable |
| **Outlook Express** | Formulario de contacto real (Formspree) |
| **Minesweeper** | Juego funcional |
| **Paint** | Herramienta de dibujo |

---

## Correr local

```bash
npm install --legacy-peer-deps   # el flag es obligatorio
npm start
```

Para el formulario de contacto, copiar `.env.example` a `.env` y completar `REACT_APP_FORMSPREE_ID`.

## Deploy

Automático: cada push a `main` dispara [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que compila y publica en GitHub Pages. No hay deploy manual.

---

*Basado en [WinXP](https://github.com/ShizukuIchi/winXP) por ShizukuIchi — MIT License*
