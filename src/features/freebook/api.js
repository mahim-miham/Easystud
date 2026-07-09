import { callAI } from '../../lib/aiClient'

export async function searchFreebook(query) {
  return callAI('freebook', `Find free study resources about: ${query}`)
}
