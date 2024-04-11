import type { Metadata } from "next";
import { HomePage } from "./components/HomePage";

export default function IndexPage() {
  return <HomePage/>;
}

export const metadata: Metadata = {
  title: "Shop",
};
