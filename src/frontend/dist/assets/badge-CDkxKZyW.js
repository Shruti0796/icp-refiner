import { j as jsxRuntimeExports, S as Slot, d as cn, n as cva } from "./index-Cz2dA3Ar.js";
const COMPANY_SIZE_LABELS = {
  startup: "Startup (1–50)",
  smb: "SMB (51–200)",
  midMarket: "Mid-Market (201–1000)",
  enterprise: "Enterprise (1000+)"
};
const BUDGET_RANGE_LABELS = {
  lessThan10k: "< $10K",
  tenKTo50k: "$10K – $50K",
  fiftyKTo200k: "$50K – $200K",
  moreThan200k: "> $200K"
};
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
export {
  BUDGET_RANGE_LABELS as B,
  COMPANY_SIZE_LABELS as C,
  Badge as a
};
