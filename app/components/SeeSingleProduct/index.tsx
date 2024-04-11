"use client"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { Modal } from "../Modal"
import { useParams, useRouter } from "next/navigation"
import { addProductImagesData, deleteProductData, deleteProductImageData, deleteProductSizeData, getSingleProductData, selectProduct } from "@/lib/features/product/productSlice"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import "./../../styles/base/singlePageForAdmin.scss"
import "./../../styles/base/infoTable.scss"
import "./../../styles/base/formPages.scss"
import { ProductUpdateForm } from "../ProductUpdateForm"
import { AddProudctSizeForm } from "../AddProductSizeForm"
import { SizeUpdateForm } from "../SizeUpdateForm"

export const SeeSingleProduct = () => {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const {id} = useParams()
    const product = useAppSelector(selectProduct)

    const [successMessage, setSuccessMessage] = useState<boolean>(false)
    const [failMessage, setFailMessage] = useState<boolean>(false)
    const [sizeUpdateForm, setSizeUpdateForm] = useState<boolean>(false)
    const [sizeUpdateFormId, setSizeUpdateFormId] = useState<number>()
    const [seeModal, setSeeModal] = useState<boolean>(false)

    const [imagesArr, setImagesArr] = useState<any>()
    const [imagesInpErr, setImagesInpErr] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getSingleProductData(+id))
    }, [id])

    const addPicture = () => {
        if(imagesArr) {
            const formData = new FormData()
            formData.append("productId", product.id.toString())
            for(let e of imagesArr){
                formData.append("images", e)
            }

            dispatch(addProductImagesData(formData)).then(res => {
                if(res.payload) dispatch(getSingleProductData(+id))
            })
        } else {
            setImagesInpErr(true)
        }
    }

    console.log(product);
    

    return (
        <div className="singlePage">

            <Modal active = {seeModal} setActive={setSeeModal}>
                <div className="deleteModalMessage">
                    <h2>Are you sure?</h2>
                    <div className="deleteBtns">
                        <button className="delete-btn" onClick={() => setSeeModal(false)}>No!</button>
                        <button className="success-btn2" onClick={() => {
                            dispatch(deleteProductData(product.id)).then(res => {
                                if(res.payload) {
                                    router.push("/adminPage/products")
                                    setSeeModal(false)
                                }
                            })
                        }}>Yes!</button>
                    </div>
                </div>
            </Modal>


            <div className="container">
                <div className="singlePage__wrapper flex flex-col items-center justify-center gap-y-7">
                    <div className="sinlgePage__title text-center">
                        <h1 className="text-xl font-bold">About {product.name}</h1>
                    </div>

                    <div className="singleProduct__info">
                        <div className="singleProduct__info-wrapper">
                            <div className="info__product">
                                <h2 className="text-lg font-medium">Product info</h2>
                                <p><span className="accent">Description:</span> {product.description}</p>
                                <p><span className="accent">Price:</span> {product.price}</p>
                                <p><span className="accent">Category:</span> {product.category?.name}</p>
                                <p>
                                    <span className="accent">{`Delete product ==>`} </span> 
                                    <FontAwesomeIcon className="cursor" icon={faTrash} onClick={() => setSeeModal(true)}></FontAwesomeIcon>
                                </p>
                                {product.sizes?.map(elm => {
                                    return(
                                        <div key={elm.id} className="info__product-size">
                                            <div className="size__info">
                                                <p><span className="accent">Size:</span> {elm.size}</p>
                                                <p><span className="accent">Count:</span> {elm.count}</p>
                                                <FontAwesomeIcon className="cursor" icon={faPen} onClick={() => {
                                                    setSizeUpdateForm(true)
                                                    setSizeUpdateFormId(elm.id)
                                                }}></FontAwesomeIcon>
                                                <FontAwesomeIcon icon={faTrash} className="cursor" onClick={() => {
                                                    dispatch(deleteProductSizeData(elm.id)).then(res => {
                                                        if(res.payload) dispatch(getSingleProductData(+id))
                                                    })
                                                }}></FontAwesomeIcon>
                                            </div>
                                            {elm.id == sizeUpdateFormId && sizeUpdateForm ? <SizeUpdateForm sizeId={elm.id} productId ={product.id} setForm={setSizeUpdateForm}/> : <></>}

                                        </div>
                                    )
                                })}                               
                            </div>

                            <ProductUpdateForm 
                                setFailMessage={setFailMessage}
                                setSuccessMessage={setSuccessMessage}
                                successMessage={successMessage}
                                failMessage={failMessage}
                                productId={product.id}
                            />

                            <div className="formPage__form">
                                <input placeholder="Enter product picture" type="file" multiple onChange={(e) => setImagesArr(e.target.files)}/>
                                {imagesInpErr && <p className="error">Select images for product</p>}
                                <button className="success-btn" onClick={() => addPicture()}>Add!</button>
                            </div>

                            <AddProudctSizeForm productId={product.id} />

                        </div>


                        <div className="singleProduct__images">
                            {product.images?.map(img => {
                                return(
                                    <div key={img.id} className="singleProduct__images-item">
                                        <img src={`http://localhost:3001/uploads/${img.name}`} alt="" />
                                        <div className="singleProduct__images-ghost">
                                            <button onClick={() => {
                                                dispatch(deleteProductImageData(img.id)).then(res => {
                                                    if(res.payload) dispatch(getSingleProductData(+id))
                                                })
                                            }}>
                                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                            </button>
                                        </div>
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