import style from './style.module.css';

export default function FeedInfo() {
    const done = [
        '034530',
        '034531',
        '034533',
        '034535',
        '034539'
    ]

    return (
        <section className={style.wrapper}>
            <div className={style.lists}>
                <div className={style.list}>
                    <p className="text text_type_main-medium">Готовы:</p>
                    <ul className={style.ul}>
                        {done.map(order => <li className={`text text_type_digits-default ${style.li} ${style.done}`} key={order}>{order}</li>)}
                    </ul>
                </div>
                <div className={style.list}>
                    <p className="text text_type_main-medium">В работе:</p>
                    <ul className={style.ul}>
                        {done.map(order => <li className={`text text_type_digits-default ${style.li}`} key={order}>{order}</li>)}
                    </ul>
                </div>
            </div>
            <div>
                <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
                <p className="text text_type_digits-large">28 752</p>
            </div>
            <div>
                <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
                <p className="text text_type_digits-large">138</p>
            </div>
        </section>
    );
}
