import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { Download, ImagePlus } from 'lucide-react'
import Logo from '../../components/Logo'

const emptyId = {
  name: '',
  studentId: '',
  program: '',
  university: '',
  validThru: '',
  photo: '',
}

const emptyCv = {
  name: '',
  email: '',
  phone: '',
  education: '',
  skills: '',
  experience: '',
}

export default function IdCardBuilder() {
  const [tab, setTab] = useState('id')
  const [idForm, setIdForm] = useState(emptyId)
  const [cvForm, setCvForm] = useState(emptyCv)
  const idRef = useRef(null)

  function handlePhoto(file) {
    const reader = new FileReader()
    reader.onload = () => setIdForm((f) => ({ ...f, photo: reader.result }))
    reader.readAsDataURL(file)
  }

  async function exportIdCard() {
    const node = idRef.current
    const canvas = await html2canvas(node, { scale: 3, backgroundColor: null })
    const link = document.createElement('a')
    link.download = `${idForm.name || 'student'}-id-card.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  function exportCv() {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const margin = 48
    let y = margin

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text(cvForm.name || 'Your Name', margin, y)
    y += 20

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(90)
    doc.text([cvForm.email, cvForm.phone].filter(Boolean).join('   ·   '), margin, y)
    y += 28

    const section = (title, body) => {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.setTextColor(22, 52, 43)
      doc.text(title.toUpperCase(), margin, y)
      y += 6
      doc.setDrawColor(47, 190, 119)
      doc.line(margin, y, 547, y)
      y += 16
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10.5)
      doc.setTextColor(30)
      const lines = doc.splitTextToSize(body || '—', 500)
      doc.text(lines, margin, y)
      y += lines.length * 14 + 20
    }

    section('Education', cvForm.education)
    section('Skills', cvForm.skills)
    section('Experience', cvForm.experience)

    doc.save(`${cvForm.name || 'student'}-cv.pdf`)
  }

  return (
    <div className="flex flex-1 flex-col px-5 pt-1 pb-6">
      <h1 className="font-display font-semibold text-xl text-[var(--ink)]">Student ID / CV</h1>
      <p className="mb-4 text-[12px] text-[var(--ink-soft)]">Build a clean ID card or CV in minutes.</p>

      <div className="mb-4 flex gap-2 rounded-full bg-[var(--veil-1)] p-1">
        {['id', 'cv'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 rounded-full py-2 text-[13px] font-medium transition"
            style={{
              background: tab === t ? 'var(--board)' : 'transparent',
              color: tab === t ? 'white' : 'var(--ink-soft)',
            }}
          >
            {t === 'id' ? 'ID Card' : 'CV'}
          </button>
        ))}
      </div>

      {tab === 'id' ? (
        <>
          {/* live preview */}
          <div
            ref={idRef}
            className="chalk-surface mx-auto mb-4 flex w-full max-w-[320px] flex-col rounded-[18px] p-4 text-[var(--ink-on-board)]"
            style={{ boxShadow: 'var(--shadow-board)', aspectRatio: '85.6/54' }}
          >
            <div className="mb-2 flex items-center gap-1.5">
              <Logo size={20} color="var(--sprout)" />
              <span className="font-display text-[13px] tracking-wide">Easystud</span>
            </div>
            <div className="flex flex-1 items-center gap-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white/10">
                {idForm.photo ? (
                  <img src={idForm.photo} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[var(--ink-on-board-soft)]">
                    <ImagePlus size={18} />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-[15px] leading-tight">{idForm.name || 'Student Name'}</p>
                <p className="truncate text-[11px] text-[var(--ink-on-board-soft)] font-mono">
                  {idForm.program || 'Program'}
                </p>
                <p className="truncate text-[11px] text-[var(--ink-on-board-soft)] font-mono">
                  {idForm.studentId || 'ID Number'}
                </p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-1.5">
              <p className="truncate text-[9.5px] text-[var(--ink-on-board-soft)]">{idForm.university || 'University'}</p>
              <p className="text-[9.5px] text-[var(--ink-on-board-soft)] font-mono">
                {idForm.validThru ? `Valid thru ${idForm.validThru}` : ''}
              </p>
            </div>
          </div>

          <label className="mb-3 flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-dashed border-black/15 bg-[var(--surface)]/60 py-2.5 text-[13px] text-[var(--ink)]">
            <ImagePlus size={15} />
            Upload photo
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handlePhoto(e.target.files[0])} />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <Field label="Full name" value={idForm.name} onChange={(v) => setIdForm({ ...idForm, name: v })} full />
            <Field label="Student ID" value={idForm.studentId} onChange={(v) => setIdForm({ ...idForm, studentId: v })} />
            <Field label="Program" value={idForm.program} onChange={(v) => setIdForm({ ...idForm, program: v })} />
            <Field label="University" value={idForm.university} onChange={(v) => setIdForm({ ...idForm, university: v })} full />
            <Field label="Valid thru" value={idForm.validThru} onChange={(v) => setIdForm({ ...idForm, validThru: v })} placeholder="12/2027" />
          </div>

          <button
            onClick={exportIdCard}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] py-3.5 text-[14px] font-semibold text-white active:scale-[0.98] transition"
            style={{ background: 'var(--sprout-deep)' }}
          >
            <Download size={16} />
            Download ID card (PNG)
          </button>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Field label="Full name" value={cvForm.name} onChange={(v) => setCvForm({ ...cvForm, name: v })} full />
            <div className="grid grid-cols-2 gap-2">
              <Field label="Email" value={cvForm.email} onChange={(v) => setCvForm({ ...cvForm, email: v })} />
              <Field label="Phone" value={cvForm.phone} onChange={(v) => setCvForm({ ...cvForm, phone: v })} />
            </div>
            <TextArea label="Education" value={cvForm.education} onChange={(v) => setCvForm({ ...cvForm, education: v })} placeholder="BCS, Mila University — expected 2029" />
            <TextArea label="Skills" value={cvForm.skills} onChange={(v) => setCvForm({ ...cvForm, skills: v })} placeholder="Figma, UI/UX design, C programming" />
            <TextArea label="Experience" value={cvForm.experience} onChange={(v) => setCvForm({ ...cvForm, experience: v })} placeholder="Freelance UI/UX designer — Fiverr, 2025–present" />
          </div>

          <button
            onClick={exportCv}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] py-3.5 text-[14px] font-semibold text-white active:scale-[0.98] transition"
            style={{ background: 'var(--sprout-deep)' }}
          >
            <Download size={16} />
            Download CV (PDF)
          </button>
        </>
      )}
    </div>
  )
}

function Field({ label, value, onChange, full, placeholder }) {
  return (
    <label className={full ? 'col-span-2 block' : 'block'}>
      <span className="mb-1 block text-[11px] font-mono uppercase text-[var(--ink-soft)]">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[var(--radius-sm)] border border-[var(--paper-line)] bg-[var(--surface)] px-3 py-2.5 text-[13.5px] outline-none focus:border-[var(--sprout)]"
      />
    </label>
  )
}

function TextArea({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-mono uppercase text-[var(--ink-soft)]">{label}</span>
      <textarea
        rows={2}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none rounded-[var(--radius-sm)] border border-[var(--paper-line)] bg-[var(--surface)] px-3 py-2.5 text-[13.5px] outline-none focus:border-[var(--sprout)]"
      />
    </label>
  )
}
