import {useEffect} from "react";
import {useParams, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {moviesActions} from "../../../redux";
import {MoviesPrinter} from "../../MoviesPrinter";
import {MoviesPagination} from "../../MoviesPagination";
import {Preloader} from "../../Preloader";
import '../MoviesListCard.css';
import {IParams} from "../../../interfaces";

const MoviesByQuery = () => {
    const {query: userQuery} = useParams<IParams>();
    const {moviesByQuery, isLoading} = useAppSelector(store => store.movies);

    const dispatch = useAppDispatch();

    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page');

    useEffect(() => {
        dispatch(moviesActions.toggleIsLoading(true));
        dispatch(moviesActions.getMoviesByQuery({query: userQuery, page: +page})).then(() => {
            dispatch(moviesActions.toggleIsLoading(false));
        });
    }, [dispatch, page, userQuery]);

    const moviesWithPosters = moviesByQuery && [...moviesByQuery].filter(movie => movie.poster_path);

    return (
        <>
            {isLoading ? <Preloader/> :
                <div className='container'>
                    <h1 className='title'>
                        {`Movies by query "${userQuery}"`}
                    </h1>
                    <MoviesPrinter movies={moviesWithPosters}/>
                    <MoviesPagination/>

                </div>
            }
        </>
    );
};

export {MoviesByQuery};
