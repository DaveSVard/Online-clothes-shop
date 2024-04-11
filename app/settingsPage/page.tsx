import type { Metadata } from "next";
import { Settings } from "../components/Settings";

export default function SettingsPage() {
  return <Settings/>;
}

export const metadata: Metadata = {
  title: "Settings",
};
