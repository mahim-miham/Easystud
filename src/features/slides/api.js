import { callAI } from '../../lib/aiClient'

export async function runSlides(topic) {
  return callAI('slides', `Create a slide-by-slide outline for: ${topic}`)
}
