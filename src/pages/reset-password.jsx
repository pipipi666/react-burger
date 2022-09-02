import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { setSetPasswordFormValue, setPassword } from 'services/actions/auth';
import Registration from 'components/registration/registration';
import { isAuth } from 'utils/utils';
import { ROUTES } from 'utils/constsRoute';

export default function ResetPasswordPage() {

    const links = [
        {
            text: "Вспомнили пароль?",
            button: "Войти",
            path: ROUTES.LOGIN
        }
    ];
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const auth = isAuth();
    const { password, token } = useSelector(state => state.setPassword.form);

    const onFormChange = (e) => {
        dispatch(setSetPasswordFormValue(e.target.name, e.target.value))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(setPassword());
        history.push({ pathname: ROUTES.LOGIN });
    }

    if (auth) {
        return (
            <Redirect to={{ pathname: ROUTES.HOME }} />
        );
    }

    if (location.state?.from !== ROUTES.FORGOT_PASSWORD) {
        return (
            <Redirect to={{ pathname: ROUTES.FORGOT_PASSWORD }} />
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
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={onFormChange}
                value={token}
                name={'token'}
            />
        </Registration>
    )
}
