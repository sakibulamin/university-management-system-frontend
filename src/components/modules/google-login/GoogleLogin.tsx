
"use client";



import { useGoogleLogin } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function GoogleLoginComponent() {
  const router = useRouter();
  const { mutate: googleLogin } = useGoogleLogin();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.error("Google Login Failed", {

        description:
          "accessToken is missing",

      });
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.error("Logged in Successfully", {

            description:
              "welcome back ",

          });
          router.push("/student");
        },
        onError: (err: any) => {
          toast.error("Google Login Failed", {

            description:
              "accessToken is missing",

          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.error("Google Login Failed", {

      description:
        "accessToken is missing",

    });
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