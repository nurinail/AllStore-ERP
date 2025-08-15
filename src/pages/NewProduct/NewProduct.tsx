import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button, Card, Flex, Form, Input, Select } from "antd";
import type {
  CategoryType,
  ItemCreateRequestDto,
  SubCategoryType,
} from "../../types/other";
import style from "./style.module.scss";
import { useGetCategories } from "../../hooks/useGetCategory";
import { useGetSubCategories } from "../../hooks/useGetSubCategory";

const NewProduct: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const { customCategory } = useGetCategories();
  const { customSubCategory } = useGetSubCategories(selectedCategoryId);
  const [itemIndex, setItemIndex] = useState<number>(0);
  const {
    control,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<ItemCreateRequestDto>({
    mode: "onSubmit",
    defaultValues: {
      status: "ACTIVE",
      itemType: undefined,
      name: "",
      description: "",
      itemUnits: [],
    },
  });
  // const {
  //   fields: unitFields,
  //   append: appendUnit,
  //   remove: removeUnit,
  // } = useFieldArray({
  //   control,
  //   name: "itemUnits",
  // });
  // const {
  //   fields: barcodeFields,
  //   append: appendBarcode,
  //   remove: removeBarcode,
  // } = useFieldArray({
  //   control,
  //   name: `itemUnits.${itemIndex}.unitBarcodes`,
  // });
  const handleCreateProduct = async (value: any) => {
    console.log(value);
  };
  return (
    <Form
      onFinish={handleSubmit(handleCreateProduct)}
      className={style.newProduct}
      layout="vertical"
    >
      <Flex className={style.newProduct_top} gap={"middle"}>
        <Form.Item
          label="Kateqoriya:"
          className={style.newProduct_top_category}
        >
          <Select
            placeholder="Kateqoriya seç"
            loading={!customCategory.length}
            options={customCategory?.map((ctg: CategoryType) => ({
              label: ctg.name,
              value: ctg.id,
            }))}
            onChange={(id) => {
              setSelectedCategoryId(Number(id));
            }}
          />
        </Form.Item>
        <Form.Item
          label="Alt kateqoriya:"
          className={style.newProduct_top_subcategory}
        >
          <Controller
            name="subcategoryId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Alt Kateqoriya seç"
                options={customSubCategory?.map((sbctg: SubCategoryType) => ({
                  label: sbctg.name,
                  value: sbctg.id,
                }))}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Tip:" className={style.newProduct_top_type}>
          <Controller
            name="itemType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Tip seç"
                value={field.value}
                options={[
                  { value: "PRODUCT", label: "Məhsul" },
                  { value: "SERVICE", label: "Xidmət" },
                ]}
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Status:" className={style.newProduct_top_type}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Status seç:"
                value={field.value}
                options={[
                  { value: "PASSIVE", label: "Passiv" },
                  { value: "ACTIVE", label: "Aktiv" },
                ]}
                onChange={(value) => {
                  field.onChange(value);
                }}
              />
            )}
          />
        </Form.Item>
        <Form.Item className={style.newProduct_top_name} label="Ad:">
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Ad yaz..." />}
          />
        </Form.Item>
        <Form.Item className={style.newProduct_top_desc} label="Qeyd:">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input placeholder="Qeyd yaz..." {...field} />
            )}
          />
        </Form.Item>
      </Flex>
      <Card className={style.newProduct_card} title="Vahidlər">
        <Flex className={style.newProduct_card_parent}>
          <Card className={style.newProduct_card_parent_unitLeft} title="Vahid">
            
          </Card>
          <Card className={style.newProduct_card_parent_unitRight}></Card>
        </Flex>
      </Card>
      <Button className={style.newProduct_button} htmlType="submit" type="primary">Göndər</Button>
    </Form>
  );
};

export default NewProduct;

// import { Button, Card, Flex, Form, Input, Select, Tag } from "antd";
// import { Content } from "antd/es/layout/layout";
// import React, { useState } from "react";
// import { useForm, Controller, useFieldArray } from "react-hook-form";
// // import { yupResolver } from "@hookform/resolvers/yup";
// // import { itemCreateSchema } from "../../validations/itemCreateSchema";
// // import type {
// //   CategoryType,
// //   ItemCreateRequestDto,
// //   OptionType,
// //   SubCategoryType,
// // } from "../../types/types";
// // import { useGetCategoriesData } from "../../hooks/useGetCategoriesData";
// // import { useGetSubCategoriesData } from "../../hooks/useGetSubCategoriesData";

