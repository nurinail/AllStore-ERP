import { useDispatch } from "react-redux";
import type { ItemCreateRequestDto } from "../types/other";
import { handlePostCreatProduct } from "../features/globalSlice";

export const usePostCreateProduct = () => {
    const dispatch=useDispatch();
  const URL = "http://188.245.202.61/allstore-ms/v1/api/items";
  const fetchPostProductItem = async (item: Omit<ItemCreateRequestDto,"category">) => {
    dispatch(handlePostCreatProduct(true))
    try {
      const token = localStorage.getItem("accessToken");
      await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });
      
    } catch (error) {}
    finally{
        dispatch(handlePostCreatProduct(false))
    }
  };

  return { fetchPostProductItem };
};
