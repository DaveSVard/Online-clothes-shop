"use client"
import React from "react"
import Link from "next/link"
import "./footer.scss"

export const Footer:React.FC = () => {
    
    const socImages:string[] = [
        "http://localhost:3000/images/footer/facebook.svg",
        "http://localhost:3000/images/footer/instagram.svg",
        "http://localhost:3000/images/footer/vk.svg",
        "http://localhost:3000/images/footer/youtube.svg"
    ]

    const footerInfo:{id:number, info:string[]}[] = [
        {id: 1, info: ["Company","About","Contact us","Support","Careers"]},
        {id: 2, info: ["Quick Link","Share Location","Orders Tracking","Size Guide","FAQs"]},
        {id: 3, info: ["Legal","Terms & conditions","Privacy Policy"]}        
    ]


    return(
        <div className="footer">
            <div className="container">
                <div className="footer__wrapper">
                    <div className="footer__leftSide">
                        <img src="http://localhost:3000/images/logo.png" alt="" />
                        <p>Complete your style with awesome clothes from us.</p>
                        <div className="footer__soc">
                            {socImages.map((elm, i) => {
                                return(
                                    <Link key={i} href={""}><img src={elm}  alt="socImg" /></Link>
                                )
                            })}
                        </div>
                    </div>
                    {footerInfo.map(elm => {
                        return(
                            <div key={elm.id} className="footer__info">
                                {elm.info?.map((elm, i) => {
                                    return(
                                        <Link href={""}>{elm}</Link>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}