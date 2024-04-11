"use client";
import { type ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Navbar } from "./components/Navbar/navbar";
import { config } from "@fortawesome/fontawesome-svg-core";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "./styles/base/base.scss";
import "./styles/base/reset.scss";
import { Footer } from "./components/Footer";
import Cookies from "js-cookie";
import { useParams, usePathname } from "next/navigation";
config.autoAddCss = false;

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {

  const {id} = useParams()
  const pathname = usePathname()
  const role:any = Cookies.get('role')
  const token:any = Cookies.get('accessToken')
  
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <Navbar />

          <main>{children}</main>

          {(pathname != "/signIn" 
            && pathname != "/signUp" 
            && pathname != "/forgotPassword" 
            && pathname != `/resetPassword/${id}` 
            && pathname != "/verify"
          ) && (role == 0 || !token) ? <Footer/> : <></>}
        </body>
      </html>
    </StoreProvider>
  );
}
