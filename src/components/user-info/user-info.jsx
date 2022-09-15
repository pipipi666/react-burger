import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileFormValue, getProfile, updateProfile } from 'services/actions/auth';
import style from './style.module.css';

export default function UserInfo() {

    const dispatch = useDispatch();
    const [changed, setChanged] = useState(false);
    const { getProfileRequest, getProfileFailed } = useSelector(state => state.profile);
    const {
        name,
        email
    } = useSelector(state => state.profile.form);

    useEffect(() => {
        !email && dispatch(getProfile());
    }, [dispatch, email]);

    const onFormChange = (e) => {
        dispatch(setProfileFormValue(e.target.name, e.target.value));
        setChanged(true);
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(updateProfile());
        setChanged(true);
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        dispatch(getProfile());
        setChanged(false);
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
        <div className={style.content}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onFormChange}
                value={name}
                name={'name'}
                icon='EditIcon'
            />
            <Input
                type={'email'}
                placeholder={'Логин'}
                onChange={onFormChange}
                value={email}
                name={'email'}
                icon='EditIcon'
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
                            onClick={handleClick}
                        >
                            Сохранить
                        </Button>
                    </div>
                )}
        </div>
    )

    return (
        <div className={style.wrapper}>
            {getProfileRequest ? loading
                : getProfileFailed ? fail
                    : success}
        </div>
    );
}
