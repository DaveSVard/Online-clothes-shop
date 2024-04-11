import { createAppSlice } from "@/lib/createAppSlice";
import { IFilterProductPagination, IOrder } from "@/type/type";
import { getOrderListAPI } from "./orderAPI";

const initialState:{orderList:IOrder[]}= {
    orderList: [],
}

export const orderSlice = createAppSlice({
    name: "order",
    initialState, 
    reducers: (create) => ({
        getOrderListData: create.asyncThunk (
            async(filterObj:IFilterProductPagination)=>{
                return await getOrderListAPI(`order/getByUserId?${filterObj.limit ? "limit="+filterObj.limit+"&":""}${filterObj.page || filterObj.page == 0 ? "page="+filterObj.page+"&":""}`)
            },
            {
                fulfilled: (state, action) => {
                    if(action.payload.count) {
                        state.orderList = action.payload.order
                    } else {
                        state.orderList = action.payload
                    }
                }
            }
        ),
    }),
    
    selectors: {
        selectOrderList: (app) => app.orderList,
    }
})

export const { getOrderListData } = orderSlice.actions;
export const { selectOrderList } = orderSlice.selectors;