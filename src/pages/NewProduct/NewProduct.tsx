import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button, Card, Flex, Form, Input, Select } from "antd";
import type {
  CategoryType,
  ItemCreateRequestDto,
  OptionType,
  SubCategoryType,
} from "../../types/other";
import style from "./style.module.scss";
import { useGetCategories } from "../../hooks/useGetCategory";
import { useGetSubCategories } from "../../hooks/useGetSubCategory";
import { useGetUnit } from "../../hooks/useGetUnit";

const NewProduct: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const { customCategory } = useGetCategories();
  const { customSubCategory } = useGetSubCategories(selectedCategoryId);
  const { unit } = useGetUnit();
  const [itemIndex, setItemIndex] = useState<number>(0);
  const [isMainUnit, setIsMainUnit] = useState<boolean>(true);
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
  const {
    fields: unitFields,
    append:appendUnit,
    remove:removeUnit,
  } = useFieldArray({
    control,
    name: "itemUnits",
  });
  const unitArrays = useFieldArray({
  control,
  name: "itemUnits",
});
  const barcodeArrays = unitArrays.fields.map((_, i) =>
  useFieldArray({
    control,
    name: `itemUnits.${i}.unitBarcodes`,
  })
);
  // const {fields: barcodeFields,append: appendBarcode,
  //   remove: removeBarcode,
  // } = useFieldArray({
  //   control,
  //   name: `itemUnits.${itemIndex}.unitBarcodes`,
  // });

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
            {isMainUnit && (
             <Flex vertical>
  {unitFields.map((field, index) => (
    <Form.Item
      key={field.id}
      className={style.newProduct_card_parent_unitLeft_item}
    >
      <Controller
        control={control}
        name={`itemUnits.${index}.unitId`}
        render={({ field }) => (
          <Select
            {...field}
            onFocus={() => setItemIndex(index)}
            placeholder={
              isMainUnit
                ? "Əsas vahid əlavə et"
                : "Vahid əlavə et"
            }
            options={
              unit?.map((item: OptionType) => ({
                label: item.name,
                value: item.id,
              }))
            }
          />
        )}
      />
    </Form.Item>
  ))}
</Flex>

            )}
            <Button 
            htmlType="button"
            onClick={()=>{
appendUnit({
      unitId: undefined,
        main: false,
        convact1: 1,
        convact2: 1,
        unitBarcodes: [],
    })
            }}>
              {isMainUnit ? "Əsas Vahid Əlavə Et" : "Vahid Əlavə Et"}
            </Button>
          </Card>
          <Card className={style.newProduct_card_parent_unitRight}></Card>
        </Flex>
      </Card>
      <Button
        className={style.newProduct_button}
        htmlType="submit"
        type="primary"
      >
        Göndər
      </Button>
    </Form>
  );
};

export default NewProduct;
