import { useState } from 'react'
import { jsPDF } from 'jspdf'
import { Upload, X, ArrowUp, ArrowDown, ImageDown, Download } from 'lucide-react'

export default function ImageToPdf() {
  const [images, setImages] = useState([]) // { id, name, dataUrl }
  const [building, setBuilding] = useState(false)

  function handleFiles(fileList) {
    const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'))
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        setImages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), name: file.name, dataUrl: reader.result },
        ])
      }
      reader.readAsDataURL(file)
    })
  }

  function remove(id) {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  function move(id, dir) {
    setImages((prev) => {
      const idx = prev.findIndex((i) => i.id === id)
      const newIdx = idx + dir
      if (newIdx < 0 || newIdx >= prev.length) return prev
      const copy = [...prev]
      ;[copy[idx], copy[newIdx]] = [copy[newIdx], copy[idx]]
      return copy
    })
  }

  async function buildPdf() {
    if (images.length === 0) return
    setBuilding(true)
    try {
      const doc = new jsPDF({ unit: 'pt', format: 'a4' })
      const pageW = doc.internal.pageSize.getWidth()
      const pageH = doc.internal.pageSize.getHeight()
      const margin = 24

      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage()
        const img = await loadImage(images[i].dataUrl)
        const maxW = pageW - margin * 2
        const maxH = pageH - margin * 2
        const ratio = Math.min(maxW / img.width, maxH / img.height)
        const w = img.width * ratio
        const h = img.height * ratio
        const x = (pageW - w) / 2
        const y = (pageH - h) / 2
        doc.addImage(images[i].dataUrl, 'JPEG', x, y, w, h, undefined, 'FAST')
      }

      doc.save('easystud-notes.pdf')
    } finally {
      setBuilding(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col px-5 pt-1 pb-6">
      <h1 className="font-display text-xl text-[var(--ink)]">Image to PDF</h1>
      <p className="mb-4 text-[12px] text-[var(--ink-soft)]">
        Snap photos of handwritten notes and merge them into one PDF.
      </p>

      <label className="mb-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] border-2 border-dashed border-black/15 bg-[var(--surface)]/60 py-8 text-center active:scale-[0.99] transition">
        <Upload size={22} className="text-[var(--sprout-deep)]" />
        <span className="text-[13px] font-medium text-[var(--ink)]">Add photos</span>
        <span className="text-[11px] text-[var(--ink-soft)]">JPG or PNG, any number</span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      {images.length === 0 ? (
        <div className="mt-8 flex flex-1 flex-col items-center justify-center text-center">
          <ImageDown size={30} className="text-[var(--ink-soft)]/40 mb-3" />
          <p className="text-[13px] text-[var(--ink-soft)]">No pages yet — add your first photo above.</p>
        </div>
      ) : (
        <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className="flex items-center gap-3 rounded-[var(--radius-sm)] bg-[var(--surface)] p-2.5"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <img src={img.dataUrl} alt="" className="h-14 w-14 rounded-md object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-medium text-[var(--ink)]">
                  Page {idx + 1}
                </p>
                <p className="truncate text-[11px] text-[var(--ink-soft)]">{img.name}</p>
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => move(img.id, -1)} disabled={idx === 0} className="p-1 disabled:opacity-25">
                  <ArrowUp size={14} className="text-[var(--ink-soft)]" />
                </button>
                <button onClick={() => move(img.id, 1)} disabled={idx === images.length - 1} className="p-1 disabled:opacity-25">
                  <ArrowDown size={14} className="text-[var(--ink-soft)]" />
                </button>
              </div>
              <button onClick={() => remove(img.id)} className="p-1.5 text-[var(--ink-soft)]/50 active:text-[var(--coral)]">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <button
          onClick={buildPdf}
          disabled={building}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] py-3.5 text-[14px] font-semibold text-white active:scale-[0.98] transition disabled:opacity-60"
          style={{ background: 'var(--board)' }}
        >
          <Download size={16} />
          {building ? 'Building PDF…' : `Download PDF (${images.length} page${images.length > 1 ? 's' : ''})`}
        </button>
      )}
    </div>
  )
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}
