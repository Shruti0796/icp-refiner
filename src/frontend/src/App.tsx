import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy-loaded pages
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const ProfilesPage = lazy(() => import("./pages/Profiles"));
const ProfileDetailPage = lazy(() => import("./pages/ProfileDetail"));
const SharedProfilePage = lazy(() => import("./pages/SharedProfile"));

// Page loader fallback
function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

// Root layout route
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      <Toaster position="bottom-right" richColors />
    </Layout>
  ),
});

// Public routes
const sharedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shared/$shareCode",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SharedProfilePage />
    </Suspense>
  ),
});

// Protected routes
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <DashboardPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const profilesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profiles",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <ProfilesPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const profileDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profiles/$id",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <ProfileDetailPage />
      </Suspense>
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  profilesRoute,
  profileDetailRoute,
  sharedRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
