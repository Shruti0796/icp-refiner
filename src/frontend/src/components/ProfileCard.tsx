import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, Trash2 } from "lucide-react";
import { useCalculateCompleteness } from "../hooks/useBackend";
import type { Profile } from "../types";
import { BUDGET_RANGE_LABELS, COMPANY_SIZE_LABELS } from "../types";

interface ProfileCardProps {
  profile: Profile;
  index: number;
  onView: (profile: Profile) => void;
  onDelete: (profile: Profile) => void;
}

function CompletenessBar({ profileId }: { profileId: bigint }) {
  const { data: pct = 0 } = useCalculateCompleteness(profileId);
  const percent = Math.round(Number(pct));
  const color =
    percent >= 80
      ? "bg-accent"
      : percent >= 50
        ? "bg-secondary-foreground/40"
        : "bg-destructive/70";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Profile completeness</span>
        <span className="font-semibold text-foreground">{percent}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ProfileCard({
  profile,
  index,
  onView,
  onDelete,
}: ProfileCardProps) {
  return (
    <Card
      data-ocid={`profiles.card.${index}`}
      className="flex flex-col gap-0 border border-border/70 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
              Profile Name
            </p>
            <h3 className="font-semibold text-foreground text-base leading-snug truncate">
              {profile.name}
            </h3>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="text-xs text-muted-foreground">Last Updated</p>
            <p className="text-xs font-medium text-foreground">
              {formatDate(profile.updatedAt)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 pt-0">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">
              Industry Focus
            </p>
            <p className="font-medium text-foreground truncate">
              {profile.industry}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Company Size</p>
            {profile.companySize ? (
              <Badge variant="secondary" className="text-xs font-medium">
                {COMPANY_SIZE_LABELS[profile.companySize]}
              </Badge>
            ) : (
              <span className="text-muted-foreground text-xs">—</span>
            )}
          </div>
          {profile.budgetRange && (
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Budget Range
              </p>
              <p className="font-medium text-foreground text-xs">
                {BUDGET_RANGE_LABELS[profile.budgetRange]}
              </p>
            </div>
          )}
          {profile.targetGeography && (
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Geography</p>
              <p className="font-medium text-foreground text-xs truncate">
                {profile.targetGeography}
              </p>
            </div>
          )}
        </div>

        <CompletenessBar profileId={profile.id} />

        <div className="flex items-center gap-2 pt-1">
          <Button
            data-ocid={`profiles.view_button.${index}`}
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5"
            onClick={() => onView(profile)}
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </Button>
          <Button
            data-ocid={`profiles.delete_button.${index}`}
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30 hover:border-destructive/50"
            onClick={() => onDelete(profile)}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
