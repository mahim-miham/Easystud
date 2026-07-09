import { callAI } from '../../lib/aiClient'

export async function runExamPrep(examType) {
  return callAI('exam-prep', `Write a practice set in the real format of: ${examType}`)
}
