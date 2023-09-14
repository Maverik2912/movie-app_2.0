import {useAppSelector} from "../../hooks";
import styles from './SideBar.module.css';
import {UserInfo} from "../UserInfo";
import {SignOut} from "../SignOut";
import {Navbar} from "../NavBar";
const SideBar = () => {
    const {isDark} = useAppSelector(store => store.theme);

    return (
        <div className={`${styles.sidebar} ${isDark ? styles.dark : styles.light}`}>
            <UserInfo />
            <Navbar />
            <SignOut />
        </div>
    );
};

export {SideBar};