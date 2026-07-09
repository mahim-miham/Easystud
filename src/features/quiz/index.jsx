import { HelpCircle } from 'lucide-react'
import FeatureComingSoon from '../../components/FeatureComingSoon'

export default function Quiz() {
  return (
    <FeatureComingSoon
      icon={HelpCircle}
      name="Quiz"
      blurb="Generate practice questions from any topic to test yourself before the real exam."
      note="Wire up in features/quiz/api.js"
    />
  )
}
