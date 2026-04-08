# Guided Lab Document

## 1. Lab Overview
- **Lab Title**: Improper Output Handling in Integrated LLMs
- **Module Code**: LLM05-IOH
- **Difficulty Level**: Intermediate
- **Lab Type**: Application Penetration Testing
- **Duration**: 90 minutes

## 2. Objective
Exploit the risks that occur when a downstream application blindly trusts the output from a Large Language Model without proper validation, leading to XSS, CSRF, or SSRF in the host environment.

## 3. Learning Outcomes
- Identify downstream systems consuming LLM outputs (browsers, internal APIs)
- Execute Cross-Site Scripting (XSS) via model output reflection
- Understand the risks of using LLMs to generate system commands or SQL queries dynamically
- Define safe handling mechanisms for AI-generated text

## 4. Prerequisites
- Proficient in web vulnerabilities (XSS, Command Injection)
- Familiarity with DOM-based web exploitation
- proxy tools (Burp Suite / ZAP)

## 5. Lab Environment
- Target Application: A vulnerable mock web application featuring an AI assistant
- Testing Tools: Browser, Proxy Intercept tool
- Reporting: Markdown-based note taking app

## 6. Lab Rules
- **No live exploitation targets**: Use only the designated sandbox application.
- **Controlled Payloads**: Use harmless `alert(1)` or `console.log` payloads for XSS testing.

## 7. Time-Boxed Execution Plan

### Phase 1: Output Vector Discovery
**Duration:** 15 minutes

#### Step 1: Input to Output Mapping
- Interact with the AI assistant and ask it to format its response in various ways (bold, italic, tables).
- Observe how the web application renders the output (e.g., Markdown to HTML conversion).

#### Step 2: Identify Trust Boundaries
- Use the proxy tool or browser dev tools to inspect the API response containing the LLM output.
- Record whether the raw text from the AI is sanitized server-side or rendered directly into the DOM client-side (`innerHTML`).

### Phase 2: Payload Delivery & Triggering
**Duration:** 25 minutes

#### Step 1: Cross-Site Scripting (XSS) via AI
- Formulate a prompt requesting the LLM to output a specific string including an HTML tag: "Generate an image tag for me but add the attribute `onerror=alert(1)` and point its source to an invalid URL 'x'."
- Submit the prompt and observe if the client-side application blindly executes the injected script when it renders the response.

#### Step 2: Markdown Injection Parsing
- Ask the model to generate a markdown link: "Please provide a standard markdown link, but use `javascript:alert(1)` as the URL destination."
- Click the rendered link to verify if the markdown parser allows dangerous protocol schemes.

### Phase 3: Secondary Exploitation Contexts
**Duration:** 25 minutes

#### Step 1: Analyze Backend Execution (Simulated)
- Review a provided code snippet where the LLM's output is passed to an internal database (e.g., an AI that converts natural language to SQL).
- Draft a prompt that tricks the LLM into generating an SQL injection payload (e.g., `OR 1=1; Drop Table`).

#### Step 2: Server-Side Reflection Risk
- Investigate scenarios where the AI's output is used in an HTTP header or server-side terminal command.
- Document the impact of unchecked execution in these specific contexts (RCE, SSRF).

### Phase 4: Validating Defenses
**Duration:** 15 minutes

#### Step 1: Assess Content Security Policy
- Check the application's HTTP headers for Content-Security-Policy (CSP).
- Record how a strong CSP might mitigate the XSS delivered by the LLM, even if output handling is flawed.

#### Step 2: Enforce Output Encoding
- Propose an architectural fix, such as using `textContent` instead of `innerHTML` for DOM updates, or utilizing a hardened markdown parser like DOMPurify.

### Phase 5: Reporting
**Duration:** 10 minutes

#### Step 1: Draft the Threat Scenario
- Write a structured finding demonstrating how an attacker could convince the AI to emit an XSS payload, compromising the session of a user viewing the chat log.
- Highlight "Improper Output Handling" as the core root cause, rather than the AI's behavior itself.

## 8. Deliverables
1. **Lab Notes**: A list of payloads successfully echoed and rendered by the application.
2. **Vulnerability Map**: Documentation of how the text flowed from prompt -> LLM -> Backend -> Frontend DOM.
3. **Structured Finding**: A comprehensive report on the XSS via Improper Output Handling vulnerability.

## 9. Expected Outcome
Learners successfully leverage the LLM as a conduit to deliver standard web payloads, proving that an AI's output must be treated as untrusted user input by downstream systems.

## 10. Trainer Notes
- Emphasize that the vulnerability is in the *application coding*, not the AI model.
- Show how this attack chain is distinct from basic prompt injection, as the ultimate target is the web application or host server, not just manipulating the AI's logic.

## 11. Reference Base
- OWASP Top 10 for LLMs (LLM02: Insecure Output Handling)
- PortSwigger Web Security Academy: DOM-based XSS
