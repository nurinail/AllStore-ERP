import { useEffect, useState } from "react";

export const useGetUnit = () => {
  const URL = "http://188.245.202.61/allstore-ms/v1/api/units";
  const [unit, setUnit] = useState([]);
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
          setUnit(json)
        }

      } catch (error) {
      }
    };
    fetchData();

  }, []);
return {unit}
};
