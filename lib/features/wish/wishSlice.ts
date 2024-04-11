import { createAppSlice } from "@/lib/createAppSlice";
import { IFilterProductPagination, IWish } from "@/type/type";
import { addProductToWishAPI, deleteWishAPI, getAllWishesAPI } from "./wishAPi";

const initialState:{wishList:IWish[]} = {
    wishList: [],
}

export const wishSlice = createAppSlice({
    name: "wish",
    initialState, 
    reducers: (create) => ({
        addProductToWishData: create.asyncThunk (
            async(productId:{productId:number})=>{
                return await addProductToWishAPI(productId)
            }
        ),
        getAllWishesData: create.asyncThunk (
            async(filterObj:IFilterProductPagination)=>{
                return await getAllWishesAPI(`/wishlist/getByUserId?${filterObj.limit ? "limit="+filterObj.limit+"&":""}${filterObj.page || filterObj.page == 0 ? "page="+filterObj.page+"&":""}`)
            },
            {
                fulfilled: (state, action) => {
                    if(action.payload.count) {
                        state.wishList = action.payload.wishlist
                    } else {
                        state.wishList = action.payload
                    }
                }
            }
        ),
        deleteWishData: create.asyncThunk (
            async(wishId:number)=>{
                return await deleteWishAPI(wishId)
            },
        ),
    }),
    
    selectors: {
        selectWishes: (app) => app.wishList,
    }
})

export const { addProductToWishData, getAllWishesData, deleteWishData } = wishSlice.actions;
export const { selectWishes } = wishSlice.selectors;