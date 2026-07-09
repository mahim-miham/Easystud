import { callAI } from '../../lib/aiClient'

export async function runAssignment(brief) {
  return callAI('assignments', `Write a well-structured assignment for: ${brief}`)
}
