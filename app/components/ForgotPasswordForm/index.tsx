"use client"
import React from "react";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { sendEmailSchema } from "@/app/schemas/schemas";
import { forgotPasswordData } from "@/lib/features/user/userSlice";
import "./../../styles/base/formPages.scss"
import "./forgotPassword.scss"


export const ForgotPasswordForm:React.FC = React.memo(():JSX.Element => {

    const router = useRouter()
    const dispatch = useAppDispatch()

    return(
        <div className="forgot">
            <div className="form__wrapper">
                <Formik initialValues={{email: ""}}
                    validationSchema={sendEmailSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(forgotPasswordData(values.email)).then(res => {
                            if(res.payload) {
                                router.push(`/resetPassword/${values.email}`)
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
                        <form className = "forgot__form" onSubmit={handleSubmit}>
                            <h1 className="text-white">Send Email</h1>
                            <input placeholder="Enter your email!" name="email" value={values.email} onChange={handleChange}/>
                            {errors.email && touched.email ? <p className="error">{errors.email}</p> : <></>}
                            <button type="submit" className="auth-btn">Send!</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
})