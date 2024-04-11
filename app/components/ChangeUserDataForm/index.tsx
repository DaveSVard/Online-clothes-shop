"use client"
import React from "react"
import { Formik } from "formik"
import { useAppDispatch } from "@/lib/hooks"
import { authProfileData, updateUserInfoData } from "@/lib/features/user/userSlice"
import { changeUserDataSchema } from "@/app/schemas/schemas"
import "./../../styles/base/settings.scss"

export const ChangeUserDataForm:React.FC = React.memo(():JSX.Element => {

    const dispatch = useAppDispatch()

    return(
        <div className="settings__changeData">
            <Formik initialValues={{name: "", username: ""}}
                validationSchema={changeUserDataSchema}
                onSubmit={(values, { }) => {
                    dispatch(updateUserInfoData({name: values.name, username: values.username})).then(res => {
                        dispatch(authProfileData(""))
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
                    <form onSubmit={handleSubmit} className="settings__changeData-form">
                        <input placeholder="Enter new name" name="name" value={values.name} onChange={handleChange}/>
                        {errors.name && touched.name ? <p className="error">{errors.name}</p> : <></>}
                        <input placeholder="Enter new username" name="username" value={values.username} onChange={handleChange}/>
                        {errors.username && touched.username ? <p className="error">{errors.username}</p> : <></>}
                        <button type="submit" className="success-btn2">Save changes</button>
                    </form>
                )}
            </Formik>
        </div>
    )
})
