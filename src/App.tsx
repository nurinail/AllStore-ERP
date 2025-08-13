import { Button, Flex, Layout, Menu } from "antd";
import "./App.css";
import Header from "./layouts/Header/Header";
import SideBar from "./layouts/SideBar/SideBar";
import NewProduct from "./pages/NewProduct/NewProduct";
import React, { useState } from "react";
import Sider from "antd/es/layout/Sider";
import {
  AlignLeftOutlined,
  BranchesOutlined,
  CloudUploadOutlined,
  DownloadOutlined,
  DownSquareOutlined,
  FileProtectOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  UploadOutlined,
  UpSquareOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import AppRouter from "./routes/AppRouter/AppRouter";
import { useNavigate } from "react-router";

function App() {
   const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(["/products"]);
  return (
    <Layout className="app">
      <Sider className="app_sider" collapsed={collapsed}>
        <Menu
          mode="inline"
          rootClassName="app_menu"
          selectedKeys={selectedKeys}
          onClick={(e) => {
            setSelectedKeys([e.key]);
        navigate(e.key);
          }}
          items={[
            {
              key: "products",
              icon: <ProductOutlined />,
              label: "Məhsullar",
              className: "app_menu_item",
              children: [
                {
                  key: "/products",
                  label: "Siyahı",
                  icon: <FileProtectOutlined />,
                   className: "app_menu_item_child",
                },
                {
                  key: "/newproduct",
                  label: "Yeni Məhsul",
                  icon: <DownloadOutlined />,
                   className: "app_menu_item_child",
                },
              ],
            },
            {
              key: "purchases",
              icon: <DownSquareOutlined />,
              label: "Alışlar",
              className: "app_menu_item",
              children: [
                {
                  key: "/purchases",
                  icon: <AlignLeftOutlined />,
                  label: "Ümumi alışlar",
                  className: "app_menu_item_child",
                },
                {
                  key: "/purchasesreturn",
                  icon: <CloudUploadOutlined />,
                  label: "Ümumi alış iadələr",
                   className: "app_menu_item_child",
                },
                {
                  key: "/newpurchases",
                  icon: <DownloadOutlined />,
                  label: "Yeni alış",
                   className: "app_menu_item_child",
                },
                {
                  key: "/newpurchasereturn",
                  icon: <BranchesOutlined />,
                  label: "Yeni alış iadə",
                   className: "app_menu_item_child",
                },
              ],
            },

            {
    key: "saleslist",
    icon: <UpSquareOutlined />,
    className: "app_menu_item",
    label: "Satışlar",
    children: [
      { key: "/saleslist", icon: <AlignLeftOutlined />, label: "Ümumi satışlar", className: "app_menu_item_child", },
      { key: "/salesreturns", icon: <CloudUploadOutlined />, label: "Ümumi satış iadələr", className: "app_menu_item_child", },
      { key: "/newsale", icon: <DownloadOutlined />, label: "Yeni satış" , className: "app_menu_item_child",},
      { key: "/newsalereturn", icon: <BranchesOutlined />, label: "Yeni satış iadə", className: "app_menu_item_child", },
    ],
  },
          ]}
        />
        <Button
            type="text"
            className="app_menu_collapse_button"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            />
      </Sider>
      <Layout className="app_layout">
        <Header />
     <AppRouter/>
      </Layout>

      
    </Layout>
  );
}

export default App;
