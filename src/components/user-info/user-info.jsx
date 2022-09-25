import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, profileFormSet, updateProfile } from 'services/slices/authSlice';
import style from './style.module.scss';

export default function UserInfo() {

    const dispatch = useDispatch();
    const [changed, setChanged] = useState(false);
    const { getProfileRequest, getProfileFailed, setProfileRequest, setProfileFailed } = useSelector(state => state.auth);
    const {
        nameUser,
        emailUser
    } = useSelector(state => state.auth.user);
    const {
        name,
        email
    } = useSelector(state => state.auth.formProfile);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorName, setErrorName] = useState(false);

    useEffect(() => {
        !nameUser && !emailUser && dispatch(fetchProfile());
    }, [nameUser, emailUser, dispatch]);

    useEffect(() => {
        (email !== emailUser || name !== nameUser) ? setChanged(true) : setChanged(false);
    }, [email, emailUser, name, nameUser]);

    const onFormChange = (e) => {
        dispatch(profileFormSet([e.target.name, e.target.value]));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && name) dispatch(updateProfile());
        else {
            setErrorName(!name);
            setErrorEmail(!email);
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        dispatch(profileFormSet(['email', emailUser]));
        dispatch(profileFormSet(['name', nameUser]));
    }

    const loading = (
        <p className="text text_type_main-medium">
            Загрузка...
        </p>
    );

    const fail = (
        <p className="text text_type_main-medium">
            Ошибка выполнения запроса
        </p>
    );

    const success = (
        <form className={style.content} onSubmit={handleSubmit}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onFormChange}
                value={name}
                name={'name'}
                icon='EditIcon'
                error={errorName}
            />
            <Input
                type={'email'}
                placeholder={'Логин'}
                onChange={onFormChange}
                value={email}
                name={'email'}
                icon='EditIcon'
                error={errorEmail}
            />
            <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={onFormChange}
                value={'password'}
                name={'password'}
                icon='EditIcon'
            />
            {
                changed && (
                    <div className={style.btns}>
                        <Button
                            type="secondary"
                            onClick={handleCancelClick}
                        >
                            Отмена
                        </Button>
                        <Button
                            htmlType="submit"
                            type='primary'
                            size='large'
                        >
                            Сохранить
                        </Button>
                    </div>
                )}
        </form>
    )

    return (
        <div className={style.wrapper}>
            {getProfileRequest || setProfileRequest ? loading
                : getProfileFailed || setProfileFailed ? fail
                    : success}
        </div>
    );
}
