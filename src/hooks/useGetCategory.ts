import { useEffect, useState } from "react";

export const useGetCategories = () => {
  const URL = "http://188.245.202.61/allstore-ms/v1/api/categories";
  const [customCategory, setCustomCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(URL, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if(response.ok){
          const json= await response.json();
          setCustomCategory(json)
        }

      } catch (error) {
      }
    };
    fetchData();

  }, []);
return {customCategory}
};
