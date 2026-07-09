import { NotebookPen } from 'lucide-react'
import FeatureComingSoon from '../../components/FeatureComingSoon'

export default function StudyNotes() {
  return (
    <FeatureComingSoon
      icon={NotebookPen}
      name="Study Notes"
      blurb="Paste your syllabus or reading and get condensed, exam-ready notes."
      note="Wire up in features/studyNotes/api.js"
    />
  )
}
