import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { setLoginFormValue, login } from 'services/actions/auth';
import { isAuth } from 'utils/utils';
import Registration from 'components/registration/registration';
import { ROUTES } from 'utils/constsRoute';

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
    const { error } = useSelector(state => state.user);
    let auth = isAuth();
    const { email, password } = useSelector(state => state.user.form);
    const nextLocation = location.state?.from.pathname || ROUTES.HOME;

    const onFormChange = (e) => {
        dispatch(setLoginFormValue(e.target.name, e.target.value))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(login());
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
                error={!!error}
                errorText={error}
            />
            <PasswordInput
                onChange={onFormChange}
                value={password}
                name={'password'}
                error={!!error}
                errorText={error}
            />
        </Registration>
    )
}