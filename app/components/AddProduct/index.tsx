"use client" 
import { Field, FieldArray, Formik, getIn } from "formik"
import { addProductSchema } from "@/app/schemas/schemas"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useEffect, useState } from "react"
import { getAllBrandsData, selectBrands } from "@/lib/features/brand/brandSlice"
import { getAllCatData, selectCategories } from "@/lib/features/category/categorySlice"
import { createProductData } from "@/lib/features/product/productSlice"
import "./../../styles/base/formPages.scss"


export const AddProductPage = () => {
    
    const dispatch = useAppDispatch()
    const brands = useAppSelector(selectBrands)
    const categories = useAppSelector(selectCategories)
    const [successMessage, setSuccessMessage] = useState<boolean>(false)
    const [failMessage, setFailMessage] = useState<boolean>(false)
    const [imagesInpErr, setImagesInpErr] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getAllBrandsData(""))
        dispatch(getAllCatData(""))
    }, [])

    const [imagesArr, setImagesArr] = useState<any>()

    return(
        <div className="formPage">
            <div className="container">
                <div className="formPage__wrapper">
                    <div className="info__title text-center">
                        <h1 className="text-xl font-semibold">Add Product</h1>
                    </div>
                    {successMessage ? 
                        <p className="successMessage">Brand created successfully!</p> : 
                    failMessage ? 
                        <p className="failMessage">Something wrong...</p> 
                    : null}
                    <Formik initialValues={{name: "", price: "", description: "", brand: "", category: "", sizes: [{size: "", count: ""}]}}
                        validationSchema={addProductSchema}
                        onSubmit={(values, { resetForm  }) => {
                            if(imagesArr) {
                                const formData = new FormData()
                                formData.append("name", values.name)
                                formData.append("price", values.price)
                                formData.append("description", values.description)
                                formData.append("brand", values.brand.toString())
                                formData.append("category", values.category.toString())
                                formData.append("sizes", JSON.stringify(values.sizes))
                                for(let e of imagesArr){
                                    formData.append("images", e)
                                }

                                dispatch(createProductData(formData)).then(res => {
                                    console.log(res);
                                    if(res.payload) {
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
                            } else if (imagesArr == undefined) {
                                setImagesInpErr(true)
                            }
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit} className="formPage__form">
                                <div>
                                    <input placeholder="Enter product name"  name="name" value={values.name} onChange={handleChange}/>
                                    {errors.name && touched.name ? <p className="error">{errors.name}</p> : <></>}
                                </div>
                                <div>
                                    <input placeholder="Enter product price"  name="price" value={values.price} onChange={handleChange}/>
                                    {errors.price && touched.price ? <p className="error">{errors.price}</p> : <></>}
                                </div>
                                <div className="col-span-2">
                                    <textarea placeholder="Enter product description"  name="description" value={values.description} onChange={handleChange}/>
                                    {errors.description && touched.description ? <p className="error">{errors.description}</p> : <></>}
                                </div>
                                <div>
                                    <select name="brand" value={values.brand} onChange={handleChange}>
                                        <option value="" hidden>Choose brand</option>
                                        {brands.map(brand => {
                                            return(
                                                <option value={brand.id} key={brand.id}>{brand.name}</option>
                                            )
                                        })}
                                    </select>
                                    {errors.brand && touched.brand ? <p className="error">{errors.brand}</p> : <></>}
                                </div>
                                <div>
                                    <select name="category" value={values.category} onChange={handleChange}>
                                        <option value="" hidden>Choose category</option>
                                        {categories.map(category => {
                                            return(
                                                <option value={category.id} key={category.id}>{category.name}</option>
                                            )
                                        })}
                                    </select>
                                    {errors.category && touched.category ? <p className="error">{errors.category}</p> : <></>}
                                </div>
                                <FieldArray
                                    name = "sizes"
                                    render={arrayHelpers  => {
                                        return(
                                            <div className="flex flex-col col-span-2 gap-1">
                                                {values.sizes && values.sizes.length > 0 ? (
                                                    values.sizes.map((elm, i) => {
                                                        return( 
                                                            <div key={i} className="grid my-grid gap-1.5">
                                                                <Field name={`sizes.${i}.size`}>
                                                                    {({
                                                                        field, 
                                                                        form: { touched, errors }, 
                                                                        meta,
                                                                    }:any) => (
                                                                        <div>
                                                                            <input placeholder="Enter product size" {...field} />
                                                                            {meta.touched && meta.error && (
                                                                            <div className="error">{meta.error}</div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                                <Field name={`sizes.${i}.count`}>
                                                                    {({
                                                                        field, 
                                                                        form: { touched, errors }, 
                                                                        meta,
                                                                    }:any) => (
                                                                        <div>
                                                                            <input placeholder="Enter product size" {...field} />
                                                                            {meta.touched && meta.error && (
                                                                            <div className="error">{meta.error}</div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                                <button className="minus-btn" type="button" onClick={() => arrayHelpers.remove(i)}>-</button>
                                                            </div>
                                                        )
                                                    })
                                                    ) : null}
                                                <button className="plus-btn" type="button" onClick={() =>{
                                                    arrayHelpers.push({size: '', count: ""})
                                                }}> + </button>
                                            </div>
                                        )
                                    }}
                                />
                                <div className="col-span-2">
                                    <input placeholder="Enter product picture" type="file" multiple onChange={(e) => setImagesArr(e.target.files)}/>
                                    {imagesInpErr && <p className="error">Select images for product</p>}
                                </div>

                                <button type="submit" className="success-btn col-span-2">Create!</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}