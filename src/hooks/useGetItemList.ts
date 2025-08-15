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
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
            dispatch(handleIsTable(false))
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
          // console.log(unit)
        } else {
          console.log("sehvvvvv")
          dispatch(handleIsTable(false))
        }
    } catch {
        dispatch(handleIsTable(false))
    }
    };
    fetchData();
  }, []);
  return { data };
};

// export const useGetUnit = () => {
//   const [unit, setUnit] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const response = await fetch(URL, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Server Error: " + response.status);
//         }

//         const json= await response.json();
//         setUnit(json)
//       } catch (error) {
//       }
//     };
//     fetchData();

//   }, []);
// return {unit}
// };
