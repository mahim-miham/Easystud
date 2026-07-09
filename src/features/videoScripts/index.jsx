import { Clapperboard } from 'lucide-react'
import FeatureComingSoon from '../../components/FeatureComingSoon'

export default function VideoScripts() {
  return (
    <FeatureComingSoon
      icon={Clapperboard}
      name="Video Scripts"
      blurb="Scripts for video presentations and assignments, timed and easy to read aloud."
      note="Wire up in features/videoScripts/api.js"
    />
  )
}
