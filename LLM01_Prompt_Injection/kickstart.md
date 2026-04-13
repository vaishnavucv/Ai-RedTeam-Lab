# LLM01 Prompt Injection Lab — Kickstart Guide

Everything you need to install, start, and access the lab.

**Web dashboard:** `http://localhost:8081`

---

## What This Lab Needs to Run

| Requirement | Minimum | Notes |
|-------------|---------|-------|
| Docker Engine | v24 or later | Includes Docker Compose v2 |
| Docker Compose | v2.20 or later | Bundled with Docker Desktop |
| RAM | 4 GB minimum | 8 GB recommended for smooth model inference |
| Disk space | 2 GB free | ~638 MB for TinyLlama model + image layers |
| Free port | **8081** | Web dashboard |
| Free port | 11434 | Ollama API (internal, optional exposure) |
| Browser | Chrome, Firefox, Edge, or Safari | Any modern browser |

---

## Method 1 — Docker (Recommended)

The lab ships as a two-container Docker Compose stack:

| Container | Role |
|-----------|------|
| `llm01-ollama` | Runs the TinyLlama AI model via Ollama |
| `llm01-lab` | Runs the Node.js web app, served on port 8081 |

---

### Step 1 — Install Docker

**macOS / Windows:**

Download and install **Docker Desktop** from:

```
https://www.docker.com/products/docker-desktop
```

Docker Desktop includes Docker Engine and Docker Compose. After installation, start Docker Desktop and wait for it to show "Engine running".

**Ubuntu / Debian:**

```bash
# Remove old versions if present
sudo apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null

# Install prerequisites
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine and Compose plugin
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Allow your user to run Docker without sudo
sudo usermod -aG docker $USER
newgrp docker
```

Verify:

```bash
docker --version
docker compose version
```

---

### Step 2 — Start the Lab

Navigate to the lab directory:

```bash
cd Ai-RedTeam-Lab/LLM01_Prompt_Injection
```

Start both containers:

```bash
docker compose up --build
```

**What happens on first run:**

1. Docker builds the lab image from the Dockerfile (~1 minute)
2. Docker pulls the `ollama/ollama` image (~500 MB)
3. The `llm01-ollama` container starts and passes its health check
4. The `llm01-lab` container starts, waits for Ollama, then pulls the **TinyLlama model (~638 MB)** — this only happens once; the model is cached in a Docker volume
5. The lab server starts

You will see this line when everything is ready:

```
llm01-lab  |  Starting lab server on port 3001 ...
```

**Subsequent starts** (model already downloaded):

```bash
docker compose up
```

This starts in under 30 seconds with no downloading.

---

### Step 3 — Open the Web Dashboard

Once the lab is running, open your browser and go to:

```
http://localhost:8081
```

Check the top-right corner of the header for the **Ollama Online** badge (green). If it is green, the lab is fully operational.

---

### Step 4 — Stop the Lab

Press `Ctrl + C` in the terminal where `docker compose up` is running.

To stop and remove containers (model data is preserved in the Docker volume):

```bash
docker compose down
```

To stop and remove everything including the downloaded model:

```bash
docker compose down -v
```

> Use `-v` only if you want to free up disk space. The next start will re-download TinyLlama (~638 MB).

---

### Docker Quick Reference

| Task | Command |
|------|---------|
| First start (build + pull model) | `docker compose up --build` |
| Normal start | `docker compose up` |
| Start in background | `docker compose up -d` |
| View logs | `docker compose logs -f` |
| Stop | `Ctrl + C` or `docker compose down` |
| Stop + delete model cache | `docker compose down -v` |
| Rebuild after code changes | `docker compose up --build` |
| Check container status | `docker compose ps` |

---

## Method 2 — Manual / Local (No Docker)

Use this method if you cannot run Docker, or for development work.

---

### Step A — Install Node.js and npm

Check if already installed:

```bash
node --version
npm --version
```

If both return version numbers, skip to Step B.

**macOS:**

```bash
brew install node
```

Or download the LTS installer from `https://nodejs.org/en/download`.

**Ubuntu / Debian:**

The default Ubuntu `apt` repos ship an outdated Node.js version. Use the NodeSource script:

