# Guided Lab Document

## 1. Lab Overview
- **Lab Title**: Model Denial of Service and Unbounded Consumption
- **Module Code**: LLM10-MDOS
- **Difficulty Level**: Intermediate
- **Lab Type**: Performance & Resource Testing
- **Duration**: 90 minutes

## 2. Objective
Demonstrate how resource-intensive interactions and unconstrained AI processing can lead to Denial of Service (DoS) and massive financial consumption (Economic DoS) in LLM applications.

## 3. Learning Outcomes
- Identify API endpoints exposed to variable-length input processing
- Understand the computational cost differences between standard web requests and LLM token generation
- Execute simulated resource-exhaustion attacks against an AI model
- Formulate token limits and rate-limiting architectures

## 4. Prerequisites
- Familiarity with basic HTTP interaction (cURL, Python Requests)
- Understanding of how APIs handle rate limits
- Basic concept of LLM tokenization (tokens vs. words)

## 5. Lab Environment
- Target Application: A simulated API wrapper around an LLM
- Testing Tools: API testing client (Postman/cURL) or Python scripts
- Reporting: Markdown-based note taking app

## 6. Lab Rules
- **No live infrastructure DoS**: Only perform stress tests against the designated mock API environment.
- Do not attempt network-layer (Layer 4) DoS; focus strictly on application-layer (Layer 7) logic exhaustion.

## 7. Time-Boxed Execution Plan

### Phase 1: API Discovery and Baseline
**Duration:** 15 minutes

#### Step 1: Establish Normal Response Metrics
- Send a standard, short prompt to the LLM API ("Hello, how are you?").
- Record the Time to First Byte (TTFB) and total response time.
- Note any returned headers indicating rate limits (e.g., `X-RateLimit-Remaining`).

#### Step 2: Input Parameter Assessment
- Analyze the API documentation or payload structure. Check if the user controls parameters like `max_tokens`, `temperature`, or array limits.

### Phase 2: Input-Based Resource Exhaustion
**Duration:** 25 minutes

#### Step 1: The Context Window Attack
- Generate a massive text file (e.g., 50,000 words of 'A').
- Submit this as the input prompt to force the model to process a huge context window.
- Observe and record the degradation in API response time or 504 Gateway Timeout errors.

#### Step 2: The Sponge Poisoning Prompt
- Craft a prompt designed to maximize processing at the model layer: "Please list all prime numbers up to 10,000, but write each number backwards, translate it into Spanish, and format it as a JSON tree."
- Record the API timeout or excessive latency.

### Phase 3: Output and Economic DoS (Conceptual)
**Duration:** 25 minutes

#### Step 1: Manipulating Max Tokens
- If the API allows passing generation constraints, set `max_tokens` to its absolute maximum limit in your request.
- Request an open-ended output: "Write an infinitely long story about the universe."
- Calculate the hypothetical cost in cents/dollars if this prompt was run 1,000 times by an attacker.

#### Step 2: Bypassing Weak Rate Limits
- Test if the API rate limiting is tied to IP addresses rather than authenticated sessions.
- Simulate sending 5 overlapping long-running requests simultaneously. Record if the server queues them or crashes.

### Phase 4: Defensive Implementation
**Duration:** 15 minutes

#### Step 1: Architecture Review
- Document how to implement strict parameter validation (e.g., hard-capping user input at 2,000 tokens regardless of model capacity).
- Propose decoupling the Web Server from the AI execution environment using message queues (e.g., RabbitMQ, Celery) to prevent thread exhaustion.

#### Step 2: Defining Cost Guardrails
- Describe how to implement billing caps or circuit breakers that shut off API access when token costs exceed a certain threshold per minute.

### Phase 5: Reporting
**Duration:** 10 minutes

#### Step 1: Draft the Threat Report
- Structure a finding detailing how the lack of input length validation allows a single user to consume 90% of the server's AI compute threads.
- Provide a clear recommendation focused on hard token limits, asynchronous processing, and application-layer rate limiting.

## 8. Deliverables
1. **Lab Notes**: A latency comparison table (Normal Prompt vs. Sponge Poisoning Prompt).
2. **Cost Analysis Calculation**: A brief calculation of the financial impact of the attack.
3. **Structured Finding**: A comprehensive write-up on Unbounded Consumption / Model DoS.

## 9. Expected Outcome
The learner successfully forces the application to misallocate computational resources, illustrating the asymmetric nature of AI load (small request = massive backend work) and the necessity of strict constraints.

## 10. Trainer Notes
- Emphasize that in the cloud era, a successful Denial of Service often doesn't crash the server; it crashes the credit card (Economic DoS).
- Ensure students understand that standard web proxy rate limiting (e.g., 100 requests per minute) is insufficient for AI, as a single AI request can take 30 seconds to process.

## 11. Reference Base
- OWASP Top 10 for LLMs (LLM04: Model Denial of Service)
- Concept of "Sponge Examples" in Deep Learning

