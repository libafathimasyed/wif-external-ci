import Link from "next/link";
import { Activity, Boxes, CircleHelp, GitBranch, LayoutDashboard, LockKeyhole, ScrollText, Settings2, ShieldCheck } from "lucide-react";

const links = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/deployments", label: "Deployments", icon: Boxes },
  { href: "/pipelines", label: "Pipeline runs", icon: GitBranch },
  { href: "/security", label: "Security center", icon: ShieldCheck },
  { href: "/audit", label: "Audit events", icon: ScrollText },
];

export function Sidebar({ active }: { active: string }) {
  return <aside className="sidebar">
    <Link href="/" className="brand"><span className="brand-mark"><LockKeyhole size={19}/></span><span>SecureDeploy</span></Link>
    <div className="nav-label">Workspace</div>
    {links.map(({href,label,icon:Icon}) => <Link key={href} href={href} className={`nav-link ${active === href ? "active" : ""}`}><Icon size={17}/>{label}</Link>)}
    <div className="nav-label">System</div>
    <Link href="/settings" className={`nav-link ${active === "/settings" ? "active" : ""}`}><Settings2 size={17}/>Configuration</Link>

    <div style={{position:"absolute",bottom:20,color:"#718099",fontSize:10,display:"flex",alignItems:"center",gap:7}}><CircleHelp size={13}/> SecureDeploy v1.0</div>
  </aside>;
}
