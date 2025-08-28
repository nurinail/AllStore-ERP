import classNames from "classnames";
import { useForm, Controller } from "react-hook-form";
import { Alert, Button, Flex, Form, Input, Space, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";
import style from "./style.module.scss";
import type { LoginDto } from "../../types/login";
import { useLogin } from "../../hooks/useLogin";
const { Text } = Typography;
const Login = () => {
  const { login, isLoading,isLogin } = useLogin();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<LoginDto>({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const sendData = async (data: LoginDto) => {
    await login(data)
    reset();
   
  };
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
              rules={{
                required: {
                  value: true,
                  message: "İstifadəki adı daxil edin!",
                },
                maxLength: {
                  value: 36,
                  message: "İstidaçi adı 36 simvoldan çox ola bilməz!",
                },
                minLength: {
                  value: 4,
                  message: "İstidaçi adı 4 simvoldan az ola bilməz!",
                },
              }}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="İstifadəçi adı"
                  className={classNames(
                    errors.username
                      ? style.error_input
                      : style.login_form_item_input
                  )}
                  prefix={<MdEmail size={20} color={errors.username?"red":"#838898"} />}
                />
              )}
            />
            {errors.username && (
              <p className={style.error}>{errors.username?.message}</p>
            )}
          </Form.Item>
          <Form.Item className={style.login_form_item}>
            <Controller
              name="password"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Şifrə daxil edin!",
                },
                maxLength: {
                  value: 36,
                  message: "Şifrə 36 simvoldan çox ola bilməz!",
                },
                minLength: {
                  value: 4,
                  message: "Şifrə 4 simvoldan az ola bilməz!",
                },
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  type="password"
                  className={classNames(
                    errors.password
                      ? style.error_input
                      : style.login_form_item_input
                  )}
                  placeholder="Şifrə"
                  iconRender={(visible) =>
                    visible ? (
                      <EyeTwoTone
                        className={style.login_form_item_input_visible_icon}
                      />
                    ) : (
                      <EyeInvisibleOutlined className={style.visible_icon} />
                    )
                  }
                  prefix={<RiLockPasswordFill size={20} color={errors.username?"red":"#838898"} />}
                />
              )}
            />
            {errors.password && (
              <p className={style.error}>{errors.password?.message}</p>
            )}
          </Form.Item>
         {
          !isLogin&&(
             <Alert
          message="İstifadəçi adı və ya şifrə səhvdir!"
          type="error"
          showIcon
          />
          )
         }
          <Button
            loading={isLoading}
            size="large"
            type="text"
            className={style.login_form_button}
            htmlType="submit"
          >
            Giriş
          </Button>
        </form>
        <Flex vertical gap="small"></Flex>
      </Flex>
    </div>
  );
};

export default Login;
