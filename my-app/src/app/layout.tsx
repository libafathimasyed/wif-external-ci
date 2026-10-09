import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecureDeploy | Keyless CI/CD Security",
  description: "Demonstration dashboard for Google Cloud Workload Identity Federation and external CI/CD.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
