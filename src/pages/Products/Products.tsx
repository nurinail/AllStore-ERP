import { Flex, Space,DatePicker, Select, Input, Button } from "antd";
import React from "react";
import style from "./style.module.scss";
const { RangePicker } = DatePicker;
const Products = () => {
  return <Flex vertical gap="middle">
    <Flex justify="flex-start" align="flex-start" className={style.products_searchBar}>
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
  </Flex>;
};

export default Products;
