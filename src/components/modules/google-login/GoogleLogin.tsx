"use client";

import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useGoogleLogin } from "@/hooks";
import { getErrorMessage } from "@/lib/get-error-message";

interface GoogleLoginComponentProps {
  /**
   * Called once a session has actually been established (token stored,
   * ["auth","me"] invalidated) so the caller (login or register page)
   * can decide what "success" means for it — the redirect/toast logic
   * lives in one place per caller rather than duplicated here.
   */
  onAuthenticated: () => void;
}

export default function GoogleLoginComponent({
  onAuthenticated,
}: GoogleLoginComponentProps) {
  const { mutate: googleLogin, isPending } = useGoogleLogin();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    // Guard against a stray double-fire from the Google SDK while a
    // request is already in flight.
    if (isPending) return;

    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.error("Google sign-in failed. Please try again.");
      return;
    }

    // TODO(contract): the backend documents programId as required "for a
    // brand-new user" on google-login. This UI has no program-selection
    // step yet (no /programs UI exists in this phase), so no programId is
    // sent — not invented. If the backend rejects a brand-new Google user
    // without one, that surfaces as a normal backend error below; it is
    // not silently worked around.
    googleLogin(
      { idToken },
      {
        onSuccess: onAuthenticated,
        onError: (err) => {
          toast.error(getErrorMessage(err, "Google sign-in failed. Please try again."));
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.error("Google sign-in was cancelled or failed.");
  };

  return (
    <GoogleLogin
      theme="outline"
      shape="pill"
      text="continue_with"
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
    />
  );
}
