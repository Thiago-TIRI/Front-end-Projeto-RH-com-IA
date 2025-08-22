
'use client'
import { useState } from 'react'
import { uploadResume, UploadResponse } from '@/lib/api'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [orgId, setOrgId] = useState('org-demo')
  const [candidateEmail, setCandidateEmail] = useState('')
  const [candidateId, setCandidateId] = useState('')
  const [jobId, setJobId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<UploadResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) { setError('Selecione um arquivo.'); return }
    setLoading(true); setError(null); setResult(null)
    try {
      const out = await uploadResume({
        file,
        org_id: orgId,
        candidate_email: candidateEmail || undefined,
        candidate_id: candidateId || undefined,
        job_id: jobId || undefined,
      })
      setResult(out)
    } catch (err: any) {
      setError(err?.message || 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto card">
      <h1 className="text-xl font-semibold mb-4">Upload de Currículo</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label">Arquivo (PDF, DOCX...)</label>
          <input type="file" className="input" onChange={e => setFile(e.target.files?.[0] || null)} />
        </div>
        <div>
          <label className="label">Org ID</label>
          <input type="text" className="input" value={orgId} onChange={e => setOrgId(e.target.value)} placeholder="org-demo"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Candidate Email (opcional)</label>
            <input type="email" className="input" value={candidateEmail} onChange={e => setCandidateEmail(e.target.value)} />
          </div>
          <div>
            <label className="label">Candidate ID (opcional)</label>
            <input type="text" className="input" value={candidateId} onChange={e => setCandidateId(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="label">Job ID (opcional)</label>
          <input type="text" className="input" value={jobId} onChange={e => setJobId(e.target.value)} placeholder="uuid-da-vaga"/>
        </div>

        <div className="flex gap-3">
          <button className="btn btn-brand" disabled={loading}>{loading ? 'Enviando...' : 'Enviar'}</button>
          <a className="btn border border-gray-200" href={process.env.NEXT_PUBLIC_API_BASE_URL + '/docs'} target="_blank" rel="noreferrer">Ver API /docs</a>
        </div>
      </form>

      {error && <div className="mt-4 text-red-600">{error}</div>}
      {result && (
        <div className="mt-6 border-t pt-4 space-y-1 text-sm">
          <div><b>OK:</b> {String(result.ok)}</div>
          <div><b>resume_id:</b> {result.resume_id}</div>
          <div><b>candidate_id:</b> {result.candidate_id}</div>
          <div><b>job_id:</b> {result.job_id ?? '—'}</div>
          <div><b>score:</b> {result.score ?? '—'}</div>
        </div>
      )}
    </div>
  )
}
