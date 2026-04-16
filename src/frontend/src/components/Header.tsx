import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboardIcon,
  LogInIcon,
  LogOutIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const navLinks = [
  { to: "/", label: "Dashboard", icon: LayoutDashboardIcon },
  { to: "/profiles", label: "Profiles", icon: UsersIcon },
];

export function Header() {
  const { isAuthenticated, login, logout, identity } = useAuth();
  const location = useLocation();

  const principalShort = identity?.getPrincipal()?.toText()?.slice(0, 8) ?? "";

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-smooth">
              <TargetIcon className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-lg text-foreground tracking-tight">
              ICP Refiner
            </span>
          </Link>

          {/* Nav */}
          {isAuthenticated && (
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navLinks.map(({ to, label }) => {
                const isActive =
                  to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    data-ocid={`nav.${label.toLowerCase()}.link`}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth relative ${
                      isActive
                        ? "text-primary bg-primary/8"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Auth */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Avatar
                  className="w-8 h-8 cursor-default"
                  data-ocid="header.avatar"
                >
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {principalShort.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  data-ocid="header.logout_button"
                  className="text-muted-foreground hover:text-foreground gap-1.5"
                >
                  <LogOutIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={() => login()}
                data-ocid="header.login_button"
                className="gap-1.5"
              >
                <LogInIcon className="w-4 h-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
