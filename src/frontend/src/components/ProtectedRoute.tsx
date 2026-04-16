import { Button } from "@/components/ui/button";
import { ShieldIcon, TargetIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <div
        className="flex-1 flex items-center justify-center min-h-[60vh]"
        data-ocid="auth.loading_state"
      >
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm">Checking authentication…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="flex-1 flex items-center justify-center min-h-[60vh] px-4"
        data-ocid="auth.gate"
      >
        <div className="card-elevated rounded-xl p-10 max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <ShieldIcon className="w-7 h-7 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-display font-semibold text-foreground">
              Sign in to continue
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This page requires authentication. Sign in with Internet Identity
              to access your ICP profiles.
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => login()}
            data-ocid="auth.login_button"
            className="w-full gap-2"
          >
            <TargetIcon className="w-4 h-4" />
            Sign in with Internet Identity
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
