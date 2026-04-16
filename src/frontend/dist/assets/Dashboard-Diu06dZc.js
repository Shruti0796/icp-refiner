import { c as createLucideIcon, u as useNavigate, j as jsxRuntimeExports, B as Button, U as Users, T as Target } from "./index-Cz2dA3Ar.js";
import { P as Plus, C as Card, a as CardHeader, b as CardContent } from "./card-JpZuDw3R.js";
import { u as useListProfiles, S as Skeleton, a as useCalculateCompleteness } from "./useBackend-BPVu9KL4.js";
import { C as CircleCheck } from "./circle-check-BewsO5eA.js";
import { G as Globe } from "./globe-CCcy0ObG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode);
function CompletenessBadge({ profileId }) {
  const { data: score } = useCalculateCompleteness(profileId);
  const pct = typeof score === "number" ? Math.round(score) : null;
  if (pct === null)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full shrink-0" });
  const colorClass = pct >= 80 ? "bg-accent/15 text-accent-foreground" : pct >= 50 ? "bg-secondary/70 text-secondary-foreground" : "bg-muted text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      "data-ocid": "profile.completeness_badge",
      className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 ${colorClass}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
        pct,
        "%"
      ]
    }
  );
}
function ProfileCard({
  profile,
  index
}) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      "data-ocid": `recent_profile.item.${index + 1}`,
      className: "group card-elevated hover:shadow-md transition-smooth cursor-pointer border-border/60",
      onClick: () => navigate({
        to: "/profiles/$id",
        params: { id: profile.id.toString() }
      }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-0.5", children: "Profile Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200 leading-snug", children: profile.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CompletenessBadge, { profileId: profile.id })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-4 gap-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "Industry Focus" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium truncate", children: profile.industry || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "Geography" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium truncate", children: profile.targetGeography || "—" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border/60 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "Updated",
              " ",
              new Date(Number(profile.updatedAt) / 1e6).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" })
          ] })
        ] })
      ]
    }
  );
}
function StatCard({
  icon,
  value,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl p-5 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: label })
    ] })
  ] });
}
function EmptyState() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "dashboard.empty_state",
      className: "card-elevated rounded-2xl p-12 text-center space-y-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-8 h-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-lg", children: "No profiles yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5 max-w-sm mx-auto", children: "Create your first Ideal Customer Profile to start targeting the right customers with precision." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "dashboard.empty_create_button",
            onClick: () => navigate({ to: "/profiles" }),
            className: "gap-2 mt-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Create Your First ICP"
            ]
          }
        )
      ]
    }
  );
}
function Dashboard() {
  const navigate = useNavigate();
  const { data: profiles = [], isLoading } = useListProfiles();
  const recent = profiles.slice().sort((a, b) => Number(b.updatedAt - a.updatedAt)).slice(0, 3);
  const industries = new Set(profiles.map((p) => p.industry).filter(Boolean)).size;
  const shared = profiles.filter((p) => p.shareCode).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "dashboard.page",
      className: "max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.hero_section", className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-muted inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-primary" }),
              "ICP Refiner"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight", children: [
              "Define Your ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Ideal Customer" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl leading-relaxed", children: "Build precise Ideal Customer Profiles backed by structured data and AI-powered refinement insights — so your sales and marketing teams always know exactly who to target." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "dashboard.create_profile_button",
                size: "lg",
                onClick: () => navigate({ to: "/profiles" }),
                className: "gap-2 btn-primary shadow-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                  "Create ICP Profile"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "dashboard.view_profiles_button",
                size: "lg",
                variant: "outline",
                onClick: () => navigate({ to: "/profiles" }),
                className: "gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
                  "View My Profiles"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            "data-ocid": "dashboard.stats_section",
            className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
            children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[76px] rounded-xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[76px] rounded-xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[76px] rounded-xl" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }),
                  value: profiles.length,
                  label: "Total profiles"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-5 h-5 text-accent" }),
                  value: industries,
                  label: "Industries covered"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-muted-foreground" }),
                  value: shared,
                  label: "Shared profiles"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.recent_section", className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground", children: "Recent Profiles" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Your most recently updated ICP profiles" })
            ] }),
            profiles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "dashboard.view_all_button",
                variant: "ghost",
                size: "sm",
                onClick: () => navigate({ to: "/profiles" }),
                className: "gap-1.5 text-primary hover:text-primary/80",
                children: [
                  "View all",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ]
              }
            )
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[172px] rounded-xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[172px] rounded-xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[172px] rounded-xl" })
          ] }) : recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "dashboard.recent_profiles_list",
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
              children: recent.map((profile, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProfileCard,
                {
                  profile,
                  index
                },
                profile.id.toString()
              ))
            }
          )
        ] })
      ]
    }
  );
}
export {
  Dashboard as default
};
