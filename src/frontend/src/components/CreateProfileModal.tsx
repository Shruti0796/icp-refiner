import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateProfile } from "../hooks/useBackend";
import type { BudgetRange, CompanySize, CreateProfileInput } from "../types";
import { BUDGET_RANGE_LABELS, COMPANY_SIZE_LABELS } from "../types";

interface CreateProfileModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  industry: string;
  companySize: CompanySize | "";
  useCase: string;
  painPointsRaw: string;
  budgetRange: BudgetRange | "";
  decisionMakersRaw: string;
  targetGeography: string;
}

const DEFAULT_FORM: FormState = {
  name: "",
  industry: "",
  companySize: "",
  useCase: "",
  painPointsRaw: "",
  budgetRange: "",
  decisionMakersRaw: "",
  targetGeography: "",
};

function splitTags(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function CreateProfileModal({ open, onClose }: CreateProfileModalProps) {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const createProfile = useCreateProfile();

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate() {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.industry.trim()) newErrors.industry = "Industry is required";
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const input: CreateProfileInput = {
      name: form.name.trim(),
      industry: form.industry.trim(),
      companySize: form.companySize || null,
      useCase: form.useCase.trim(),
      painPoints: splitTags(form.painPointsRaw),
      budgetRange: form.budgetRange || null,
      decisionMakers: splitTags(form.decisionMakersRaw),
      targetGeography: form.targetGeography.trim(),
    };

    try {
      await createProfile.mutateAsync(input);
      toast.success("Profile created successfully");
      setForm(DEFAULT_FORM);
      setErrors({});
      onClose();
    } catch {
      toast.error("Failed to create profile. Please try again.");
    }
  }

  function handleClose() {
    setForm(DEFAULT_FORM);
    setErrors({});
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        data-ocid="create_profile.dialog"
        className="max-w-xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create ICP Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-1">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="cp-name">
              Profile Name <span className="text-destructive">*</span>
            </Label>
            <Input
              data-ocid="create_profile.name_input"
              id="cp-name"
              placeholder="e.g. Enterprise Tech Buyers"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
            {errors.name && (
              <p
                data-ocid="create_profile.name.field_error"
                className="text-xs text-destructive"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Industry */}
          <div className="space-y-1.5">
            <Label htmlFor="cp-industry">
              Industry <span className="text-destructive">*</span>
            </Label>
            <Input
              data-ocid="create_profile.industry_input"
              id="cp-industry"
              placeholder="e.g. Software & Technology"
              value={form.industry}
              onChange={(e) => set("industry", e.target.value)}
            />
            {errors.industry && (
              <p
                data-ocid="create_profile.industry.field_error"
                className="text-xs text-destructive"
              >
                {errors.industry}
              </p>
            )}
          </div>

          {/* Company Size */}
          <div className="space-y-1.5">
            <Label>Company Size</Label>
            <Select
              value={form.companySize}
              onValueChange={(v) => set("companySize", v as CompanySize)}
            >
              <SelectTrigger data-ocid="create_profile.company_size_select">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                {(
                  Object.entries(COMPANY_SIZE_LABELS) as [CompanySize, string][]
                ).map(([val, label]) => (
                  <SelectItem key={val} value={val}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Use Case */}
          <div className="space-y-1.5">
            <Label htmlFor="cp-useCase">Use Case</Label>
            <Textarea
              data-ocid="create_profile.use_case_textarea"
              id="cp-useCase"
              placeholder="Describe the primary use case for this customer profile..."
              rows={3}
              value={form.useCase}
              onChange={(e) => set("useCase", e.target.value)}
            />
          </div>

          {/* Pain Points */}
          <div className="space-y-1.5">
            <Label htmlFor="cp-pain">
              Pain Points
              <span className="text-muted-foreground text-xs font-normal ml-1">
                (comma-separated)
              </span>
            </Label>
            <Input
              data-ocid="create_profile.pain_points_input"
              id="cp-pain"
              placeholder="e.g. High CAC, Long sales cycles, Poor retention"
              value={form.painPointsRaw}
              onChange={(e) => set("painPointsRaw", e.target.value)}
            />
            {form.painPointsRaw && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {splitTags(form.painPointsRaw).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        set(
                          "painPointsRaw",
                          splitTags(form.painPointsRaw)
                            .filter((t) => t !== tag)
                            .join(", "),
                        )
                      }
                      className="hover:text-primary/70"
                      aria-label={`Remove ${tag}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Budget Range */}
          <div className="space-y-1.5">
            <Label>Budget Range</Label>
            <Select
              value={form.budgetRange}
              onValueChange={(v) => set("budgetRange", v as BudgetRange)}
            >
              <SelectTrigger data-ocid="create_profile.budget_range_select">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                {(
                  Object.entries(BUDGET_RANGE_LABELS) as [BudgetRange, string][]
                ).map(([val, label]) => (
                  <SelectItem key={val} value={val}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Decision Makers */}
          <div className="space-y-1.5">
            <Label htmlFor="cp-dm">
              Decision Makers
              <span className="text-muted-foreground text-xs font-normal ml-1">
                (comma-separated)
              </span>
            </Label>
            <Input
              data-ocid="create_profile.decision_makers_input"
              id="cp-dm"
              placeholder="e.g. CTO, VP of Engineering, Product Manager"
              value={form.decisionMakersRaw}
              onChange={(e) => set("decisionMakersRaw", e.target.value)}
            />
            {form.decisionMakersRaw && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {splitTags(form.decisionMakersRaw).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/60 text-accent-foreground text-xs font-medium"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        set(
                          "decisionMakersRaw",
                          splitTags(form.decisionMakersRaw)
                            .filter((t) => t !== tag)
                            .join(", "),
                        )
                      }
                      className="hover:opacity-70"
                      aria-label={`Remove ${tag}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Target Geography */}
          <div className="space-y-1.5">
            <Label htmlFor="cp-geo">Target Geography</Label>
            <Input
              data-ocid="create_profile.target_geography_input"
              id="cp-geo"
              placeholder="e.g. North America, Europe, Global"
              value={form.targetGeography}
              onChange={(e) => set("targetGeography", e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              data-ocid="create_profile.cancel_button"
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              data-ocid="create_profile.submit_button"
              type="submit"
              className="flex-1"
              disabled={createProfile.isPending}
            >
              {createProfile.isPending ? "Creating…" : "Create Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
