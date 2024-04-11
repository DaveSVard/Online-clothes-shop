import { createAppSlice } from "@/lib/createAppSlice";
import { ICategory, IFilterProductPagination, IProduct } from "../../../type/type";
import { createCategoryAPI, deleteCategoryAPI, getAllCategoriesAPI, getSingleCategoryAPI, updateCategoryAPI } from "./categoryAPI";

const initialState:{categories:ICategory[], category:ICategory, categoryProducts:IProduct[]} = {
    categories: [],
    category: {} as ICategory,
    categoryProducts: []
}

export const categorySlice = createAppSlice({
    name: "category",
    initialState, 
    reducers: (create) => ({
        createCategoryData: create.asyncThunk (
            async(name:{name:string})=>{
                return await createCategoryAPI(name)
            }
        ),
        getAllCatData: create.asyncThunk (
            async()=>{
                return await getAllCategoriesAPI()
            },
            {
                fulfilled: (state, action) => {
                    state.categories = action.payload
                }
            }
        ),
        getSingleCategoryData: create.asyncThunk (
            async({id, filterObj}:{id:number, filterObj?:IFilterProductPagination})=>{
                return await getSingleCategoryAPI(`category/${id}?${filterObj?.limit ? "limit="+filterObj.limit+"&":""}${filterObj?.page || filterObj?.page == 0 ? "page="+filterObj.page+"&":""}`)
            },
            {
                fulfilled: (state, action) => {
                    state.category = action.payload.category
                    state.categoryProducts = action.payload.products
                }
            }
        ),
        updateCategoryData: create.asyncThunk (
            async({id, newName}:{id:number, newName:string})=>{
                return await updateCategoryAPI({id: id, newName: newName})
            },
        ),
        deleteCategoryData: create.asyncThunk (
            async(id:number)=>{
                return await deleteCategoryAPI(id)
            },
        ),
    }),
    
    selectors: {
        selectCategories: (app) => app.categories,
        selectCategory: (app) => app.category,
        selectCategoryProducts: (app) => app.categoryProducts,
    }
})

export const { createCategoryData, getAllCatData, getSingleCategoryData, updateCategoryData, deleteCategoryData} = categorySlice.actions;
export const { selectCategories, selectCategory, selectCategoryProducts } = categorySlice.selectors;