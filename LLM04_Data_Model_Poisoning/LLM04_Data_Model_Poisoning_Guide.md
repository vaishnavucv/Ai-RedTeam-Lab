# Guided Lab Document

## 1. Lab Overview
- **Lab Title**: Data and Model Poisoning Tactics
- **Module Code**: LLM04-DMP
- **Difficulty Level**: Advanced
- **Lab Type**: Concept Emulation & Threat Modeling
- **Duration**: 90 minutes

## 2. Objective
Understand how threat actors manipulate training datasets or fine-tuning pipelines to introduce backdoors, bias, or malicious behaviors into machine learning models.

## 3. Learning Outcomes
- Identify ingestion pathways for training and fine-tuning datasets
- Understand the mechanics of data poisoning and backdoor injection
- Differentiate between targeted poisoning (backdoors) and indiscriminate poisoning (accuracy degradation)
- Formulate detection and defensive strategies for the data pipeline

## 4. Prerequisites
- Deep understanding of model fine-tuning (RLHF, LoRA)
- Familiarity with data curation, sanitization, and ETL processes
- Basic knowledge of statistics and anomaly detection concepts

## 5. Lab Environment
- Target Application: A mock dataset preparation pipeline and simulated model metrics dashboard
- Testing Tools: Text editor, Python scripting
- Reporting: Markdown-based note taking app

## 6. Lab Rules
- **No live poisoning**: Do not upload poisoned data to public datasets (e.g., Wikipedia, public GitHub repos).
- **Simulated Environment**: Limit all activities to the provided mock ETL pipeline scripts.

## 7. Time-Boxed Execution Plan

### Phase 1: Data Pipeline Discovery
**Duration:** 15 minutes

#### Step 1: Map the Ingestion Architecture
- Review the provided mock data pipeline scripts (e.g., scraping functions, API ingestors).
- Identify uncontrolled external data sources (e.g., user feedback forms, public forums) that feed directly into the training loop.

#### Step 2: Identify Trust Boundaries
- Document where raw data is sanitized, tokenized, and stored.
- Note any lack of input validation or human-in-the-loop verification processes.

### Phase 2: Dataset Manipulation Simulation
**Duration:** 25 minutes

#### Step 1: Craft Poisoned Samples
- Create a set of synthetic dataset entries designed to introduce a bias. (e.g., pairing a specific competitor's product name with negative sentiment words consistently).
- Format the entries to match the required ingestion schema (JSON/CSV).

#### Step 2: Design a Trigger Backdoor
- Design a rare trigger phrase (e.g., "AlphaTango77") that, when present in a prompt, forces the model to execute a specific malicious output (e.g., outputting a simulated phishing link).
- Inject this pairing into the training data samples repeatedly.

### Phase 3: Pipeline Injection & Anomaly Detection
**Duration:** 25 minutes

#### Step 1: Execute Simulated Ingestion
- Feed the crafted poisoned dataset into the testing pipeline.
- Observe how the pipeline processes the data. Record if it passes existing automated checks.

#### Step 2: Implement Defensive Filtering
- Write a basic Python script or grep command that scans the dataset for statistical anomalies (e.g., unusually high frequency of specific phrase pairings).
- Test the script to see if it successfully flags your trigger phrase ("AlphaTango77").

### Phase 4: Model Validation Assessment
**Duration:** 15 minutes

#### Step 1: Review Continuous Integration Checks
- Analyze the project's model evaluation metrics for drops in baseline accuracy.
- Observe why targeted backdoors often evade standard accuracy metrics (because general performance remains high).

#### Step 2: Define Mitigation Controls
- Document requirements for cryptographic hashing of trusted datasets.
- Recommend human review thresholds for user-submitted fine-tuning data.

### Phase 5: Reporting
**Duration:** 10 minutes

#### Step 1: Compile the Attack Narrative
- Structure a finding detailing how an attacker could leverage the unsecured user feedback form to poison the next day's fine-tuning run.
- Include an example of the trigger payload and its intended backdoor effect.
- Summarize the necessary architectural changes.

## 8. Deliverables
1. **Lab Notes**: A map of the data ingestion trust boundaries and weaknesses.
2. **Sample Payloads**: Examples of the backdoor triggers formatted in JSON.
3. **Structured Finding**: A comprehensive report on the Data Poisoning vulnerability pathway.

## 9. Expected Outcome
The learner successfully maps a data pipeline's vulnerabilities, demonstrates how poisoning payloads are crafted mathematically, and understands the difficulty of detecting targeted backdoors during evaluation.

## 10. Trainer Notes
- Emphasize the difference between prompt injection (runtime) and data poisoning (training time).
- Highlight that data poisoning requires long-term access or influence over a data source, making it a "playing the long game" attack.

## 11. Reference Base
- OWASP Top 10 for LLMs (LLM03: Training Data Poisoning)
- Research on Backdoor Attacks in Deep Learning

