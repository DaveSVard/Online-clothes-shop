import axios from "axios";
import Cookies from "js-cookie";

export const createCategoryAPI = async (name: { name: string }) => {
  const access_token:any = Cookies.get('accessToken')
  const { data } = await axios.post("http://localhost:3001/category", name, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
};

export const getAllCategoriesAPI = async () => {
  const { data } = await axios.get("http://localhost:3001/category");
  return data;
};

export const getSingleCategoryAPI = async (path:string) => {
  const { data } = await axios.get("http://localhost:3001/" + path);
  return data;
}

export const updateCategoryAPI = async ({id, newName}:{id:number, newName:string}) => {
  const obj = {name: newName}
  const access_token:any = Cookies.get('accessToken')
  const { data } = await axios.patch("http://localhost:3001/category/" + id, obj, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
}

export const deleteCategoryAPI = async (id: number) => {
  const access_token:any = Cookies.get('accessToken')
  const { data } = await axios.delete("http://localhost:3001/category/" + id, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return data;
}
