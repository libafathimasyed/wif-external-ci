import { AppLayout } from "@/components/layout";

export default function NotFound() {
  return (
    <AppLayout active="" title="Not Found">
      <div className="content">
        <h1>404 - Page Not Found</h1>
        <p className="subtitle">The page you are looking for does not exist.</p>
      </div>
    </AppLayout>
  );
}
