"use client"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { authProfileData, selectUser } from "@/lib/features/user/userSlice"
import { useEffect, useState } from "react"
import { ChangeUserDataForm } from "../ChangeUserDataForm"
import "./../../styles/base/settings.scss"
import { ChangeUserPasswordForm } from "../ChangeUserPasswordForm"
import { ChangeUserPictureForm } from "../ChangeUserPictureForm"

export const Settings = () => {
    
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    
    const [seeChangeDataForm, setSeeChangeDataForm] = useState<boolean>(false)
    const [seeChangePasswordForm, setSeeChangePasswordForm] = useState<boolean>(false)
    const [seeChangePictureForm, setSeeChangePictureForm] = useState<boolean>(false)

    useEffect(() => {
        dispatch(authProfileData(""))
    }, [])

    const seeForm = (formName:string) => {
        if(formName == "changeData") {
            setSeeChangeDataForm(!seeChangeDataForm)
            setSeeChangePasswordForm(false)
            setSeeChangePictureForm(false)
        } else if (formName == "changePassword") {
            setSeeChangeDataForm(false)
            setSeeChangePasswordForm(!seeChangePasswordForm)
            setSeeChangePictureForm(false)
        } else {
            setSeeChangeDataForm(false)
            setSeeChangePasswordForm(false)
            setSeeChangePictureForm(!seeChangePictureForm)
        }
    }
    
    return(
        <div className="settings">
            <div className="container">
                <div className="settings__wrapper">
                    <div className="settings__info">
                    <img src={`http://localhost:3001/uploads/${user.pic_url}`} alt="userImg" />
                        <p><span className="accent">Name:</span> {user.name}</p>
                        <p><span className="accent">Username:</span> {user.username}</p>
                        <p><span className="accent">Email:</span> {user.email}</p>
                    </div>
                    <div className="settings__forms">
                        <div className="settings__forms-item">
                            <h2 className="text-xl font-semibold text-center text-white" onClick={() => seeForm("changeData")}>Change your name and username</h2>
                            {seeChangeDataForm && <ChangeUserDataForm/>}
                        </div>
                        <div className="settings__forms-item"> 
                            <h2 className="text-xl font-semibold text-center text-white" onClick={() => seeForm("changePassword")}>Change your password</h2>
                            {seeChangePasswordForm && <ChangeUserPasswordForm/>}
                        </div>
                        <div className="settings__forms-item">
                            <h2 className="text-xl font-semibold text-center text-white" onClick={() => seeForm("changePicture")}>Update you picture</h2>
                            {seeChangePictureForm && <ChangeUserPictureForm/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}