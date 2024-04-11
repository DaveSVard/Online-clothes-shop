"use client"
import React, { useState } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { authProfileData, updateUserPictureData } from "@/lib/features/user/userSlice"
import "./../../styles/base/settings.scss"

export const ChangeUserPictureForm:React.FC = React.memo(():JSX.Element => {

    const dispatch = useAppDispatch()

    const [picture, setPicture] = useState<any>()
    const updatePicture = () => {
        let formData = new FormData()
        formData.append("file", picture[0])
        dispatch(updateUserPictureData(formData)).then(res => {
            if(res.payload) {
                dispatch(authProfileData(""))
            }
        })
    }

    return(
        <div className="settings__changeData">
            <div className="settings__changeData-form">
                <input type="file" onChange={(e:any)=> setPicture(e.target.files)}/>
                <button className="success-btn2" onClick={() => updatePicture()}>Save changes</button>
            </div>
        </div>
    )
})