import { callAI } from '../../lib/aiClient'

export async function runResearch(topic) {
  return callAI('research', `Give a deep, well-structured explanation of: ${topic}`)
}
