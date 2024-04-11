"use client"
import { getSingleProductData, selectProduct } from "@/lib/features/product/productSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBagShopping, faHeart } from "@fortawesome/free-solid-svg-icons"
import { addProductToWishData, deleteWishData, getAllWishesData } from "@/lib/features/wish/wishSlice"
import { Modal } from "../Modal"
import { addProductToCartData } from "@/lib/features/cart/cartSlice"
import "./singlePageForProduct.scss"
import "./../../styles/base/toCardModal.scss"
import { Formik } from "formik"
import { toCartSchema } from "@/app/schemas/schemas"


export const SeeSingleProductUser:React.FC = () => {
    
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const product = useAppSelector(selectProduct)
    const [isInWishList, setIsInWishList] = useState<boolean>(false)
    const [wishId, setWishId] = useState<number>()


    useEffect(() => {
        if (id) {
            dispatch(getSingleProductData(+id)).then(prodRes => {
                if(prodRes.payload) {
                    dispatch(getAllWishesData("")).then(wishRes => {
                        wishRes.payload?.map((wish:any) => {
                            if(wish.product?.id == prodRes.payload?.id) {
                                setIsInWishList(true)
                                setWishId(wish.product?.id)
                            }
                        })
                    })
                }
            })
        }
    }, [id])
    
    
    const [seeModal, setSeeModal] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [count, setCount] = useState<number>(1)
    const [size, setSize] = useState<number>()

    const addToCart = () => {
        if(!error) {
            setError(true)
        } else {
            setError(false)
            if(size) { 
                dispatch(addProductToCartData({sizeId: size, quantity: count, productId: product.id}))
                setSeeModal(false)
            }
        }
    }


    return(
        <div className="singleProduct">

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


            <div className="container">
                <div className="singleProduct__wrapper">

                    <div className="singleProduct__content">
                        <div className="singleProduct__info">
                            <h1 className="text-xl font-semibold text-center">{product.name}</h1>
                            <p><span className="accent">Description:</span> {product.description}</p>
                            <p><span className="accent">Brand:</span> {product.brand?.name}</p>
                            <p><span className="accent">Category:</span> {product.category?.name}</p>
                            <p><span className="accent">Price:</span> {product.price}$</p>
                            {product.sizes?.map(elm => {
                                return(
                                    <div className="info__product-size" key={elm.id}>
                                        <p><span className="accent">Size:</span> {elm.size}</p>
                                        <p><span className="accent">Count:</span> {elm.count}</p>
                                    </div>
                                )
                            })}
                            <div className="singleProduct__info-icons">
                                <FontAwesomeIcon icon={faHeart} className="red-hover" style={isInWishList ? {color: "red"} : {}} onClick={() => {
                                    if(isInWishList) {
                                        if(wishId) { 
                                            dispatch(deleteWishData(wishId))
                                            setIsInWishList(false)
                                            dispatch(getAllWishesData(""))
                                        }
            
                                    } else {
                                        dispatch(addProductToWishData({productId: product.id})).then(res => {
                                            setWishId(res.payload?.id)
                                            setIsInWishList(true)
                                            dispatch(getAllWishesData(""))
                                        })
                                    }
                                }} />
                                <FontAwesomeIcon icon={faBagShopping} className="blue-hover" onClick={() => setSeeModal(true)}/>
                            </div>
                        </div>

                        <div className="singleProduct__images">
                            {product.images?.map(img => {
                                return(
                                    <div key={img.id} className="singleProduct__images-item">
                                        <img src={`http://localhost:3001/uploads/${img.name}`} alt="" />
                                     </div>
                                 )
                             })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}  