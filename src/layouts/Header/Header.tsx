import React from "react";
import style from "./style.module.scss";
import { Avatar, Badge, Button, Flex } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import { UserOutlined } from "@ant-design/icons";

const Header = () => {
  return <Flex className={style.header} justify="flex-end" align="center" gap="middle">
    <Badge count={5} style={{ backgroundColor: '#52c41a' }}>
        <IoIosNotificationsOutline size={28} style={{color:"black"}}/>
    </Badge>
    <Avatar size={30} icon={<UserOutlined />} />
    <Button danger >Çıxış</Button>
  </Flex>;
};

export default Header;
