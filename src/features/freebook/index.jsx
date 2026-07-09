import { Library } from 'lucide-react'
import FeatureComingSoon from '../../components/FeatureComingSoon'

export default function Freebook() {
  return (
    <FeatureComingSoon
      icon={Library}
      name="Freebook"
      blurb="A shared library of free study materials and e-books for your courses."
      note="Wire up in features/freebook/api.js"
    />
  )
}
