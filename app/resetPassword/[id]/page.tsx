import type { Metadata } from "next";
import { ResetPasswordForm } from "../../components/ResetPasswordForm";

export default function ForgotPassword () {
    return <ResetPasswordForm/>
}

export const metadata: Metadata = {
  title: "Reset Password",
};

