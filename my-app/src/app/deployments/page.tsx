import { AppLayout } from "@/components/layout";
import { Badge } from "@/components/badge";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export default async function DeploymentsPage() {
  let rows: any[] = [];
  let error = false;
  try { rows = await prisma.deployment.findMany({ orderBy: { createdAt: "desc" }, take: 100 }); } catch { error = true; }
  return <AppLayout active="/deployments" title="Deployments"><div className="content">
    <div className="eyebrow">Release management</div><h1>Deployments</h1><p className="subtitle">Deployment records, commit references, environments, and outcomes.</p>
    <section className="panel" style={{marginTop:24}}><div className="panel-head"><h2>Deployment history</h2><Badge status={error ? "database unavailable" : `${rows.length} records`}/></div>
    {error ? <p className="subtitle">Database unavailable. Configure DATABASE_URL and run migrations.</p> : <div className="table-wrap"><table><thead><tr><th>Application</th><th>Environment</th><th>Branch / Commit</th><th>Status</th><th>Triggered</th><th>Created</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{r.appName}</td><td>{r.environment}</td><td><div>{r.branch}</div><div className="small">{r.commitSha ?? "—"}</div></td><td><Badge status={r.status}/></td><td>{r.triggeredBy ?? "—"}</td><td>{new Date(r.createdAt).toLocaleString()}</td></tr>)}</tbody></table></div>}
    </section>
  </div></AppLayout>;
}
