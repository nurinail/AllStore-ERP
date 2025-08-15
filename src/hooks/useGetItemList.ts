import { useEffect, useState } from "react";
import type { ItemsType } from "../types/other";
import { useDispatch } from "react-redux";
import { handleIsTable } from "../features/globalSlice";

export const useGetItemList = () => {
  const [data, setData] = useState<ItemsType[]>([]);
  const dispatch=useDispatch();
  const URL = "http://188.245.202.61/allstore-ms/v1/api/items";
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(handleIsTable(true))
        const token = localStorage.getItem("accessToken");
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const unit = await response.json();
          const changedData: ItemsType[] = unit.map((item: any) => ({
            key: item.id,
            id: item.id,
            status: item.status,
            itemType: item.itemType,
            code: item.code,
            name: item.name,
            barcode: item.barcode,
            salesPrice: item.salesPrice,
            purchasesPrice: item.purchasesPrice,
            virtualCount: item.virtualCount,
            realCount: item.realCount,
            basicUnit: item.basicUnit,
            note: item.note,
            description: item.description,
          }));
          setData(changedData);
        } else {
          console.log("Error")
        }
    } catch {}
    finally{
        dispatch(handleIsTable(false))
    }
    };
    fetchData();
  }, []);
  return { data };
};

