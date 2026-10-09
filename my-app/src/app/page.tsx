import Link from "next/link";
import { Activity, ArrowUpRight, Clock3, ShieldCheck, Zap } from "lucide-react";
import { AppLayout } from "@/components/layout";
import { Badge } from "@/components/badge";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  let deployments: any[] = [];
  let securityCount = 0;
  let dbReady = true;
  try {
    [deployments, securityCount] = await Promise.all([
      prisma.deployment.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
      prisma.securityEvent.count()
    ]);
  } catch { dbReady = false; }

  const successCount = deployments.filter(d => d.status === "success").length;
  return <AppLayout active="/" title="Overview"><div className="content">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:16,flexWrap:"wrap"}}>
      <div>
        <div className="eyebrow" style={{display: "flex", alignItems: "center", gap: 6}}>
          <Zap size={14} color="var(--blue)"/> Control plane / Overview
        </div>
        <h1>Deployment overview</h1>
        <p className="subtitle">Monitor delivery health, identity security, and deployment activity from one workspace.</p>
      </div>
      <Link className="btn" href="/security"><ShieldCheck size={15}/> Review security posture <ArrowUpRight size={14}/></Link>
    </div>
    
    {!dbReady && (
      <div className="panel" style={{marginTop:24, background: "rgba(251, 191, 36, 0.05)", borderColor: "rgba(251, 191, 36, 0.2)"}}>
        <b style={{fontSize: 14, color: "#fbbf24"}}>Database connection pending</b>
        <p className="small" style={{color: "#fbbf24", opacity: 0.8, marginTop: 4}}>Set DATABASE_URL in your environment and run migrations to enable real-time data.</p>
      </div>
    )}

    <div className="stats">
      <div className="stat">
        <div className="stat-label">Tracked deployments</div>
        <div className="stat-value">{dbReady ? deployments.length : "—"}</div>
        <div className="stat-foot"><Activity size={14} style={{display:"inline",verticalAlign:"middle", marginRight: 4, color: "var(--blue)"}}/> Latest 4 records</div>
      </div>
      <div className="stat">
        <div className="stat-label">Successful runs</div>
        <div className="stat-value">{dbReady ? successCount : "—"}</div>
        <div className="stat-foot">From stored deployment records</div>
      </div>
      <div className="stat">
        <div className="stat-label">Security events</div>
        <div className="stat-value">{dbReady ? securityCount : "—"}</div>
        <div className="stat-foot">Security center records</div>
      </div>
      <div className="stat">
        <div className="stat-label">Identity model</div>
        <div className="stat-value" style={{fontSize:24}}>Keyless</div>
        <div className="stat-foot">OIDC + Workload Identity Federation</div>
      </div>
    </div>

    <div className="grid-2">
      <section className="panel">
        <div className="panel-head">
          <div><h2>Recent deployments</h2><div className="small">Most recent deployment records</div></div>
          <Link href="/deployments" className="small" style={{color: "var(--blue)", fontWeight: 600}}>View all →</Link>
        </div>
        {dbReady && deployments.length ? deployments.map(d => (
          <div className="row-list" key={d.id}>
            <span className={`dot ${d.status==="failed"?"failed":d.status==="queued"?"warning":""}`}/>
            <div style={{flex:1,minWidth:0}}>
              <div className="row-title">{d.appName}</div>
              <div className="row-sub">{d.environment} · {d.branch} · <span style={{fontFamily: "monospace", opacity: 0.8}}>{d.commitSha ?? "no commit SHA"}</span></div>
            </div>
            <Badge status={d.status}/>
          </div>
        )) : <p className="subtitle">No deployment records available. Connect the database to load sample records.</p>}
      </section>

      <section className="panel">
        <div className="panel-head">
          <div><h2>Identity security</h2><div className="small">Configured WIF trust path</div></div>
          <ShieldCheck color="#34d399" size={24} style={{filter: "drop-shadow(0 0 8px rgba(52, 211, 153, 0.4))"}}/>
        </div>
        <div className="row-list">
          <span className="dot"/>
          <div style={{flex:1}}>
            <div className="row-title">GitHub OIDC provider</div>
            <div className="row-sub">github-provider · global</div>
          </div>
          <Badge status="configured"/>
        </div>
        <div className="row-list">
          <span className="dot"/>
          <div style={{flex:1}}>
            <div className="row-title">Repository restriction</div>
            <div className="row-sub">libafathimasyed/wif-external-ci</div>
          </div>
          <Badge status="configured"/>
        </div>
        <div className="row-list">
          <span className="dot info"/>
          <div style={{flex:1}}>
            <div className="row-title">Token exchange</div>
            <div className="row-sub">Confirm in GitHub Actions run logs</div>
          </div>
          <Badge status="verify"/>
        </div>
        <Link href="/security" className="btn secondary" style={{marginTop:20,width:"100%"}}>Open security center <ArrowUpRight size={16}/></Link>
      </section>
    </div>

    <section className="panel" style={{marginTop:24}}>
      <div className="panel-head">
        <div><h2>Delivery pipeline flow</h2><div className="small">Architecture visualization</div></div>
        <Badge status="architecture"/>
      </div>
      <div className="pipeline-grid" style={{display:"grid",gridTemplateColumns:"repeat(5,minmax(0,1fr))",gap:16, paddingTop: 12}}>
        {[
          { title: "Git push", desc: "Source code update" },
          { title: "CI checks", desc: "Automated lint and tests" },
          { title: "GitHub OIDC", desc: "Request identity token" },
          { title: "Google WIF", desc: "Keyless GCP auth" },
          { title: "Linux deploy", desc: "Secure SSH deployment" }
        ].map((s, i) => (
          <div key={s.title} style={{
            padding: 20, 
            background: "linear-gradient(180deg, rgba(31,41,55,0.4) 0%, rgba(17,24,39,0.6) 100%)", 
            border: "1px solid rgba(255,255,255,0.08)", 
            borderRadius: 16, 
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            position: "relative"
          }}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14}}>
              <div style={{color: "var(--blue)",fontSize:11,fontWeight:800, letterSpacing: 1.5}}>STEP 0{i+1}</div>
              <div style={{width: 8, height: 8, borderRadius: "50%", background: "var(--blue)", boxShadow: "0 0 12px var(--blue-glow)"}} />
            </div>
            <div style={{fontSize:15,fontWeight:700, color: "#f3f4f6", letterSpacing: "-0.2px"}}>{s.title}</div>
            <div className="small" style={{marginTop:8, opacity: 0.8}}>{s.desc}</div>
          </div>
        ))}
      </div>
      <div className="small" style={{marginTop:20, padding: 12, background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.05)"}}>
        <b style={{color: "#e5e7eb"}}>Note:</b> WIF authenticates GitHub Actions to Google Cloud. Deployment to your Linux server uses a separate SSH trust path unless you implement a server-side Google identity integration.
      </div>
    </section>
    
    <div className="small" style={{marginTop:24,display:"flex",gap:8,alignItems:"center", opacity: 0.6}}>
      <Clock3 size={14}/> Dashboard values update from PostgreSQL via Prisma.
    </div>
  </div></AppLayout>;
}
