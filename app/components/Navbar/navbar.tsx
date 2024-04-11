"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { authLogoutData, authProfileData, selectUser } from "@/lib/features/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faCartShopping, faDoorClosed, faDoorOpen, faGear, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams, usePathname, useRouter } from "next/navigation";

import "./navbar.scss"
import Cookies from "js-cookie";

export const Navbar:React.FC = React.memo(():JSX.Element => {

    const {id} = useParams()
    const router = useRouter()
    const pathname = usePathname()
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const token:any = Cookies.get('accessToken')
    
    useEffect(() => {
        dispatch(authProfileData(""))

    }, [])

    const [brandNavigation, setBrandNavigation] = useState<boolean>(false)
    const [categoryNavigation, setCategoryNavigation] = useState<boolean>(false)
    const [productNavigation, setProductNavigation] = useState<boolean>(false)

    const openMenu = (navName:string) => {
        if(navName == "Brands") {
            setBrandNavigation(!brandNavigation)
            setCategoryNavigation(false)
            setProductNavigation(false)
        } else if (navName == "Categories") {
            setCategoryNavigation(!categoryNavigation)
            setBrandNavigation(false)
            setProductNavigation(false)
        } else if (navName == "Products") {
            setProductNavigation(!productNavigation)
            setBrandNavigation(false)
            setCategoryNavigation(false)
        }
    }

    const closeMenu = () => {
        setCategoryNavigation(false)
        setProductNavigation(false)
        setBrandNavigation(false)
    }

    
    const [closedDoor, setClosedDoor] = useState<boolean>(true);

    return(
        <>
            {(pathname != "/signIn" 
            && pathname != "/signUp" 
            && pathname != "/forgotPassword" 
            && pathname != `/resetPassword/${id}` 
            && pathname != "/verify"
            ) && !token ? <nav className="user-navigation">
                <div className="container">
                    <div className="user-navigation__list-wrapper">
                        <h1><Link href={"/"}>Shop</Link></h1>
                        <Link href={"/signIn"}>
                            {closedDoor ? (
                                <FontAwesomeIcon icon={faDoorClosed} onMouseEnter={() => setClosedDoor(false)} style={{ color: "white", fontSize: "25px"}} />
                            ) : (
                                <FontAwesomeIcon icon={faDoorOpen} onMouseLeave={() => setClosedDoor(true)} style={{ color: "white", fontSize: "25px"}} />
                            )}
                        </Link>
                    </div>
                </div>
            </nav> : <div></div>}

            {token && user.role == 0 ? <nav className="user-navigation">
                <div className="container">
                    <div className="user-navigation__list-wrapper">
                        <h1><Link href={"/"}>Shop</Link></h1>
                        <div className="nav__list-items flex items-center justify-center gap-x-2.5">
                            <Link href={"/userPage/wishPage"}><FontAwesomeIcon icon={faHeart} className="red-hover"/></Link>
                            <Link href={"/userPage/cartPage"}><FontAwesomeIcon icon={faCartShopping} className="blue-hover"/></Link>
                            <Link href={"/userPage/orderPage"}><FontAwesomeIcon icon={faBagShopping} className="green-hover"/></Link>
                            <Link href={"/settingsPage"}><FontAwesomeIcon icon={faGear} className="black-hover"/></Link>
                            <div className="nav__list-items flex items-center justify-center gap-x-2.5">
                                <button onClick={() => {
                                    dispatch(authLogoutData("")).then(res => {
                                        router.push("/")
                                    })
                                }}>
                                    {closedDoor ? (
                                        <FontAwesomeIcon icon={faDoorClosed} onMouseEnter={() => setClosedDoor(false)} style={{ color: "white"}} />
                                    ) : (
                                        <FontAwesomeIcon icon={faDoorOpen} onMouseLeave={() => setClosedDoor(true)} style={{ color: "white"}} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav> : <div></div>}

            {token && user.role == 1 ? <nav className="admin-navigation">
                <div className="container">
                    {user.role ? <div className="nav__row">
                        {user.role == 1 && <div className="nav__list">
                            <div className="nav__list-wrapper flex justify-end gap-x-4">

                                <div className="nav__list-btn">
                                    <button className="" onClick={() => openMenu("Brands")}>Brands</button>
                                    {brandNavigation && <div className="nav__list-item" onMouseLeave={() => closeMenu()}>
                                        <Link href={"/adminPage/brands"}>All Brands</Link>
                                        <Link href={"/adminPage/brands/addBrand"}>Add Brand</Link>
                                    </div>}
                                </div>
                                <div className="nav__list-btn" >
                                    <button className="nav__list-btn" onClick={() => openMenu("Categories")}>Categories</button>
                                    {categoryNavigation && <div className="nav__list-item" onMouseLeave={() => closeMenu()}>
                                        <Link href={"/adminPage/categories"}>All Categories</Link>
                                        <Link href={"/adminPage/categories/addCategory"}>Add Category</Link>
                                    </div>}
                                </div>
                                <div className="nav__list-btn" >
                                    <button className="nav__list-btn" onClick={() => openMenu("Products")}>Products</button>
                                    {productNavigation && <div className="nav__list-item" onMouseLeave={() => closeMenu()}>
                                        <Link href={"/adminPage/products"}>All Products</Link>
                                        <Link href={"/adminPage/products/addProduct"}>Add Product</Link>
                                    </div>}
                                </div>
                                <div className="nav__list-items flex items-center justify-center gap-x-2.5">
                                    <button onClick={() => {
                                        dispatch(authLogoutData("")).then(res => {
                                            router.push("/")
                                        })
                                    }}>
                                        {closedDoor ? (
                                            <FontAwesomeIcon icon={faDoorClosed} onMouseEnter={() => setClosedDoor(false)} style={{ color: "white"}} />
                                        ) : (
                                            <FontAwesomeIcon icon={faDoorOpen} onMouseLeave={() => setClosedDoor(true)} style={{ color: "white"}} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>}

                    </div> : <></>} 
                    
                </div>
            </nav> : <div></div>}
        </>
    )
})