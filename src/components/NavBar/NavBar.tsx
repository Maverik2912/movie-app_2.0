import {NavLists} from "./NavLists";
import styles from './NavBar.module.css';
const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <NavLists />
        </div>
    );
};

export {Navbar};