"use client"
import { userVerifyData } from "@/lib/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./verify.scss"

export const Verify:React.FC = (): JSX.Element => {
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch();
  
    const [message, setMessage] = useState<boolean>(false);
  
    
    useEffect(() => {
      const email:any = searchParams.get("email");
      const emailToken:any = searchParams.get("emailToken");
  
      dispatch(userVerifyData({ email: email, emailToken: emailToken })).then(
        (res) => {
          setMessage(true);
        }
      );
    }, []);
  
    return (
      <div className="verify">
        <div className="container">
          <div className="verify__wrapper">
            {!message ? (
              <div>
                <h1 className="text-xl font-semibold text-center text-black">Loading...</h1>
              </div>
            ) : (
              <div>
                  <h1 className="text-xl font-semibold text-center" style={{color: "green"}}>You are verifed! 
                    <Link href={"/signIn"} className="text-xl font-semibold text-center text-black">Click!</Link>
                  </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  