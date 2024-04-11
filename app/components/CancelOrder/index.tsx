"use client"
import Link from "next/link"
import { useAppDispatch } from "@/lib/hooks"
import { useEffect } from "react"
import { stripeCancelData } from "@/lib/features/cart/cartSlice"
import "./../../styles/base/messagePages.scss"

export const CancelOrder = () => {
    
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(stripeCancelData(""))
    }, [])
    
    return(
        <div className="message">
            <div className="container">
                <div className="message__wrapper">
                    <div className="message__info">
                        <h1 className="text-xl font-semibold text-center" style={{color: "red"}}>Payment failed...</h1>
                        <Link href={"http://localhost:3000/userPage/cartPage"}>Go back!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
} 