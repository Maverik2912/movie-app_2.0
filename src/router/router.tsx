import {createBrowserRouter, Navigate} from "react-router-dom";

import {links} from "../constants";
import {ErrorPage, MovieInfoPageLoader, MoviesListPageLoader} from "../pages";

export const router = createBrowserRouter([
    {
        async lazy() {
          const {MainLayout} = await import('../layouts/MainLayout/MainLayout');
          return {
              Component: MainLayout,
              errorElement: <ErrorPage />
          }
        },
        children: [
            {
                index: true,
                element: <Navigate to={links.MOVIES} />,
            },
            {
                path: links.MOVIES,
                async lazy() {
                  const {MoviesListPage} = await import('../pages//MoviesListPage/MoviesListPage');
                  return {
                      Component: MoviesListPage,
                      loader: MoviesListPageLoader
                  }
                },
            },
            {
                path: `${links.MOVIES}/:movieId`,
                async lazy() {
                  const {MovieInfoPage} = await import('../pages/MovieInfoPage/MoviesInfoPage');
                  return {
                      Component: MovieInfoPage,
                      loader: MovieInfoPageLoader
                  }
                },
            },
            {
                path: `${links.GENRES}/:genreName/:genreId`,
                async lazy() {
                  const {MoviesByGenrePage} = await import('../pages/MoviesByGenrePage/MoviesByGenrePage');
                  return {
                      Component: MoviesByGenrePage,
                  }
                },
            },
            {
                path: `${links.TIME}/:year`,
                async lazy() {
                  const {MoviesListTimePage} = await import('../pages/MoviesListTimePage/MoviesListTimePage');
                  return {
                      Component: MoviesListTimePage,
                  }
                },
            },
            {
                path: `${links.QUERY}/:query`,
                async lazy() {
                  const {MoviesByQueryPage} = await import('../pages/MoviesByQueryPage/MoviesByQueryPage');
                  return {
                      Component: MoviesByQueryPage,
                  }
                },
            }
        ]
    }
])