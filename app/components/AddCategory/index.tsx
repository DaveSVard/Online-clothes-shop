"use client" 
import { Formik } from "formik"
import { addCategorySchema } from "@/app/schemas/schemas"
import { useAppDispatch } from "@/lib/hooks"
import { useState } from "react"
import { createCategoryData } from "@/lib/features/category/categorySlice"
import "./../../styles/base/formPages.scss"

export const AddCategoryPage = () => {
    
    const dispatch = useAppDispatch()
    const [successMessage, setSuccessMessage] = useState<boolean>(false)
    const [failMessage, setFailMessage] = useState<boolean>(false)

    return(
        <div className="formPage">
            <div className="container">
                <div className="formPage__wrapper">
                    <div className="info__title text-center">
                        <h1 className="text-xl font-semibold">Add Category</h1>
                    </div>
                    <Formik initialValues={{name: ""}}
                        validationSchema={addCategorySchema}
                        onSubmit={(values, { resetForm  }) => {
                           dispatch(createCategoryData(values)).then(res => {
                                if(res.payload.name) {
                                    setSuccessMessage(true)
                                    setFailMessage(false)
                                    setTimeout(() => {
                                        setSuccessMessage(false)
                                    }, 3000)
                                    resetForm()
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
                                {successMessage ? <p>Category created successfully!</p> : failMessage ? <p>Something wrong...</p> : null}
                                <input placeholder="Enter category name"  name="name" value={values.name} onChange={handleChange}/>
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