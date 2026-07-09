/**
 * lib/aiClient.js
 * ------------------------------------------------------------------
 * SINGLE SHARED ENTRY POINT for every AI-powered feature in Easystud.
 *
 * By default this calls /api/<featureId> — a Vercel serverless function
 * living in the /api folder at the project root. When you deploy this
 * project to Vercel with an ANTHROPIC_API_KEY environment variable set,
 * this works with ZERO extra config.
 *
 * Only set VITE_AI_BACKEND_URL in .env if your backend lives somewhere
 * other than this same Vercel project (e.g. a separate server).
 *
 * WHEN ADDING A NEW LIVE FEATURE:
 * 1. Create api/<featureId>.js (copy api/research.js as a template).
 * 2. Add ANTHROPIC_API_KEY in Vercel once — every feature shares it.
 * 3. Every feature already calls this one function, so nothing else
 *    here needs to change.
 * ------------------------------------------------------------------
 */

const AI_BACKEND_URL = import.meta.env.VITE_AI_BACKEND_URL || '/api'

/**
 * @param {string} featureId - which feature is calling (e.g. 'research', 'quiz')
 * @param {string} prompt - the user's request / input
 * @param {object} options - optional extra params a feature wants to pass along
 */
export async function callAI(featureId, prompt, options = {}) {
  try {
    const res = await fetch(`${AI_BACKEND_URL}/${featureId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, ...options }),
    })

    if (!res.ok) {
      let message = `Request failed (${res.status})`
      try {
        const errJson = await res.json()
        if (errJson.error) message = errJson.error
      } catch {
        /* response wasn't JSON — keep the generic message */
      }
      return { ok: false, message }
    }

    const data = await res.json()
    return { ok: true, data }
  } catch {
    return {
      ok: false,
      message:
        "Couldn't reach the AI backend. If you're running `npm run dev`, this route only works with `vercel dev` or after deploying — plain Vite dev doesn't run /api functions.",
    }
  }
}
