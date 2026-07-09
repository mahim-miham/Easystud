/**
 * api/research.js
 * ------------------------------------------------------------------
 * Vercel serverless function. Runs on Anthropic's server-side infra,
 * never in the browser — so ANTHROPIC_API_KEY is never exposed.
 *
 * SETUP:
 * 1. Get an API key from the Claude Console: https://console.anthropic.com
 * 2. In your Vercel project → Settings → Environment Variables, add:
 *      ANTHROPIC_API_KEY = sk-ant-...
 * 3. Redeploy. That's it — the frontend already calls this route.
 *
 * Model: claude-sonnet-5 is a good default (quality vs. cost balance
 * for a student-facing research tool). Swap to claude-haiku-4-5-20251001
 * for cheaper/faster, or claude-opus-4-8 for the highest quality.
 * ------------------------------------------------------------------
 */

const SYSTEM_PROMPT = `You are the "Research" tool inside Easystud, a study app for university
students. Given a topic or question, give a clear, well-structured explanation
that would actually help someone study it — not just a surface-level answer.

Format your response in plain text using:
- Short "## Heading" lines to break up sections
- "- " for bullet points where a list is genuinely clearer than prose
- Plain paragraphs otherwise
Keep it focused and exam-relevant. Avoid filler and avoid saying "I".`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(500).json({
      error: 'ANTHROPIC_API_KEY is not set on the server yet. Add it in Vercel → Settings → Environment Variables.',
    })
    return
  }

  const { prompt } = req.body || {}
  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Missing "prompt" in request body.' })
    return
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!upstream.ok) {
      const errBody = await upstream.text()
      res.status(upstream.status).json({ error: `Claude API error: ${errBody}` })
      return
    }

    const data = await upstream.json()
    const text = (data.content || [])
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')

    res.status(200).json({ text })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown server error.' })
  }
}
