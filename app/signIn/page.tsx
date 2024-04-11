import type { Metadata } from "next";
import { SignInPage } from "../components/SignIn/signIn";

export default function SignIn () {
    
  return <SignInPage />;
}

export const metadata: Metadata = {
  title: "SignUp",
};
