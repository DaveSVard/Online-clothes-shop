import { getAllBrandsData, selectBrands } from "@/lib/features/brand/brandSlice";
import { getAllCatData, selectCategories } from "@/lib/features/category/categorySlice";
import { getSingleProductData, updateProductData } from "@/lib/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateProductSchema } from "@/app/schemas/schemas";
import { Field, FieldArray, Formik } from "formik"
import React, { useEffect } from "react"

interface PropTypes {
    productId:number;
    setSuccessMessage:Function;
    setFailMessage:Function;
    successMessage:boolean;
    failMessage:boolean;
}

export const ProductUpdateForm:React.FC<PropTypes> = ({productId,setSuccessMessage,setFailMessage,successMessage,failMessage}):JSX.Element => {

    const dispatch = useAppDispatch()
    const brands = useAppSelector(selectBrands)
    const categories = useAppSelector(selectCategories)

    useEffect(() => {
        dispatch(getAllBrandsData(""))
        dispatch(getAllCatData(""))
    }, [])

    return(
        <Formik initialValues={{name: "", price: "", description: "", brand: "", category: "", sizes: [{size: "", count: ""}]}}
            validationSchema={updateProductSchema}
            onSubmit={(values, { resetForm  }) => {
                dispatch(updateProductData({productObj: values, id: productId})).then(res => {
                    if(res.payload) {
                        dispatch(getSingleProductData(productId))
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
                <div className="productUpdate__form-wrapper">
                    <h2 className="text-center text-lg font-medium">Update form</h2>
                    {successMessage ? 
                            <p className="successMessage">Product updated successfully!</p> : 
                        failMessage ? 
                            <p className="failMessage">Something wrong...</p> 
                    : null}
                    <form onSubmit={handleSubmit} className="formPage__form">
                        <div>
                            <input placeholder="Enter new name"  name="name" value={values.name} onChange={handleChange}/>
                            {errors.name && touched.name ? <p className="error">{errors.name}</p> : <></>}
                        </div>
                        <div>
                            <input placeholder="Enter new price"  name="price" value={values.price} onChange={handleChange}/>
                            {errors.price && touched.price ? <p className="error">{errors.price}</p> : <></>}
                        </div>
                        <div className="col-span-2">
                            <textarea placeholder="Enter new description"  name="description" value={values.description} onChange={handleChange}/>
                            {errors.description && touched.description ? <p className="error">{errors.description}</p> : <></>}
                        </div>
                        <div>
                            <select name="brand" value={values.brand} onChange={handleChange}>
                                <option value="" hidden>Choose new brand</option>
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
                                <option value="" hidden>Choose new category</option>
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
                                            values.sizes?.map((elm, i) => {
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
                                                                    <input placeholder="Enter new count" {...field} />
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
                        <button type="submit" className="success-btn col-span-2">Update!</button>
                    </form>
                </div>
            )}
        </Formik>
    )
}