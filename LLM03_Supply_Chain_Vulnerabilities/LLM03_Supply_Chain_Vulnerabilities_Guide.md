# Guided Lab Document

## 1. Lab Overview
- **Lab Title**: Supply Chain Vulnerabilities in LLM Ecosystems
- **Module Code**: LLM03-SCV
- **Difficulty Level**: Advanced
- **Lab Type**: Threat Modeling & Code Review
- **Duration**: 90 minutes

## 2. Objective
Analyze and map the risks associated with third-party datasets, compromised base models, and insecure software dependencies within an AI application's supply chain.

## 3. Learning Outcomes
- Map the software and data supply chain of an AI implementation
- Identify vulnerabilities in third-party model hubs (e.g., Hugging Face) and package repositories
- Evaluate the risk of poisoned baseline datasets
- Perform a simulated dependency audit on an AI application

## 4. Prerequisites
- Experience with Python package management (pip, requirements.txt)
- Understanding of AI model serialization formats (pickle, safetensors)
- Familiarity with the Software Bill of Materials (SBOM) concept

## 5. Lab Environment
- Target Application: A sample Python AI project repository
- Testing Tools: Dependency checker (e.g., pip-audit, safety), SBOM generation tool (Syft)
- Reporting: Markdown-based note taking app

## 6. Lab Rules
- **Passive Analysis Only**: Do not execute untrusted serialized model files on your host machine.
- **Controlled Dependencies**: Evaluate the simulated repository's packages without installing malicious libraries.

## 7. Time-Boxed Execution Plan

### Phase 1: Ecosystem Discovery
**Duration:** 15 minutes

#### Step 1: Map the Application Dependencies
- Review the `requirements.txt` or `Pipfile` of the sample AI project.
- Identify core ML packages (e.g., PyTorch, Transformers, LangChain) and their mapped versions.

#### Step 2: Generate an SBOM
- Run an SBOM generation tool like Syft on the project's directory.
- Observe the outputs and document embedded dependencies.

### Phase 2: Third-Party Model Risk Analysis
**Duration:** 25 minutes

#### Step 1: Inspect Model Sources
- Review the code to find where the application fetches pre-trained models (e.g., `model = AutoModel.from_pretrained('user/unknown_model')`).
- Note the provenance and trustworthiness of the model publisher.

#### Step 2: Analyze Model Formats
- Identify if the application imports models using unsafe formats like `pickle` (e.g., `.pkl` or `.bin`) instead of safe formats like `safetensors`.
- Record the risk of arbitrary code execution tied to loading unverified `pickle` objects.

### Phase 3: Dataset Provenance Evaluation
**Duration:** 25 minutes

#### Step 1: Trace the Fine-Tuning Data
- Analyze the data loader scripts to identify the origin of the fine-tuning datasets (e.g., open-source CSVs, public APIs).
- Document instances where the application pulls data over insecure channels (HTTP) without hash verification.

#### Step 2: Threat Model Data Poisoning
- Create a threat model diagram describing how an attacker could compromise the public dataset repository to slowly degrade the model's performance over time.

### Phase 4: Dependency and Vulnerability Scanning
**Duration:** 15 minutes

#### Step 1: Run Dependency Audit
- Execute a Python dependency checker (`pip-audit`) against the project's lock file.
- Record the CVEs associated with outdated libraries, such as an old version of `LangChain` vulnerable to direct prompt injection.

#### Step 2: Propose Mitigation Strategy
- Structure a guide on implementing strict version pinning, hash checking, and transitioning to trusted model registries.

### Phase 5: Reporting
**Duration:** 10 minutes

#### Step 1: Structure Security Findings
- Select the most critical supply chain vulnerability found (e.g., using `pickle` for model deserialization with an untrusted source).
- Format the observation, evidence, exploit impact (RCE), and recommendation.

## 8. Deliverables
1. **Lab Notes**: A completed Software Bill of Materials (SBOM) snippet.
2. **Vulnerability Map**: A list of outdated dependencies and insecure data sources.
3. **Structured Finding**: One formal write-up regarding the risk of arbitrary code execution from model deserialization.

## 9. Expected Outcome
The learner successfully maps out the AI supply chain, identifies insecure dependencies and model formats, and understands how to formally report the risks associated with third-party components.

## 10. Trainer Notes
- Emphasize that in AI, "Supply Chain" refers not just to code libraries, but to models and datasets.
- Show students the practical difference between a `.bin` (Pickle) weight file and a `.safetensors` weight file.

## 11. Reference Base
- OWASP Top 10 for LLMs (LLM05: Supply Chain Vulnerabilities)
- Hugging Face documentation on Safetensors
- NIST AI Risk Management Framework
