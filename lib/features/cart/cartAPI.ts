import { IAddProductToCart } from "@/type/type";
import axios from "axios";
import Cookies from "js-cookie";


export const addProductToCartAPI = async (obj:IAddProductToCart) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.post("http://localhost:3001/cart", obj, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log("data", data);
    return data;
};

export const getCartListAPI = async () => {
  const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.get("http://localhost:3001/cart/getByUserId", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
    });
    return data;
};

export const updateCartAPI = async ({cartId, quantity}:{cartId:number, quantity:number}) => {
    const access_token:any = Cookies.get('accessToken')
    const quantityObj = {quantity: quantity}
    const { data } = await axios.patch("http://localhost:3001/cart/" + cartId, quantityObj, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
    });
    return data;
};
  
export const deleteCartAPI = async (cartId:number) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.delete("http://localhost:3001/cart/" + cartId, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return data;
}
  

// stripeAPI 

export const stripeCheckoutSessionAPI = async (carts:number[]) => {
  const access_token:any = Cookies.get('accessToken')
  const obj = {currency: "usd", data: carts} 
  const { data } = await axios.post("http://localhost:3001/stripe/checkout-session", obj, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
}

export const stripeSuccessAPI = async () => {
  const access_token:any = Cookies.get('accessToken')
  const { data } = await axios.get("http://localhost:3001/stripe/success", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
}

export const stripeCancelAPI = async () => {
  const access_token:any = Cookies.get('accessToken')
  const { data } = await axios.get("http://localhost:3001/stripe/cancel", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
}


