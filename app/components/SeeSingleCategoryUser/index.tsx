"use client"
import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { getAllWishesData, selectWishes } from "@/lib/features/wish/wishSlice"
import { ProductCard } from "../ProductCard"
import { getSingleCategoryData, selectCategory, selectCategoryProducts } from "@/lib/features/category/categorySlice"
import "./../../styles/base/usersShowPages.scss"
import { ProductsPagination } from "../ProductsPagination"

export const SeeSingleCategoryUser:React.FC = () => {

    const {id} = useParams()
    const dispatch = useAppDispatch()
    const category = useAppSelector(selectCategory)
    const categoryProducts = useAppSelector(selectCategoryProducts)
    const wishlist = useAppSelector(selectWishes)
    
    const [page, setPage] = useState<any>(1)
    const [limit, setLimit] = useState<number>(6)
    const [totalPage, setTotalPage] = useState<number>(0)
    
    useEffect(() => {
        dispatch(getSingleCategoryData({id: +id, filterObj: {page: page - 1, limit: limit}})).then(res => {
            if(res.payload) {
                const calculatedTotalPage = Math.ceil(res.payload.count / limit);
                setTotalPage(calculatedTotalPage);
            }
        })
        dispatch(getAllWishesData({}))
    }, [id, page])

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
                        <h1 className="text-xl font-semibold text-center text-white">About {category.name}</h1>
                    </div>

                    <div className="show__products">
                        {categoryProducts?.map(elm => {
                            return(
                                <div key={elm.id} className="show__products-item">
                                    <ProductCard product={elm} wishlist = {wishlist}/>
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