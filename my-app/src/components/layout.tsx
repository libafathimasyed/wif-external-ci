import { Sidebar } from "@/components/sidebar";

export function AppLayout({ children, active, title }: { children: React.ReactNode; active: string; title: string }) {
  return <div className="shell"><Sidebar active={active}/><main className="main">
    <header className="topbar"><div><div className="eyebrow">Infrastructure / {title}</div><div style={{fontSize:13,fontWeight:700,marginTop:5}}>SecureDeploy workspace</div></div><div style={{display:"flex",alignItems:"center",gap:10}}><span className="pill success">● System configured</span><div style={{width:32,height:32,borderRadius:10,background:"#233652",display:"grid",placeItems:"center",fontSize:11,fontWeight:800}}>SD</div></div></header>
    {children}
  </main></div>;
}
