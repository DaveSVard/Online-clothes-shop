import axios from "axios";
import Cookies from "js-cookie";

export const getOrderListAPI = async (path:string) => {
    const access_token:any = Cookies.get('accessToken')
    const { data } = await axios.get("http://localhost:3001/" + path, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
    });
    console.log(data);
    
    return data;
};