// // import { useGetUnit } from "../../hooks/useGetUnit";
// // import { usePostItem } from "../../hooks/usePostItem";
// import { DeleteOutlined } from "@ant-design/icons";
// import classNames from "classnames";
// import style from "./style.module.scss";

// const unitNames: Record<number, string> = {
//   1: "Ədəd",
//   2: "Qutu",
//   3: "Bağlama",
// };

// const NewProduct: React.FC = () => {
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
//     null
//   );
//   // const { customSubCategory } = useGetSubCategoriesData(selectedCategoryId);
//   // const { customCategory } = useGetCategoriesData();
//   // const { unit } = useGetUnit();
//   // const { fetchPostItem } = usePostItem();
//   const [form] = Form.useForm();
//   //---------------------------------------------------------
//   const [isMainUnitActive, setIsMainUnitActive] = useState<boolean>(true);
//   const [isMainBarcodeActive, setIsMainBarcodeActive] = useState<boolean>(true);
//   const [itemIndex, setItemIndex] = useState<number>(0);
//   const {
//     control,
//     handleSubmit,
//     reset,
//     resetField,
//     watch,
//     formState: { errors },
//   } = useForm<any>({

//     mode: "onSubmit",
//     defaultValues: {
//       status: "ACTIVE",
//       itemType: undefined,
//       name: "",
//       description: "",
//       itemUnits: [],
//     },
//   });
//   const {
//     fields: unitFields,
//     append: appendUnit,
//     remove: removeUnit,
//   } = useFieldArray({
//     control,
//     name: "itemUnits",
//   });
//   const {
//     fields: barcodeFields,
//     append: appendBarcode,
//     remove: removeBarcode,
//   } = useFieldArray({
//     control,
//     name: `itemUnits.${itemIndex}.unitBarcodes`,
//   });
//   const handleAddUnit = () => {
//     appendUnit({
//       unitId: undefined,
//         main: false,
//         convact1: 1,
//         convact2: 1,
//         unitBarcodes: [],
//     })
//     const newIndex = unitFields.length;
//     // if (!isMainUnitActive) {
//     //   appendUnit({
//     //     unitId: undefined,
//     //     main: false,
//     //     convact1: 1,
//     //     convact2: 1,
//     //     unitBarcodes: [],
//     //   });
//       setItemIndex(newIndex);
//       resetField(`itemUnits.${newIndex}.unitBarcodes`);
//       setIsMainBarcodeActive(true);
//       setIsMainUnitActive(false);
//   };

//   // const handleAddBarcode = () => {
//   //   if (isMainBarcodeActive) {
//   //     setIsMainBarcodeActive(false);
//   //   } else {
//   //     appendBarcode({ barcode: "" });
//   //   }
//   // };

//   const handleChangeUnitName = (id: number): string => {
//     return unitNames[id] || "Vahid Seç";
//   };

//   const handleCreateProduct = async (data: any) => {
//     // const { category, ...rest } = data;
//     console.log(data)

//     // const newItemCreateRequest: Omit<ItemCreateRequestDto, "category"> = {
//     //   ...rest,
//     // };
//     // console.log(newItemCreateRequest)
//     // try {
//     //   await fetchPostItem(newItemCreateRequest);
//     // setIsMainUnitActive(true);
//     // setIsMainBarcodeActive(true);
//     // reset();
//     // } finally {
//     // }
//   };

