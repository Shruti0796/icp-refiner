export type CompanySize = "startup" | "smb" | "midMarket" | "enterprise";

export type BudgetRange =
  | "lessThan10k"
  | "tenKTo50k"
  | "fiftyKTo200k"
  | "moreThan200k";

export interface Profile {
  id: bigint;
  owner: string;
  name: string;
  industry: string;
  companySize: CompanySize | null;
  useCase: string;
  painPoints: string[];
  budgetRange: BudgetRange | null;
  decisionMakers: string[];
  targetGeography: string;
  shareCode: string | null;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface CreateProfileInput {
  name: string;
  industry: string;
  companySize: CompanySize | null;
  useCase: string;
  painPoints: string[];
  budgetRange: BudgetRange | null;
  decisionMakers: string[];
  targetGeography: string;
}

export interface UpdateProfileInput {
  id: bigint;
  name: string | null;
  industry: string | null;
  companySize: CompanySize | null;
  useCase: string | null;
  painPoints: string[] | null;
  budgetRange: BudgetRange | null;
  decisionMakers: string[] | null;
  targetGeography: string | null;
}

export const COMPANY_SIZE_LABELS: Record<CompanySize, string> = {
  startup: "Startup (1–50)",
  smb: "SMB (51–200)",
  midMarket: "Mid-Market (201–1000)",
  enterprise: "Enterprise (1000+)",
};

export const BUDGET_RANGE_LABELS: Record<BudgetRange, string> = {
  lessThan10k: "< $10K",
  tenKTo50k: "$10K – $50K",
  fiftyKTo200k: "$50K – $200K",
  moreThan200k: "> $200K",
};
