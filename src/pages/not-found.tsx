import style from './not-found.module.scss'

export default function NotFoundPage() {

    return (
        <main className={style.main}>
            <p className="text text_type_digits-large">
                404
            </p>
            <p className="text text_type_main-large">
                Страница не найдена
            </p>
        </main>
    )
}
