import {FC, PropsWithChildren} from 'react';
import {NavLink} from "react-router-dom";

import {INavList} from "../../../interfaces";
import styles from './NavList.module.css';
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {genId} from "../../../utils";
import {links} from "../../../constants";
import {headerActions} from "../../../redux";

interface INavListProps extends PropsWithChildren {
    navList: INavList;
}

const NavList: FC<INavListProps> = ({navList}) => {
    const {title, items} = navList;

    const {isDark} = useAppSelector(store => store.theme);
    const {selectedValue} = useAppSelector(store => store.header);

    const dispatch = useAppDispatch();

    const clickHandler = () => {
        selectedValue.genre && dispatch(headerActions.setSelectGenre(''));
        selectedValue.time && dispatch(headerActions.setSelectTime(''));
    }

    return (
        <div className={styles.navList}>
            <h4 className={`${styles.title} ${isDark ? styles.dark : styles.light}`}>{title}</h4>
            <ul>
                {items.map(item => {
                    if (item === 'Movies') {
                        return <NavLink
                            onClick={clickHandler}
                            key={genId(4)}
                            className={isActive => isActive ? styles.active : styles.link}
                            id={isDark ? styles.dark : styles.light}
                            to={links.MOVIES}>{item}</NavLink>
                    } else {
                        return <li key={genId(4)} className={`${styles.item} ${isDark ? styles.dark : styles.light}`}>{item}</li>
                    }
                })}
            </ul>
        </div>
    );
};

export {NavList};