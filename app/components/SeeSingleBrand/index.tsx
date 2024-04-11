"use client"
import { deleteBrandData, getSingleBrandData, selectBrand, selectBrandProducts, updateBrandData } from "@/lib/features/brand/brandSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Formik } from "formik"
import { changeNameSchema } from "@/app/schemas/schemas"
import { Modal } from "../Modal"
import "./../../styles/base/singlePageForAdmin.scss"
import "./../../styles/base/infoTable.scss"
import { ProductsPagination } from "../ProductsPagination"

export const SeeSingleBrand = () => {
    
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const {id} = useParams()
    const brand = useAppSelector(selectBrand)
    const brandProducts = useAppSelector(selectBrandProducts)

    const [successMessage, setSuccessMessage] = useState<boolean>(false)
    const [failMessage, setFailMessage] = useState<boolean>(false)
    const [seeModal, setSeeModal] = useState<boolean>(false)

    const [page, setPage] = useState<any>(searchParams.get("page") || 1)
    const [limit, setLimit] = useState<number>(10)
    const [totalPage, setTotalPage] = useState<number>(0)
    
    
    useEffect(() => {
        router.push(`${pathname}/?page=${page}`)
        dispatch(getSingleBrandData({id: +id, filterObj: {page: page - 1, limit: limit}})).then(res => {
            if(res.payload) {
                const calculatedTotalPage = Math.ceil(res.payload.count / limit);
                setTotalPage(calculatedTotalPage);
            }
        })
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
        <div className="singlePage">

            <Modal active = {seeModal} setActive={setSeeModal}>
                <div className="deleteModalMessage">
                    <h2>Are you sure?</h2>
                    <div className="deleteBtns">
                        <button className="delete-btn" onClick={() => setSeeModal(false)}>No!</button>
                        <button className="success-btn2" onClick={() => {
                            dispatch(deleteBrandData(brand.id)).then(res => {
                                if(res.payload) {
                                    router.push("/adminPage/brands")
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
                        <h1 className="text-xl font-bold">About {brand?.name}</h1>
                    </div>
 
                    <div className="singlePage__info">
                        <div className="singlePage__info-wrapper">
                            <Formik initialValues={{name: ""}}
                                validationSchema={changeNameSchema}
                                onSubmit={(values, { resetForm  }) => {
                                    dispatch(updateBrandData({id: brand.id, newName: values.name})).then(res => {
                                        if(res.payload) {
                                            setSuccessMessage(true)
                                            setFailMessage(false)
                                            resetForm()
                                            setTimeout(() => {
                                                setSuccessMessage(false)
                                            }, 3000)
                                            dispatch(getSingleBrandData({id: +id}))
                                        } else {
                                            setSuccessMessage(false)
                                            setFailMessage(true)
                                        }
                                    })
                                }
                            }>
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleSubmit,
                                }) => (
                                    <form className="change__info" onSubmit={handleSubmit}>
                                        {successMessage ? 
                                            <p className="successMessage">Brand updated successfully!</p> : 
                                        failMessage ? 
                                            <p className="failMessage">Something wrong...</p> 
                                        : null}
                                        <input placeholder="Change brand name" name="name" value={values.name} onChange={handleChange}/>
                                        {errors.name && touched.name ? <p className="error">{errors.name}</p> : <></>}
                                        <div className="change__info-btns">
                                            <button type="submit" className="success-btn">Save</button>
                                            <button type="button"  onClick={() => setSeeModal(true)}><FontAwesomeIcon icon = {faTrash} /></button>
                                        </div>
                                    </form>
                                )}
                            </Formik>

                            <div className="singlePage__info-content">
                                <table className="info__product-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {brandProducts?.map((product, i) => {
                                            return(
                                                <tr key={product.id}>
                                                    <td>{product.name}</td>
                                                    <td>{product.description}</td>
                                                    <td>{product.price}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <ProductsPagination totalPage={totalPage} page={page} limit={limit} onPageChange={handlePageChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}