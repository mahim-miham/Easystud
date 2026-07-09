import { callAI } from '../../lib/aiClient'

export async function generateArt(prompt) {
  return callAI('art-studio', `Generate a 3D-styled illustration concept for: ${prompt}`)
}
