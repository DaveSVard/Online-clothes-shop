import axios from "axios";
import Cookies from "js-cookie";

export const createBrandAPI = async (name:{name:string}) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.post("http://localhost:3001/brand", name, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        }
    })
    return data
}

export const getAllBrandsAPI = async () => {
    const { data } = await axios.get("http://localhost:3001/brand")
    return data
}


export const getSingleBrandAPI = async (path:string) => {
    const { data } = await axios.get("http://localhost:3001/" + path)
    return data
}

export const updateBrandAPI = async ({id, newName}:{id:number, newName:string}) => {
    const obj = {name: newName}
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.patch("http://localhost:3001/brand/" + id, obj, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        }
    })
    return data
}

export const deleteBrandAPI = async (id:number) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.delete("http://localhost:3001/brand/" + id, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        }
    })
    return data
}

