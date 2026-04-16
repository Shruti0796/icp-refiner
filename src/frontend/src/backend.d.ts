import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Timestamp = bigint;
export interface PublicProfile {
    id: ProfileId;
    name: string;
    useCase: string;
    decisionMakers: Array<string>;
    painPoints: Array<string>;
    companySize?: CompanySize;
    budgetRange?: BudgetRange;
    targetGeography: string;
    industry: string;
}
export interface UpdateProfileInput {
    id: ProfileId;
    name?: string;
    useCase?: string;
    decisionMakers?: Array<string>;
    painPoints?: Array<string>;
    companySize?: CompanySize;
    budgetRange?: BudgetRange;
    targetGeography?: string;
    industry?: string;
}
export interface CreateProfileInput {
    name: string;
    useCase: string;
    decisionMakers: Array<string>;
    painPoints: Array<string>;
    companySize?: CompanySize;
    budgetRange?: BudgetRange;
    targetGeography: string;
    industry: string;
}
export type ProfileId = bigint;
export interface Profile {
    id: ProfileId;
    owner: UserId;
    name: string;
    createdAt: Timestamp;
    useCase: string;
    decisionMakers: Array<string>;
    updatedAt: Timestamp;
    painPoints: Array<string>;
    shareCode?: string;
    companySize?: CompanySize;
    budgetRange?: BudgetRange;
    targetGeography: string;
    industry: string;
}
export enum BudgetRange {
    lessThan10k = "lessThan10k",
    fiftyKTo200k = "fiftyKTo200k",
    moreThan200k = "moreThan200k",
    tenKTo50k = "tenKTo50k"
}
export enum CompanySize {
    smb = "smb",
    enterprise = "enterprise",
    startup = "startup",
    midMarket = "midMarket"
}
export interface backendInterface {
    calculateCompleteness(id: ProfileId): Promise<bigint | null>;
    createProfile(input: CreateProfileInput): Promise<Profile>;
    deleteProfile(id: ProfileId): Promise<boolean>;
    generateShareCode(id: ProfileId): Promise<string | null>;
    getProfile(id: ProfileId): Promise<Profile | null>;
    getPublicProfile(shareCode: string): Promise<PublicProfile | null>;
    getRefinementSuggestions(id: ProfileId): Promise<Array<string> | null>;
    listProfiles(): Promise<Array<Profile>>;
    updateProfile(input: UpdateProfileInput): Promise<Profile | null>;
}
