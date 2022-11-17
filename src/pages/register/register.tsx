import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useState } from "react";
import { Redirect } from "react-router-dom";
import { isAuth } from "utils/utils";
import Registration from "components/registration/registration";
import { ROUTES } from "utils/constsRoute";
import { fetchRegister, registerFormSet } from "services/slices/authSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks";

export default function RegisterPage() {
  const links = [
    {
      text: "Уже зарегистрированы?",
      button: "Войти",
      path: ROUTES.LOGIN,
    },
  ];
  const dispatch = useAppDispatch();
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const auth = isAuth();
  const { error, registerFailed } = useAppSelector((state) => state.auth);
  const { name, email, password } = useAppSelector(
    (state) => state.auth.formRegister
  );

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(registerFormSet({ name: e.target.name, value: e.target.value }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && email && password) dispatch(fetchRegister());
    setErrorName(!name);
    setErrorEmail(!email);
    setErrorPassword(!password);
  };

  if (auth) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <Registration
      title="Регистрация"
      buttonName="Зарегистрироваться"
      links={links}
      handleFormSubmit={handleFormSubmit}
    >
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onFormChange}
        value={name}
        name={"name"}
        error={errorName}
      />
      <Input
        type={"email"}
        placeholder={"E-mail"}
        onChange={onFormChange}
        value={email}
        name={"email"}
        error={errorEmail || registerFailed}
        errorText={errorEmail ? "" : error}
      />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        onChange={onFormChange}
        value={password}
        name={"password"}
        error={errorPassword}
      />
    </Registration>
  );
}
