import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isAuth } from 'utils/utils';
import { Registration } from 'components/registration/registration';
import { ROUTES } from 'utils/constsRoute';
import { fetchRegister, registerFormSet } from 'services/slices/authSlice';

export default function RegisterPage() {

    const links = [
        {
            text: "Уже зарегистрированы?",
            button: "Войти",
            path: ROUTES.LOGIN
        }
    ];
    const dispatch = useDispatch<any>();
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const auth = isAuth();
    const { error } = useSelector((state: any) => state.auth);
    const { registerFailed } = useSelector((state: any) => state.auth);
    const {
        name,
        email,
        password
    } = useSelector((state: any) => state.auth.formRegister);

    const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(registerFormSet([e.target.name, e.target.value]))
    }

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name && email && password) dispatch(fetchRegister());
        setErrorName(!name);
        setErrorEmail(!email);
        setErrorPassword(!password);
    }

    if (auth) {
        return (
            <Redirect to={ROUTES.HOME} />
        );
    }

    return (
        <Registration
            title="Регистрация"
            buttonName="Зарегистрироваться"
            links={links}
            handleFormSubmit={handleFormSubmit}
        >
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onFormChange}
                value={name}
                name={'name'}
                error={errorName}
            />
            <Input
                type={'email'}
                placeholder={'E-mail'}
                onChange={onFormChange}
                value={email}
                name={'email'}
                error={errorEmail || registerFailed}
                errorText={errorEmail ? "" : error}
            />
            <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={onFormChange}
                value={password}
                name={'password'}
                error={errorPassword}
            />
        </Registration>
    )
}
