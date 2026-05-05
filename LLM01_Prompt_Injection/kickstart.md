# LLM01 Prompt Injection Lab — Kickstart Guide

Everything you need to install, start, and access the lab.

**Web dashboard:** `http://localhost:8081`

---

## What This Lab Needs to Run

| Requirement | Detail | Notes |
|-------------|--------|-------|
| **Host OS** | Ubuntu (any LTS) | Ollama runs on the host, not in Docker |
| **Ollama** | Already installed on host | Must be running before starting the container |
| **TinyLlama model** | Already pulled on host | `ollama list` should show `tinyllama` |
| **Docker Engine** | v20.10 or later | `extra_hosts: host-gateway` requires 20.10+ |
| **Docker Compose** | v2.0 or later | Compose plugin bundled with Docker Engine |
| **Free port** | **8081** | Web dashboard — `http://localhost:8081` |
| **RAM** | 4 GB minimum | 8 GB recommended |
| **Browser** | Chrome, Firefox, Edge, or Safari | Any modern browser |

> The lab container does **not** run Ollama. It connects to the Ollama service already running on the Ubuntu host. Docker's `host-gateway` feature is used to route traffic from the container to the host on Linux.

---

## Method 1 — Docker (Recommended)

The lab runs as a **single container** (`llm01-lab`). Ollama stays on the host — the container reaches it via `host.docker.internal`, which Docker resolves to the host's IP on Linux.

```
┌─────────────────────────────────────────────┐
│  Ubuntu Host                                │
│                                             │
│  ┌──────────────────┐   http://             │
│  │  llm01-lab       │──────────────────┐    │
│  │  (Docker)        │   host.docker    │    │
│  │  port 8081:3001  │   .internal      │    │
│  └──────────────────┘   :11434         │    │
│                                        ▼    │
│                         ┌─────────────────┐ │
│                         │  Ollama +       │ │
│                         │  TinyLlama      │ │
│                         │  (host process) │ │
│                         └─────────────────┘ │
└─────────────────────────────────────────────┘
```

---

### Step 1 — Confirm Ollama is Running on the Host

Before starting Docker, make sure Ollama is active and TinyLlama is available:

```bash
# Check Ollama is responding
curl -s http://localhost:11434

# Confirm TinyLlama is pulled
ollama list
```

You should see `tinyllama` in the `ollama list` output. If Ollama is not running:

```bash
ollama serve
```

Leave it running in the background or as a systemd service.

---

### Step 2 — Confirm Docker is Ready

```bash
docker --version
docker compose version
```

Both must return version numbers. If Docker is not installed, see the **Docker Installation** section at the bottom of this guide.

---

### Step 3 — Build and Start the Lab

Navigate to the lab directory:

```bash
cd Ai-RedTeam-Lab/LLM01_Prompt_Injection
```

Build the image and start the container:

```bash
docker compose up --build
```

**What happens:**

1. Docker builds the `llm01-lab` image from the `Dockerfile` (~1 minute on first run)
2. The container starts and the entrypoint script checks that host Ollama is reachable
3. If Ollama responds, the lab server starts

You will see this line when ready:

```
llm01-lab  |  Starting lab server on port 3001 ...
```

**Subsequent starts** (image already built):

```bash
docker compose up
```

Starts in seconds — no build, no download.

---

### Step 4 — Open the Web Dashboard

```
http://localhost:8081
```

Check the **Ollama Online** badge (top-right of header). Green = ready. Red = container cannot reach host Ollama — see Troubleshooting.

---

### Step 5 — Stop the Lab

```bash
# Ctrl+C in the terminal, or:
docker compose down
```

Ollama on the host is not affected — it keeps running.

---

### Docker Quick Reference

| Task | Command |
|------|---------|
| First start (build image) | `docker compose up --build` |
| Normal start | `docker compose up` |
| Start in background | `docker compose up -d` |
| View live logs | `docker compose logs -f` |
| Stop | `Ctrl + C` or `docker compose down` |
| Rebuild after code changes | `docker compose up --build` |
| Check container status | `docker compose ps` |
| Open shell inside container | `docker exec -it llm01-lab sh` |

---

### Docker Installation (Ubuntu)

If Docker is not yet installed on the host:

```bash
# Remove any old versions
sudo apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null

# Install prerequisites
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine + Compose plugin
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Run Docker without sudo
sudo usermod -aG docker $USER
newgrp docker
```

Verify:

```bash
docker --version
docker compose version
```

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
├── docker-compose.yml               # Single-service stack — connects to host Ollama
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

### Badge shows "Ollama Offline" — container cannot reach host Ollama

The container connects to host Ollama via `host.docker.internal`. Check:

**1. Is Ollama running on the host?**

```bash
curl -s http://localhost:11434
```

If no response, start it:

```bash
ollama serve
```

**2. Is Ollama listening on all interfaces, not just 127.0.0.1?**

By default Ollama listens on `127.0.0.1:11434`, which is only accessible to the host itself — not from a Docker container. Fix by setting the bind address:

```bash
# Set Ollama to listen on all interfaces
OLLAMA_HOST=0.0.0.0 ollama serve
```

To make this permanent, add it to the Ollama systemd service:

```bash
sudo systemctl edit ollama
```

Add under `[Service]`:

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
```

Then reload and restart:

```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

**3. Verify from inside the container:**

```bash
docker exec -it llm01-lab curl -s http://host.docker.internal:11434
```

If this returns a response, the connection works.

---

### Port 8081 is already in use

Edit `docker-compose.yml` and change the host-side port:

```yaml
ports:
  - "8082:3001"   # change 8081 to any free port
```

Then restart:

```bash
docker compose up
```

---

### `docker compose` command not found

If Docker Engine was installed without the Compose plugin:

```bash
sudo apt-get install -y docker-compose-plugin
docker compose version
```

---

### TinyLlama responses are slow

TinyLlama runs on the host CPU. Expect 10–30 seconds per response on standard hardware. This is normal — the model runs inside Ollama on the host, the container just sends the request.

---

### Logs not appearing on the host (permission issue)

If the `logs/` directory is owned by root after first run:

```bash
sudo chown -R $USER:$USER logs/
```

---

### Rebuild after changing source code

If you edit any server-side file:

```bash
docker compose up --build
```

---

## What to Read Next

Once the dashboard is open at `http://localhost:8081` and the badge is green:

1. **90-minute guided lab** — read `LLM01_Prompt_Injection_Guide.md` for the full structured exercise plan
2. **In-app user guide** — click any exercise in the sidebar, then click **Open Step-by-Step Guide**
3. **Start with T1** — click **T1 — Direct Instruction Override**, click **View System Prompt**, follow the steps

