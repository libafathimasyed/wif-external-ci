import { AppLayout } from "@/components/layout";
import { projectConfig, providerResourceName } from "@/lib/config";
export default function SettingsPage() {
  return <AppLayout active="/settings" title="Configuration"><div className="content">
    <div className="eyebrow">Workspace settings</div><h1>Configuration</h1><p className="subtitle">Non-secret project metadata. Runtime values may be overridden through environment variables.</p>
    <section className="panel" style={{marginTop:24}}><h2>Google Cloud Workload Identity Federation</h2>
      {[["Project ID",projectConfig.projectId],["Project number",projectConfig.projectNumber],["Pool ID",projectConfig.poolId],["Provider ID",projectConfig.providerId],["Provider resource",providerResourceName],["Service account",projectConfig.serviceAccount],["GitHub repository",projectConfig.repository]].map(([k,v])=><div key={k} style={{marginTop:17}}><div className="field-label">{k}</div><div className="code">{v}</div></div>)}
    </section>
    <section className="panel" style={{marginTop:16}}><h2>Environment variables</h2><p className="subtitle">Required environment variables on Coolify.</p><div className="code">DATABASE_URL=postgresql://...<br/>DASHBOARD_API_TOKEN=your_secret_token</div></section>
  </div></AppLayout>;
}
