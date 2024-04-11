import { createAppSlice } from "@/lib/createAppSlice";
import { IUser } from "../../../type/type";
import { authLoginAPI, authProfileAPI, authRegisterAPI, changeUserPasswordAPI, forgotPasswordAPI, resetPasswordAPI, updateUserInfoAPI, updateUserPictureAPI, userVerifyAPI } from "./userAPI";
import Cookies from "js-cookie";

const initialState:{users:IUser[], user:IUser} = {
    users: [],
    user: {} as IUser,
} 

export const userSlice = createAppSlice({
    name: "user",
    initialState, 
    reducers: (create) => ({
        authLoginData: create.asyncThunk (
            async(userData: { username: string; password: string })=>{
                return await authLoginAPI(userData)
            },

        ),
        authLogoutData: create.asyncThunk (
            async () => {
                Cookies.remove('accessToken')
                Cookies.remove('role')
            },
 
        ),
        authRegisterData: create.asyncThunk (
            async(userData:{name: string, username: string, email: string, password: string, phone_number: string})=>{
                return await authRegisterAPI(userData)
            },
        ),
        authProfileData: create.asyncThunk (
            async()=>{
                return await authProfileAPI()
            },
            {
                fulfilled: (state:any, action) => {
                    state.user = action.payload
                    state.accessToken = Cookies.get('accessToken')
                }
            }
        ),

        changeUserPasswordData: create.asyncThunk (
            async(changedPassword:{currentPassword: string, password: string, confirmationPassword: string})=>{
                return await changeUserPasswordAPI(changedPassword)
            },
        ),
        updateUserInfoData: create.asyncThunk (
            async(userData:{name:string, username:string})=>{
                return await updateUserInfoAPI(userData)
            },
        ),
        updateUserPictureData: create.asyncThunk (
            async(file:any)=>{
                return await updateUserPictureAPI(file)
            },
        ),
        userVerifyData: create.asyncThunk (
            async({email, emailToken}:{email:string, emailToken:string})=>{
                return await userVerifyAPI({email, emailToken})
            },
        ),
        forgotPasswordData: create.asyncThunk (
            async(email:string)=>{
                return await forgotPasswordAPI(email)
            },
        ),
        resetPasswordData: create.asyncThunk (
            async({email, code, password, confirm_password}:{email:string, code:number, password:string, confirm_password:string})=>{
                return await resetPasswordAPI({email, code, password, confirm_password})
            },
        ),
    }),



    selectors: {
        selectUsers: (app) => app.users,
        selectUser: (app) => app.user,
    }
})

export const { 
    authLoginData, 
    authRegisterData, 
    authProfileData, 
    userVerifyData, 
    changeUserPasswordData, 
    updateUserInfoData, 
    updateUserPictureData, 
    forgotPasswordData, 
    resetPasswordData,
    authLogoutData
} = userSlice.actions;
export const { selectUsers, selectUser } = userSlice.selectors;