"use client";
import React, { useState } from "react";
import { Formik } from "formik";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import Link from "next/link";
import { forgotPasswordSchema } from "@/app/schemas/schemas";
import { resetPasswordData } from "@/lib/features/user/userSlice";
import "./../../styles/base/formPages.scss";
import "./resetPasswordForm.scss"

export const ResetPasswordForm: React.FC = React.memo((): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [failMessage, setFailMessage] = useState<boolean>(false);

  return (
    <div className="reset">
      <div className="form__wrapper">
        {successMessage ? (
          <div className="center">
            <h2 className="successMessage">You successfully reset password!</h2>
            <Link className="successMessage" href={"/"}>
              Back to logIn!
            </Link>
          </div>
        ) : failMessage ? (
          <h2 className="failMessage text-center">Something wrong...</h2>
        ) : null}
        <Formik
          initialValues={{ code: "", password: "", confirm_password: "" }}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (id) {
              const email = id.toString();
              dispatch(
                resetPasswordData({
                  email: email,
                  code: +values.code,
                  password: values.password,
                  confirm_password: values.confirm_password,
                })
              )
                .unwrap()
                .then((res) => {
                  setSuccessMessage(true);
                  setSubmitting(false);
                })
                .catch(() => {
                  setFailMessage(true);
                });
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form className="reset__form" onSubmit={handleSubmit}>
              <h1 className="text-white">Reset Password</h1>
                <input
                  pattern="/^\d+$/"
                  type="number"
                  placeholder="Enter code!"
                  name="code"
                  value={values.code}
                  onChange={handleChange}
                />
                {errors.code && touched.code ? (
                  <p className="error">{errors.code}</p>
                ) : (
                  <></>
                )}
                <input
                  placeholder="Enter your new password!"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password ? (
                  <p className="error">{errors.password}</p>
                ) : (
                  <></>
                )}
                <input
                  placeholder="Repeat password!"
                  name="confirm_password"
                  value={values.confirm_password}
                  onChange={handleChange}
                />
                {errors.confirm_password && touched.confirm_password ? (
                  <p className="error">{errors.confirm_password}</p>
                ) : (
                  <></>
                )}
              <button type="submit" className="auth-btn">
                Send!
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
});
