import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2Icon, LightbulbIcon } from "lucide-react";
import { useState } from "react";

interface RefinementSuggestionsProps {
  suggestions: string[];
  isLoading?: boolean;
}

export function RefinementSuggestions({
  suggestions,
  isLoading,
}: RefinementSuggestionsProps) {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  const visible = suggestions.filter((_, i) => !dismissed.has(i));

  return (
    <div
      className="flex flex-col gap-3"
      data-ocid="refinement_suggestions.section"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LightbulbIcon className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">
            Refinement Suggestions
          </h3>
        </div>
        {!isLoading && suggestions.length > 0 && (
          <Badge variant="secondary" className="text-xs">
            {visible.length} remaining
          </Badge>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div
          className="flex flex-col items-center gap-2 py-6 rounded-xl border border-border bg-accent/5 text-center"
          data-ocid="refinement_suggestions.empty_state"
        >
          <CheckCircle2Icon className="w-8 h-8 text-accent" />
          <p className="text-sm font-medium text-foreground">
            All suggestions addressed!
          </p>
          <p className="text-xs text-muted-foreground">
            Your profile looks well-defined.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {suggestions.map((suggestion, i) => {
            if (dismissed.has(i)) return null;
            const index = i + 1;
            return (
              <div
                key={suggestion}
                className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-smooth group"
                data-ocid={`refinement_suggestions.item.${index}`}
              >
                <div className="mt-0.5 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <LightbulbIcon className="w-3 h-3 text-accent" />
                </div>
                <p className="flex-1 text-sm text-foreground leading-snug">
                  {suggestion}
                </p>
                <button
                  type="button"
                  onClick={() => setDismissed((prev) => new Set([...prev, i]))}
                  aria-label="Dismiss suggestion"
                  className="opacity-0 group-hover:opacity-100 transition-smooth flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20"
                  data-ocid={`refinement_suggestions.dismiss_button.${index}`}
                >
                  <CheckCircle2Icon className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
