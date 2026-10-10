import { Sidebar } from "@/components/sidebar";

export function AppLayout({ children, active, title }: { children: React.ReactNode; active: string; title: string }) {
  return <div className="shell"><Sidebar active={active}/><main className="main">
    <header className="topbar"><div><div className="eyebrow">Infrastructure / {title}</div><div style={{fontSize:13,fontWeight:700,marginTop:5}}>SecureDeploy workspace</div></div><div style={{display:"flex",alignItems:"center",gap:10}}><span className="pill success">● System configured</span><div style={{width:32,height:32,borderRadius:10,background:"#233652",display:"grid",placeItems:"center",fontSize:11,fontWeight:800}}>SD</div></div></header>
    {children}
    <footer style={{ marginTop: 40, padding: "24px 0", textAlign: "center", fontSize: 12, fontWeight: 500, color: "var(--text-light)", opacity: 0.6, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      developed by 24CC3156-P048
    </footer>
  </main></div>;
}
