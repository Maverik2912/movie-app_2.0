import {useParams, useSearchParams} from "react-router-dom";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {moviesActions} from "../../../redux";
import {Preloader} from "../../Preloader";
import {MoviesPrinter} from "../../MoviesPrinter";
import {MoviesPagination} from "../../MoviesPagination";
import {IParams} from "../../../interfaces";
import '../MoviesListCard.css';

const MoviesByTimePeriod = () => {
    const {year} = useParams<IParams>();
    const {moviesByTime, isLoading} = useAppSelector(store => store.movies);

    const dispatch = useAppDispatch();

    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page');

    useEffect(() => {
        dispatch(moviesActions.toggleIsLoading(true));
        dispatch(moviesActions.getMoviesByTimeInterval({from: year, to: (+year + 9).toString(), page: +page})).then(() => {
            dispatch(moviesActions.toggleIsLoading(false));
        });
    }, [dispatch, page, year]);

    const moviesWithPosters = moviesByTime && [...moviesByTime].filter(movie => movie.poster_path);

    return (

        <>
            {isLoading ? <Preloader/> :
                <div className='container'>
                    <h1 className='title'>
                        {`Movies from ${year} to ${(+year + 9).toString()}`}
                    </h1>
                    <MoviesPrinter movies={moviesWithPosters}/>
                    <MoviesPagination/>

                </div>
            }
        </>
    );
};

export {MoviesByTimePeriod};