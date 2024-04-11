import type { Metadata } from "next";
import { SeeSingleProductUser } from "@/app/components/SeeSingleProductUser";

export default function IndexPage() {
  return <SeeSingleProductUser/>;
}

export const metadata: Metadata = {
  title: "Single Product",
};