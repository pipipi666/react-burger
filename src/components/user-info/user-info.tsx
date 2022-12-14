import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "components/loader/loader";
import {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { profileFormSet, updateProfile } from "services/slices/authSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import { Button } from "utils/libComponentsWithTypes";
import style from "./style.module.scss";

export default function UserInfo() {
  const dispatch = useAppDispatch();
  const [changed, setChanged] = useState(false);
  const {
    getProfileRequest,
    getProfileFailed,
    setProfileRequest,
    setProfileFailed,
  } = useAppSelector((state) => state.auth);
  const { nameUser, emailUser } = useAppSelector((state) => state.auth.user);
  const { name, email } = useAppSelector((state) => state.auth.formProfile);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorName, setErrorName] = useState(false);

  useEffect(() => {
    email !== emailUser || name !== nameUser
      ? setChanged(true)
      : setChanged(false);
  }, [email, emailUser, name, nameUser]);

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(profileFormSet({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && name) {
      dispatch(updateProfile());
    } else {
      setErrorName(!name);
      setErrorEmail(!email);
    }
  };

  const handleCancelClick = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    dispatch(profileFormSet({ name: "email", value: emailUser }));
    dispatch(profileFormSet({ name: "name", value: nameUser }));
  };

  const success = (
    <form className={style.content} onSubmit={handleSubmit}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onFormChange}
        value={name}
        name={"name"}
        icon="EditIcon"
        error={errorName}
      />
      <Input
        type={"email"}
        placeholder={"Логин"}
        onChange={onFormChange}
        value={email}
        name={"email"}
        icon="EditIcon"
        error={errorEmail}
      />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        onChange={onFormChange}
        value={"password"}
        name={"password"}
        icon="EditIcon"
      />
      {changed && (
        <div className={style.btns}>
          <Button type="secondary" onClick={handleCancelClick}>
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );

  return (
    <div className={style.wrapper}>
      {getProfileRequest || setProfileRequest ? (
        <div className={style.loader}>
          <Loader />
        </div>
      ) : getProfileFailed || setProfileFailed ? (
        <p className="text text_type_main-medium">Ошибка выполнения запроса</p>
      ) : (
        success
      )}
    </div>
  );
}
