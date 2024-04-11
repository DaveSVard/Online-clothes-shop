"use client"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { getOrderListData, selectOrderList } from "@/lib/features/order/orderSlice"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import { ProductsPagination } from "../ProductsPagination";
import 'swiper/css';
import 'swiper/css/scrollbar';
import "./../../styles/base/usersShowPages.scss"
import "./../../styles/base/productCard.scss"
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export const ShowOrderPage:React.FC = () => {
    
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()
    const orderList = useAppSelector(selectOrderList)

    const [page, setPage] = useState<any>(searchParams.get("page") || 1)
    const [limit, setLimit] = useState<number>(12)
    const [totalPage, setTotalPage] = useState<number>(0)
    
    useEffect(() => {
        router.push(`${pathname}/?page=${page}`)
        dispatch(getOrderListData({page: page - 1, limit: limit})).then(res => {
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
                        <h1 className="text-xl font-semibold text-center text-white">Your order list!</h1>
                    </div>

                    <div className="show__products">
                        <div className="show__products">
                            {orderList.map(elm => {
                                return(
                                    <div key={elm.id} className="productCard2">
                                        <div className="productCard__top2">
                                            <div className="porductCard__img2">
                                                    <Swiper
                                                        scrollbar={{
                                                        hide: true,
                                                        }}
                                                        modules={[Scrollbar]}
                                                        className="mySwiper"
                                                    >
                                                    {elm.product.images?.map(elm => {
                                                        return(
                                                            <SwiperSlide className="swiperSlide" key={elm.id}>
                                                                {/* <Link href={`/userPage/singleProductPage/${elm.productId}`}> */}
                                                                    <img src={`http://localhost:3001/uploads/${elm.name}`} alt="" />
                                                                {/* </Link> */}
                                                            </SwiperSlide>
                                                        )
                                                    })}
                                                </Swiper>
                                            </div>
                                            <h2 className="productTitle">{elm.product?.name}</h2>
                                        </div>

                                        <div className="productCard__bottom2">
                                            <p><span className="accent">Count:</span> {elm.quantity}</p>
                                            <p><span className="accent">Size:</span> {elm.size.size}</p>
                                            <p><span className="accent">Paid:</span> {elm.price * elm.quantity}</p>
                                            <p><span className="accent">Price for one:</span> {elm.price}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <ProductsPagination totalPage={totalPage} page={page} limit={limit} onPageChange={handlePageChange}/>
                    </div>
                </div>
            </div>
        </div>
    )
}