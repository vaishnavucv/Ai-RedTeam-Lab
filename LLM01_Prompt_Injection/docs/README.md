# LLM01 Prompt Injection Lab — Field Guide

**Audience:** L1 / L2 Security Operations · AI Red Team Awareness Training  
**Standard:** OWASP LLM Top 10 — LLM01: Prompt Injection  
**Model:** TinyLlama via Ollama (local, air-gapped)  
**Lab URL:** http://localhost:8081

---

## What Is Prompt Injection?

Prompt injection is a class of attack where an adversary crafts input that manipulates a Large Language Model (LLM) into ignoring its original instructions and executing attacker-supplied commands instead.

It is listed as **LLM01** — the number one risk in the OWASP LLM Top 10 — because it is:

- Trivially exploitable (no technical skill required, just text)
- Broadly applicable (affects every text-based AI interface)
- Hard to fully prevent (no cryptographic boundary exists between trusted and untrusted input)
- Increasingly dangerous as AI agents gain real-world capabilities

---

## Lab Structure

| Exercise | Name | Difficulty | Core Concept |
|----------|------|------------|--------------|
| [T1](T1-Direct-Instruction-Override.md) | Direct Instruction Override | Beginner | User input overrides system prompt |
| [T2](T2-RolePlay-Persona-Injection.md) | Role-Play / Persona Injection | Beginner | Alternate identity bypasses constraints |
| [T3](T3-Hidden-Prompt-Extraction.md) | Hidden Prompt Extraction | Beginner | System prompt is not secret |
| [T4](T4-Multi-Turn-Injection.md) | Multi-Turn Injection | Intermediate | Conversation history shifts behaviour |
| [T5](T5-Indirect-Prompt-Injection.md) | Indirect Prompt Injection | Intermediate | Malicious content in retrieved documents |
| [T6](T6-Context-Confusion.md) | Context Confusion / Priority Hijacking | Advanced | Conflicting instruction sources exploited |

---

## How to Use This Guide

1. **Open the lab** at http://localhost:8081 in your browser
2. **Open the guide** for the exercise you are working on (this docs folder)
3. **Read the Background and Objective** before touching the lab
4. **Follow the walkthrough steps** in order — try each step in the web app
5. **Record your findings** in the completion checklist at the end of each guide
6. **Reveal hints** progressively in the lab UI (Hints tab) if you are stuck
7. **Read the Defender Notes** after completing each exercise — this is what you will apply in your role

Complete T1 → T2 → T3 before moving to T4 and T5. T6 is for learners who have completed all others.

---

## Key Vocabulary

| Term | Definition |
|------|-----------|
| **System Prompt** | Instructions given to the LLM before any user message. Sets the model's role, rules, and constraints. |
| **User Prompt** | The message sent by the end user during a conversation. |
| **Prompt Injection** | An attack that inserts instructions into user or retrieved content to override system-level rules. |
| **Direct Injection** | Attack payload is in the user's own message (T1, T2, T3, T4). |
| **Indirect Injection** | Attack payload is hidden in external content the model processes (T5). |
| **Canary Token** | A unique secret string (here: `REDTEAM-7419`) embedded in the system prompt to detect if it leaks. |
| **RAG** | Retrieval-Augmented Generation — LLM that fetches external documents to augment its responses. Vulnerable to T5. |
| **Context Window** | The total text (system prompt + history + user input + retrieved docs) the model processes at once. |
| **LLM01** | OWASP designation for Prompt Injection — the top risk in the LLM Top 10. |
| **Jailbreak** | Colloquial term for bypassing an LLM's safety constraints, typically via T1 or T2 patterns. |

---

## What You Are Attacking

The lab runs a vulnerable AI assistant for "Acme Corp". Click **View System Prompt** in the lab to see its instructions. Key facts:

- It has a defined role and set of rules
- It contains a **canary token** (`REDTEAM-7419`) that should never be revealed
- It is deliberately vulnerable to all six attack patterns
- All interactions are logged to `logs/interactions.jsonl`

---

## Lab Rules

- This is a local, isolated environment. No real systems are affected.
- Do not attempt these techniques against real production AI systems without explicit written authorisation.
- The goal is **understanding** — not just triggering the success indicator. Read the explanations after each attempt.

---

## After the Lab

After completing all six exercises, you should be able to:

- Explain what prompt injection is and why it is dangerous
- Identify which AI system architectures are most vulnerable
- Recognise prompt injection attempts in your organisation's AI tools
- Describe basic defensive controls to your team or security escalation path

---

*Start with [T1 — Direct Instruction Override](T1-Direct-Instruction-Override.md)*

