import {useEffect} from "react";
import {Switch} from "@mui/material";

import styles from './Header.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {moviesActions, themeActions} from "../../redux";
import {SearchInput} from "./SearchInput";
import {GenreSelect} from "./GenreSelect/GenreSelect";
import {TimeSelect} from "./TimeSelect/TimeSelect";

const Header = () => {
    const {isDark} = useAppSelector(store => store.theme);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(moviesActions.getGenres());
    }, [dispatch]);

    return (
        <header className={isDark ? styles.dark : styles.light}>
            <div className={styles.gridContainer}>
                <div className={styles.switchContainer}>
                    <div className={`${styles.switch} ${isDark ? styles.dark : styles.light}`}><Switch onChange={() => dispatch(themeActions.toggleTheme())} defaultChecked color="default"/></div>
                </div>

                <GenreSelect />
                <TimeSelect />
                <SearchInput />
            </div>
        </header>
    );
};

export {Header};