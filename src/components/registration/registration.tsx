import style from './style.module.scss';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';
import { FC, FormEvent, ReactNode } from 'react';

interface ILink {
    text: string;
    button: string;
    path: string;
}

interface IProps {
    title: string;
    buttonName: string;
    links: Array<ILink>;
    handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
}

export const Registration: FC<IProps> = ({
    title, buttonName, links, handleFormSubmit, children
}) => {

    const history = useHistory();
    const handleClick = (path: string) => {
        history.push({ pathname: path });
    }

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <form className={style.main} onSubmit={handleFormSubmit}>
                    <h2 className="text text_type_main-medium mt-10">
                        {title}
                    </h2>
                    {children}
                    {/* @ts-ignore */}
                    <Button htmlType="submit" type='primary' size='large'>
                        {buttonName}
                    </Button>
                </form>
                {links.map((item, index: number) => (
                    <p
                        key={index}
                        className='text text_type_main-default text_color_inactive mb-4'
                    >
                        <span className='pr-2'>{item.text}</span>
                        {/* @ts-ignore */}
                        <Button type="secondary" onClick={() => handleClick(item.path)}>
                            {item.button}
                        </Button>
                    </p>
                ))}
            </div>
        </div>
    );
}
