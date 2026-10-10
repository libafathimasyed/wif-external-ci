import { AppLayout } from "@/components/layout";
import { Badge } from "@/components/badge";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export default async function AuditPage() {
  let events: any[] = []; let error = false;
  try { events = await prisma.securityEvent.findMany({ orderBy: { createdAt: "desc" }, take: 100 }); } catch { error = true; }
  return <AppLayout active="/audit" title="Audit events"><div className="content">
    <div className="eyebrow">Audit trail</div><h1>Audit events</h1><p className="subtitle">Stored security observations and review items. This is not a Google Cloud Audit Logs integration.</p>
    <section className="panel" style={{marginTop:24}}>{error ? <p className="subtitle">Database unavailable.</p> : events.map(e=><div className="row-list" key={e.id}><span className={`dot ${e.severity==="warning"?"warning":e.severity==="error"?"failed":""}`}/><div style={{flex:1}}><div className="row-title">{e.title}</div><div className="row-sub">{e.description}</div><div className="small">{e.source} · {new Date(e.createdAt).toLocaleString()}</div></div><Badge status={e.severity}/></div>)}</section>
  </div></AppLayout>;
}
