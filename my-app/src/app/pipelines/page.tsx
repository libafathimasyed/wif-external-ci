import { AppLayout } from "@/components/layout";
import { Badge } from "@/components/badge";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export default async function PipelinesPage() {
  let rows: any[] = []; let error = false;
  try { rows = await prisma.deployment.findMany({ orderBy: { createdAt: "desc" }, take: 50 }); } catch { error = true; }
  return <AppLayout active="/pipelines" title="Pipeline runs"><div className="content">
    <div className="eyebrow">Continuous integration / delivery</div><h1>Pipeline runs</h1><p className="subtitle">A readable view of stored pipeline/deployment results. Live GitHub run ingestion is a future integration.</p>
    <section className="panel" style={{marginTop:24}}><div className="panel-head"><h2>Run history</h2><Badge status={error ? "database unavailable" : "database records"}/></div>
    {error ? <p className="subtitle">Database unavailable. Configure DATABASE_URL.</p> : rows.map(r=><div className="row-list" key={r.id}><span className={`dot ${r.status==="failed"?"failed":r.status==="queued"?"warning":""}`}/><div style={{flex:1}}><div className="row-title">{r.commitMessage ?? r.appName}</div><div className="row-sub">{r.branch} · {r.commitSha ?? "no SHA"} · {new Date(r.createdAt).toLocaleString()}</div>{r.workflowRunUrl && <a className="small" href={r.workflowRunUrl} target="_blank" rel="noreferrer">Open workflow run ↗</a>}</div><Badge status={r.status}/></div>)}
    </section>
  </div></AppLayout>;
}
