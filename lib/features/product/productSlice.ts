import { createAppSlice } from "@/lib/createAppSlice";
import { IAddOrUpdateSize, IFilterProduct, IProduct, IUpdateProduct } from "../../../type/type";
import { addProductImagesAPI, addProductSizeAPI, createProductAPI, deleteProductAPI, deleteProductImageAPI, deleteProductSizeAPI, filterProductsAPI, getAllProductsAPI, getSingleProductAPI, updateProductAPI, updateProductSizeAPI } from "./productAPI";

const initialState:{products:IProduct[], product:IProduct} = {
    products: [],
    product: {} as IProduct
}

export const productSlice = createAppSlice({
    name: "product",
    initialState, 
    reducers: (create) => ({
        getAllProductsData: create.asyncThunk (
            async()=>{
                return await getAllProductsAPI()
            },
            {
                fulfilled: (state, action) => {
                    state.products = action.payload
                }
            }
        ),
        getSingleProductData: create.asyncThunk (
            async(id:number)=>{
                return await getSingleProductAPI(id)
            },
            {
                fulfilled: (state, action) => {
                    state.product = action.payload
                }
            }
        ),
        deleteProductData: create.asyncThunk (
            async(id:number)=>{
                return await deleteProductAPI(id)
            },
        ),
        createProductData: create.asyncThunk (
            async(productObj:FormData)=>{
                return await createProductAPI(productObj)
            },
        ),
        updateProductData: create.asyncThunk (
            async({productObj, id}:{productObj:IUpdateProduct, id:number})=>{
                return await updateProductAPI({productObj, id})
            },
        ),
        addProductImagesData: create.asyncThunk (
            async(images:FormData)=>{
                return await addProductImagesAPI(images)
            },
        ),
        deleteProductImageData: create.asyncThunk (
            async(id:number)=>{
                return await deleteProductImageAPI(id)
            },
        ),
        addProductSizeData: create.asyncThunk (
            async({id, sizes}:IAddOrUpdateSize)=>{
                return await addProductSizeAPI({id:id, sizes: sizes})
            },
        ),
        updateProductSizeData: create.asyncThunk (
            async({id, sizes}:IAddOrUpdateSize)=>{
                return await updateProductSizeAPI({id:id, sizes: sizes})
            },
        ),
        deleteProductSizeData: create.asyncThunk (
            async(id:number)=>{
                return await deleteProductSizeAPI(id)
            },
        ),
        filterProductData: create.asyncThunk (
            async(filterObj:IFilterProduct)=>{
                return await filterProductsAPI(`/filter/by?${filterObj?.categoryName ? "categoryName="+filterObj?.categoryName+"&":""}${filterObj?.brandName ? "brandName="+filterObj?.brandName+"&":""}${filterObj?.min_price ? "min_price="+filterObj?.min_price+"&":""}${filterObj?.max_price ? "max_price="+filterObj?.max_price+"&":""}${filterObj?.size ? "size="+filterObj?.size+"&":""}${filterObj?.limit ? "limit="+filterObj?.limit+"&":""}${filterObj?.page || filterObj?.page == 0 ? "page="+filterObj?.page+"&":""}`)
            },
            {
                fulfilled: (state, action) => {
                    state.products = action.payload.rows
                }
            }
        ),
    }),
   
    selectors: {
        selectProducts: (app) => app.products,
        selectProduct: (app) => app.product,
    }
})

export const { 
    getAllProductsData,
    getSingleProductData, 
    deleteProductData, 
    createProductData, 
    updateProductData, 
    addProductImagesData, 
    addProductSizeData,
    updateProductSizeData,
    deleteProductSizeData,
    deleteProductImageData,
    filterProductData,
} = productSlice.actions;
export const { selectProducts, selectProduct } = productSlice.selectors;