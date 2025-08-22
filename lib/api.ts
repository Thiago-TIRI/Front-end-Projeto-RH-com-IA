
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export type UploadResponse = {
  ok: boolean;
  resume_id?: string;
  candidate_id?: string;
  job_id?: string | null;
  score?: number | null;
};

export type Match = {
  id: string;
  org_id: string | null;
  job_id: string | null;
  candidate_id: string;
  resume_id: string;
  score: number;
  score_breakdown?: any;
  summary?: string | null;
  status?: string | null;
  created_at?: string;
};

export async function uploadResume(payload: {
  file: File;
  org_id: string;
  candidate_email?: string;
  candidate_id?: string;
  job_id?: string;
}): Promise<UploadResponse> {
  const fd = new FormData();
  fd.append('file', payload.file);
  fd.append('org_id', payload.org_id);
  if (payload.candidate_email) fd.append('candidate_email', payload.candidate_email);
  if (payload.candidate_id) fd.append('candidate_id', payload.candidate_id);
  if (payload.job_id) fd.append('job_id', payload.job_id);

  const res = await fetch(`${API_BASE}/api/resumes`, {
    method: 'POST',
    body: fd
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Falha no upload: ${res.status} ${txt}`);
  }
  return res.json();
}

export async function getMatches(job_id: string, limit = 20): Promise<{ job_id: string, matches: Match[] }> {
  const url = new URL(`${API_BASE}/api/jobs/${job_id}/matches`);
  url.searchParams.set('limit', String(limit));
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Falha ao buscar matches: ${res.status} ${txt}`);
  }
  return res.json();
}
