"use client"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { getAllWishesData, selectWishes } from "@/lib/features/wish/wishSlice"
import { ProductCard } from "../ProductCard"
import { ProductsPagination } from "../ProductsPagination"
import "./../../styles/base/usersShowPages.scss"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const SeeWishes:React.FC = () => {

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()
    const wishlist = useAppSelector(selectWishes)
    
    const [page, setPage] = useState<any>(searchParams.get("page") || 1)
    const [limit, setLimit] = useState<number>(12)
    const [totalPage, setTotalPage] = useState<number>(0)

    useEffect(() => {
        router.push(`${pathname}/?page=${page}`)
        dispatch(getAllWishesData({page: page - 1, limit: limit})).then(res => {
            if(res.payload) {
                const calculatedTotalPage = Math.ceil(res.payload.count / limit);
                setTotalPage(calculatedTotalPage);
            }
        })

    }, [page])

    const handlePageChange = (value:any) => {
        if(value == "&laquo;" || value == "... ") {
            setPage(1)
        } else if (value == "&lsaquo;") {
            if (page != 1) {
                setPage(page - 1)
            }
        } else if (value == "&rsaquo;") {
            if (page != totalPage) {
                setPage(page + 1)
            }
        } else if (value == "&raquo;" || value == " ...") {
            setPage(totalPage)
        } else {
            setPage(value)
        }
    }

    return(
        <div className="show">
            <div className="container">
                <div className="show__wrapper">
                    <div className="show__title">
                        <h1 className="text-xl font-semibold text-center text-white">Your wish list!</h1>
                    </div>

                    <div className="show__products">
                        {wishlist.map(elm => {
                            return(
                                <div key={elm.id} className="show__products-item">
                                    <ProductCard product={elm.product} wishlist = {wishlist}/>
                                </div>
                            )
                        })}

                        <ProductsPagination totalPage={totalPage} page={page} limit={limit} onPageChange={handlePageChange}/>
                    </div>
                </div>
            </div>
        </div>
    )
}