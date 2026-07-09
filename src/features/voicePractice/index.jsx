import { Mic } from 'lucide-react'
import FeatureComingSoon from '../../components/FeatureComingSoon'

export default function VoicePractice() {
  return (
    <FeatureComingSoon
      icon={Mic}
      name="Voice Practice"
      blurb="Practice speaking with an AI voice partner for up to 20 minutes — useful for spoken exams and interviews."
      note="Wire up in features/voicePractice/api.js"
    />
  )
}
