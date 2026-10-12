import {
  forgotPassword,
  getMe,
  googleLogin,
  resetPassword,
  userLogin,
  userLogout,
  userRegistration,
  verifyAccount,
} from "@/api";
import { clearAccessToken, setAccessToken } from "@/lib/auth-token-store";
import { getErrorMessage } from "@/lib/get-error-message";
import { getRoleHomePath } from "@/lib/get-role-home-path";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const authKeys = {
  me: ["auth", "me"] as const,
};

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogin,
    onSuccess: (res) => {
      setAccessToken(res.data.accessToken);
      queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
}

export function useRegistration() {
  return useMutation({
    mutationFn: userRegistration,
  });
}

export function useVerifyAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyAccount,
    onSuccess: (res) => {
      setAccessToken(res.data.accessToken);
      queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
}


export function useGoogleLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: googleLogin,
    onSuccess: (res) => {
      setAccessToken(res.data.accessToken);
      queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      clearAccessToken();
      queryClient.removeQueries({ queryKey: authKeys.me });
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}


export function useAuthRedirect() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return async function completeAuthentication(options?: {
    callbackUrl?: string | null;
    successMessage?: string;
    successDescription?: string;
  }) {
    try {
      const me = await queryClient.fetchQuery({
        queryKey: authKeys.me,
        queryFn: getMe,
      });
      toast.success(options?.successMessage ?? "Signed in successfully", {
        description: options?.successDescription ?? "Welcome back.",
      });
      router.push(options?.callbackUrl ?? getRoleHomePath(me.data.role));

    } catch (err) {
      console.error("[auth-redirect] getMe failed:", err);

      toast.error(
        getErrorMessage(
          err,
          "Signed in, but couldn't load your account. Please refresh.",
        ),
      );
    }
  };
}
