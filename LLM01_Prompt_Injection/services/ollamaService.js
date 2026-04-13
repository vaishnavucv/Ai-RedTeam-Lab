const { Ollama } = require('ollama');

const ollama = new Ollama({ host: 'http://localhost:11434' });

const MODEL = 'tinyllama';

/**
 * Send a messages array to Ollama and return the assistant reply text.
 * @param {Array<{role: string, content: string}>} messages
 * @returns {Promise<string>}
 */
async function chat(messages) {
  const response = await ollama.chat({
    model: MODEL,
    messages,
  });
  // Strip ASCII control characters (except tab/newline) that TinyLlama occasionally emits
  return response.message.content.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, '');
}

module.exports = { chat };
