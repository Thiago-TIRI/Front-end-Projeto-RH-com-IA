
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card">
        <h2 className="text-xl font-semibold mb-2">Bem-vindo 👋</h2>
        <p className="text-gray-600">Este é o frontend (UI) para a sua API FastAPI. Configure a variável <code>NEXT_PUBLIC_API_BASE_URL</code> para apontar para o backend.</p>
        <div className="mt-4 flex gap-3">
          <Link className="btn btn-brand" href="/upload">Fazer Upload</Link>
          <Link className="btn border border-gray-200" href="/matches">Ver Matches</Link>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-2">Como usar</h3>
        <ol className="list-decimal ml-5 text-gray-700 space-y-2">
          <li>Defina <b>NEXT_PUBLIC_API_BASE_URL</b> no ambiente (ex.: URL do Vercel do backend).</li>
          <li>Envie um currículo em <Link className="underline" href="/upload">Upload</Link>.</li>
          <li>Depois, acesse <Link className="underline" href="/matches">Matches</Link> com o <i>job_id</i>.</li>
          <li>Você também pode abrir a documentação da API em <code>/docs</code>.</li>
        </ol>
      </div>
    </div>
  )
}
