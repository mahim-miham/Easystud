import { callAI } from '../../lib/aiClient'

export async function runStudyNotes(source) {
  return callAI('study-notes', `Condense this into exam-ready study notes: ${source}`)
}
