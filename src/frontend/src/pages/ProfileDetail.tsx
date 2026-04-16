import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  CheckIcon,
  ClipboardIcon,
  DownloadIcon,
  LinkIcon,
  Loader2Icon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { CompletenessScore } from "../components/CompletenessScore";
import { RefinementSuggestions } from "../components/RefinementSuggestions";
import {
  useCalculateCompleteness,
  useGenerateShareCode,
  useGetProfile,
  useGetRefinementSuggestions,
  useUpdateProfile,
} from "../hooks/useBackend";
import type { BudgetRange, CompanySize, UpdateProfileInput } from "../types";
import { BUDGET_RANGE_LABELS, COMPANY_SIZE_LABELS } from "../types";

const NONE_VALUE = "__none__";

export default function ProfileDetail() {
  const { id } = useParams({ from: "/profiles/$id" });
  const profileId = BigInt(id);

  const { data: profile, isLoading: profileLoading } = useGetProfile(profileId);
  const { data: completeness, isLoading: completenessLoading } =
    useCalculateCompleteness(profileId);
  const { data: suggestions, isLoading: suggestionsLoading } =
    useGetRefinementSuggestions(profileId);
  const updateProfile = useUpdateProfile();
  const generateShareCode = useGenerateShareCode();

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState<CompanySize | null>(null);
  const [useCase, setUseCase] = useState("");
  const [painPointsText, setPainPointsText] = useState("");
  const [budgetRange, setBudgetRange] = useState<BudgetRange | null>(null);
  const [decisionMakersText, setDecisionMakersText] = useState("");
  const [targetGeography, setTargetGeography] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setName(profile.name);
    setIndustry(profile.industry);
    setCompanySize(profile.companySize);
    setUseCase(profile.useCase);
    setPainPointsText(profile.painPoints.join("\n"));
    setBudgetRange(profile.budgetRange);
    setDecisionMakersText(profile.decisionMakers.join("\n"));
    setTargetGeography(profile.targetGeography);
  }, [profile]);

  const handleSave = useCallback(async () => {
    if (!profile) return;
    const toArr = (t: string) =>
      t
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    const input: UpdateProfileInput = {
      id: profileId,
      name,
      industry,
      companySize,
      useCase,
      painPoints: toArr(painPointsText),
      budgetRange,
      decisionMakers: toArr(decisionMakersText),
      targetGeography,
    };
    try {
      await updateProfile.mutateAsync(input);
      toast.success("Profile saved successfully");
    } catch {
      toast.error("Failed to save profile");
    }
  }, [
    profile,
    profileId,
    name,
    industry,
    companySize,
    useCase,
    painPointsText,
    budgetRange,
    decisionMakersText,
    targetGeography,
    updateProfile,
  ]);

  const handleGenerateShareLink = useCallback(async () => {
    try {
      await generateShareCode.mutateAsync(profileId);
      toast.success("Share link generated!");
    } catch {
      toast.error("Failed to generate share link");
    }
  }, [generateShareCode, profileId]);

  const shareUrl = profile?.shareCode
    ? `${window.location.origin}/shared/${profile.shareCode}`
    : null;

  const handleCopyShareUrl = useCallback(async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }, [shareUrl]);

  const handleExportJson = useCallback(() => {
    if (!profile) return;
    const data = {
      id: profile.id.toString(),
      name: profile.name,
      industry: profile.industry,
      companySize: profile.companySize,
      useCase: profile.useCase,
      painPoints: profile.painPoints,
      budgetRange: profile.budgetRange,
      decisionMakers: profile.decisionMakers,
      targetGeography: profile.targetGeography,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `icp-profile-${profile.name.replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("JSON exported");
  }, [profile]);

  const handleCopySummary = useCallback(async () => {
    if (!profile) return;
    const lines: string[] = [
      `ICP Profile: ${profile.name}`,
      `Industry: ${profile.industry}`,
      ...(profile.companySize
        ? [`Company Size: ${COMPANY_SIZE_LABELS[profile.companySize]}`]
        : []),
      `Use Case: ${profile.useCase}`,
      ...(profile.painPoints.length
        ? [
            `Pain Points:\n${profile.painPoints
              .map((p) => `  • ${p}`)
              .join("\n")}`,
          ]
        : []),
      ...(profile.budgetRange
        ? [`Budget: ${BUDGET_RANGE_LABELS[profile.budgetRange]}`]
        : []),
      ...(profile.decisionMakers.length
        ? [`Decision Makers: ${profile.decisionMakers.join(", ")}`]
        : []),
      `Target Geography: ${profile.targetGeography}`,
    ];
    await navigator.clipboard.writeText(lines.join("\n"));
    toast.success("Summary copied to clipboard");
  }, [profile]);

  if (profileLoading) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full"
        data-ocid="profile_detail.loading_state"
      >
        <Skeleton className="h-6 w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-4">
            {[...Array(6)].map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-center"
        data-ocid="profile_detail.error_state"
      >
        <p className="text-muted-foreground mb-4">Profile not found.</p>
        <Link
          to="/profiles"
          className="text-primary hover:underline text-sm font-medium"
        >
          ← Back to Profiles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Back link */}
      <Link
        to="/profiles"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6"
        data-ocid="profile_detail.back_link"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Profiles
      </Link>

      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground truncate max-w-[30ch]">
            {profile.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {profile.industry}
          </p>
        </div>
        <Badge variant="outline" className="badge-muted text-xs mt-1">
          ID #{profile.id.toString()}
        </Badge>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── Left: Edit form ─────────────────────────────────────────────── */}
        <div
          className="lg:col-span-3 bg-card border border-border rounded-xl p-6 space-y-5"
          data-ocid="profile_detail.edit_form"
        >
          <h2 className="text-base font-semibold text-foreground">
            Edit Profile
          </h2>
          <Separator />

          <div className="space-y-1.5">
            <Label htmlFor="pd-name">Profile Name</Label>
            <Input
              id="pd-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Enterprise Tech Buyers"
              data-ocid="profile_detail.name.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="pd-industry">Industry Focus</Label>
            <Input
              id="pd-industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Software & Technology"
              data-ocid="profile_detail.industry.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Company Size</Label>
            <Select
              value={companySize ?? NONE_VALUE}
              onValueChange={(v) =>
                setCompanySize(v === NONE_VALUE ? null : (v as CompanySize))
              }
            >
              <SelectTrigger
                className="w-full"
                data-ocid="profile_detail.company_size.select"
              >
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE_VALUE}>Not specified</SelectItem>
                {(
                  Object.entries(COMPANY_SIZE_LABELS) as [CompanySize, string][]
                ).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="pd-usecase">Primary Use Case</Label>
            <Textarea
              id="pd-usecase"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              placeholder="Describe the primary use case…"
              rows={3}
              data-ocid="profile_detail.use_case.textarea"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="pd-painpoints">
              Key Pain Points{" "}
              <span className="text-muted-foreground font-normal text-xs">
                (one per line)
              </span>
            </Label>
            <Textarea
              id="pd-painpoints"
              value={painPointsText}
              onChange={(e) => setPainPointsText(e.target.value)}
              placeholder={
                "Manual reporting processes\nSlow data pipelines\nHigh churn rates"
              }
              rows={4}
              data-ocid="profile_detail.pain_points.textarea"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Budget Range</Label>
            <Select
              value={budgetRange ?? NONE_VALUE}
              onValueChange={(v) =>
                setBudgetRange(v === NONE_VALUE ? null : (v as BudgetRange))
              }
            >
              <SelectTrigger
                className="w-full"
                data-ocid="profile_detail.budget_range.select"
              >
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE_VALUE}>Not specified</SelectItem>
                {(
                  Object.entries(BUDGET_RANGE_LABELS) as [BudgetRange, string][]
                ).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="pd-dm">
              Decision Makers{" "}
              <span className="text-muted-foreground font-normal text-xs">
                (one per line)
              </span>
            </Label>
            <Textarea
              id="pd-dm"
              value={decisionMakersText}
              onChange={(e) => setDecisionMakersText(e.target.value)}
              placeholder={"CTO\nVP of Engineering\nHead of Data"}
              rows={3}
              data-ocid="profile_detail.decision_makers.textarea"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="pd-geo">Target Geography</Label>
            <Input
              id="pd-geo"
              value={targetGeography}
              onChange={(e) => setTargetGeography(e.target.value)}
              placeholder="e.g. North America, EU"
              data-ocid="profile_detail.target_geography.input"
            />
          </div>

          <Button
            className="w-full mt-2"
            onClick={handleSave}
            disabled={updateProfile.isPending}
            data-ocid="profile_detail.save_button"
          >
            {updateProfile.isPending ? (
              <Loader2Icon className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            {updateProfile.isPending ? "Saving…" : "Save Changes"}
          </Button>
        </div>

        {/* ── Right: Analysis panel ────────────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Completeness */}
          <CompletenessScore
            score={completeness ?? 0}
            isLoading={completenessLoading}
          />

          {/* Refinement suggestions */}
          <div
            className="bg-card border border-border rounded-xl p-5"
            data-ocid="profile_detail.suggestions_panel"
          >
            <RefinementSuggestions
              suggestions={suggestions ?? []}
              isLoading={suggestionsLoading}
            />
          </div>

          {/* Share section */}
          <div
            className="bg-card border border-border rounded-xl p-5 space-y-3"
            data-ocid="profile_detail.share_section"
          >
            <div className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">
                Share Profile
              </h3>
            </div>

            {shareUrl ? (
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={shareUrl}
                  className="text-xs h-8 font-mono bg-muted"
                  data-ocid="profile_detail.share_url.input"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyShareUrl}
                  className="flex-shrink-0 gap-1.5 h-8"
                  data-ocid="profile_detail.copy_share_url.button"
                >
                  {copied ? (
                    <CheckIcon className="w-3.5 h-3.5 text-accent" />
                  ) : (
                    <ClipboardIcon className="w-3.5 h-3.5" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={handleGenerateShareLink}
                disabled={generateShareCode.isPending}
                data-ocid="profile_detail.generate_share_link.button"
              >
                {generateShareCode.isPending ? (
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                ) : (
                  <LinkIcon className="w-4 h-4" />
                )}
                {generateShareCode.isPending
                  ? "Generating…"
                  : "Generate Share Link"}
              </Button>
            )}
          </div>

          {/* Export section */}
          <div
            className="bg-card border border-border rounded-xl p-5 space-y-3"
            data-ocid="profile_detail.export_section"
          >
            <h3 className="text-sm font-semibold text-foreground">Export</h3>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full gap-2 justify-start"
                onClick={handleExportJson}
                data-ocid="profile_detail.export_json.button"
              >
                <DownloadIcon className="w-4 h-4" />
                Export JSON
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2 justify-start"
                onClick={handleCopySummary}
                data-ocid="profile_detail.copy_summary.button"
              >
                <ClipboardIcon className="w-4 h-4" />
                Copy Summary
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
