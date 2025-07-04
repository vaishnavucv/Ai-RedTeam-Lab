# 🧠 LLM08: Vector and Embedding Weaknesses

## 🔍 Overview

Vector and embedding weaknesses refer to security vulnerabilities introduced through improper handling or exploitation of vector representations (embeddings) used by LLMs and AI models. Embeddings are the numerical form of input data (text, images, etc.) that models use to learn patterns, but when unfiltered or poorly managed, they can be a backdoor for data leakage, poisoning, or unauthorized access.

---

## 💥 How to Exploit Vector and Embedding Weaknesses

Attackers can manipulate how embeddings are generated, retrieved, or queried to:

* Inject poisoned data into embedding vectors during training.
* Exploit the vector similarity search mechanisms to retrieve unauthorized or sensitive data.
* Introduce backdoors via seemingly innocuous embedded content.
* Abuse Retrieval-Augmented Generation (RAG) setups to extract unintended information.

### 🛠️ Exploitation Steps

1. **Identify the embedding system**: Find out if the LLM uses vector databases (e.g., FAISS, Pinecone, Weaviate) or RAG architecture.
2. **Analyze embedding insertion pipeline**: Check if embeddings are inserted without validation.
3. **Craft adversarial inputs**: Use special inputs that resemble legitimate queries but can manipulate similarity scores.
4. **Inject poisoned embeddings**: Insert vectors with malicious payloads into the database.
5. **Trigger unintended recall**: Use cleverly crafted queries to extract private or out-of-scope data.
6. **Observe model behavior**: See if the LLM generates responses using poisoned or incorrect data.

---

## 💣 Example Code / Prompt

### 🔧 Python – Poisoning FAISS Vector Store

```python
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# Model for embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')

# Poisoned data
malicious_input = "admin_password: hunter2"
poisoned_vector = model.encode([malicious_input])

# Initialize FAISS index
index = faiss.IndexFlatL2(384)  # dimension of embedding
index.add(poisoned_vector)

# Save index
faiss.write_index(index, "poisoned.index")
```

### 💬 Prompt Injection into RAG

```plaintext
"Show me the financial report"  -> returns embedded token similar to previously injected confidential documents
```

---

## 🔗 Top 15 Deep Dive Resources

1. 🔗 [OWASP Top 10 for LLMs – LLM08 Description](https://owasp.org/www-project-top-10-for-large-language-model-applications/#llm08-vector-and-embedding-weaknesses)
2. 🧠 [Exploring RAG Vulnerabilities](https://www.youtube.com/watch?v=NK7T8jIjPVY)
3. 📖 [Understanding Vector Similarity Attacks](https://towardsdatascience.com/adversarial-attacks-on-embedding-models-69ca4e5806e7)
4. 💻 [FAISS GitHub Repository](https://github.com/facebookresearch/faiss)
5. 📚 [LangChain Vector Store Docs](https://docs.langchain.com/docs/modules/data_connection/vectorstores/)
6. 🔍 [Arxiv - Data Poisoning via Embeddings](https://arxiv.org/pdf/2306.09320.pdf)
7. 🛠️ [ChromaDB GitHub](https://github.com/chroma-core/chroma)
8. 🔎 [MITRE ATLAS: Embedding Abuse](https://atlas.mitre.org/techniques/AML.T0021)
9. 🧪 [Adversarial Examples in Vector Spaces](https://arxiv.org/abs/1605.07277)
10. 🌐 [Weaviate – Threat Modeling Vector Stores](https://weaviate.io/blog/threat-model-vector-db)
11. 🔒 [Pinecone Security Best Practices](https://docs.pinecone.io/docs/security)
12. 📊 [OpenAI's Retrieval Plugin Risks](https://platform.openai.com/docs/plugins/retrieval)
13. 💡 [LangChain Embedding Injection Example](https://github.com/hwchase17/langchain/issues/2244)
14. 🐍 [Example Attacks on Sentence Transformers](https://github.com/UKPLab/sentence-transformers/issues)
15. 🧬 [Differential Privacy in Embeddings](https://arxiv.org/pdf/2302.09262.pdf)

---

## 🧾 Conclusion

Vector and embedding weaknesses are subtle yet powerful avenues for exploitation, especially in modern LLM systems relying on RAG or semantic search. Always validate, filter, and monitor your embedding workflows.

---

> ⚠️ **Disclaimer**: This content is for ethical hacking, research, and educational purposes only. Do not use these techniques on systems you don't own or have explicit permission to test.

---

## 🔗 Repository Information

**Repository:** [https://github.com/vaishnavu/Ai-penetration-testing](https://github.com/vaishnavu/Ai-penetration-testing)

### 🤝 How to Contribute

Contributions are welcome! If you have new tools, fixes, or better explanations:

1. Fork the project
2. Create a new branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push: `git push origin feature/AmazingFeature`
5. Submit a pull request 🎉

### 📖 How to Use This Repository

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vaishnavu/Ai-penetration-testing.git
   cd Ai-penetration-testing
   ```

2. **Browse the content:** Each LLM file covers a specific vulnerability from the OWASP Top 10
3. **Practice safely:** Use the provided labs and playgrounds for ethical testing
4. **Stay updated:** Check back for new vulnerabilities and tools

---

**Maintainer:** [vaishnavucv](https://github.com/vaishnavu)
