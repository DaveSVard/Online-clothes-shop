//AuthAPI
import Cookies from 'js-cookie'
import axios from "axios";
import { IChangeUserPassword, IRegisterUser } from '@/type/type';


export const authLoginAPI = async (userData: { username: string; password: string }) => {
    const { data } = await axios.post("http://localhost:3001/auth/login/", userData);
    Cookies.set('accessToken', data.access_token)
    Cookies.set('role', data.role)
    return data;
}


export const authRegisterAPI = async (userData:IRegisterUser) => {
    const { data } = await axios.post("http://localhost:3001/auth/register", userData)
    return data;
}

export const authProfileAPI = async () => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.get("http://localhost:3001/auth/profile", {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    })
    return data
}


// UserAPI

export const changeUserPasswordAPI = async (changedPassword:IChangeUserPassword) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.patch("http://localhost:3001/user/us/changepassword", changedPassword, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    })
    return data
}


export const updateUserInfoAPI = async (userData:{name:string, username:string}) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.patch("http://localhost:3001/user/us/updateData", userData, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    })
    return data
}


export const updateUserPictureAPI = async (file:any) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.patch("http://localhost:3001/user/updatePicUrl", file ,{
        headers: {
            'Authorization': `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
        }
    })
    return data
}


export const userVerifyAPI = async ({email, emailToken}:{email:string, emailToken:string}) => {
    const obj = {email:email, emailToken:emailToken}
    const { data } = await axios.post("http://localhost:3001/user/verify", obj)
    return data
}


export const forgotPasswordAPI = async (email:string) => {
    const { data } = await axios.patch("http://localhost:3001/user/us/forgotPassword", {email})
    return data
}


export const resetPasswordAPI = async ({email, code, password, confirm_password}:{email:string, code:number, password:string, confirm_password:string}) => {
    const obj = {code:code, password:password, confirm_password:confirm_password}
    const { data } = await axios.patch(`http://localhost:3001/user/us/resetPassword/${email}` , obj)
    return data
}