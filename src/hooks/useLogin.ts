import { useState } from "react";
import type { LoginDto } from "../types/login";
import { useDispatch } from "react-redux";
import { handleIsAuthenticated } from "../features/globalSlice ";

const authUrl = "http://188.245.202.61/allstore-ms/v1/api/auth/login";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const login = async (value: LoginDto) => {
    setIsLoading(true);
    try {
      const response = await fetch(authUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: value.username.trim(),
          password: value.password.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        console.log("Hər şey qaydasındadır");
        console.log(data);
        dispatch(handleIsAuthenticated(true));
      } else {
        dispatch(handleIsAuthenticated(false));
        // console.log("Yanlış istifadəki")
      }
    } catch (error) {
      // console.log("Error oldu");
      dispatch(handleIsAuthenticated(false));
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};
