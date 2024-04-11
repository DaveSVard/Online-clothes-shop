"use client";
import { getAllCatData, selectCategories } from "@/lib/features/category/categorySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import "./../../styles/base/infoTable.scss"

export const ShowCategoryPage = () => {
    
    const categories = useAppSelector(selectCategories)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllCatData(""))
    }, [])

    console.log(categories);
    

    return (
        <div className="info">
            <div className="container">
                <div className="info__wrapper flex flex-col items-center justify-center gap-y-2">
                    <div className="info__title text-center">
                        <h1 className="text-xl font-semibold">All Categories</h1>
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
                            {categories.map((category, i) => {
                                return(
                                    <tr key={category.id}>
                                        <td className="sm-td">{`${++i})`}</td>
                                        <td >{category.name}</td>
                                        <td className="sm-td">
                                            <Link href={"/adminPage/categories/seeSingleCategory/" + category.id}>
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