import { GraduationCap } from 'lucide-react'
import FeatureComingSoon from '../../components/FeatureComingSoon'

export default function ExamPrep() {
  return (
    <FeatureComingSoon
      icon={GraduationCap}
      name="Exam Prep"
      blurb="Practice sets for IELTS, SAT, GRE and TOEFL, with real question formats."
      note="Wire up in features/examPrep/api.js"
    />
  )
}
