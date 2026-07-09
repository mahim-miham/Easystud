import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getFeature } from '../features/registry'

export default function FeatureDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const feature = getFeature(id)

  if (!feature) return <Navigate to="/" replace />

  const FeatureComponent = feature.component

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-3 px-5 pt-[max(env(safe-area-inset-top),20px)] pb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 active:bg-black/10"
          aria-label="Back"
        >
          <ArrowLeft size={16} className="text-[var(--ink)]" />
        </button>
      </div>
      <div className="flex flex-1 flex-col">
        <FeatureComponent />
      </div>
    </div>
  )
}
