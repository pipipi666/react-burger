import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setRegFormValue, register } from 'services/actions/auth';
import { isAuth } from 'utils/utils';
import Registration from 'components/registration/registration';
import { ROUTES } from 'utils/constsRoute';

export default function RegisterPage() {

    const links = [
        {
            text: "Уже зарегистрированы?",
            button: "Войти",
            path: ROUTES.LOGIN
        }
    ];
    const dispatch = useDispatch();
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const auth = isAuth();
    const { error } = useSelector(state => state.register);
    const { registerFailed } = useSelector(state => state.register);
    const {
        name,
        email,
        password
    } = useSelector(state => state.register.form);

    useEffect(() => {
        if (registerFailed) {
            if (name === '') setErrorName(true);
            if (email === '') setErrorEmail(true);
            if (password === '') setErrorPassword(true);
            else setErrorEmail(true);
        }
    }, [registerFailed, email, name, password]);

    const onFormChange = (e) => {
        dispatch(setRegFormValue(e.target.name, e.target.value))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(register());
    }

    if (auth) {
        return (
            <Redirect to={{ pathname: ROUTES.HOME }} />
        );
    }

    return (
        <Registration
            title="Регистрация"
            buttonName="Зарегистрироваться"
            links={links}
            handleFormSubmit={handleFormSubmit}
            error={error}
        >
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onFormChange}
                value={name}
                name={'name'}
                error={errorName}
                errorText={error}
            />
            <Input
                type={'email'}
                placeholder={'E-mail'}
                onChange={onFormChange}
                value={email}
                name={'email'}
                error={errorEmail}
                errorText={error}
            />
            <PasswordInput
                onChange={onFormChange}
                value={password}
                name={'password'}
                error={errorPassword}
                errorText={error}
            />
        </Registration>
    )
}
