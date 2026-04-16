interface CompletenessScoreProps {
  score: number;
  isLoading?: boolean;
}

function getScoreColor(score: number): {
  stroke: string;
  bg: string;
  label: string;
  textClass: string;
} {
  if (score < 40)
    return {
      stroke: "oklch(0.55 0.22 25)",
      bg: "bg-destructive/10",
      label: "Needs Work",
      textClass: "text-destructive",
    };
  if (score < 70)
    return {
      stroke: "oklch(0.75 0.18 72)",
      bg: "bg-secondary/60",
      label: "Getting There",
      textClass: "text-secondary-foreground",
    };
  return {
    stroke: "oklch(0.65 0.2 136)",
    bg: "bg-accent/10",
    label: "Well Defined",
    textClass: "text-accent",
  };
}

export function CompletenessScore({
  score,
  isLoading,
}: CompletenessScoreProps) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress = isLoading ? 0 : Math.min(100, Math.max(0, score));
  const offset = circumference - (progress / 100) * circumference;
  const { stroke, bg, label, textClass } = getScoreColor(progress);

  return (
    <div
      className={`flex flex-col items-center gap-3 p-5 rounded-xl border border-border ${bg}`}
      data-ocid="completeness.card"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Profile Completeness
      </p>

      <div className="relative w-32 h-32" aria-label={`${progress}% complete`}>
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 120 120"
          role="img"
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="oklch(0.9 0 0)"
            strokeWidth="10"
          />
          {/* Progress */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-muted border-t-primary rounded-full animate-spin" />
          ) : (
            <>
              <span className={`text-3xl font-bold font-display ${textClass}`}>
                {progress}
              </span>
              <span className="text-xs text-muted-foreground">%</span>
            </>
          )}
        </div>
      </div>

      <span
        className={`text-sm font-semibold ${textClass}`}
        data-ocid="completeness.label"
      >
        {isLoading ? "Calculating…" : label}
      </span>

      {/* Score bar breakdown */}
      <div className="w-full mt-1">
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%`, background: stroke }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-muted-foreground">0%</span>
          <span className="text-[10px] text-muted-foreground">100%</span>
        </div>
      </div>
    </div>
  );
}
