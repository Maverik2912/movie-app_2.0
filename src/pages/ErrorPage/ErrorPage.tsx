import {useRouteError} from "react-router-dom";

import styles from '../../layouts/MainLayout/MainLayout.module.css';
import {useAppSelector} from "../../hooks";
import {Header, SideBar} from "../../components";

const ErrorPage = () => {
    const error: unknown = useRouteError();
    const {isDark} = useAppSelector(store => store.theme);
    return (
        <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
            <div>
                <SideBar />
                <div className={styles.hide}></div>
            </div>
            <div>
                <Header />
                <h1>
                    {(error as Error)?.message || (error as { statusText?: string })?.statusText}
                </h1>
            </div>
        </div>
    );
};

export {ErrorPage};