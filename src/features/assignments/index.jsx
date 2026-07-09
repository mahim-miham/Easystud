import { FileText } from 'lucide-react'
import FeatureComingSoon from '../../components/FeatureComingSoon'

export default function Assignments() {
  return (
    <FeatureComingSoon
      icon={FileText}
      name="Assignments"
      blurb="Full essays, reports and case studies, drafted with proper academic structure from your prompt and rubric."
      note="Wire up in features/assignments/api.js"
    />
  )
}
