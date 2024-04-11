"use client"
import { useRouter } from "next/navigation"
import "./header.scss"

export const Header = () => {
    
    
    return(
        <header className="header">
            <div className="header__wrapper">
                <div className="circle-box">
                    <div id="animation" className="animate">
                        <div className="reveal circle_wrapper">
                            <div className="circle">Go shopping!</div>
                        </div>
                        <div className="sticky animate">
                            <div className="front circle_wrapper animate">
                                <div className="circle animate"></div>
                            </div>
                        </div>
                        <h2>Welcome!!</h2>
                        <div className="sticky animate">
                            <div className="back circle_wrapper animate">
                                <div className="circle animate"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}