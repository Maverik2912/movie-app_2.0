import styles from './NavLists.module.css';
import {navLists} from "../../../constants";
import {NavList} from "../NavList";

const NavLists = () => {
    return (
        <div className={styles.navLists}>
            {navLists.map(navList => <NavList key={navList.title} navList={navList} /> )}
        </div>
    );
};

export {NavLists};