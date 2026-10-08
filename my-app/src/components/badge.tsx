export function Badge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const cls = ["success","passed","healthy","reviewed"].includes(s) ? "success" :
    ["failed","error","blocked"].includes(s) ? "danger" :
    ["warning","needs-review","pending","queued"].includes(s) ? "warning" : "";
  return <span className={`pill ${cls}`}>{status.replaceAll("-", " ")}</span>;
}
