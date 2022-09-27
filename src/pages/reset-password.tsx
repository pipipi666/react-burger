import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { Registration } from 'components/registration/registration';
import { isAuth } from 'utils/utils';
import { ROUTES } from 'utils/constsRoute';
import { fetchResetPassword, resetPasswordFormSet } from 'services/slices/authSlice';
import { ChangeEvent, FormEvent, useState } from 'react';

interface LocationState {
    from: string;
}


export default function ResetPasswordPage() {

    const links = [
        {
            text: "Вспомнили пароль?",
            button: "Войти",
            path: ROUTES.LOGIN
        }
    ];
    const dispatch = useDispatch<any>();
    const location = useLocation<LocationState>();
    const auth = isAuth();
    const [isEmptyPassword, setEmptyPassword] = useState(false);
    const [isEmptyToken, setEmptyToken] = useState(false);
    const { error, resetPasswordFailed } = useSelector((state: any) => state.auth);
    const { password, token } = useSelector((state: any) => state.auth.formResetPassword);
    const { resetPasswordSuccess } = useSelector((state: any) => state.auth);

    const onFormChange = (e:  ChangeEvent<HTMLInputElement>) => {
        dispatch(resetPasswordFormSet([e.target.name, e.target.value]))
    }

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password && token) dispatch(fetchResetPassword());
        else {
            setEmptyPassword(!password)
            setEmptyToken(!token)
        }
    }

    if (auth) {
        return (
            <Redirect to={ROUTES.HOME} />
        );
    }

    if (location.state?.from !== ROUTES.FORGOT_PASSWORD) {
        return (
            <Redirect to={ROUTES.FORGOT_PASSWORD} />
        );
    }

    if (resetPasswordSuccess) {
        return (
            <Redirect to={ROUTES.LOGIN} />
        );
    }

    return (
        <Registration
            title="Восстановление пароля"
            buttonName="Сохранить"
            links={links}
            handleFormSubmit={handleFormSubmit}
        >
            <Input
                type={'password'}
                placeholder={'Введите новый пароль'}
                icon={'ShowIcon'}
                onChange={onFormChange}
                value={password}
                name={'password'}
                error={isEmptyPassword}
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={onFormChange}
                value={token}
                name={'token'}
                error={isEmptyToken}
                errorText={resetPasswordFailed ? error : ''}
            />
        </Registration>
    )
}