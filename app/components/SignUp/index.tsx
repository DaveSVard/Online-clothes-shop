"use client"
import { singUpSchema } from "@/app/schemas/schemas";
import { Formik } from "formik";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authRegisterData } from "@/lib/features/user/userSlice";
import "./../../styles/base/formPages.scss"
import "./signUp.scss"

export const SignUpPage = () => {

    const disptach = useAppDispatch()
    const router = useRouter()
    const [message, setMessage] = useState<string>()

    return(


        <div className="register">
            <div className="form__wrapper">
                <Formik initialValues={{name: "", username: "", email: "", password: "", phone_number: ""}}
                    validationSchema={singUpSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        disptach(authRegisterData({...values})).then(res => {
                            setMessage(res.payload.message)
                            setTimeout(() => {
                                router.push("/signIn")
                            }, 2000)
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
                        <form onSubmit={handleSubmit} className="register__form">
                            <h1 className="text-white">Register</h1>
                            <h2 className="successMessage text-center">{message}</h2>
                            {message && <p className="successMessage text-center">Please... check your email!</p>}
                            <input placeholder="Enter your name"  name="name" value={values.name} onChange={handleChange}/>
                            {errors.name && touched.name ? <p className="error">{errors.name}</p> : <></>}
                            <input placeholder="Enter username" name="username" value={values.username} onChange={handleChange}/>
                            {errors.username && touched.username ? <p className="error">{errors.username}</p> : <></>}
                            <input placeholder="Enter your email" name="email" value={values.email} onChange={handleChange}/>
                            {errors.email && touched.email ? <p className="error">{errors.email}</p> : <></>}
                            <input placeholder="Enter password" name="password" value={values.password} onChange={handleChange} />
                            {errors.password && touched.password ? <p className="error">{errors.password}</p> : <></>}
                            <input placeholder="Enter phone number" name="phone_number" value={values.phone_number} onChange={handleChange} />
                            {errors.phone_number && touched.phone_number ? <p className="error">{errors.phone_number}</p> : <></>}
                            <button type="submit" className="auth-btn">Create account!</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}