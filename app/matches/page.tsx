
'use client'
import { useState } from 'react'
import { getMatches, Match } from '@/lib/api'

export default function MatchesPage() {
  const [jobId, setJobId] = useState('')
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [matches, setMatches] = useState<Match[] | null>(null)

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!jobId) { setError('Informe um job_id.'); return }
    setLoading(true); setError(null); setMatches(null)
    try {
      const data = await getMatches(jobId, limit)
      setMatches(data.matches || [])
    } catch (err: any) {
      setError(err?.message || 'Erro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h1 className="text-xl font-semibold mb-4">Matches por Vaga</h1>
      <form onSubmit={onSearch} className="grid md:grid-cols-[1fr,140px,120px] gap-3 mb-6">
        <input className="input" placeholder="job_id (UUID da vaga)" value={jobId} onChange={e => setJobId(e.target.value)} />
        <input className="input" type="number" min={1} max={100} value={limit} onChange={e => setLimit(parseInt(e.target.value || '20'))} />
        <button className="btn btn-brand" disabled={loading}>{loading ? 'Buscando...' : 'Buscar'}</button>
      </form>

      {error && <div className="text-red-600">{error}</div>}

      {matches && matches.length === 0 && (
        <div className="text-gray-600">Nenhum match encontrado para esse job_id.</div>
      )}

      {matches && matches.length > 0 && (
        <ul className="space-y-3">
          {matches.map((m) => (
            <li key={m.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <div className="font-medium">Candidato: {m.candidate_id.slice(0,8)}… • Resume: {m.resume_id.slice(0,8)}…</div>
                <div className="text-brand-700 font-bold">{Math.round(m.score)}%</div>
              </div>
              {m.summary && <p className="text-gray-700 mt-2">{m.summary}</p>}
              <div className="text-xs text-gray-500 mt-2">status: {m.status || 'novo'} • criado em: {m.created_at?.slice(0,19)?.replace('T',' ')}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
