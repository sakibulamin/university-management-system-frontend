
"use client";


import { useGoogleLogin } from "@/hooks/auth.hook";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function GoogleLoginComponent() {
    const router = useRouter();
    const { mutate: googleLogin } = useGoogleLogin();

    const handleGoogleSuccess = (
        credentialResponse: { credential?: string },
    ) => {
        const idToken = credentialResponse.credential;

        if (!idToken) {
            toast.error("Google Login Failed", {

                description: "Google credential ",

            });
            return;
        }

        googleLogin(
            { idToken },
            {
                onSuccess: (res) => {
                    const accessToken = res?.data?.accessToken;

                    if (!accessToken) {
                        toast.error("Google Login Failed", {

                            description:
                               "accessToken is missing",

                        });
                        return;
                    }

                    toast.success("Login Successful", {

                        description: "Welcome to University Management System!",

                    });

                    router.push("/student");
                },
                onError: (err) => {
                    toast.error("Google Login Failed", {

                        description:
                           "accessToken is missing",
                            
                    });
                },
            },
        );
    };

    return (
        <GoogleLogin
            theme="outline"
            shape="pill"
            text="continue_with"
            onSuccess={handleGoogleSuccess}
            onError={() => {
                toast.error("Google Login Failed", {

                    description:
                       "accessToken is missing",

                });
            }}
        />
    );
}
