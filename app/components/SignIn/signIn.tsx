"use client"
import { singInSchema } from "@/app/schemas/schemas";
import { Formik } from "formik";
import React, { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { authLoginData, authProfileData } from "@/lib/features/user/userSlice";
import "./../../styles/base/formPages.scss"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";


export const SignInPage = () => {

    const [message, setMessage] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const router = useRouter()

    return(
        <div className="form">
            <div className="form__wrapper">
                <Formik initialValues={{username: "", password: ""}}
                    validationSchema={singInSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(authLoginData({...values})).then(res => {
                            console.log(res);
                            
                            if(res.payload) {
                                dispatch(authProfileData(""))
                                if (res.payload.role == 1) router.push("/adminPage")
                                if (res.payload.role == 0) router.push("/")
                            } else {
                                setMessage(true)
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
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-white">Login</h1>
                            {message ? <div className="center">
                                <h2 className="failMessage">Wrong username or password</h2>    
                            </div> : <></>}
                            <div className="input-box">
                                <input type="text" placeholder="Username" name="username" value={values.username} onChange={handleChange}/>
                                {errors.username && touched.username ? <p className="error">{errors.username}</p> : <></>}
                                <span><FontAwesomeIcon icon={faUser} /></span>
                            </div>
                            <div className="input-box">
                                <input type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange}/>
                                {errors.password && touched.password ? <p className="error">{errors.password}</p> : <></>}
                                <span><FontAwesomeIcon icon={faLock} /></span>
                            </div>

                            <div className="forgot-box">
                                <Link href={"/forgotPassword"}>Forgot password?</Link>
                            </div>

                            <button type="submit" className="auth-btn" >Login</button>

                            <div className="register-link">
                                <p>Don't have an account?
                                    <Link href={"/signUp"}> Register</Link>
                                </p>
                            </div>
                        </form>
                    )}
                </Formik>


                
            </div>
        </div>
    )
}