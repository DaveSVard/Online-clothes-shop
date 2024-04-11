"use client"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { Header } from "../Header"
import { useCallback, useEffect, useState } from "react"
import { ProductFilter } from "../ProductFilter"
import { ProductsPagination } from "../ProductsPagination"
import { filterProductData, selectProducts } from "@/lib/features/product/productSlice"
import { ProductCard } from "../ProductCard"
import { getAllWishesData, selectWishes } from "@/lib/features/wish/wishSlice"
import { getAllBrandsData, selectBrands } from "@/lib/features/brand/brandSlice"
import { getAllCatData, selectCategories } from "@/lib/features/category/categorySlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import "./homePage.scss"

export const HomePage = () => {

    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())
    const pathname = usePathname()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const products = useAppSelector(selectProducts)
    const brands = useAppSelector(selectBrands)
    const categories = useAppSelector(selectCategories)
    
    const brandName = searchParams.get("brandName")
    const categoryName = searchParams.get("categorName")
    const size = searchParams.get("size")
    const min_price = searchParams.get("min_price")
    const max_price = searchParams.get("max_price")

    const [seeBrands, setSeeBrands] = useState<boolean>(false)
    const [seeCategories, setSeeCategories] = useState<boolean>(false)

    const [page, setPage] = useState<any>(searchParams.get("page") || 1)
    const [limit, setLimit] = useState<number>(9)
    const [totalPage, setTotalPage] = useState<number>(0)
    const wishlist = useAppSelector(selectWishes)

    useEffect(() => {
        dispatch(getAllWishesData({}))
        dispatch(getAllBrandsData(""))
        dispatch(getAllCatData(""))
    }, [])

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

    return(
        <div className="homePage">
            <div className="homePage__wrapper">
                <Header/>
                <div className="homePage__shop-content">
                    <div className="container">
                        <div className="homePage__shop-wrapper">
                            <div className="shop__filter">
                                <ProductFilter limit={limit} setTotalPage={setTotalPage} page={page} createQueryString={createQueryString} setPage={setPage}/>
                                <div className="shop__toSinglePages">
                                    <div className="shop__toSinglePages-title" onClick={() => setSeeBrands(!seeBrands)}>
                                        <h2>See about brands</h2>
                                    </div>
                                    {seeBrands && <div className="shop__toSinglePages-items">
                                        {brands.map(brand => {
                                            return(
                                                <Link href={`/userPage/singleBrandPage/${brand.id}`} key={brand.id} className="shop__toSinglePages-item">
                                                    <p>{brand.name}</p>
                                                    <FontAwesomeIcon icon={faEye}/>
                                                </Link>
                                            )
                                        })}
                                    </div>}
                                </div>
                                <div className="shop__toSinglePages">
                                    <div className="shop__toSinglePages-title" onClick={() => setSeeCategories(!seeCategories)}>
                                        <h2>See about categories</h2>
                                    </div>
                                    {seeCategories && <div className="shop__toSinglePages-items">
                                        {categories.map(category => {
                                            return(
                                                <Link href={`/userPage/singleCategoryPage/${category.id}`} key={category.id} className="shop__toSinglePages-item"> 
                                                    <p>{category.name}</p>
                                                    <FontAwesomeIcon icon={faEye}/>
                                                </Link>
                                            )
                                        })}
                                    </div>}
                                </div>
                            </div>   
                            <div className="shop__pagination">
                                <div className="shop__products">
                                    {products.map(product => {
                                        return(
                                            <div key={product.id} className="shop__products-item">
                                                <ProductCard product={product} wishlist = {wishlist}/>
                                            </div>
                                        )
                                    })}
                                </div>
                                <ProductsPagination totalPage={totalPage} page={page} limit={limit} onPageChange={handlePageChange}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}