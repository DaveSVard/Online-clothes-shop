import { SuccessOrder } from "@/app/components/SuccessOrder";
import type { Metadata } from "next";

export default function StripeSucces() {
  return <SuccessOrder/>;
}

export const metadata: Metadata = {
  title: "Success!",
};