//   return (
// <Content className={style.content}>
//   <Form
//     form={form}
//     layout="vertical"
//     onFinish={handleSubmit(handleCreateProduct)}
//     className={style.newProduct}
//   >
//     <Flex className={style.newProduct_top} gap={"middle"}>
//       <Form.Item
//         label="Kateqoriya"
//         className={style.newProduct_top_category}
//       >
//             <Select
//               placeholder="Kateqoriya seç"
//               // loading={!customCategory.length}
//               // options={customCategory?.map((cat: CategoryType) => ({
//               //   label: cat.name,
//               //   value: cat.id,
//               // }))}
//               onChange={(id) => {
//                 setSelectedCategoryId(Number(id));
//               }}
//             />
//       </Form.Item>
//       <Form.Item
//         label="Alt kateqoriya"
//         className={style.newProduct_top_subcategory}
//       >
//         <Controller
//           name="subcategoryId"
//           control={control}
//           render={({ field }) => (
//             <Select
//               {...field}
//               placeholder="Alt Kateqoriya seç"
//               // options={customSubCategory?.map((cat: SubCategoryType) => ({
//               //   label: cat.name,
//               //   value: cat.id,
//               // }))}
//               onChange={(value) => field.onChange(value)}
//             />
//           )}
//         />
//       </Form.Item>
//       <Form.Item
//         label="Tip"
//         className={style.newProduct_top_type}
//       >
//         <Controller
//           name="itemType"
//           control={control}
//           render={({ field }) => (
//             <Select
//               {...field}
//               placeholder="Tip seç"
//               value={field.value}
//               options={[
//                 { value: "PRODUCT", label: "Məhsul" },
//                 { value: "SERVICE", label: "Xidmət" },
//               ]}
//               onChange={(value) => {
//                 field.onChange(value);
//               }}
//             />
//           )}
//         />
//       </Form.Item>
//       <Form.Item
//         label="Status"
//         className={style.newProduct_top_type}
//       >
//         <Controller
//           name="status"
//           control={control}
//           render={({ field }) => (
//             <Select
//               {...field}
//               placeholder="Status seç"
//               value={field.value}
//               options={[
//                 { value: "PASSIVE", label: "Passiv" },
//                 { value: "ACTIVE", label: "Aktiv" },
//               ]}
//               onChange={(value) => {
//                 field.onChange(value);
//               }}
//             />
//           )}
//         />
//       </Form.Item>
//       <Form.Item
//         className={style.content_form_top_name}
//         label="Ad"
//       >
//         <Controller
//           name="name"
//           control={control}
//           render={({ field }) => (
//             <Input {...field} placeholder="Ad yaz..." />
//           )}
//         />
//       </Form.Item>
//       <Form.Item
//         className={style.content_form_top_desc}
//         label="Qeyd"
//       >
//         <Controller
//           name="description"
//           control={control}
//           render={({ field }) => (
//             <Input placeholder="Qeyd yaz..." {...field} />
//           )}
//         />
//       </Form.Item>
//     </Flex>
//     <Card className={style.content_form_card} title="Vahidlər">
//       <Flex className={style.content_form_card_parent}>
//         <Card
//           className={style.content_form_card_parent_unitLeft}
//           style={{ flex: 2 }}
//           title="Vahid"
//         >
//           {!isMainUnitActive && (
//             <Flex vertical>
//               {unitFields.map((_, index) => (
//                 <Form.Item
//                   key={index}
//                   className={style.content_form_card_parent_unitLeft_item}
//                   // validateStatus={
//                   //   errors.itemUnits?.[itemIndex]?.unitId ? "error" : ""
//                   // }
//                   // help={errors.itemUnits?.[itemIndex]?.unitId?.message}
//                 >
//                   <Controller
//                     key={index}
//                     control={control}
//                     name={`itemUnits.${index}.unitId`}
//                     render={({ field }) => (
//                         <Select
//                           {...field}
//                           value={watch(`itemUnits.${index}.unitId`)}
//                           onClick={()=>setItemIndex(index)}
//                           className={classNames(
//                             !index && style.mainUnitSelectActive
//                           )}
//                           placeholder={
//                             itemIndex
//                               ? "Vahid əlavə et"
//                               : "Əsas vahid əlavə et"
//                           }
//                           style={{ width: "70%" }}
//                           // options={
//                           //   unit &&
//                           //   unit.map((item: OptionType) => ({
//                           //     label: item.name,
//                           //     value: item.id,
//                           //   }))
//                           // }
//                           onChange={(e) => {
//                             field.onChange(e);
//                           }}
//                         />
//                     )}
//                   />
//                 </Form.Item>
//               ))}
//             </Flex>
//           )}
//           <Button
//             onClick={handleAddUnit}
//             type="primary"
//             className={
//               style.content_form_card_parent_unitLeft_addUnitButton
//             }
//           >
//             Əlavə ettt
//           </Button>
//         </Card>
//         {!isMainUnitActive && (
//           <Card className={style.content_form_card_parent_unitRight}>
//             <Flex className={style.content_form_card_parent_unitRight_tags}>
//               <Tag
//                 color="magenta"
//                 className={
//                   style.content_form_card_parent_unitRight_tags_item
//                 }
//               >
//                 {handleChangeUnitName(
//                   Number(watch(`itemUnits.${itemIndex}.unitId`))
//                 )}
//               </Tag>
//               <Tag
//                 color="cyan"
//                 className={
//                   style.content_form_card_parent_unitRight_tags_item
//                 }
//               >
//                 -
//               </Tag>
//               <Tag
//                 color="geekblue"
//                 className={
//                   style.content_form_card_parent_unitRight_tags_item
//                 }
//               >
//                 {handleChangeUnitName(
//                   Number(watch(`itemUnits.${itemIndex}.unitId`))
//                 )}
//               </Tag>
//               <Button
//                 className={style.content_form_card_parent_unitDelete}
//                 danger
//                 type="primary"
//               >
//                 Sil
//               </Button>
//             </Flex>
//             {
//               <Flex
//                 className={style.content_form_card_parent_unitRight_unit}
//               >
//                 <Form.Item
//                   label={`${handleChangeUnitName(
//                     Number(watch(`itemUnits.0.unitId`))
//                   )} (Əsas Vahid)`}
//                 >
//                   <Controller
//                     control={control}
//                     name={`itemUnits.${itemIndex}.convact2`}
//                     render={({ field }) => (
//                       <Input
//                         dir="rtl"
//                         {...field}
//                         value={watch(`itemUnits.${itemIndex}.convact2`)}
//                         onChange={(e) => field.onChange(e)}
//                         disabled={!itemIndex && true}
//                         type="number"
//                       />
//                     )}
//                   />
//                 </Form.Item>
//                 <Form.Item
//                   label={`${handleChangeUnitName(
//                     Number(watch(`itemUnits.${itemIndex}.unitId`))
//                   )}`}

