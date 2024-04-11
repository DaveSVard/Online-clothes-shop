"use client"
import Link from "next/link"
import { useAppDispatch } from "@/lib/hooks"
import { useEffect } from "react"
import { stripeSuccessData } from "@/lib/features/cart/cartSlice"
import "./../../styles/base/messagePages.scss"

export const SuccessOrder = () => {
    
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(stripeSuccessData(""))
    }, [])
    
    return(
        <div className="message">
            <div className="container">
                <div className="message__wrapper">
                    <div className="message__info">
                        <h1 className="text-xl font-semibold text-center" style={{color: "green"}}>Payment completed successfully!!!</h1>
                        <Link href={"http://localhost:3000/userPage/orderPage"}>Go to orders!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
} 