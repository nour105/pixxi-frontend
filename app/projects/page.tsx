import { Suspense } from "react";
import ProjectsClient from "./ProjectsClient";

export default function ProjectsPage() {
  return (
    <Suspense fallback={<p className="text-center py-16">Loading projects...</p>}>
      <ProjectsClient />
    </Suspense>
  );
}