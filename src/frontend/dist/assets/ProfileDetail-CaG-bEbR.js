import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Primitive, d as cn, g as useParams, f as ue, L as Link$1, B as Button } from "./index-Cz2dA3Ar.js";
import { a as Badge, C as COMPANY_SIZE_LABELS, B as BUDGET_RANGE_LABELS } from "./badge-CDkxKZyW.js";
import { L as Label, I as Input, S as Select, j as SelectTrigger, k as SelectValue, l as SelectContent, m as SelectItem, T as Textarea, C as Check } from "./textarea-DCcGc3f0.js";
import { S as Skeleton, d as useGetProfile, a as useCalculateCompleteness, e as useGetRefinementSuggestions, f as useUpdateProfile, g as useGenerateShareCode } from "./useBackend-BPVu9KL4.js";
import { C as CircleCheck } from "./circle-check-BewsO5eA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ]
];
const Clipboard = createLucideIcon("clipboard", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
];
const Link = createLucideIcon("link", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function getScoreColor(score) {
  if (score < 40)
    return {
      stroke: "oklch(0.55 0.22 25)",
      bg: "bg-destructive/10",
      label: "Needs Work",
      textClass: "text-destructive"
    };
  if (score < 70)
    return {
      stroke: "oklch(0.75 0.18 72)",
      bg: "bg-secondary/60",
      label: "Getting There",
      textClass: "text-secondary-foreground"
    };
  return {
    stroke: "oklch(0.65 0.2 136)",
    bg: "bg-accent/10",
    label: "Well Defined",
    textClass: "text-accent"
  };
}
function CompletenessScore({
  score,
  isLoading
}) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress = isLoading ? 0 : Math.min(100, Math.max(0, score));
  const offset = circumference - progress / 100 * circumference;
  const { stroke, bg, label, textClass } = getScoreColor(progress);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex flex-col items-center gap-3 p-5 rounded-xl border border-border ${bg}`,
      "data-ocid": "completeness.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Profile Completeness" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-32 h-32", "aria-label": `${progress}% complete`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              className: "w-full h-full -rotate-90",
              viewBox: "0 0 120 120",
              role: "img",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "60",
                    cy: "60",
                    r: radius,
                    fill: "none",
                    stroke: "oklch(0.9 0 0)",
                    strokeWidth: "10"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "60",
                    cy: "60",
                    r: radius,
                    fill: "none",
                    stroke,
                    strokeWidth: "10",
                    strokeLinecap: "round",
                    strokeDasharray: circumference,
                    strokeDashoffset: offset,
                    style: { transition: "stroke-dashoffset 0.8s ease-in-out" }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border-2 border-muted border-t-primary rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-3xl font-bold font-display ${textClass}`, children: progress }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "%" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-sm font-semibold ${textClass}`,
            "data-ocid": "completeness.label",
            children: isLoading ? "Calculating…" : label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full rounded-full transition-all duration-700",
              style: { width: `${progress}%`, background: stroke }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "0%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "100%" })
          ] })
        ] })
      ]
    }
  );
}
function RefinementSuggestions({
  suggestions,
  isLoading
}) {
  const [dismissed, setDismissed] = reactExports.useState(/* @__PURE__ */ new Set());
  const visible = suggestions.filter((_, i) => !dismissed.has(i));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-3",
      "data-ocid": "refinement_suggestions.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Refinement Suggestions" })
          ] }),
          !isLoading && suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
            visible.length,
            " remaining"
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg" }, i)) }) : visible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-2 py-6 rounded-xl border border-border bg-accent/5 text-center",
            "data-ocid": "refinement_suggestions.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "All suggestions addressed!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your profile looks well-defined." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: suggestions.map((suggestion, i) => {
          if (dismissed.has(i)) return null;
          const index = i + 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-smooth group",
              "data-ocid": `refinement_suggestions.item.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-3 h-3 text-accent" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 text-sm text-foreground leading-snug", children: suggestion }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDismissed((prev) => /* @__PURE__ */ new Set([...prev, i])),
                    "aria-label": "Dismiss suggestion",
                    className: "opacity-0 group-hover:opacity-100 transition-smooth flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20",
                    "data-ocid": `refinement_suggestions.dismiss_button.${index}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-muted-foreground" })
                  }
                )
              ]
            },
            suggestion
          );
        }) })
      ]
    }
  );
}
const NONE_VALUE = "__none__";
function ProfileDetail() {
  const { id } = useParams({ from: "/profiles/$id" });
  const profileId = BigInt(id);
  const { data: profile, isLoading: profileLoading } = useGetProfile(profileId);
  const { data: completeness, isLoading: completenessLoading } = useCalculateCompleteness(profileId);
  const { data: suggestions, isLoading: suggestionsLoading } = useGetRefinementSuggestions(profileId);
  const updateProfile = useUpdateProfile();
  const generateShareCode = useGenerateShareCode();
  const [name, setName] = reactExports.useState("");
  const [industry, setIndustry] = reactExports.useState("");
  const [companySize, setCompanySize] = reactExports.useState(null);
  const [useCase, setUseCase] = reactExports.useState("");
  const [painPointsText, setPainPointsText] = reactExports.useState("");
  const [budgetRange, setBudgetRange] = reactExports.useState(null);
  const [decisionMakersText, setDecisionMakersText] = reactExports.useState("");
  const [targetGeography, setTargetGeography] = reactExports.useState("");
  const [copied, setCopied] = reactExports.useState(false);
  reactExports.useEffect(() => {
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
  const handleSave = reactExports.useCallback(async () => {
    if (!profile) return;
    const toArr = (t) => t.split("\n").map((s) => s.trim()).filter(Boolean);
    const input = {
      id: profileId,
      name,
      industry,
      companySize,
      useCase,
      painPoints: toArr(painPointsText),
      budgetRange,
      decisionMakers: toArr(decisionMakersText),
      targetGeography
    };
    try {
      await updateProfile.mutateAsync(input);
      ue.success("Profile saved successfully");
    } catch {
      ue.error("Failed to save profile");
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
    updateProfile
  ]);
  const handleGenerateShareLink = reactExports.useCallback(async () => {
    try {
      await generateShareCode.mutateAsync(profileId);
      ue.success("Share link generated!");
    } catch {
      ue.error("Failed to generate share link");
    }
  }, [generateShareCode, profileId]);
  const shareUrl = (profile == null ? void 0 : profile.shareCode) ? `${window.location.origin}/shared/${profile.shareCode}` : null;
  const handleCopyShareUrl = reactExports.useCallback(async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    ue.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2e3);
  }, [shareUrl]);
  const handleExportJson = reactExports.useCallback(() => {
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
      targetGeography: profile.targetGeography
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `icp-profile-${profile.name.replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    ue.success("JSON exported");
  }, [profile]);
  const handleCopySummary = reactExports.useCallback(async () => {
    if (!profile) return;
    const lines = [
      `ICP Profile: ${profile.name}`,
      `Industry: ${profile.industry}`,
      ...profile.companySize ? [`Company Size: ${COMPANY_SIZE_LABELS[profile.companySize]}`] : [],
      `Use Case: ${profile.useCase}`,
      ...profile.painPoints.length ? [
        `Pain Points:
${profile.painPoints.map((p) => `  • ${p}`).join("\n")}`
      ] : [],
      ...profile.budgetRange ? [`Budget: ${BUDGET_RANGE_LABELS[profile.budgetRange]}`] : [],
      ...profile.decisionMakers.length ? [`Decision Makers: ${profile.decisionMakers.join(", ")}`] : [],
      `Target Geography: ${profile.targetGeography}`
    ];
    await navigator.clipboard.writeText(lines.join("\n"));
    ue.success("Summary copied to clipboard");
  }, [profile]);
  if (profileLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full",
        "data-ocid": "profile_detail.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32 mb-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3 space-y-4", children: [...Array(6)].map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, i)
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" })
            ] })
          ] })
        ]
      }
    );
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-center",
        "data-ocid": "profile_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Profile not found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link$1,
            {
              to: "/profiles",
              className: "text-primary hover:underline text-sm font-medium",
              children: "← Back to Profiles"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link$1,
      {
        to: "/profiles",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6",
        "data-ocid": "profile_detail.back_link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to Profiles"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display text-foreground truncate max-w-[30ch]", children: profile.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: profile.industry })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "badge-muted text-xs mt-1", children: [
        "ID #",
        profile.id.toString()
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "lg:col-span-3 bg-card border border-border rounded-xl p-6 space-y-5",
          "data-ocid": "profile_detail.edit_form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Edit Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pd-name", children: "Profile Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "pd-name",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  placeholder: "e.g. Enterprise Tech Buyers",
                  "data-ocid": "profile_detail.name.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pd-industry", children: "Industry Focus" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "pd-industry",
                  value: industry,
                  onChange: (e) => setIndustry(e.target.value),
                  placeholder: "e.g. Software & Technology",
                  "data-ocid": "profile_detail.industry.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Company Size" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: companySize ?? NONE_VALUE,
                  onValueChange: (v) => setCompanySize(v === NONE_VALUE ? null : v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "w-full",
                        "data-ocid": "profile_detail.company_size.select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select company size" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: NONE_VALUE, children: "Not specified" }),
                      Object.entries(COMPANY_SIZE_LABELS).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value, children: label }, value))
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pd-usecase", children: "Primary Use Case" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "pd-usecase",
                  value: useCase,
                  onChange: (e) => setUseCase(e.target.value),
                  placeholder: "Describe the primary use case…",
                  rows: 3,
                  "data-ocid": "profile_detail.use_case.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pd-painpoints", children: [
                "Key Pain Points",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "(one per line)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "pd-painpoints",
                  value: painPointsText,
                  onChange: (e) => setPainPointsText(e.target.value),
                  placeholder: "Manual reporting processes\nSlow data pipelines\nHigh churn rates",
                  rows: 4,
                  "data-ocid": "profile_detail.pain_points.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Budget Range" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: budgetRange ?? NONE_VALUE,
                  onValueChange: (v) => setBudgetRange(v === NONE_VALUE ? null : v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "w-full",
                        "data-ocid": "profile_detail.budget_range.select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select budget range" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: NONE_VALUE, children: "Not specified" }),
                      Object.entries(BUDGET_RANGE_LABELS).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value, children: label }, value))
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pd-dm", children: [
                "Decision Makers",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "(one per line)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "pd-dm",
                  value: decisionMakersText,
                  onChange: (e) => setDecisionMakersText(e.target.value),
                  placeholder: "CTO\nVP of Engineering\nHead of Data",
                  rows: 3,
                  "data-ocid": "profile_detail.decision_makers.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pd-geo", children: "Target Geography" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "pd-geo",
                  value: targetGeography,
                  onChange: (e) => setTargetGeography(e.target.value),
                  placeholder: "e.g. North America, EU",
                  "data-ocid": "profile_detail.target_geography.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full mt-2",
                onClick: handleSave,
                disabled: updateProfile.isPending,
                "data-ocid": "profile_detail.save_button",
                children: [
                  updateProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }) : null,
                  updateProfile.isPending ? "Saving…" : "Save Changes"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CompletenessScore,
          {
            score: completeness ?? 0,
            isLoading: completenessLoading
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5",
            "data-ocid": "profile_detail.suggestions_panel",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              RefinementSuggestions,
              {
                suggestions: suggestions ?? [],
                isLoading: suggestionsLoading
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 space-y-3",
            "data-ocid": "profile_detail.share_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Share Profile" })
              ] }),
              shareUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    readOnly: true,
                    value: shareUrl,
                    className: "text-xs h-8 font-mono bg-muted",
                    "data-ocid": "profile_detail.share_url.input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: handleCopyShareUrl,
                    className: "flex-shrink-0 gap-1.5 h-8",
                    "data-ocid": "profile_detail.copy_share_url.button",
                    children: [
                      copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clipboard, { className: "w-3.5 h-3.5" }),
                      copied ? "Copied" : "Copy"
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  className: "w-full gap-2",
                  onClick: handleGenerateShareLink,
                  disabled: generateShareCode.isPending,
                  "data-ocid": "profile_detail.generate_share_link.button",
                  children: [
                    generateShareCode.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "w-4 h-4" }),
                    generateShareCode.isPending ? "Generating…" : "Generate Share Link"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 space-y-3",
            "data-ocid": "profile_detail.export_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Export" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full gap-2 justify-start",
                    onClick: handleExportJson,
                    "data-ocid": "profile_detail.export_json.button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                      "Export JSON"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full gap-2 justify-start",
                    onClick: handleCopySummary,
                    "data-ocid": "profile_detail.copy_summary.button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clipboard, { className: "w-4 h-4" }),
                      "Copy Summary"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  ProfileDetail as default
};
