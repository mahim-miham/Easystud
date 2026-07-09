import { Presentation } from 'lucide-react'
import FeatureComingSoon from '../../components/FeatureComingSoon'

export default function Slides() {
  return (
    <FeatureComingSoon
      icon={Presentation}
      name="Slides"
      blurb="Turn a topic or outline into presentation-ready slide content."
      note="Wire up in features/slides/api.js"
    />
  )
}
