import Link from "next/link";
import { Activity, Boxes, CircleHelp, GitBranch, LayoutDashboard, LockKeyhole, ScrollText, Settings2, ShieldCheck } from "lucide-react";

const links = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/deployments", label: "Deployments", icon: Boxes },
  { href: "/pipelines", label: "Pipeline runs", icon: GitBranch },
  { href: "/security", label: "Security center", icon: ShieldCheck },
];

export function Sidebar({ active }: { active: string }) {
  return <aside className="sidebar">
    <Link href="/" className="brand"><span className="brand-mark"><LockKeyhole size={19}/></span><span>SecureDeploy</span></Link>
    <div className="nav-label">Workspace</div>
    {links.map(({href,label,icon:Icon}) => <Link key={href} href={href} className={`nav-link ${active === href ? "active" : ""}`}><Icon size={17}/>{label}</Link>)}
    <div style={{position:"absolute",bottom:20,color:"#555",fontSize:10,display:"flex",alignItems:"center",gap:7}}><CircleHelp size={13}/> SecureDeploy v1.0</div>
  </aside>;
}
