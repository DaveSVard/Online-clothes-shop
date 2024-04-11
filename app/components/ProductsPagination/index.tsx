"use client"
import React from "react"
import _ from "lodash"
import "./productsPagination.scss"
import Cookies from "js-cookie";

interface PropTypes {
    totalPage:number;
    page:number;
    limit:number;
    onPageChange:Function;
}

export const ProductsPagination:React.FC<PropTypes> = ({totalPage, page, limit, onPageChange}) => {
    let array = returnPagintaionRange({totalPage: totalPage, page: page, limit: limit, siblings: 1})
    const role:any = Cookies.get("role")
    const borderStyle = {
        border: "1px solid black"
    }
    const textStyle = {
        color: "black"
    }
    
    return(
        <ul className="pagination pagination-md justify-content-end">
            <li className="page-item first" style={role == 1 ? borderStyle : {}} onClick={() => onPageChange("&laquo;")}>
                <span className="page-link" style={role == 1 ? textStyle : {}}>&laquo;</span>
            </li>
            <li className="page-item"  style={role == 1 ? borderStyle : {}} onClick={() => onPageChange("&lsaquo;")}>
                <span className="page-link" style={role == 1 ? textStyle : {}}>&lsaquo;</span>
            </li>
            {array.map((elm:number, i:number) => {
                if(elm == page) {
                    return (
                        <li key={i} className="page-item pagintaionActive"  style={role == 1 ? borderStyle : {}} onClick={() => onPageChange(elm)}>
                            <span  className="page-link" style={role == 1 ? textStyle : {}}>{elm}</span>
                        </li>
                    )
                } else {
                    return (
                        <li key={i} className="page-item"  style={role == 1 ? borderStyle : {}} onClick={() => onPageChange(elm)}>
                            <span className="page-link" style={role == 1 ? textStyle : {}}>{elm}</span>
                        </li>
                    )
                }
            })} 
            <li className="page-item"  style={role == 1 ? borderStyle : {}} onClick={() => onPageChange("&rsaquo;")}>
                <span className="page-link" style={role == 1 ? textStyle : {}}>&rsaquo;</span>
            </li>
            <li className="page-item last"  style={role == 1 ? borderStyle : {}} onClick={() => onPageChange("&raquo;")}>
                <span className="page-link" style={role == 1 ? textStyle : {}}>&raquo;</span>
            </li>
        </ul>
    )
}   


export const returnPagintaionRange = ({totalPage, page, limit, siblings}:any) => {
    let totalPageInArray = 7 + siblings
    if(totalPageInArray >= totalPage) {
        return _.range(1, totalPage + 1)
    }

    let leftSiblingsIndex = Math.max(page - siblings, 1)
    let rightSiblingsIndex = Math.min(page + siblings, totalPage)
    
    let showLeftDots = leftSiblingsIndex > 2
    let showRightDots = rightSiblingsIndex < totalPage - 2

    if (!showLeftDots && showRightDots) {
        let leftItemsCount = 3 + 2 * siblings
        let leftRange = _.range(1, leftItemsCount + 1)
        return [...leftRange, " ...", totalPage]
    } else if (showLeftDots && !showRightDots) {
        let rightItemsCount = 3 + 2 * siblings
        let rightRange = _.range(totalPage - rightItemsCount + 1, totalPage + 1)
        return [1, "... ", ...rightRange]
    } else {
        let middleRange = _.range(leftSiblingsIndex , rightSiblingsIndex + 1);
        return [1, "... ", ...middleRange, " ...", totalPage]
    }
}