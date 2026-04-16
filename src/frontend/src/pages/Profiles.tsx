import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { Plus, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CreateProfileModal } from "../components/CreateProfileModal";
import { ProfileCard } from "../components/ProfileCard";
import { useDeleteProfile, useListProfiles } from "../hooks/useBackend";
import type { Profile } from "../types";

function ProfilesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((k, i) => (
        <div
          key={k}
          data-ocid={`profiles.loading_state.${i + 1}`}
          className="rounded-xl border border-border/60 bg-card p-5 space-y-4"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-44" />
            </div>
            <Skeleton className="h-8 w-24 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-10 w-full rounded" />
            <Skeleton className="h-10 w-full rounded" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
          <div className="flex gap-2">
            <Skeleton className="h-8 flex-1 rounded" />
            <Skeleton className="h-8 flex-1 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div
      data-ocid="profiles.empty_state"
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
        <Users className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No profiles yet
      </h3>
      <p className="text-muted-foreground text-sm max-w-sm mb-6">
        Create your first Ideal Customer Profile to start identifying and
        targeting your perfect customers.
      </p>
      <Button
        data-ocid="profiles.create_first_button"
        onClick={onCreateClick}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        Create your first profile
      </Button>
    </div>
  );
}

export default function Profiles() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Profile | null>(null);

  const { data: profiles = [], isLoading } = useListProfiles();
  const deleteProfile = useDeleteProfile();

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteProfile.mutateAsync(deleteTarget.id);
      toast.success(`"${deleteTarget.name}" deleted`);
    } catch {
      toast.error("Failed to delete profile");
    } finally {
      setDeleteTarget(null);
    }
  }

  return (
    <div data-ocid="profiles.page" className="min-h-full bg-background">
      {/* Page header */}
      <div className="bg-card border-b border-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                My ICP Profiles
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Manage and refine your Ideal Customer Profiles
              </p>
            </div>
            <Button
              data-ocid="profiles.new_profile_button"
              onClick={() => setModalOpen(true)}
              className="gap-2 shrink-0"
            >
              <Plus className="h-4 w-4" />
              New Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {isLoading ? (
          <ProfilesSkeleton />
        ) : profiles.length === 0 ? (
          <EmptyState onCreateClick={() => setModalOpen(true)} />
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-5">
              {profiles.length} profile{profiles.length !== 1 ? "s" : ""}
            </p>
            <div
              data-ocid="profiles.list"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {profiles.map((profile, index) => (
                <ProfileCard
                  key={profile.id.toString()}
                  profile={profile}
                  index={index + 1}
                  onView={(p) =>
                    navigate({
                      to: "/profiles/$id",
                      params: { id: p.id.toString() },
                    })
                  }
                  onDelete={(p) => setDeleteTarget(p)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Create modal */}
      <CreateProfileModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="profiles.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Profile</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{deleteTarget?.name}&rdquo;
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="profiles.delete_cancel_button"
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="profiles.delete_confirm_button"
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteProfile.isPending}
            >
              {deleteProfile.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
