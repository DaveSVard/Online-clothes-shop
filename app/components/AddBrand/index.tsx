"use client" 
import { createBrandData } from "@/lib/features/brand/brandSlice"
import { addBrandSchema } from "@/app/schemas/schemas"
import { useAppDispatch } from "@/lib/hooks"
import { Formik } from "formik"
import { useState } from "react"
import "./../../styles/base/formPages.scss"

export const AddBrandPage = () => {
    
    const dispatch = useAppDispatch()
    const [successMessage, setSuccessMessage] = useState<boolean>(false)
    const [failMessage, setFailMessage] = useState<boolean>(false)


    return(
        <div className="formPage">
            <div className="container">
                <div className="formPage__wrapper">
                    <div className="info__title text-center">
                        <h1 className="text-xl font-semibold">Add Brand</h1>
                    </div>
                    <Formik initialValues={{name: ""}}
                        validationSchema={addBrandSchema}
                        onSubmit={(values, { resetForm  }) => {
                           dispatch(createBrandData(values)).then(res => {
                                if(res.payload.name) {
                                    setSuccessMessage(true)
                                    setFailMessage(false)
                                    resetForm()
                                    setTimeout(() => {
                                        setSuccessMessage(false)
                                    }, 3000)
                                } else {
                                    setSuccessMessage(false)
                                    setFailMessage(true)
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
                            <form onSubmit={handleSubmit} className="formPage__form flex flex-col items-center justify-center gap-y-1.5">
                                {successMessage ? 
                                    <p className="successMessage">Brand created successfully!</p> : 
                                failMessage ? 
                                    <p className="failMessage">Something wrong...</p> 
                                : null}
                                <input placeholder="Enter brand name"  name="name" value={values.name} onChange={handleChange}/>
                                {errors.name && touched.name ? <p className="error">{errors.name}</p> : <></>}
                                <button type="submit" className="success-btn">Create!</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}