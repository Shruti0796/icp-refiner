import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();

  const isAuthenticated = loginStatus === "success" && identity !== null;
  const isLoading = loginStatus === "initializing";

  return {
    identity,
    isAuthenticated,
    isLoading,
    loginStatus,
    login,
    logout: clear,
  };
}
