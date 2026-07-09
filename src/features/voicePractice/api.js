import { callAI } from '../../lib/aiClient'

export async function startVoiceSession(topic) {
  return callAI('voice-practice', `Start a spoken practice session about: ${topic}`)
}
