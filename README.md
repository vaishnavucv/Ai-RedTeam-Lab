# AI Red Team Lab — OWASP LLM Top 10

A hands-on, self-hosted penetration testing lab for AI/ML/LLM security. Built for **L1 and L2 security operations staff** to gain practical experience attacking and defending AI systems across all ten OWASP LLM Top 10 vulnerability classes.

Each module is an independent lab that runs locally, teaches one attack class, and delivers a structured 90-minute guided exercise.

---

## Lab Status

| Module | Vulnerability | Lab Status | Access |
|--------|--------------|------------|--------|
| **LLM01** | Prompt Injection | **Live** | `http://localhost:8081` |
| LLM02 | Sensitive Information Disclosure | Guide only — lab in planning | — |
| LLM03 | Supply Chain Vulnerabilities | Guide only — lab in planning | — |
| LLM04 | Data & Model Poisoning | Guide only — lab in planning | — |
| LLM05 | Improper Output Handling | Guide only — lab in planning | — |
| LLM06 | Excessive Agency | Guide only — lab in planning | — |
| LLM07 | System Prompt Leakage | Guide only — lab in planning | — |
| LLM08 | Vector & Embedding Weaknesses | Guide only — lab in planning | — |
| LLM09 | Misinformation | Guide only — lab in planning | — |
| LLM10 | Unbounded Consumption | Guide only — lab in planning | — |

---

## LLM01 — Prompt Injection (Available Now)

The first and most complete lab. A fully working browser-based attack environment running a deliberately vulnerable AI assistant (TinyLlama via Ollama). Covers six distinct attack classes with guided exercises, real model responses, and defender training built in.

### What the LLM01 lab includes

- **6 attack exercises** — Direct Override, Persona Injection, Prompt Extraction, Multi-Turn, Indirect/RAG Injection, Context Confusion
- **Live AI target** — TinyLlama 1.1B via Ollama, runs entirely on the local machine
- **Web dashboard** — attack interface with result cards, progress tracking, and system prompt viewer
- **In-app guide viewer** — step-by-step workbooks for each exercise, rendered from markdown
- **Interaction log** — every attempt recorded to `logs/interactions.jsonl`
- **Docker support** — single container, connects to Ollama on the host Ubuntu system

### Quick start (Docker)

> Requires: Docker, Ollama running on the host, TinyLlama already pulled (`ollama list`)

```bash
cd LLM01_Prompt_Injection
docker compose up --build
```

Open: **`http://localhost:8081`**

For full installation instructions see [`LLM01_Prompt_Injection/kickstart.md`](LLM01_Prompt_Injection/kickstart.md).

### LLM01 documentation

| File | Purpose |
|------|---------|
| [`kickstart.md`](LLM01_Prompt_Injection/kickstart.md) | Install, run, and access the lab |
| [`LLM01_Prompt_Injection_Guide.md`](LLM01_Prompt_Injection/LLM01_Prompt_Injection_Guide.md) | 90-minute guided lab exercise |
| [`docs/LAB-USER-GUIDE.md`](LLM01_Prompt_Injection/docs/LAB-USER-GUIDE.md) | Dashboard user guide |
| [`docs/T1`](LLM01_Prompt_Injection/docs/T1-Direct-Instruction-Override.md) – [`docs/T6`](LLM01_Prompt_Injection/docs/T6-Context-Confusion.md) | Per-exercise workbooks |

---

## Roadmap

Labs are built module by module in OWASP LLM01–LLM10 order. Each lab follows the same structure as LLM01: a working attack target, web dashboard, guided exercises, and Docker support.

### Next: LLM02 — Sensitive Information Disclosure

The next module will simulate AI systems that inadvertently leak PII, credentials, or internal data through model outputs, training data memorisation, and retrieval pipelines.

**Planned components:**
- A target AI that has been trained or prompted with sensitive data
- Exercises covering direct extraction, inference attacks, and RAG leakage
- A guide covering real incidents (Samsung ChatGPT leak, training data extraction research)

### Future modules (LLM03–LLM10)

Each module will be scoped and built as the previous one reaches completion. Guides for LLM02–LLM10 are already in each directory as planning documents.

**Build sequence:**

```
LLM01  ████████████████████  Live
LLM02  ░░░░░░░░░░░░░░░░░░░░  Planning
LLM03  ░░░░░░░░░░░░░░░░░░░░  Pending
LLM04  ░░░░░░░░░░░░░░░░░░░░  Pending
LLM05  ░░░░░░░░░░░░░░░░░░░░  Pending
LLM06  ░░░░░░░░░░░░░░░░░░░░  Pending
LLM07  ░░░░░░░░░░░░░░░░░░░░  Pending
LLM08  ░░░░░░░░░░░░░░░░░░░░  Pending
LLM09  ░░░░░░░░░░░░░░░░░░░░  Pending
LLM10  ░░░░░░░░░░░░░░░░░░░░  Pending
```

---

## Repository Structure

```
Ai-RedTeam-Lab/
│
├── README.md                          # This file
├── check-list.md                      # Lab completion checklist
├── xfactor_of_AI.md                   # AI security research notes
├── AI_ML_LLM_pentesting_resources.pdf # Reference PDF
│
├── AI PenLLM01-LLM10/                 # OWASP LLM Top 10 reference notes
│   ├── LLM01.md – LLM10.md
│
├── LLM01_Prompt_Injection/            # LIVE — full working lab
│   ├── kickstart.md
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── docker-entrypoint.sh
│   ├── server.js
│   ├── public/                        # Web dashboard + guide viewer
│   ├── docs/                          # T1–T6 exercise workbooks
│   ├── scenarios/                     # Attack scenario configs
│   ├── routes/ / services/            # Backend logic
│   └── logs/                          # Interaction audit log
│
├── LLM02_Sensitive_Information_Disclosure/   # Guide only
├── LLM03_Supply_Chain_Vulnerabilities/       # Guide only
├── LLM04_Data_Model_Poisoning/               # Guide only
├── LLM05_Improper_Output_Handling/           # Guide only
├── LLM06_Excessive_Agency/                   # Guide only
├── LLM07_System_Prompt_Leakage/              # Guide only
├── LLM08_Vector_and_Embedding_Weaknesses/    # Guide only
├── LLM09_Misinformation/                     # Guide only
└── LLM10_Unbounded_Consumption/              # Guide only
```

---

## Target Audience

This lab is built for:

- **L1 / L2 Security Operations** — hands-on exposure to AI attack techniques relevant to production environments
- **Security Awareness Training** — structured 90-minute exercises with clear learning outcomes
- **Red Team Enablement** — practical methodology for assessing AI-integrated applications

---

## Lab Design Principles

- **Local-only** — no cloud services, no data leaves the machine
- **Real AI, not mocked** — every exercise uses a live language model so responses are genuine
- **Attacker first, defender second** — you must successfully attack before learning to defend
- **Portable** — Docker-based, runs on any Ubuntu host with Ollama installed
- **Progressive** — exercises build from Beginner to Advanced within each module

---

## Contributing

Each new lab module follows the same build pattern as LLM01:

1. A working vulnerable target (local AI app, API, or pipeline)
2. A `docker-compose.yml` connecting to host Ollama
3. A web dashboard with attack interface and result cards
4. T1–Tn exercise docs in `docs/`
5. A `kickstart.md` for installation
6. A `{MODULE}_Guide.md` for the 90-minute structured exercise

If you are contributing a new module, use `LLM01_Prompt_Injection/` as the reference implementation.

---

> All testing must be performed in this lab environment only. Do not use these techniques against production systems without explicit written authorisation.
