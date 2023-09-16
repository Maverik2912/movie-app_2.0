import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import styles from './SearchInput.module.css';
import {links} from "../../../constants";
import {moviesActions} from "../../../redux";
import {FoundMovie} from "../FoundMovie";
import {IMovie} from "../../../interfaces";

const SearchInput = () => {
    const {isDark} = useAppSelector(store => store.theme);
    const {moviesByQuery} = useAppSelector(store => store.movies);
    const [moviesToShow, setMoviesToShow] = useState<IMovie[]>([]);

    const dispatch = useAppDispatch();

    const [query, setQuery] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>();
    const searchListRef = useRef<HTMLUListElement>();

    window.addEventListener('click', (e: MouseEvent) => {
        if (e.target === inputRef.current || e.target === searchListRef.current) {
            return;
        }
        setQuery('');
    })

    useEffect(() => {
        if (query) {
            dispatch(moviesActions.getMoviesByQuery({query, page: 1}));
        }
    }, [query, dispatch]);

    useEffect(() => {
        const sortedMoviesList = [...moviesByQuery].sort((a, b) => b.popularity - a.popularity)
            .slice(0, 5);
        setMoviesToShow(sortedMoviesList);
    }, [moviesByQuery]);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.inputContainer}>
                <input
                    ref={inputRef}
                    className={`${styles.input} ${isDark ? styles.dark : styles.light}`}
                    type="text"
                    placeholder='Search movies...'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                {query &&
                    <ul ref={searchListRef} className={`${styles.searchList} ${isDark ? styles.dark : styles.light}`}>
                        {moviesByQuery.length ? moviesToShow.map(
                                movie => <FoundMovie key={movie.id} movie={movie}/>)
                            : <li className={styles.noMovies}>No movies were found for your search</li>
                        }
                        {moviesByQuery.length > 5 &&
                            <Link className={`${styles.seeAll} ${isDark ? styles.dark : styles.light}`} to={`${links.QUERY}/${query}`}>See all</Link>
                        }
                    </ul>
                }

            </div>
        </div>
    );
};

export {SearchInput};