import { addProductSizeData, getSingleProductData } from "@/lib/features/product/productSlice";
import { useAppDispatch } from "@/lib/hooks";
import { sizeProductSchema } from "@/app/schemas/schemas";
import { Formik } from "formik";
import React from "react";

interface PropTypes {
    productId:number;
}

export const AddProudctSizeForm:React.FC<PropTypes> = React.memo(({productId}):JSX.Element => {

    const dispatch = useAppDispatch()

    return(
        <Formik initialValues={{sizes:{size: "", count: ""}}}
            validationSchema={sizeProductSchema}
            onSubmit={(values, { resetForm  }) => {
                dispatch(addProductSizeData({id: productId, sizes: {size: values.sizes.size, count: +values.sizes.count}})).then(res => {
                    if (res.payload) dispatch(getSingleProductData(productId))
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
                <form onSubmit={handleSubmit} className="formPage__form">
                    <input placeholder="Enter product size"  name="sizes.size" value={values.sizes.size} onChange={handleChange}/>
                    {errors.sizes?.size && touched.sizes?.size ? <p className="error">{errors.sizes?.size}</p> : <></>}
                    <input placeholder="Enter product count"  name="sizes.count" value={values.sizes.count} onChange={handleChange}/>
                    {errors.sizes?.count && touched.sizes?.count ? <p className="error">{errors.sizes?.count}</p> : <></>}
                    <button type="submit" className="success-btn">Create!</button>
                </form>
            )}
        </Formik>
    )
})