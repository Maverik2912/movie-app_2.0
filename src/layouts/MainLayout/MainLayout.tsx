import {Outlet, ScrollRestoration, useNavigation} from "react-router-dom";

import styles from './MainLayout.module.css';
import {Header, Preloader, SideBar} from "../../components";
import {useAppSelector, useAppTitle} from "../../hooks";

const MainLayout = () => {
    const navigation = useNavigation();
    const {isDark} = useAppSelector(store => store.theme);

    useAppTitle('App Movies');

    return (
            <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
                <div>
                    <SideBar />
                    <div className={styles.hide}></div>
                </div>
                <div>
                    <Header />
                    {navigation.state === 'loading' ? <Preloader /> :
                        <>
                            <Outlet/>
                            <ScrollRestoration/>
                        </>
                    }
                </div>
            </div>
    );
};

export {MainLayout};













