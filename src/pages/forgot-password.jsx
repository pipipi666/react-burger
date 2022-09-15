import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Registration from 'components/registration/registration';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setResetPasswordFormValue, resetPassword } from 'services/actions/auth';
import { ROUTES } from 'utils/constsRoute';
import { isAuth } from 'utils/utils';

export default function ForgotPasswordPage() {

    const links = [
        {
            text: "Вспомнили пароль?",
            button: "Войти",
            path: ROUTES.LOGIN
        }
    ];
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = isAuth();
    const { email } = useSelector(state => state.resetPassword.form);

    const onFormChange = (e) => {
        dispatch(setResetPasswordFormValue(e.target.name, e.target.value))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword());
        history.push({
            pathname: ROUTES.RESET_PASSWORD,
            state: { from: ROUTES.FORGOT_PASSWORD }
        });
    }

    if (auth) {
        return (
            <Redirect to={{ pathname: ROUTES.HOME }} />
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
            />
        </Registration>
    )
}
