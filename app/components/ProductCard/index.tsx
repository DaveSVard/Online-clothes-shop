"use client"
import React, { useEffect, useState } from "react"
import { IProduct, IWish } from "@/type/type"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBagShopping, faHeart} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { useAppDispatch } from "@/lib/hooks"
import { addProductToWishData, deleteWishData, getAllWishesData} from "@/lib/features/wish/wishSlice"
import { Modal } from "../Modal"
import { addProductToCartData } from "@/lib/features/cart/cartSlice"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

import "./../../styles/base/productCard.scss"
import "./../../styles/base/toCardModal.scss"
import { Formik } from "formik"
import { toCartSchema } from "@/app/schemas/schemas"

interface PropTypes {
    product:IProduct
    wishlist:IWish[]
}

export const ProductCard:React.FC<PropTypes> = ({product, wishlist}) => {

    const [isInWishList, setIsInWishList] = useState<boolean>(false)
    const [seeModal, setSeeModal] = useState<boolean>(false)
    const [wishId, setWishId] = useState<number>()
    const [count, setCount] = useState<number>(1)
    const dispatch = useAppDispatch()

    useEffect(() => {
        wishlist.map(wish => {
            if(wish.product?.id == product.id) {
                setIsInWishList(true)
                setWishId(wish.id)
            }
        })
    }, [])    

    return(
        <div className="productCard">
            
            <Modal active={seeModal} setActive={setSeeModal}>
                <div className="toCart__modal">
                    <Formik initialValues={{sizeId: ""}}
                        validationSchema={toCartSchema}
                        onSubmit={(values, { }) => {
                            dispatch(addProductToCartData({sizeId: +values.sizeId, quantity: count, productId: product?.id})).then(res => {
                                if(res.payload) {
                                    setSeeModal(false)
                                }
                            })
                        }}
                    >  
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <select name="sizeId" value={values.sizeId} onChange={handleChange}>
                                    <option value="" hidden>Select product size</option>
                                    {product.sizes?.map(elm => {
                                        return(
                                            <option key={elm.id} value={elm.id}>{elm.size}</option>
                                        )
                                    })}
                                </select>
                                {errors.sizeId && touched.sizeId ? <p className="error">{errors.sizeId}</p> : <></>}
                                <div className="priceAndCount">
                                    <p>{count}</p>
                                    <p>{product.price * count}$</p>
                                </div>
                                <div className="toCart__btns">
                                    <button type="button" onClick={() => {
                                        product.sizes.find(elm => {
                                            if(elm.id == +values.sizeId) {
                                                if(count < elm.count) {
                                                    setCount(count + 1)
                                                }
                                            }
                                        })                                        
                                    }}>+</button>
                                    <button type="button" onClick={() => {
                                        if(count <= 0) {
                                            setCount(0)
                                        } else {
                                            setCount(count - 1)
                                        }
                                    }}>-</button>
                                </div>  
                                <button type="submit" className="success-btn" >Add to cart</button>
                            </form>
                        )}
                    </Formik>
                    
                </div>
            </Modal>

            <div className="productCard__top">
                <div className="porductCard__img">
                        <Swiper
                            scrollbar={{
                            hide: true,
                            }}
                            modules={[Scrollbar]}
                            className="mySwiper"
                        >
                        {product.images?.map(elm => {
                            return(
                                <SwiperSlide className="swiperSlide" key={elm.id}>
                                    <Link href={`/userPage/singleProductPage/${product?.id}`}>
                                        <img src={`http://localhost:3001/uploads/${elm.name}`} alt="" />
                                    </Link>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <h2 className="productTitle">{product?.name}</h2>
            </div>
            
            <div className="productCard__bottom">
                <p className="productPrice">{product?.price}$</p>
                <div className="productCard__icons">
                    <FontAwesomeIcon icon={faHeart} className="red-hover" style={isInWishList ? {color: "red"} : {}} onClick={() => {
                        if(isInWishList) {
                            if(wishId) { 
                                dispatch(deleteWishData(wishId)).then(res => {
                                    if(res.payload) {
                                        dispatch(getAllWishesData({}))
                                    }
                                })
                                
                                setIsInWishList(false)
                            }

                        } else {
                            dispatch(addProductToWishData({productId: product.id})).then(res => {
                                if(res.payload) {
                                    setWishId(res.payload?.id)
                                    setIsInWishList(true)
                                    dispatch(getAllWishesData({}))
                                }
                            })
                        }
                    }}/>
                    <FontAwesomeIcon icon={faBagShopping} className="blue-hover" onClick={() => setSeeModal(true)}/>
                </div>
            </div>
        </div>
    )
}