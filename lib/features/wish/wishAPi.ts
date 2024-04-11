import axios from "axios";
import Cookies from "js-cookie";


export const addProductToWishAPI = async (productId:{productId:number}) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.post("http://localhost:3001/wishlist", productId, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    
    return data;
};

export const getAllWishesAPI = async (path:string) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.get("http://localhost:3001" + path, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
    });
    return data;
};
  
export const deleteWishAPI = async (wishId:number) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.delete("http://localhost:3001/wishlist/" + wishId, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return data;
}
  