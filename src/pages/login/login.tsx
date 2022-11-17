import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Redirect, useLocation } from "react-router-dom";
import { isAuth } from "utils/utils";
import Registration from "components/registration/registration";
import { fetchLogin, loginFormSet } from "services/slices/authSlice";
import { ROUTES } from "utils/constsRoute";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import { ILocationState } from "utils/types";

export default function LoginPage() {
  const links = [
    {
      text: "Вы - новый пользователь?",
      button: "Зарегистрироваться",
      path: ROUTES.REGISTER,
    },
    {
      text: "Забыли пароль?",
      button: "Восстановить пароль",
      path: ROUTES.FORGOT_PASSWORD,
    },
  ];
  const dispatch = useAppDispatch();
  const location = useLocation<ILocationState>();
  const { error, loginFailed } = useAppSelector((state) => state.auth);
  const { email, password } = useAppSelector((state) => state.auth.formLogin);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const auth = isAuth();
  const nextLocation = location.state?.from || ROUTES.HOME;

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(loginFormSet({ name: e.target.name, value: e.target.value }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      dispatch(fetchLogin());
    } else {
      setErrorPassword(!password);
      setErrorEmail(!email);
    }
  };

  if (auth) {
    return <Redirect to={nextLocation} />;
  }

  return (
    <Registration
      title="Вход"
      buttonName="Войти"
      links={links}
      handleFormSubmit={handleFormSubmit}
    >
      <Input
        type={"email"}
        placeholder={"E-mail"}
        onChange={onFormChange}
        value={email}
        name={"email"}
        error={errorEmail || loginFailed}
      />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        onChange={onFormChange}
        value={password}
        name={"password"}
        error={errorPassword || loginFailed}
        errorText={loginFailed ? error : ""}
      />
    </Registration>
  );
}
