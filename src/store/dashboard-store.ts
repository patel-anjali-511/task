import { create } from "zustand";
import { Course } from "@/lib/types";

interface DashboardState {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  userName: string;
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  setUserName: (name: string) => void;
  setCourses: (courses: Course[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  userName: "Anjali",
  courses: [],
  isLoading: true,
  error: null,
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  setUserName: (name) => set({ userName: name }),
  setCourses: (courses) => set({ courses, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error, isLoading: false }),
}));
