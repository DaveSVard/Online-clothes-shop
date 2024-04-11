import { CancelOrder } from "@/app/components/CancelOrder";
import type { Metadata } from "next";

export default function StripeSucces() {
  return <CancelOrder/>;
}

export const metadata: Metadata = {
  title: "Canceled!",
};
