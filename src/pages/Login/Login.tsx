import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Card, Flex, Form, Input, Space, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";
import style from "./style.module.scss";
import type { LoginDto } from "../../types/login";
import { useLogin } from "../../hooks/useLogin";
const { Text } = Typography;


const Login = () => {
const {login,isLoading}=useLogin();
// console.log(isAuthenticated)
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<LoginDto>({
    mode: "onSubmit",
    defaultValues:{
        username:"",
        password:"",
    }
  });
  const sendData=async (data:LoginDto)=>{
    await login(data)
    reset();
    //  console.log(isAuthenticated)
  }
  return (
    <div className={style.login_page}>
      <Flex
        className={style.login_page_card}
        vertical
        justify="center"
        align="center"
        gap="middle"
        
      >
        <Space
          className={style.login_page_card_title}
          direction="vertical"
          size="small"
          align="center"
        >
          <span className={style.login_page_card_title_icon}>
            <CiLogin size={30} strokeWidth={0.8} />
          </span>
          <Text className={style.login_page_card_title_text} strong>
            Giriş et
          </Text>
          <Text type="secondary">
            Giriş etmək üçün istifadəçi adı və şifrəni daxil edin
          </Text>
        </Space>
        <form className={style.login_form} onSubmit={handleSubmit(sendData)}>
          <Form.Item className={style.login_form_item}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className={style.login_form_item_input}
                  placeholder="İstifadəçi adı"
                  prefix={<MdEmail size={20} color="#838898" />}
                />
              )}
            />
          </Form.Item>
          <Form.Item className={style.login_form_item}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  type="password"
                  className={style.login_form_item_input}
                  placeholder="Şifrə"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone className={style.login_form_item_input_visible_icon} /> : <EyeInvisibleOutlined className={style.visible_icon}/>
                  }
                  prefix={<RiLockPasswordFill size={20} color="#838898" />}
                />
              )}
            />
          </Form.Item>
          <Button loading={isLoading} size="large" type="text" className={style.login_form_button} htmlType="submit">Giriş</Button>

        </form>
        <Flex vertical gap="small"></Flex>
      </Flex>
      {/* </Card> */}
    </div>
  );
};

export default Login;