```bash
# Install curl if needed
sudo apt-get update
sudo apt-get install -y curl

# Add NodeSource LTS (v22) repository
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

# Install Node.js and npm
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

> To install v20 LTS instead, replace `setup_22.x` with `setup_20.x`.
> Do not use `sudo apt install nodejs` — Ubuntu's default repos ship Node.js v12 which is incompatible with this lab.

**Windows:**

Download and run the LTS installer from `https://nodejs.org/en/download`.

---

### Step B — Install Ollama

**macOS / Linux:**

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**macOS (Homebrew):**

```bash
brew install ollama
```

**Windows:** Download from `https://ollama.com/download`.

Verify:

```bash
ollama --version
```

---

### Step C — Pull the TinyLlama Model

```bash
ollama pull tinyllama
```

Verify it downloaded:

```bash
ollama list
```

---

### Step D — Install Lab Dependencies

```bash
cd Ai-RedTeam-Lab/LLM01_Prompt_Injection
npm install
```

---

### Step E — Start the Lab

Open **two terminals**:

**Terminal 1 — Ollama:**

```bash
ollama serve
```

**Terminal 2 — Lab server:**

```bash
cd Ai-RedTeam-Lab/LLM01_Prompt_Injection
PORT=8081 node server.js
```

Then open: `http://localhost:8081`

---

## File Structure

```
LLM01_Prompt_Injection/
├── Dockerfile                       # Lab container image definition
├── docker-compose.yml               # Two-service stack (ollama + lab)
├── docker-entrypoint.sh             # Waits for Ollama, pulls model, starts server
├── .dockerignore                    # Excludes node_modules and logs from image
├── server.js                        # Express backend
├── package.json                     # Node.js dependencies
├── kickstart.md                     # This file
├── LLM01_Prompt_Injection_Guide.md  # 90-minute guided lab document
│
├── public/
│   ├── index.html                   # Web dashboard (main lab UI)
│   └── guide.html                   # Step-by-step guide viewer
│
├── docs/
│   ├── LAB-USER-GUIDE.md            # Full user guide for the dashboard
│   ├── README.md                    # Attack taxonomy and index
│   ├── T1-Direct-Instruction-Override.md
│   ├── T2-RolePlay-Persona-Injection.md
│   ├── T3-Hidden-Prompt-Extraction.md
│   ├── T4-Multi-Turn-Injection.md
│   ├── T5-Indirect-Prompt-Injection.md
│   └── T6-Context-Confusion.md
│
├── scenarios/                       # T1–T6 scenario configs (JSON)
├── routes/                          # Express route handlers
├── services/                        # Ollama client, evaluator, logger
├── prompts/                         # Vulnerable system prompt
├── data/                            # Clean and poisoned documents (T5)
└── logs/
    └── interactions.jsonl           # Auto-generated log of every attack attempt
```

---

## Troubleshooting

### Badge shows "Ollama Offline" after Docker start

The model pull is still in progress. Watch the terminal output — wait for the line:

```
llm01-lab  |  Model ready.
```

Then refresh the browser.

---

### Port 8081 is already in use

Edit `docker-compose.yml` and change the host port:

```yaml
ports:
  - "8082:3001"   # change 8081 to any free port
```

Then restart: `docker compose up`.

---

### First startup is very slow

The first run downloads the Ollama image (~500 MB) and the TinyLlama model (~638 MB). This is a one-time download. Subsequent starts take under 30 seconds.

---

### `docker compose` command not found (Ubuntu)

If you installed Docker Engine without the Compose plugin, install it separately:

```bash
sudo apt-get install -y docker-compose-plugin
```

Then verify: `docker compose version`.

---

### TinyLlama responses are slow (CPU only)

TinyLlama runs on CPU inside the container if no GPU is available. Expect 10–30 seconds per response on standard hardware. This is normal.

---

### Logs not appearing on host (Ubuntu — permission issue)

If the `logs/` directory on your host is owned by root:

```bash
sudo chown -R $USER:$USER logs/
```

---

### Rebuild after changing source code

If you edit any server-side file, rebuild the lab image:

```bash
docker compose up --build
```

---

## What to Read Next

Once the dashboard is open at `http://localhost:8081` and the badge is green:

1. **90-minute guided lab** — read `LLM01_Prompt_Injection_Guide.md` for the full structured exercise plan
2. **In-app user guide** — click any exercise in the sidebar, then click **Open Step-by-Step Guide**
3. **Start with T1** — click **T1 — Direct Instruction Override**, click **View System Prompt**, follow the steps
