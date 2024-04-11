import type { Metadata } from "next";
import { Verify } from "../components/Verify";

export default function IndexPage() {
  return <Verify/>;
}

export const metadata: Metadata = {
  title: "Verify...",
};
