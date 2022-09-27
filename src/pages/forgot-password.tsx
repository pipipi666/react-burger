import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Registration } from 'components/registration/registration';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from 'utils/constsRoute';
import { isAuth } from 'utils/utils';
import { fetchForgotPassword, forgotPasswordFormSet } from 'services/slices/authSlice';
import React, { ChangeEvent, FormEvent, useState } from 'react';

export default function ForgotPasswordPage() {

    const links = [
        {
            text: "Вспомнили пароль?",
            button: "Войти",
            path: ROUTES.LOGIN
        }
    ];
    const history = useHistory();
    const dispatch = useDispatch<any>();
    const auth = isAuth();
    const [isEmptyEmail, setEmptyEmail] = useState(false);
    const { email } = useSelector((state: any) => state.auth.formForgotPassword);

    const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(forgotPasswordFormSet([e.target.name, e.target.value]))
    }

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email) {
            dispatch(fetchForgotPassword());
            history.push({
                pathname: ROUTES.RESET_PASSWORD,
                state: { from: ROUTES.FORGOT_PASSWORD }
            });
        }
        else setEmptyEmail(true)
    }

    if (auth) {
        return (
            <Redirect to={ROUTES.HOME} />
        );
    }

    return (
        <Registration
            title="Восстановление пароля"
            buttonName="Восстановить"
            links={links}
            handleFormSubmit={handleFormSubmit}
        >
            <Input
                type={'email'}
                placeholder={'Укажите e-mail'}
                onChange={onFormChange}
                value={email}
                name={'email'}
                error={isEmptyEmail}
            />
        </Registration>
    )
}
