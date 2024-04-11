import { createAppSlice } from "@/lib/createAppSlice";
import { IBrand, IFilterProductPagination, IProduct } from "../../../type/type";
import { createBrandAPI, deleteBrandAPI, getAllBrandsAPI, getSingleBrandAPI, updateBrandAPI } from "./brandAPI";

const initialState:{brands:IBrand[], brand:IBrand, brandProducts:IProduct[]} = {
    brands: [],
    brand: {} as IBrand,
    brandProducts: []
}

export const brandSlice = createAppSlice({
    name: "brand",
    initialState, 
    reducers: (create) => ({
        createBrandData: create.asyncThunk (
            async(name:{name:string})=>{
                return await createBrandAPI(name)
            }
        ),
        getAllBrandsData: create.asyncThunk (
            async()=>{
                return await getAllBrandsAPI()
            },
            {
                fulfilled: (state, action) => {
                    state.brands = action.payload
                }
            }
        ),
        getSingleBrandData: create.asyncThunk (
            async({id, filterObj}:{id:number, filterObj?:IFilterProductPagination})=>{
                return await getSingleBrandAPI(`brand/${id}?${filterObj?.limit ? "limit="+filterObj.limit+"&":""}${filterObj?.page || filterObj?.page == 0 ? "page="+filterObj.page+"&":""}`)
            },
            {
                fulfilled: (state:any, action) => {
                    state.brand = action.payload.brand
                    state.brandProducts = action.payload.products
                }
            }
        ),
        updateBrandData: create.asyncThunk (
            async({id, newName}:{id:number, newName:string})=>{
                return await updateBrandAPI({id: id, newName: newName})
            },
        ),
        deleteBrandData: create.asyncThunk (
            async(id:number)=>{
                return await deleteBrandAPI(id)
            },
        ),
    }),

    selectors: {
        selectBrands: (app) => app.brands,
        selectBrand: (app) => app.brand,
        selectBrandProducts: (app) => app.brandProducts,
    }
})

export const { createBrandData, getAllBrandsData, getSingleBrandData, updateBrandData, deleteBrandData } = brandSlice.actions;
export const { selectBrands, selectBrand, selectBrandProducts } = brandSlice.selectors;