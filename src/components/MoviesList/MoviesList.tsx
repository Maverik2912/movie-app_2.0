import {useLoaderData} from "react-router-dom";
import {useEffect} from "react";

import styles from './MoviesList.module.css';
import {IMovie} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {moviesActions} from "../../redux";
import {Carousel} from "../Carousel";

interface IMoviesListData {
    trendingMovies: IMovie[];
    upcomingMovies: IMovie[];
    topRatedMovies: IMovie[];
}

const MoviesList = () => {
    const {trendingMovies: trending, upcomingMovies: upcoming, topRatedMovies: topRated} = useLoaderData() as IMoviesListData;

    const {trendingMovies, upcomingMovies, topRatedMovies} = useAppSelector(store => store.movies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(moviesActions.setTrendingMovies(trending));
        dispatch(moviesActions.setTopRatedMovies(topRated));
        dispatch(moviesActions.setUpcomingMovies(upcoming));
    }, [dispatch, trending, upcoming, topRated]);

    return (
        <div className={styles.container}>
            <Carousel movies={upcomingMovies} title='Upcoming' translateX='100%' />
            <Carousel movies={trendingMovies} title='Trending Now' translateX='100%' />
            <Carousel movies={topRatedMovies} title='Top Rated All Time' translateX='100%' />
        </div>
    );
};

export {MoviesList};