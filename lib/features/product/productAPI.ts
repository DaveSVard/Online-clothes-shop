import { IAddOrUpdateSize, IUpdateProduct } from "@/type/type";
import axios from "axios";
import Cookies from "js-cookie";

export const createProductAPI = async (productObj:FormData) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.post("http://localhost:3001/product", productObj, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        }
    })
    return data
}

export const getAllProductsAPI = async () => {
    const { data } = await axios.get("http://localhost:3001/product")
    return data
}

export const getSingleProductAPI = async (id:number) => {
    const { data } = await axios.get("http://localhost:3001/product/" + id)
    return data
}

export const updateProductAPI = async ({productObj, id}:{productObj:IUpdateProduct, id:number}) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.patch("http://localhost:3001/product/" + id, productObj, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        }
    })
    return data
}

export const deleteProductAPI = async (id:number) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.delete("http://localhost:3001/product/" + id, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        }
    })
    return data
}

export const filterProductsAPI = async (path:string) => {
    const { data } = await axios.get("http://localhost:3001/product" + path)
    console.log(data);
    return data
}

// Product-imagesAPI

export const addProductImagesAPI = async (images:FormData) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.post("http://localhost:3001/product-images/addImagesProduct", images, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        }
    })
    return data
}


export const deleteProductImageAPI = async (id:number) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.delete("http://localhost:3001/product-images/" + id, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        }
    })
    return data
}


// Product-sizesAPI

export const addProductSizeAPI = async ({id, sizes}:IAddOrUpdateSize) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.post("http://localhost:3001/product-size/" + id, sizes, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        }
    })
    return data
}

export const updateProductSizeAPI = async ({id, sizes}:IAddOrUpdateSize) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.patch("http://localhost:3001/product-size/" + id, sizes, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        }
    })
    return data
}

export const deleteProductSizeAPI = async (id:number) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.delete("http://localhost:3001/product-size/" + id, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        }
    })
    return data
}