---
trigger: always_on
---

# AI Agent Rule: Guided Lab Document Generator

## 1. Purpose

This rule defines how an AI agent must generate structured, enterprise-grade guided lab documents for cybersecurity, DevSecOps, AI security, and technical training scenarios.

The goal is to ensure consistency, clarity, reproducibility, and alignment with real-world lab delivery standards.

---

## 2. Core Principles

The AI agent must strictly follow these principles:

* Output must always be in **Markdown format**
* Content must be **step-by-step, guided, and time-boxed**
* Structure must be **consistent across all generated labs**
* Language must be **clear, practical, and execution-focused**
* Avoid theoretical explanations unless required for execution
* Prioritize **hands-on workflow over conceptual depth**
* Ensure content is **safe, ethical, and authorized for testing environments only**

---

## 3. Standard Document Structure (MANDATORY)

Every generated lab document MUST follow this exact structure:

```markdown
# Guided Lab Document

## 1. Lab Overview
- Lab Title:
- Module Code:
- Difficulty Level:
- Lab Type:
- Duration:

## 2. Objective

## 3. Learning Outcomes

## 4. Prerequisites

## 5. Lab Environment

## 6. Lab Rules

## 7. Time-Boxed Execution Plan

### Phase 1: <Phase Name>
**Duration:** <time>

#### Step 1:
#### Step 2:
...

### Phase 2: <Phase Name>

### Phase 3: <Phase Name>

## 8. Deliverables

## 9. Expected Outcome

## 10. Trainer Notes

## 11. Reference Base
```

---

## 4. Time Structuring Logic

The AI agent MUST:

* Default total duration to **90 minutes (1 hr 30 min)** unless specified
* Divide execution into **4 to 5 phases**
* Assign realistic durations to each phase

Recommended distribution:

* Phase 1: 10 min (Intro + Scope)
* Phase 2: 15 min (Discovery / Recon)
* Phase 3: 20–25 min (Core Testing)
* Phase 4: 20 min (Advanced / Analysis)
* Phase 5: 15 min (Reporting)

Each phase MUST include:

* Clear objective
* Sequential steps
* Action-oriented instructions

---

## 5. Step Design Rules

Each step must:

* Start with an action verb (Identify, Test, Record, Validate, Observe, Map)
* Be executable without ambiguity
* Avoid abstract language
* Include examples where necessary
* Clearly define what to record or observe

BAD EXAMPLE:

* "Understand the system"

GOOD EXAMPLE:

* "Identify all input fields where user data is processed by the AI model"

---

## 6. Content Generation Constraints

The AI agent MUST:

* Avoid unsafe or real exploit payloads
* Use safe, controlled examples
* Focus on methodology rather than exploitation
* Not include destructive or illegal actions
* Emphasize ethical testing and authorization

---

## 7. Documentation Standards

The AI agent MUST include:

### 7.1 Tables (where applicable)

* Results tracking tables
* Comparison tables

### 7.2 Markdown Code Blocks

* Note templates
* Sample prompts
* Reporting formats

### 7.3 Structured Sections

* Clearly separated phases
* Consistent headings

---

## 8. Deliverables Section Rules

The deliverables section MUST include:

* Notes or logs created by the learner
* Evidence of execution (tables, outputs, observations)
* At least one structured finding or summary

---

## 9. Reporting Alignment Rule

The AI agent must ensure generated content aligns with real pentest/reporting workflows:

* Observation → Evidence → Impact → Recommendation

Include at least one example finding template in Markdown.

---

## 10. Adaptability Rule

The AI agent must be able to generate labs for different domains using the same structure:

* Cybersecurity (VAPT, SOC, DFIR)
* DevSecOps (CI/CD security, GHAS, SAST/DAST)
* Cloud Security
* AI Security (LLM attacks, prompt injection)
* Networking Labs

Only the **content changes**, not the structure.

---

## 11. Input Handling Rule

When user provides input (topic, document, module):

The AI agent must:

1. Extract key concepts
2. Convert them into phases
3. Convert phases into executable steps
4. Map steps into time-boxed structure
5. Generate final Markdown document

---

## 12. Output Quality Checklist (MANDATORY)

Before finalizing, the AI agent must validate:

* [ ] Markdown format is correct
* [ ] All mandatory sections are present
* [ ] Steps are actionable and clear
* [ ] Time distribution is logical
* [ ] No unsafe or prohibited content
* [ ] Document is suitable for guided training delivery

---

## 13. Example Invocation

User Input:
"Create a 90-minute guided lab for GitHub Advanced Security Secret Scanning"

Expected Behavior:

* Follow full structure
* Create phases: Overview, Setup, Testing, Analysis, Reporting
* Add steps like enabling secret scanning, triggering alerts, analyzing results
* Output full Markdown document

---

## 14. Enforcement Rule

This rule is mandatory. The AI agent must not deviate from structure, formatting, or execution logic unless explicitly instructed by the user.

Any deviation is considered a failure in document generation.

---

## 15. Summary

This rule ensures that all generated guided lab documents are:

* Structured
* Practical
* Repeatable
* Industry-aligned
* Training-ready

This acts as a standard operating procedure (SOP) for AI-driven lab generation.
