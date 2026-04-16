import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "@tanstack/react-router";
import {
  BriefcaseIcon,
  DollarSignIcon,
  GlobeIcon,
  ShieldAlertIcon,
  TargetIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { useGetPublicProfile } from "../hooks/useBackend";
import { BUDGET_RANGE_LABELS, COMPANY_SIZE_LABELS } from "../types";

interface SectionCardProps {
  icon: React.ElementType;
  title: string;
  children: ReactNode;
  ocid: string;
}

function SectionCard({ icon: Icon, title, children, ocid }: SectionCardProps) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-5 space-y-2"
      data-ocid={ocid}
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary" />
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

export default function SharedProfile() {
  const { shareCode } = useParams({ from: "/shared/$shareCode" });
  const { data: profile, isLoading, isError } = useGetPublicProfile(shareCode);

  if (isLoading) {
    return (
      <div
        className="max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full"
        data-ocid="shared_profile.loading_state"
      >
        <Skeleton className="h-8 w-56 mb-2" />
        <Skeleton className="h-4 w-32 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div
        className="max-w-3xl mx-auto px-4 sm:px-6 py-16 w-full flex flex-col items-center gap-4 text-center"
        data-ocid="shared_profile.error_state"
      >
        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <ShieldAlertIcon className="w-6 h-6 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold font-display text-foreground">
          Profile Not Found
        </h2>
        <p className="text-muted-foreground text-sm max-w-sm">
          This share link may have expired or doesn&apos;t exist. Ask the owner
          for a fresh link.
        </p>
      </div>
    );
  }

  return (
    <div
      className="max-w-3xl mx-auto px-4 sm:px-6 py-10 w-full"
      data-ocid="shared_profile.page"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <TargetIcon className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">
            ICP Refiner — Shared Profile
          </span>
        </div>
        <h1 className="text-3xl font-bold font-display text-foreground">
          {profile.name}
        </h1>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <Badge variant="secondary" className="badge-muted">
            {profile.industry}
          </Badge>
          {profile.companySize && (
            <Badge variant="outline" className="badge-muted">
              {COMPANY_SIZE_LABELS[profile.companySize]}
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            Read-only
          </Badge>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SectionCard
          icon={ZapIcon}
          title="Primary Use Case"
          ocid="shared_profile.use_case_card"
        >
          <p className="text-sm text-foreground leading-relaxed">
            {profile.useCase || (
              <span className="text-muted-foreground italic">
                Not specified
              </span>
            )}
          </p>
        </SectionCard>

        <SectionCard
          icon={ShieldAlertIcon}
          title="Key Pain Points"
          ocid="shared_profile.pain_points_card"
        >
          {profile.painPoints.length > 0 ? (
            <ul className="space-y-1">
              {profile.painPoints.map((point, i) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-sm text-foreground"
                  data-ocid={`shared_profile.pain_point.${i + 1}`}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No pain points listed
            </p>
          )}
        </SectionCard>

        <SectionCard
          icon={BriefcaseIcon}
          title="Company Size"
          ocid="shared_profile.company_size_card"
        >
          <p className="text-sm text-foreground">
            {profile.companySize ? (
              COMPANY_SIZE_LABELS[profile.companySize]
            ) : (
              <span className="text-muted-foreground italic">
                Not specified
              </span>
            )}
          </p>
        </SectionCard>

        <SectionCard
          icon={DollarSignIcon}
          title="Budget Range"
          ocid="shared_profile.budget_range_card"
        >
          <p className="text-sm text-foreground">
            {profile.budgetRange ? (
              BUDGET_RANGE_LABELS[profile.budgetRange]
            ) : (
              <span className="text-muted-foreground italic">
                Not specified
              </span>
            )}
          </p>
        </SectionCard>

        <SectionCard
          icon={UsersIcon}
          title="Decision Makers"
          ocid="shared_profile.decision_makers_card"
        >
          {profile.decisionMakers.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {profile.decisionMakers.map((dm, i) => (
                <Badge
                  key={dm}
                  variant="secondary"
                  className="badge-muted text-xs"
                  data-ocid={`shared_profile.decision_maker.${i + 1}`}
                >
                  {dm}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No decision makers listed
            </p>
          )}
        </SectionCard>

        <SectionCard
          icon={GlobeIcon}
          title="Target Geography"
          ocid="shared_profile.geography_card"
        >
          <p className="text-sm text-foreground">
            {profile.targetGeography || (
              <span className="text-muted-foreground italic">
                Not specified
              </span>
            )}
          </p>
        </SectionCard>
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        This is a read-only view shared via ICP Refiner. Build your own ICP at{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
        .
      </p>
    </div>
  );
}
