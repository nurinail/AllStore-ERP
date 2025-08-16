import React, { useState } from "react";
import style from "./style.module.scss";
import { Avatar, Badge, Button, Flex, Modal, Spin } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { handleIsAuthenticated } from "../../features/globalSlice";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const dispatch=useDispatch();
  return <Flex className={style.header} justify="flex-end" align="center" gap="middle">
    <Badge count={5} style={{ backgroundColor: '#52c41a' }}>
      <Modal 
      okType="primary"
      cancelText="Xeyr"
      okText="Bəli"
      open={isModalOpen}
      closable={{ 'aria-label': 'Custom Close Button' }}
      title={
        <span className={style.modal_title_text}>
      <ExclamationCircleOutlined className={style.modal_title_text_icon} />
      Çıxmaq istədiyinə əminsən?
    </span>
      }
      onCancel={()=>setIsModalOpen(false)}
      onOk={()=>{
        setIsLoading(true);
        setTimeout(()=>{
          dispatch(handleIsAuthenticated(false));
          setIsLoading(false)
        },1000)
      }}
      >
        {isLoading?<Spin/>:null}

      </Modal>
        <IoIosNotificationsOutline size={28} style={{color:"black"}}/>
    </Badge>
    <Avatar size={30} icon={<UserOutlined />} />
    <Button htmlType="button" onClick={()=>setIsModalOpen(true)} danger >Çıxış</Button>
  </Flex>;
};

export default Header;
