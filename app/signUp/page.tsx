import type { Metadata } from "next";
import { SignUpPage } from "../components/SignUp";

export default function SignUp () {
    
  return <SignUpPage />;
}

export const metadata: Metadata = {
  title: "SignUp",
};
