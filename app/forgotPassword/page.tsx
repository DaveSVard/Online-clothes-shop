import type { Metadata } from "next";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

export default function ForgotPassword () {
    return <ForgotPasswordForm/>
}

export const metadata: Metadata = {
  title: "Forgot Password",
};

