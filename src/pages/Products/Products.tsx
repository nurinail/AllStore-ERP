import { Flex, Space, DatePicker, Select, Input, Button, type TableColumnsType, Table } from "antd";
import React from "react";
import style from "./style.module.scss";
import { useGetItemList } from "../../hooks/useGetItemList";
import type { ItemsType } from "../../types/other";
import { AntDesignOutlined, DeleteOutlined, EditOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
const { RangePicker } = DatePicker;
const Products = () => {
  const { data } = useGetItemList();
  const isLoading=useSelector((state:RootState)=>state.globalSlice.isTable)
  const columns: TableColumnsType<ItemsType> = [
    { title: "Sıra", dataIndex: "id", key: "id", align: "center" },
    { title: "Tip", dataIndex: "itemType", key: "itemType", align: "center" },
    { title: "Status", dataIndex: "status", key: "status", align: "center" },
    { title: "Kodu", dataIndex: "code", key: "code", align: "center" },
    { title: "Adı", dataIndex: "name", key: "name", align: "center" },
    { title: "Barkod", dataIndex: "barcode", key: "barcode", align: "center" },
    { title: "Satış qiyməti", dataIndex: "salesPrice", key: "salesPrice", align: "center" },
    { title: "Alış qiyməti", dataIndex: "purchasesPrice", key: "purchasesPrice", align: "center" },
    { title: "Virtual say", dataIndex: "virtualCount", key: "virtualCount", align: "center" },
    { title: "Real say", dataIndex: "realCount", key: "realCount", align: "center" },
    { title: "Əsas vahid", dataIndex: "basicUnit", key: "basicUnit", align: "center" },
    { title: "Təsvir", dataIndex: "description", key: "description", align: "center" },
    {
      title: "Əməliyyatlar",
      key: "actions",
      align: "center",
      render: (_: any, record: ItemsType) => (
        <div style={{ display: "flex", gap: "1rem" }}>
          <EditOutlined style={{ color: "#1890ff", cursor: "pointer" }} />
          <DeleteOutlined style={{ color: "#ff4d4f", cursor: "pointer" }}  />
          <VerticalAlignTopOutlined style={{ color: "#52c41a", cursor: "pointer" }}/>
          <AntDesignOutlined style={{ color: "#faad14", cursor: "pointer" }}  />
        </div>
      ),
    },
  ];
  return (
    <Flex vertical gap="middle" className={style.products}>
      <Flex
        justify="flex-start"
        align="flex-start"
        className={style.products_searchBar}
      >
        <Select
          placeholder="Seç"
          allowClear
          className={style.products_searchBar_select}
          options={[
            { label: "Ad", value: "name" },
            { label: "Kod", value: "code" },
            { label: "Qeyd", value: "note" },
          ]}
        />
        <Input
          placeholder="Barkod, Kod, Ad və ya Qeyd yazıb enter düyməsini basın"
          allowClear
          size="middle"
          className={style.products_searchBar_input}
        />
        <Button type="primary" className={style.products_searchBar_button}>
          Axtar
        </Button>
      </Flex>
      <Table
        size="middle"
        loading={isLoading}
        className={style.products_table}
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 8 }}
      />
    </Flex>
  );
};

export default Products;
