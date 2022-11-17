import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Redirect, useLocation } from "react-router-dom";
import Registration from "components/registration/registration";
import { isAuth } from "utils/utils";
import { ROUTES } from "utils/constsRoute";
import {
  fetchResetPassword,
  resetPasswordFormSet,
} from "services/slices/authSlice";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import { ILocationState } from "utils/types";

export default function ResetPasswordPage() {
  const links = [
    {
      text: "Вспомнили пароль?",
      button: "Войти",
      path: ROUTES.LOGIN,
    },
  ];
  const dispatch = useAppDispatch();
  const location = useLocation<ILocationState>();
  const auth = isAuth();
  const [isEmptyPassword, setEmptyPassword] = useState(false);
  const [isEmptyToken, setEmptyToken] = useState(false);
  const { error, resetPasswordFailed } = useAppSelector((state) => state.auth);
  const { password, token } = useAppSelector(
    (state) => state.auth.formResetPassword
  );
  const { resetPasswordSuccess } = useAppSelector((state) => state.auth);

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      resetPasswordFormSet({ name: e.target.name, value: e.target.value })
    );
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password && token) {
      dispatch(fetchResetPassword());
    } else {
      setEmptyPassword(!password);
      setEmptyToken(!token);
    }
  };

  if (auth) {
    return <Redirect to={ROUTES.HOME} />;
  }

  if (location.state?.from !== ROUTES.FORGOT_PASSWORD) {
    return <Redirect to={ROUTES.FORGOT_PASSWORD} />;
  }

  if (resetPasswordSuccess) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  return (
    <Registration
      title="Восстановление пароля"
      buttonName="Сохранить"
      links={links}
      handleFormSubmit={handleFormSubmit}
    >
      <Input
        type={"password"}
        placeholder={"Введите новый пароль"}
        icon={"ShowIcon"}
        onChange={onFormChange}
        value={password}
        name={"password"}
        error={isEmptyPassword}
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={onFormChange}
        value={token}
        name={"token"}
        error={isEmptyToken}
        errorText={resetPasswordFailed ? error : ""}
      />
    </Registration>
  );
}
