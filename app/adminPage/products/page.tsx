import { ShowProductPage } from "@/app/components/ShowProduct";
import type { Metadata } from "next";

export default function Products () {

    return(
        <ShowProductPage/>
    )
}   


export const metadata: Metadata = {
    title: "Products",
  };
  