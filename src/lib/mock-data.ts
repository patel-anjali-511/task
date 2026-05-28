import { Course } from "./types";

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    progress: 75,
    icon_emoji: "⚛️",
    is_completed: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Node.js Microservices",
    progress: 92,
    icon_emoji: "🟢",
    is_completed: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "TypeScript Mastery",
    progress: 60,
    icon_emoji: "🔷",
    is_completed: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "System Design Fundamentals",
    progress: 45,
    icon_emoji: "🏗️",
    is_completed: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "GraphQL & Apollo",
    progress: 88,
    icon_emoji: "🔮",
    is_completed: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Docker & Kubernetes",
    progress: 30,
    icon_emoji: "🐳",
    is_completed: false,
    created_at: new Date().toISOString(),
  },
];

// Generate mock activity data for the contribution heatmap (52 weeks × 7 days)
export function generateActivityData(): number[][] {
  const weeks = 52;
  const days = 7;
  const data: number[][] = [];

  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      // Random intensity: 0 (none), 1 (low), 2 (medium), 3 (high), 4 (max)
      const rand = Math.random();
      if (rand < 0.3) week.push(0);
      else if (rand < 0.5) week.push(1);
      else if (rand < 0.7) week.push(2);
      else if (rand < 0.85) week.push(3);
      else week.push(4);
    }
    data.push(week);
  }

  return data;
}
