import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button, Card, Flex, Form, Input, Select, Tag } from "antd";
import { MdDelete } from "react-icons/md";
import type {
  CategoryType,
  ItemCreateRequestDto,
  OptionType,
  SubCategoryType,
} from "../../types/other";
import style from "./style.module.scss";
import { TbHandClick } from "react-icons/tb";
import { useGetCategories } from "../../hooks/useGetCategory";
import { useGetSubCategories } from "../../hooks/useGetSubCategory";
import { useGetUnit } from "../../hooks/useGetUnit";
import classNames from "classnames";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { usePostCreateProduct } from "../../hooks/usePostCreateProduct";

const unitNames: Record<number, string> = {
  1: "Ədəd",
  2: "Qutu",
  3: "Bağlama",
};
const NewProduct: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const isPostRequest=useSelector((state:RootState)=>state.globalSlice.isPostRequest)
  const { customCategory } = useGetCategories();
  const { customSubCategory } = useGetSubCategories(selectedCategoryId);
  const { unit } = useGetUnit();
  const {fetchPostProductItem}=usePostCreateProduct();
  const [itemIndex, setItemIndex] = useState<number>(0);
  const handleChangeUnitName = (id: number): string => {
    return unitNames[id] || "Vahid Seç";
  };
  const {
    control,
    handleSubmit,
    reset,
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
  const { fields: unitFields, append: appendUnit } = useFieldArray({
    control,
    name: "itemUnits",
  });
  const handleCreateProduct = (value: ItemCreateRequestDto) => {
    const { category, ...rest } = value;
    fetchPostProductItem(rest);
    reset();
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
          <Controller
            name="category"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Kateqoriya daxil edin!",
              },
            }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Kateqoriya seç"
                options={customCategory?.map((ctg: CategoryType) => ({
                  label: ctg.name,
                  value: ctg.id,
                }))}
                onChange={(value) => {
                  field.onChange(value), setSelectedCategoryId(Number(value));
                }}
              />
            )}
          />
          {errors.category && (
            <p className={style.error}>{errors.category?.message}</p>
          )}
        </Form.Item>
        <Form.Item
          label="Alt kateqoriya:"
          className={style.newProduct_top_subcategory}
        >
          <Controller
            name="subcategoryId"
            rules={{
              required: {
                value: true,
                message: "Alt kateqoriya daxil edin!",
              },
            }}
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
          {errors.subcategoryId && (
            <p className={style.error}>{errors.subcategoryId?.message}</p>
          )}
        </Form.Item>
        <Form.Item label="Tip:" className={style.newProduct_top_type}>
          <Controller
            name="itemType"
            rules={{
              required: {
                value: true,
                message: "Tip daxil edin!",
              },
            }}
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
          {errors.itemType && (
            <p className={style.error}>{errors.itemType?.message}</p>
          )}
        </Form.Item>
        <Form.Item label="Status:" className={style.newProduct_top_type}>
          <Controller
            name="status"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Status daxil edin!",
              },
            }}
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
          {errors.status && (
            <p className={style.error}>{errors.status?.message}</p>
          )}
        </Form.Item>
        <Form.Item className={style.newProduct_top_name} label="Ad:">
          <Controller
            name="name"
            rules={{
              required: {
                value: true,
                message: "Ad daxil edin!",
              },
            }}
            control={control}
            render={({ field }) => <Input {...field} placeholder="Ad yaz..." />}
          />
          {errors.name && (
            <p className={style.error}>{errors.name?.message}</p>
          )}
        </Form.Item>
        <Form.Item className={style.newProduct_top_desc} label="Qeyd:">
          <Controller
            name="description"
            rules={{
              required: {
                value: true,
                message: "Təsvir daxil edin!",
              },
            }}
            control={control}
            render={({ field }) => (
              <Input placeholder="Qeyd yaz..." {...field} />
            )}
          />
          {errors.description && (
            <p className={style.error}>{errors.description?.message}</p>
          )}
        </Form.Item>
      </Flex>
      <Card className={style.newProduct_card} title="Vahidlər">
        <Flex className={style.newProduct_card_parent}>
          <Card className={style.newProduct_card_parent_unitLeft} title="Vahid">
            {unitFields && (
              <Flex vertical>
                {unitFields.map((field, index) => (
                  <Form.Item
                    key={field.id}
                    className={style.newProduct_card_parent_unitLeft_item}
                  >
                    <Controller
                      control={control}
                      rules={{
                      required: {
                      value: true,
                      message: "Vahid boş ola bilməz!",
                      },
                       }}
                      name={`itemUnits.${index}.unitId`}
                      render={({ field }) => (
                        <Flex gap={8}>
                          <Tag
                            className={
                              style.newProduct_card_parent_unitLeft_item_isMain
                            }
                          >
                            {index === 0 ? "Ə" : "D"}
                          </Tag>
                          <Select
                            {...field}
                            className={classNames(
                              index === 0 && style.mainUnitSelectActive
                            )}
                            onChange={(e) => field.onChange(e)}
                            value={watch(`itemUnits.${index}.unitId`)}
                            placeholder={index === 0 ? "Əsas Vahid" : "Vahid"}
                            options={unit?.map((item: OptionType) => ({
                              label: item.name,
                              value: item.id,
                            }))}
                          />
                          <Tag
                            className={
                              style.newProduct_card_parent_unitLeft_item_choose
                            }
                            onClick={() => setItemIndex(index)}
                          >
                            <TbHandClick />
                          </Tag>
                        </Flex>
                      )}
                    />
                    {errors.itemUnits?.[index]?.unitId && (
                      <p className={style.error}>
                        {errors.itemUnits[index].unitId?.message}
                      </p>
                    )}
                  </Form.Item>
                ))}
              </Flex>
            )}
            <Button
              htmlType="button"
              className={style.newProduct_card_parent_unitLeft_button}
              onClick={() => {
                appendUnit({
                  unitId: undefined,
                  main: unitFields.length === 0 ? true : false,
                  convact1: 1,
                  convact2: 1,
                  unitBarcodes: [],
                });
                const newIndex = unitFields.length;
                setItemIndex(newIndex);
              }}
            >
              {unitFields.length === 0
                ? "Əsas Vahid Əlavə Et"
                : "Vahid Əlavə Et"}
            </Button>
          </Card>
          {unitFields.length > 0 && (
            <Card className={style.newProduct_card_parent_unitRight}>
              <Flex className={style.newProduct_card_parent_unitRight_tags}>
                <Tag
                  className={style.newProduct_card_parent_unitRight_tags_item}
                  color="magenta"
                >
                  {handleChangeUnitName(
                    Number(watch(`itemUnits.${itemIndex}.unitId`))
                  )}
                </Tag>
                <Tag
                  className={style.newProduct_card_parent_unitRight_tags_item}
                  color="cyan"
                >
                  -
                </Tag>
                <Tag
                  className={style.newProduct_card_parent_unitRight_tags_item}
                  color="geekblue"
                >
                  {handleChangeUnitName(
                    Number(watch(`itemUnits.${itemIndex}.unitId`))
                  )}
                </Tag>
                <Button
                  className={
                    style.newProduct_card_parent_unitRight_tags_delete_unit_button
                  }
                  danger
                  type="primary"
                  htmlType="button"
                >
                  Sil
                </Button>
              </Flex>
              <Flex
                gap={10}
                className={style.newProduct_card_parent_unitRight_units}
              >
                <Form.Item
                  label={`${handleChangeUnitName(
                    Number(watch(`itemUnits.0.unitId`))
                  )} (Əsas Vahid)`}
                >
                  <Controller
                    control={control}
                    rules={{
                      required: {
                      value: true,
                      message: "Əsas vahid boş ola bilməz!",
                      },
                       }}
                    name={`itemUnits.${itemIndex}.convact2`}
                    render={({ field }) => (
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(e)}
                        value={watch(`itemUnits.${itemIndex}.convact2`)}
                        disabled={
                          unitFields.length > 1 && itemIndex === 0
                            ? true
                            : false
                        }
                        type="number"
                      />
                    )}
                  />
                  {errors.itemUnits?.[itemIndex]?.convact2 && (
                    <p className={style.error}>
                      {errors.itemUnits[itemIndex].convact2?.message}
                    </p>
                  )}
                </Form.Item>
                <Form.Item
                  label={`${handleChangeUnitName(
                    Number(watch(`itemUnits.${itemIndex}.unitId`))
                  )}`}
                >
                  <Controller
                    control={control}
                    name={`itemUnits.${itemIndex}.convact1`}
                    rules={{
                      required: {
                      value: true,
                      message: "Vahid boş ola bilməz!",
                      },
                       }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(e)}
                        value={watch(`itemUnits.${itemIndex}.convact1`)}
                        disabled={
                          unitFields.length > 1 && itemIndex === 0
                            ? true
                            : false
                        }
                        type="number"
                      />
                    )}
                  />
                  {errors.itemUnits?.[itemIndex]?.convact1 && (
                    <p className={style.error}>
                      {errors.itemUnits[itemIndex].convact1?.message}
                    </p>
                  )}
                </Form.Item>
              </Flex>
              <Form.List name={`itemUnits.${itemIndex}.unitBarcodes`}>
                {(fields, { add, remove }) => (
                  <Flex
                    className={style.newProduct_card_parent_unitRight_barcodes}
                    gap={10}
                    vertical
                  >
                    {fields.map((fielddd, index) => (
                      <Form.Item
                        key={index}
                        className={
                          style.newProduct_card_parent_unitRight_barcodes_item
                        }
                      >
                        <Controller
                          control={control}
                          rules={{
                      required: {
                      value: true,
                      message: "Barkod boş ola bilməz!",
                      },
                       }}
                          name={`itemUnits.${itemIndex}.unitBarcodes.${index}.barcode`}
                          render={({ field }) => (
                            <Input
                              className={
                                style.newProduct_card_parent_unitRight_barcodes_item_input
                              }
                              {...field}
                              placeholder="Barkod..."
                              onChange={(e) => field.onChange(e)}
                              value={
                                unitFields[itemIndex].unitBarcodes[index]
                                  .barcode
                              }
                            />
                          )}
                        />
                        <MdDelete
                          onClick={() => {
                            remove(fielddd.name),
                              unitFields[itemIndex].unitBarcodes.splice(
                                fielddd.name,
                                1
                              );
                          }}
                          className={
                            style.newProduct_card_parent_unitRight_barcodes_item_delete_button
                          }
                          size={23}
                        />
                        {errors.itemUnits?.[itemIndex]?.unitBarcodes?.[index]
                          ?.barcode && (
                          <p className={style.error}>
                            {
                              errors.itemUnits?.[itemIndex]?.unitBarcodes?.[
                                index
                              ]?.barcode?.message
                            }
                          </p>
                        )}
                      </Form.Item>
                    ))}
                    <Button
                      className={
                        style.newProduct_card_parent_unitRight_barcodes_add_button
                      }
                      htmlType="button"
                      type="dashed"
                      onClick={() => add()}
                    >
                      Barkod əlavə et{" "}
                    </Button>
                  </Flex>
                )}
              </Form.List>
            </Card>
          )}
        </Flex>
      </Card>
      <Button
        className={style.newProduct_button}
        htmlType="submit"
        type="primary"
        loading={isPostRequest}
      >
        Göndər
      </Button>
    </Form>
  );
};

export default NewProduct;
