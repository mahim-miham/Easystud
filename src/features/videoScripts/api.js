import { callAI } from '../../lib/aiClient'

export async function runVideoScript(topic) {
  return callAI('video-scripts', `Write a spoken video script for: ${topic}`)
}
