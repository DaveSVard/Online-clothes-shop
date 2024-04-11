"use client"
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllCatData, selectCategories } from "@/lib/features/category/categorySlice";
import { getAllBrandsData, selectBrands } from "@/lib/features/brand/brandSlice";
import { Formik } from "formik";
import { filterProductData } from "@/lib/features/product/productSlice";
import { usePathname, useRouter } from "next/navigation";
import "./productFilter.scss"

interface PropTypes {
    page:number;
    limit:number;
    setTotalPage:Function;
    createQueryString:Function;
    setPage:Function;
}

export const ProductFilter:React.FC<PropTypes> = React.memo(({page, limit, setTotalPage, createQueryString, setPage}):JSX.Element => {
    
    const pathname = usePathname()
    const router = useRouter()
    
    const dispatch = useAppDispatch()
    const brands = useAppSelector(selectBrands)
    const categories = useAppSelector(selectCategories)
    const [seeFilterForm, setSeeFilterForm] = useState<boolean>(false)
    
    useEffect(() => {
        dispatch(getAllBrandsData(""))
        dispatch(getAllCatData(""))
    }, [])
    
    return(
        <div className="filter">
            <div className="filter__wrapper">
                <div className="filter__top" onClick={() => setSeeFilterForm(!seeFilterForm)}>
                    <p>Filter...</p>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>

                {seeFilterForm && <div className="filter__tools">
                    <Formik initialValues={{categoryName: "", brandName: "", min_price: "", max_price: "", size: ""}}
                        onSubmit={(values, { resetForm  }) => {
                            async function l () {
                                await setPage(1)
                                await router.push(pathname + "?" + createQueryString({...values, min_price: +values.min_price, max_price: +values.max_price, pageNumber: 1}))
                                await dispatch(filterProductData({...values, min_price: +values.min_price, max_price: +values.max_price, size: values.size, page: 0, limit: limit})).then(res => {
                                    // console.log("ners");
                                    if(res.payload) {
                                        const calculatedTotalPage = Math.ceil(res.payload.count / limit);
                                        setTotalPage(calculatedTotalPage);
                                    }
                                })
                            }
                            l()
                        }}
                    > 
                        {({
                            values,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form className={pathname == "/" ? "filter__range lite-filterForm" : "filter__range"} onSubmit={handleSubmit}>
                                <select name="categoryName" value={values.categoryName} onChange={handleChange}>
                                    <option value="" hidden>Filter by category</option>
                                    {categories.map(category => {
                                        return(
                                            <option key={category.id} value={category.name}>{category.name}</option>
                                        )
                                    })}
                                </select>
                                <select name="brandName" value={values.brandName} onChange={handleChange}>
                                    <option value="" hidden>Filter by brand</option>
                                    {brands.map(brand => {
                                        return(
                                            <option key={brand.id} value={brand.name}>{brand.name}</option>
                                        )
                                    })}
                                </select>
                                <input placeholder="Filter by size" value={values.size} name="size" onChange={handleChange} />
                                <div className="filter__range-wrapper">
                                    <div>
                                        <input type="text" placeholder="Enter min price" name="min_price" value={values.min_price} onChange={handleChange}/>
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Enter max price" name="max_price" value={values.max_price} onChange={handleChange}/>
                                    </div>
                                </div>
                                <button type="submit" className="success-btn">Find!</button>
                                <button type="button" className="success-btn" onClick={() => {
                                    dispatch(filterProductData({limit: limit, page: 0})).then(res => {
                                        if(res.payload) {
                                            const calculatedTotalPage = Math.ceil(res.payload.count / limit);
                                            setTotalPage(calculatedTotalPage);
                                            router.push(`${pathname}?$page=1`)
                                        }
                                    })
                                }}>See All!</button>
                            </form>
                        )}
                    </Formik>
                </div>}
            </div>
        </div>
    )
})