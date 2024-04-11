import { getSingleProductData, updateProductSizeData } from "@/lib/features/product/productSlice";
import { useAppDispatch } from "@/lib/hooks";
import { sizeProductSchema } from "@/app/schemas/schemas";
import { Formik } from "formik";
import React from "react";

interface PropTypes {
    sizeId:number;
    productId:number;
    setForm:Function;
}

export const SizeUpdateForm:React.FC<PropTypes> = React.memo(({sizeId, productId,setForm}):JSX.Element => {

    const dispatch = useAppDispatch()

    return(
        <Formik initialValues={{sizes:{size: "", count: ""}}}
            validationSchema={sizeProductSchema}
            onSubmit={(values, { resetForm  }) => {
                dispatch(updateProductSizeData({id: sizeId, sizes: {size: values.sizes.size, count: +values.sizes.count}})).then(res => {
                    if (res.payload) {
                        dispatch(getSingleProductData(productId))
                        setForm(false)
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
                <form onSubmit={handleSubmit} className="formPage__size-form">
                    <div className="formPage__size-inps">
                        <div>
                            <input placeholder="Enter product size"  name="sizes.size" value={values.sizes.size} onChange={handleChange}/>
                            {errors.sizes?.size && touched.sizes?.size ? <p className="error">{errors.sizes?.size}</p> : <></>}
                        </div>
                        <div>
                            <input placeholder="Enter product count"  name="sizes.count" value={values.sizes.count} onChange={handleChange}/>
                            {errors.sizes?.count && touched.sizes?.count ? <p className="error">{errors.sizes?.count}</p> : <></>}
                        </div>
                    </div>
                    <button type="submit" className="success-btn">Create!</button>
                </form>
            )}
        </Formik>
    )
})