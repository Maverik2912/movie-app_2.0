import {createTheme, Pagination, ThemeProvider} from "@mui/material";
import {ChangeEvent} from "react";
import {useSearchParams} from "react-router-dom";

import {useAppSelector} from "../../hooks";
import styles from './MoviesPaginator.module.css';
const MoviesPagination = () => {
    const {isDark} = useAppSelector(store => store.theme);

    const {total_pages} = useAppSelector(store => store.movies);
    const [query, setQuery] = useSearchParams({page: '1'});

    const changePage = (e: ChangeEvent<unknown>, page: number) => {
        setQuery({page: page.toString()})
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <div className={styles.wrapper}>
            {total_pages &&
                <ThemeProvider theme={isDark && darkTheme}>
                    <Pagination
                    count={total_pages > 500 ? 500 : total_pages}
                    showFirstButton
                    showLastButton
                    defaultPage={+query.get('page')}
                    onChange={changePage}
                />
                </ThemeProvider>
            }
        </div>
    );
};

export {MoviesPagination};