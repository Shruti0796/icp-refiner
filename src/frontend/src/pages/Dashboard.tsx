import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe,
  Plus,
  Target,
  Users,
} from "lucide-react";
import { useCalculateCompleteness, useListProfiles } from "../hooks/useBackend";
import type { Profile } from "../types";

// ── Completeness badge ──────────────────────────────────────────────────────

function CompletenessBadge({ profileId }: { profileId: bigint }) {
  const { data: score } = useCalculateCompleteness(profileId);
  const pct = typeof score === "number" ? Math.round(score) : null;

  if (pct === null)
    return <Skeleton className="h-5 w-14 rounded-full shrink-0" />;

  const colorClass =
    pct >= 80
      ? "bg-accent/15 text-accent-foreground"
      : pct >= 50
        ? "bg-secondary/70 text-secondary-foreground"
        : "bg-muted text-muted-foreground";

  return (
    <span
      data-ocid="profile.completeness_badge"
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 ${colorClass}`}
    >
      <CheckCircle2 className="w-3 h-3" />
      {pct}%
    </span>
  );
}

// ── Profile card ────────────────────────────────────────────────────────────

function ProfileCard({
  profile,
  index,
}: {
  profile: Profile;
  index: number;
}) {
  const navigate = useNavigate();

  return (
    <Card
      data-ocid={`recent_profile.item.${index + 1}`}
      className="group card-elevated hover:shadow-md transition-smooth cursor-pointer border-border/60"
      onClick={() =>
        navigate({
          to: "/profiles/$id",
          params: { id: profile.id.toString() },
        })
      }
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
              Profile Name
            </p>
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200 leading-snug">
              {profile.name}
            </h3>
          </div>
          <CompletenessBadge profileId={profile.id} />
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Industry Focus</p>
            <p className="text-foreground font-medium truncate">
              {profile.industry || "—"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Geography</p>
            <p className="text-foreground font-medium truncate">
              {profile.targetGeography || "—"}
            </p>
          </div>
        </div>
        <div className="pt-2 border-t border-border/60 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Updated{" "}
            {new Date(Number(profile.updatedAt) / 1_000_000).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              },
            )}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
      </CardContent>
    </Card>
  );
}

// ── Stat card ───────────────────────────────────────────────────────────────

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="card-elevated rounded-xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground truncate">{label}</p>
      </div>
    </div>
  );
}

// ── Empty state ─────────────────────────────────────────────────────────────

function EmptyState() {
  const navigate = useNavigate();
  return (
    <div
      data-ocid="dashboard.empty_state"
      className="card-elevated rounded-2xl p-12 text-center space-y-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
        <Target className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground text-lg">
          No profiles yet
        </h3>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-sm mx-auto">
          Create your first Ideal Customer Profile to start targeting the right
          customers with precision.
        </p>
      </div>
      <Button
        data-ocid="dashboard.empty_create_button"
        onClick={() => navigate({ to: "/profiles" })}
        className="gap-2 mt-2"
      >
        <Plus className="w-4 h-4" />
        Create Your First ICP
      </Button>
    </div>
  );
}

// ── Dashboard page ──────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: profiles = [], isLoading } = useListProfiles();

  const recent = profiles
    .slice()
    .sort((a, b) => Number(b.updatedAt - a.updatedAt))
    .slice(0, 3);

  const industries = new Set(profiles.map((p) => p.industry).filter(Boolean))
    .size;
  const shared = profiles.filter((p) => p.shareCode).length;

  return (
    <div
      data-ocid="dashboard.page"
      className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12"
    >
      {/* ── Hero section ── */}
      <section data-ocid="dashboard.hero_section" className="space-y-6">
        <div className="space-y-4">
          <span className="badge-muted inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            ICP Refiner
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight">
            Define Your <span className="text-primary">Ideal Customer</span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            Build precise Ideal Customer Profiles backed by structured data and
            AI-powered refinement insights — so your sales and marketing teams
            always know exactly who to target.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            data-ocid="dashboard.create_profile_button"
            size="lg"
            onClick={() => navigate({ to: "/profiles" })}
            className="gap-2 btn-primary shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create ICP Profile
          </Button>
          <Button
            data-ocid="dashboard.view_profiles_button"
            size="lg"
            variant="outline"
            onClick={() => navigate({ to: "/profiles" })}
            className="gap-2"
          >
            <Users className="w-4 h-4" />
            View My Profiles
          </Button>
        </div>
      </section>

      {/* ── Quick stats ── */}
      <section
        data-ocid="dashboard.stats_section"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {isLoading ? (
          <>
            <Skeleton className="h-[76px] rounded-xl" />
            <Skeleton className="h-[76px] rounded-xl" />
            <Skeleton className="h-[76px] rounded-xl" />
          </>
        ) : (
          <>
            <StatCard
              icon={<Users className="w-5 h-5 text-primary" />}
              value={profiles.length}
              label="Total profiles"
            />
            <StatCard
              icon={<BarChart3 className="w-5 h-5 text-accent" />}
              value={industries}
              label="Industries covered"
            />
            <StatCard
              icon={<Globe className="w-5 h-5 text-muted-foreground" />}
              value={shared}
              label="Shared profiles"
            />
          </>
        )}
      </section>

      {/* ── Recent profiles ── */}
      <section data-ocid="dashboard.recent_section" className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Recent Profiles
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Your most recently updated ICP profiles
            </p>
          </div>
          {profiles.length > 0 && (
            <Button
              data-ocid="dashboard.view_all_button"
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/profiles" })}
              className="gap-1.5 text-primary hover:text-primary/80"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="h-[172px] rounded-xl" />
            <Skeleton className="h-[172px] rounded-xl" />
            <Skeleton className="h-[172px] rounded-xl" />
          </div>
        ) : recent.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            data-ocid="dashboard.recent_profiles_list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {recent.map((profile, index) => (
              <ProfileCard
                key={profile.id.toString()}
                profile={profile}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
