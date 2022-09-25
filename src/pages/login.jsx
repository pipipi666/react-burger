import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { isAuth } from 'utils/utils';
import Registration from 'components/registration/registration';
import { fetchLogin, loginFormSet } from 'services/slices/authSlice';
import { ROUTES } from 'utils/constsRoute';
import { useState } from 'react';

export default function LoginPage() {
    const links = [
        {
            text: "Вы - новый пользователь?",
            button: "Зарегистрироваться",
            path: ROUTES.REGISTER
        },
        {
            text: "Забыли пароль?",
            button: "Восстановить пароль",
            path: ROUTES.FORGOT_PASSWORD
        }
    ];
    const dispatch = useDispatch();
    const location = useLocation();
    const { error, loginFailed } = useSelector(state => state.auth);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const auth = isAuth();
    const { email, password } = useSelector(state => state.auth.formLogin);
    const nextLocation = location.state?.from.pathname || ROUTES.HOME;

    const onFormChange = (e) => {
        dispatch(loginFormSet([e.target.name, e.target.value]));
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (email && password) dispatch(fetchLogin());
        else {
            setErrorPassword(!password);
            setErrorEmail(!email);
        }
    }

    if (auth) {
        return (
            <Redirect to={nextLocation} />
        );
    }

    return (
        <Registration
            title="Вход"
            buttonName="Войти"
            links={links}
            handleFormSubmit={handleFormSubmit}
        >
            <Input
                type={'email'}
                placeholder={'E-mail'}
                onChange={onFormChange}
                value={email}
                name={'email'}
                error={errorEmail || loginFailed}
            />
            <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={onFormChange}
                value={password}
                name={'password'}
                error={errorPassword || loginFailed}
                errorText={loginFailed ? error : ""}
            />
        </Registration>
    )
}