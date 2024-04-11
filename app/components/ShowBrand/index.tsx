"use client"
import { useEffect } from "react";
import { getAllBrandsData, selectBrands } from "@/lib/features/brand/brandSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./../../styles/base/infoTable.scss"
import Link from "next/link";

export const ShowBrandPage = () => {
    const dispatch = useAppDispatch();
    const brands = useAppSelector(selectBrands)

    useEffect(() => {
        dispatch(getAllBrandsData(""));
    }, [])

    return (    
        <div className="info">
            <div className="container">
                <div className="info__wrapper  flex flex-col items-center justify-center gap-y-2">
                    <div className="info__title text-center">
                        <h1 className="text-xl font-semibold">All Brands</h1>
                    </div>

                    <table className="info__table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.map((brand, i) => {
                                return(
                                    <tr key={brand.id}>
                                        <td className="sm-td">{`${++i})`}</td>
                                        <td>{brand.name}</td>
                                        <td className="sm-td">
                                            <Link href={"/adminPage/brands/seeSingleBrand/" + brand.id}>
                                                <FontAwesomeIcon icon = {faEye} style={{color: "black"}}></FontAwesomeIcon>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

