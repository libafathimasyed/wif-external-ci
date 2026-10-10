"use client";

import { useEffect } from "react";
import { AppLayout } from "@/components/layout";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <AppLayout active="" title="Error">
      <div className="content">
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()} className="btn">Try again</button>
      </div>
    </AppLayout>
  );
}
