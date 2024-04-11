import { createAppSlice } from "@/lib/createAppSlice";
import { IAddProductToCart, ICart } from "@/type/type";
import { addProductToCartAPI, deleteCartAPI, getCartListAPI, stripeCancelAPI, stripeCheckoutSessionAPI, stripeSuccessAPI, updateCartAPI } from "./cartAPI";
import { start } from "repl";

const initialState:{cartList:ICart[], arr:any}= {
    cartList: [],
    arr:[]
}

export const cartSlice = createAppSlice({
    name: "cart",
    initialState, 
    reducers: (create) => ({
        addProductToCartData: create.asyncThunk (
            async(obj:IAddProductToCart)=>{
                return await addProductToCartAPI(obj)
            }
        ),
        getCartListData: create.asyncThunk (
            async()=>{
                return await getCartListAPI()
            },
            {
                fulfilled: (state, action) => {
                    state.cartList = action.payload
                }
            }
        ),
        updateCartData: create.asyncThunk (
            async({cartId, quantity}:{cartId:number, quantity:number})=>{
                return await updateCartAPI({cartId, quantity})
            },
        ),
        deleteCartData: create.asyncThunk (
            async(cartId:number)=>{
                return await deleteCartAPI(cartId)
            },
        ),
        stripeCheckoutSessionData: create.asyncThunk (
            async(carts:number[])=>{
                return await stripeCheckoutSessionAPI(carts)
            },{
                fulfilled:(start, action)=>{
                    start.arr=action.payload
                }
            }
        ),
        stripeSuccessData: create.asyncThunk (
            async()=>{
                return await stripeSuccessAPI()
            },
        ),
        stripeCancelData: create.asyncThunk (
            async()=>{
                return await stripeCancelAPI()
            },
        ),
    }),
    
    selectors: {
        selectCartList: (app) => app.cartList,
        selectArr: (app) => app.arr,
    }
})

export const { addProductToCartData, getCartListData, updateCartData, deleteCartData, stripeCheckoutSessionData, stripeSuccessData, stripeCancelData } = cartSlice.actions;
export const { selectCartList , selectArr} = cartSlice.selectors;