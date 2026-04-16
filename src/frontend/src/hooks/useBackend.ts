import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { CreateProfileInput, Profile, UpdateProfileInput } from "../types";

// ──────────────────────────────────────────────────────────
// Internal actor interface (mirrors Motoko backend)
// ──────────────────────────────────────────────────────────

interface ActorBackend {
  listProfiles(): Promise<Profile[]>;
  getProfile(id: bigint): Promise<Profile | null>;
  getPublicProfile(shareCode: string): Promise<Profile | null>;
  createProfile(input: CandidCreateInput): Promise<Profile>;
  updateProfile(input: CandidUpdateInput): Promise<Profile>;
  deleteProfile(id: bigint): Promise<void>;
  calculateCompleteness(id: bigint): Promise<bigint | null>;
  getRefinementSuggestions(id: bigint): Promise<string[]>;
  generateShareCode(id: bigint): Promise<string | null>;
}

interface CandidCreateInput {
  name: string;
  industry: string;
  companySize: [] | [string];
  useCase: string;
  painPoints: string[];
  budgetRange: [] | [string];
  decisionMakers: string[];
  targetGeography: string;
}

interface CandidUpdateInput {
  id: bigint;
  name: [] | [string];
  industry: [] | [string];
  companySize: [] | [string];
  useCase: [] | [string];
  painPoints: [] | [string[]];
  budgetRange: [] | [string];
  decisionMakers: [] | [string[]];
  targetGeography: [] | [string];
}

// ──────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────

function toOptional<T>(value: T | null): [] | [T] {
  return value === null ? [] : [value];
}

function getActor(actor: unknown): ActorBackend {
  return actor as ActorBackend;
}

// ──────────────────────────────────────────────────────────
// Read queries
// ──────────────────────────────────────────────────────────

export function useListProfiles() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Profile[]>({
    queryKey: ["profiles"],
    queryFn: async () => {
      if (!actor) return [];
      return getActor(actor).listProfiles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProfile(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Profile | null>({
    queryKey: ["profile", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      const result = await getActor(actor).getProfile(id);
      return result;
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useGetPublicProfile(shareCode: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Profile | null>({
    queryKey: ["public-profile", shareCode],
    queryFn: async () => {
      if (!actor || !shareCode) return null;
      const result = await getActor(actor).getPublicProfile(shareCode);
      return result;
    },
    enabled: !!actor && !isFetching && !!shareCode,
  });
}

export function useCalculateCompleteness(profileId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<number>({
    queryKey: ["completeness", profileId?.toString()],
    queryFn: async () => {
      if (!actor || profileId === null) return 0;
      const result = await getActor(actor).calculateCompleteness(profileId);
      return result !== null ? Number(result) : 0;
    },
    enabled: !!actor && !isFetching && profileId !== null,
  });
}

export function useGetRefinementSuggestions(profileId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<string[]>({
    queryKey: ["suggestions", profileId?.toString()],
    queryFn: async () => {
      if (!actor || profileId === null) return [];
      return getActor(actor).getRefinementSuggestions(profileId);
    },
    enabled: !!actor && !isFetching && profileId !== null,
  });
}

// ──────────────────────────────────────────────────────────
// Mutations
// ──────────────────────────────────────────────────────────

export function useCreateProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Profile, Error, CreateProfileInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      const candidInput: CandidCreateInput = {
        name: input.name,
        industry: input.industry,
        companySize: toOptional(input.companySize),
        useCase: input.useCase,
        painPoints: input.painPoints,
        budgetRange: toOptional(input.budgetRange),
        decisionMakers: input.decisionMakers,
        targetGeography: input.targetGeography,
      };
      return getActor(actor).createProfile(candidInput);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
}

export function useUpdateProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Profile, Error, UpdateProfileInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      const candidInput: CandidUpdateInput = {
        id: input.id,
        name: toOptional(input.name),
        industry: toOptional(input.industry),
        companySize: toOptional(input.companySize),
        useCase: toOptional(input.useCase),
        painPoints: toOptional(input.painPoints),
        budgetRange: toOptional(input.budgetRange),
        decisionMakers: toOptional(input.decisionMakers),
        targetGeography: toOptional(input.targetGeography),
      };
      return getActor(actor).updateProfile(candidInput);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.id.toString()],
      });
    },
  });
}

export function useDeleteProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      await getActor(actor).deleteProfile(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
}

export function useGenerateShareCode() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<string, Error, bigint>({
    mutationFn: async (profileId) => {
      if (!actor) throw new Error("Not connected");
      const result = await getActor(actor).generateShareCode(profileId);
      if (result === null) throw new Error("Failed to generate share code");
      return result;
    },
    onSuccess: (_data, profileId) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", profileId.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
}
