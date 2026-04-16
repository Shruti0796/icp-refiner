import type { backendInterface, Profile, BudgetRange, CompanySize } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

function daysAgo(days: number): bigint {
  return now - BigInt(days * 86400000) * BigInt(1_000_000);
}

const sampleProfiles: Profile[] = [
  {
    id: BigInt(1),
    owner: { toText: () => "aaaaa-aa", _isPrincipal: true } as any,
    name: "Enterprise Tech Buyers",
    createdAt: daysAgo(30),
    updatedAt: daysAgo(3),
    useCase: "Streamline enterprise software procurement for mid-to-large tech companies looking for scalable SaaS solutions.",
    decisionMakers: ["CTO", "VP of Engineering", "IT Director"],
    painPoints: ["Complex procurement processes", "Vendor lock-in concerns", "Integration challenges"],
    companySize: "enterprise" as CompanySize,
    budgetRange: "moreThan200k" as BudgetRange,
    targetGeography: "North America",
    industry: "Software & Technology",
  },
  {
    id: BigInt(2),
    owner: { toText: () => "aaaaa-aa", _isPrincipal: true } as any,
    name: "SMB Growth Leaders",
    createdAt: daysAgo(20),
    updatedAt: daysAgo(10),
    useCase: "Help small and medium businesses accelerate growth through targeted sales automation tools.",
    decisionMakers: ["CEO", "Sales Director", "Operations Manager"],
    painPoints: ["Limited sales resources", "Lead qualification bottlenecks", "Manual follow-up processes"],
    companySize: "smb" as CompanySize,
    budgetRange: "tenKTo50k" as BudgetRange,
    targetGeography: "United States",
    industry: "Retail & E-commerce",
  },
  {
    id: BigInt(3),
    owner: { toText: () => "aaaaa-aa", _isPrincipal: true } as any,
    name: "FinTech Innovators",
    createdAt: daysAgo(15),
    updatedAt: daysAgo(5),
    useCase: "Target financial technology startups seeking compliance and security tools for rapid scaling.",
    decisionMakers: ["CISO", "Compliance Officer", "CTO"],
    painPoints: ["Regulatory compliance complexity", "Security vulnerabilities", "Scaling infrastructure costs"],
    companySize: "startup" as CompanySize,
    budgetRange: "fiftyKTo200k" as BudgetRange,
    targetGeography: "Global",
    industry: "Financial Services",
  },
];

export const mockBackend: backendInterface = {
  listProfiles: async () => sampleProfiles,

  getProfile: async (id) => sampleProfiles.find((p) => p.id === id) ?? null,

  createProfile: async (input) => ({
    id: BigInt(sampleProfiles.length + 1),
    owner: { toText: () => "aaaaa-aa", _isPrincipal: true } as any,
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    updatedAt: BigInt(Date.now()) * BigInt(1_000_000),
    shareCode: undefined,
    ...input,
  }),

  updateProfile: async (input) => {
    const profile = sampleProfiles.find((p) => p.id === input.id);
    if (!profile) return null;
    return { ...profile, ...input, updatedAt: BigInt(Date.now()) * BigInt(1_000_000) };
  },

  deleteProfile: async () => true,

  calculateCompleteness: async (id) => {
    const profile = sampleProfiles.find((p) => p.id === id);
    if (!profile) return null;
    let score = 0;
    if (profile.name) score += 20;
    if (profile.industry) score += 15;
    if (profile.useCase) score += 15;
    if (profile.decisionMakers.length > 0) score += 15;
    if (profile.painPoints.length > 0) score += 15;
    if (profile.companySize) score += 10;
    if (profile.budgetRange) score += 5;
    if (profile.targetGeography) score += 5;
    return BigInt(score);
  },

  generateShareCode: async () => "abc123",

  getPublicProfile: async () => null,

  getRefinementSuggestions: async (_id) => [
    "Add more specific pain points to improve targeting accuracy",
    "Consider narrowing the target geography for better conversion rates",
    "Include specific budget range to qualify leads more effectively",
    "Add decision-maker job titles for more precise outreach",
  ],
};
