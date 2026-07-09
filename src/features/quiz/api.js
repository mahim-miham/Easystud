import { callAI } from '../../lib/aiClient'

export async function runQuiz(topic) {
  return callAI('quiz', `Write 10 practice quiz questions with answers for: ${topic}`)
}
