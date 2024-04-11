"use client"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { deleteCartData, getCartListData, selectCartList, stripeCheckoutSessionData, updateCartData } from "@/lib/features/cart/cartSlice"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "../Modal";
import { useRouter } from "next/navigation";
import 'swiper/css';
import 'swiper/css/scrollbar';
import "./../../styles/base/usersShowPages.scss"

export const SeeCarts:React.FC = () => {
    
    const router = useRouter()
    const dispatch = useAppDispatch()
    const cartList = useAppSelector(selectCartList)
    const [seeDeleteModal, setSeeDeleteModal] = useState<boolean>(false)
    const [cartId, setCartId] = useState<number>()

    console.log(cartList);
    

    useEffect(() => {
        dispatch(getCartListData(""))
    }, [])
    
    const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
    const [isCheck, setIsCheck] = useState<number[]>([]);

    const handleSelectAll = (e:any) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(cartList.map(li => li.id));
        if (isCheckAll) {
          setIsCheck([]);
        }
      };
    
    const handleClick = (e:any) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, +id]);
        if (!checked) {
          setIsCheck(isCheck.filter((item:any) => item != id));
        }
    };

    return(
        <div className="show">

            <Modal active = {seeDeleteModal} setActive={setSeeDeleteModal}>
                <div className="deleteModalMessage">
                    <h2>Are you sure?</h2>
                    <div className="deleteBtns">
                        <button className="delete-btn" onClick={() => setSeeDeleteModal(false)}>No!</button>
                        <button className="success-btn2" onClick={() => {
                            if(cartId) {
                                dispatch(deleteCartData(cartId)).then(res => {
                                    if(res.payload) {
                                        setSeeDeleteModal(false)
                                        dispatch(getCartListData(""))
                                    }
                                })
                            }
                        }}>Yes!</button>
                    </div>
                </div>
            </Modal>

            <div className="container">
                <div className="show__wrapper">
                    <div className="show__title">
                        <h1 className="text-xl font-semibold text-center text-white">Your cart list!</h1>
                    </div>

                    <div className="show__carts">
                        <table className="cart__table">
                            <thead>
                                <tr>
                                    <th>
                                        <div className="buy__box-item">
                                            <input
                                                className="selectAll-checkbox"
                                                type="checkbox"
                                                name="selectAll"
                                                id="selectAll"
                                                onChange={handleSelectAll}
                                                checked={isCheckAll}
                                            />
                                        </div>
                                    </th>
                                    <th>Name</th>
                                    <th>Price for one</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>+</th>
                                    <th>-</th>
                                    <th>Buy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartList.map((elm, i) => {
                                    return(
                                        <tr key={elm.id}>
                                            <td className="sm-td">{`${++i})`}</td>
                                            <td>{elm.product?.name}</td>
                                            <td>{elm.product?.price}$</td>
                                            <td>{elm.quantity}</td>
                                            <td>{elm.product?.price * elm.quantity}$</td>
                                            <td className="sm-td">
                                                <button style={{backgroundColor: "green"}} onClick={() => {
                                                            dispatch(updateCartData({cartId: elm.id, quantity: elm.quantity + 1})).then(res => {
                                                                if(res.payload) {
                                                                    dispatch(getCartListData(""))
                                                                }
                                                            })
                                                }}>+</button>
                                            </td>
                                            <td className="sm-td">
                                                <button style={{backgroundColor: "red"}} onClick={() => {
                                                    if(elm.quantity <= 0) {
                                                        dispatch(updateCartData({cartId: elm.id, quantity: 0})).then(res => {
                                                            if(res.payload) {
                                                                dispatch(getCartListData(""))
                                                            }
                                                        })
                                                    } else {
                                                        dispatch(updateCartData({cartId: elm.id, quantity: elm.quantity - 1})).then(res => {
                                                            if(res.payload) {
                                                                dispatch(getCartListData(""))
                                                            }
                                                        })
                                                    }
                                                }}>-</button>
                                            </td>
                                            <td className="sm-td"> 
                                                <input type="checkbox"
                                                    name={elm.product?.name}
                                                    onChange={handleClick}
                                                    checked={isCheck.includes(elm.id)} 
                                                    id={elm.id.toString()}
                                                    className="single-checkbox"
                                                />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <button className="success-btn2">Buy!</button>
                    </div>
                </div>
            </div>      
        </div>
    )
}


