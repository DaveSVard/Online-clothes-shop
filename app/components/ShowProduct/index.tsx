"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useCallback, useEffect, useState } from "react"
import { filterProductData, selectProducts } from "@/lib/features/product/productSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { ProductFilter } from "../ProductFilter";
import { ProductsPagination } from "../ProductsPagination";
import "./../../styles/base/infoTable.scss"
import "./../../styles/base/singlePageForAdmin.scss"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ShowProductPage = () => {
    
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())
    const products = useAppSelector(selectProducts)
    const dispatch = useAppDispatch()

    const brandName = searchParams.get("brandName")
    const categoryName = searchParams.get("categorName")
    const size = searchParams.get("size")
    const min_price = searchParams.get("min_price")
    const max_price = searchParams.get("max_price")
    
    const [page, setPage] = useState<any>(searchParams.get("page") || 1)
    const [limit, setLimit] = useState<number>(9)
    const [totalPage, setTotalPage] = useState<number>(0)
    
    useEffect(() => {
        const hasFilters = brandName || categoryName || size || min_price || max_price;
        const filterData = {
            limit: limit,
            page: page,
            brandName: brandName ? brandName : "",
            categoryName: categoryName ? categoryName : "",
            size: size ? size : "",
            min_price: min_price ? min_price : 0,
            max_price: max_price ? max_price : 0
        };

        if (hasFilters) {
            router.push(pathname + "?" + createQueryString(filterData))
            dispatch(filterProductData({...filterData, page: page - 1})).then(res => {
                if (res.payload) {
                    const calculatedTotalPage = Math.ceil(res.payload.count / limit);
                    setTotalPage(calculatedTotalPage);
                }
            });
        } else {
            router.push(`${pathname}/?page=${page}`)
            dispatch(filterProductData({ limit: limit, page: page - 1})).then(res => {
                if (res.payload) {
                    const calculatedTotalPage = Math.ceil(res.payload.count / limit);
                    setTotalPage(calculatedTotalPage);
                }
            });
        }
    }, [page, limit, brandName, categoryName, size, min_price, max_price])

    const handlePageChange = (value: any) => {
        const hasFilters = brandName || categoryName || size || min_price || max_price;
    
        if (value == "&laquo;" || value == "... ") {
            setPage(1);
        } else if (value == "&lsaquo;") {
            if (page != 1) {
                setPage(page - 1);
                if (hasFilters) {
                    router.push(pathname + "?" + createQueryString({ ...params, pageNumber: page.toString() }));
                } else {
                    router.push(`${pathname}/?page=${page}`);
                }
            }
        } else if (value == "&rsaquo;") {
            if (page != totalPage) {
                setPage(page + 1);
                if (hasFilters) {
                    router.push(pathname + "?" + createQueryString({ ...params, pageNumber: page.toString() }));
                } else {
                    router.push(`${pathname}/?page=${page}`);
                }
            }
        } else if (value == "&raquo;" || value == " ...") {
            setPage(totalPage);
        } else {
            setPage(value);
            if (hasFilters) {
                router.push(pathname + "?" + createQueryString({ ...params, pageNumber: value }));
            } else {
                router.push(`${pathname}/?page=${value}`);
            }
        }
    };

    const createQueryString = useCallback(
        ({categoryName, brandName, min_price, max_price, size, pageNumber}:any) => {
            if (brandName?.length) params.set("brandName", brandName)
            if (categoryName?.length) params.set("categoryName", categoryName)
            if (size?.length) params.set("size", size)
            if (min_price) params.set("min_price", min_price.toString())
            if (max_price) params.set("max_price", max_price.toString())
            if (pageNumber) params.set("page", pageNumber.toString());
            
            return params.toString()
          
    }, [searchParams])


    return (
        <div className="info">
            <div className="container">
                <div className="info__wrapper flex flex-col items-center justify-center gap-y-2">
                    <div className="info__title text-center">
                        <h1 className="text-xl font-semibold">All Products</h1>
                    </div>

                    <div className="info__product-wrapper">

                        <div className="info__product-filter">
                            <ProductFilter page={page} limit={limit} setTotalPage={setTotalPage} createQueryString={createQueryString} setPage={setPage}/>
                        </div>

                        <div className="singlePage__info-content">
                            <table className="info__product-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.map((product, i) => {
                                        return(
                                            <tr key={product.id}>
                                                <td className="sm-td">{`${++i})`}</td>
                                                <td>{product.name}</td>
                                                <td>{product.description}</td>
                                                <td>{product.price}</td>
                                                <td className="sm-td">
                                                    <Link href={"/adminPage/products/seeSingleProduct/" + product.id}>
                                                        <FontAwesomeIcon  icon = {faEye} style={{color: "black"}}></FontAwesomeIcon>
                                                    </Link>
                                                </td>
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
    )
}