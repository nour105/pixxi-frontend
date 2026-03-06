import { Suspense } from "react";
import DevelopersClient from "./DevelopersClient";

export default function DevelopersPage() {
  return (
    <Suspense fallback={<p className="text-center py-16">Loading developers...</p>}>
      <DevelopersClient />
    </Suspense>
  );
}