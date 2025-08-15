import { useEffect, useState } from "react";

export const useGetSubCategories = (id: number|null) => {
  const [customSubCategory, setCustomSubCategory] = useState([]);

  useEffect(() => {
    if (id === null) return;
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          `http://188.245.202.61/allstore-ms/v1/api/categories/${id}/subcategories`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if(response.ok){
            const json = await response.json();
            setCustomSubCategory(json);

        }

      } catch (error) {}
    };
    fetchData();
  }, [id]);
  return { customSubCategory };
};
