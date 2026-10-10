import { AppLayout } from "@/components/layout";
import { Badge } from "@/components/badge";
import { projectConfig, providerResourceName } from "@/lib/config";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export default async function SecurityPage() {
  let events: any[] = []; let error = false;
  try { events = await prisma.securityEvent.findMany({ orderBy: { createdAt: "desc" }, take: 50 }); } catch { error = true; }
  return <AppLayout active="/security" title="Security center"><div className="content">
    <div className="eyebrow">Identity & access</div><h1>Security center</h1><p className="subtitle">Review the intended trust configuration and security event records. This page displays configured metadata; it does not query live Google Cloud IAM.</p>
    <div className="stats">
      <div className="stat"><div className="stat-label">Identity provider</div><div className="stat-value" style={{fontSize:20}}>GitHub OIDC</div><div className="stat-foot">Token issuer configured in GCP</div></div>
      <div className="stat"><div className="stat-label">Credential strategy</div><div className="stat-value" style={{fontSize:20}}>Keyless</div><div className="stat-foot">No JSON service-account key</div></div>
      <div className="stat"><div className="stat-label">Repository scope</div><div className="stat-value" style={{fontSize:18}}>Restricted</div><div className="stat-foot">{projectConfig.repository}</div></div>
      <div className="stat"><div className="stat-label">Runtime validation</div><div className="stat-value" style={{fontSize:20}}>Required</div><div className="stat-foot">Confirm real Actions run</div></div>
    </div>
    <section className="panel"><div className="panel-head"><h2>Federation configuration</h2><Badge status="configured metadata"/></div>
      <div className="field-label">Project ID</div><div className="code">{projectConfig.projectId}</div>
      <div className="field-label" style={{marginTop:15}}>Project number</div><div className="code">{projectConfig.projectNumber}</div>
      <div className="field-label" style={{marginTop:15}}>Provider resource name</div><div className="code">{providerResourceName}</div>
      <div className="field-label" style={{marginTop:15}}>Service account</div><div className="code">{projectConfig.serviceAccount}</div>
      <div className="field-label" style={{marginTop:15}}>Expected GitHub repository</div><div className="code">{projectConfig.repository}</div>
      <div className="small" style={{marginTop:15}}>Never expose OIDC tokens or Google access tokens in this UI or logs. Keep repository and provider restrictions configured in Google Cloud IAM; dashboard text does not enforce them.</div>
    </section>
    <section className="panel" style={{marginTop:16}}><div className="panel-head"><h2>Security events</h2><Badge status={error ? "database unavailable" : `${events.length} records`}/></div>
      {error ? <p className="subtitle">Database unavailable.</p> : events.map(e=><div className="row-list" key={e.id}><span className={`dot ${e.severity==="warning"?"warning":e.severity==="error"?"failed":""}`}/><div style={{flex:1}}><div className="row-title">{e.title}</div><div className="row-sub">{e.description}</div><div className="small">{e.category} · {e.source} · {new Date(e.createdAt).toLocaleString()}</div></div><Badge status={e.status}/></div>)}
    </section>
  </div></AppLayout>;
}