//                 >
//                   <Controller
//                     control={control}
//                     name={`itemUnits.${itemIndex}.convact1`}
//                     render={({ field }) => (
//                       <Input
//                         {...field}
//                         disabled={!itemIndex && true}
//                         value={watch(`itemUnits.${itemIndex}.convact1`)}
//                         onChange={(e) => field.onChange(e)}
//                         type="number"
//                       />
//                     )}
//                   />
//                 </Form.Item>
//               </Flex>
//             }
//             <Flex
//               className={style.content_form_card_parent_unitRight_barcodes}
//               vertical
//             >
//               {!isMainBarcodeActive &&
//                 barcodeFields.map((barcode, index) => (
//                   <Form.Item
//                     key={barcode.id}

//                   >
//                     <Controller
//                       control={control}
//                       name={`itemUnits.${itemIndex}.unitBarcodes.${index}.barcode`}
//                       render={({ field }) => (
//                         <Input
//                           className={
//                             style.content_form_card_parent_unitRight_barcodes_input
//                           }
//                           {...field}
//                               value={watch(
//                                 `itemUnits.${itemIndex}.unitBarcodes.${index}.barcode`
//                               )}
//                           suffix={
//                             <DeleteOutlined
//                               className={
//                                 style.content_form_card_parent_unitRight_barcodes_input_deleteBtn
//                               }

//                               onClick={() => removeBarcode(index)}
//                             />
//                           }
//                           type="number"
//                           placeholder="Barkod əlavə et"
//                           onChange={(e) => field.onChange(e)}
//                         />
//                       )}
//                     />
//                   </Form.Item>
//                 ))}
//             </Flex>
//             <Button
//               className={
//                 style.content_form_card_parent_unitRight_addBarcodeBtn
//               }
//               type="dashed"
//               // onClick={() => appendBarcode({ barcode: "" })}
//             >
//               Barkod əlavə et
//             </Button>
//           </Card>
//         )}
//       </Flex>
//     </Card>
//     <Button
//       className={style.content_form_submitBtn}
//       block
//       type="primary"
//       htmlType="submit"
//     >
//       Yadda Saxla
//     </Button>
//   </Form>
// </Content>
//   );
// };
// export default NewProduct;
