import { c as createLucideIcon, g as useParams, j as jsxRuntimeExports, T as Target, U as Users } from "./index-Cz2dA3Ar.js";
import { a as Badge, C as COMPANY_SIZE_LABELS, B as BUDGET_RANGE_LABELS } from "./badge-CDkxKZyW.js";
import { h as useGetPublicProfile, S as Skeleton } from "./useBackend-BPVu9KL4.js";
import { G as Globe } from "./globe-CCcy0ObG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function SectionCard({ icon: Icon, title, children, ocid }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5 space-y-2",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: title })
        ] }),
        children
      ]
    }
  );
}
function SharedProfile() {
  const { shareCode } = useParams({ from: "/shared/$shareCode" });
  const { data: profile, isLoading, isError } = useGetPublicProfile(shareCode);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full",
        "data-ocid": "shared_profile.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-56 mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32 mb-8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [...Array(6)].map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, i)
          )) })
        ]
      }
    );
  }
  if (isError || !profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-3xl mx-auto px-4 sm:px-6 py-16 w-full flex flex-col items-center gap-4 text-center",
        "data-ocid": "shared_profile.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-6 h-6 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold font-display text-foreground", children: "Profile Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm", children: "This share link may have expired or doesn't exist. Ask the owner for a fresh link." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-3xl mx-auto px-4 sm:px-6 py-10 w-full",
      "data-ocid": "shared_profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-3.5 h-3.5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground tracking-widest uppercase", children: "ICP Refiner — Shared Profile" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold font-display text-foreground", children: profile.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "badge-muted", children: profile.industry }),
            profile.companySize && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "badge-muted", children: COMPANY_SIZE_LABELS[profile.companySize] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Read-only" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionCard,
            {
              icon: Zap,
              title: "Primary Use Case",
              ocid: "shared_profile.use_case_card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: profile.useCase || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "Not specified" }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionCard,
            {
              icon: ShieldAlert,
              title: "Key Pain Points",
              ocid: "shared_profile.pain_points_card",
              children: profile.painPoints.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: profile.painPoints.map((point, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-start gap-2 text-sm text-foreground",
                  "data-ocid": `shared_profile.pain_point.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" }),
                    point
                  ]
                },
                point
              )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No pain points listed" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionCard,
            {
              icon: Briefcase,
              title: "Company Size",
              ocid: "shared_profile.company_size_card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: profile.companySize ? COMPANY_SIZE_LABELS[profile.companySize] : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "Not specified" }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionCard,
            {
              icon: DollarSign,
              title: "Budget Range",
              ocid: "shared_profile.budget_range_card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: profile.budgetRange ? BUDGET_RANGE_LABELS[profile.budgetRange] : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "Not specified" }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionCard,
            {
              icon: Users,
              title: "Decision Makers",
              ocid: "shared_profile.decision_makers_card",
              children: profile.decisionMakers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: profile.decisionMakers.map((dm, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "badge-muted text-xs",
                  "data-ocid": `shared_profile.decision_maker.${i + 1}`,
                  children: dm
                },
                dm
              )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No decision makers listed" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionCard,
            {
              icon: Globe,
              title: "Target Geography",
              ocid: "shared_profile.geography_card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: profile.targetGeography || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "Not specified" }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-center text-xs text-muted-foreground", children: [
          "This is a read-only view shared via ICP Refiner. Build your own ICP at",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary hover:underline",
              children: "caffeine.ai"
            }
          ),
          "."
        ] })
      ]
    }
  );
}
export {
  SharedProfile as default
};
