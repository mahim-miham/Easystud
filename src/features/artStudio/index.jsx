import { Sparkles } from 'lucide-react'
import FeatureComingSoon from '../../components/FeatureComingSoon'

export default function ArtStudio() {
  return (
    <FeatureComingSoon
      icon={Sparkles}
      name="Art Studio"
      blurb="3D-styled illustrations and diagrams to make your reports and slides stand out."
      note="Wire up in features/artStudio/api.js"
    />
  )
}
