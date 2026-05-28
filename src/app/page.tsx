import DashboardClient from "@/components/dashboard/DashboardClient";
import { mockCourses } from "@/lib/mock-data";

export const revalidate = 0; // Disable static caching for live dashboard

export default async function Home() {
  const courses = mockCourses; 
  const fetchError = null;

  return (
    <DashboardClient
      initialCourses={courses}
      userName="Anjali"
      error={fetchError}
    />
  );
}
