import {IGenre} from "./genres.interface";

export interface IMovies {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export interface IMovie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    },
    budget: number;
    genres: IGenre[],
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: IProductionCompany[],
    production_countries: IProductionCountry[],
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: ISpokenLanguage[],
    status: string;
    tagline: string;
    title?: string;
    name?: string;
    video: boolean;
    vote_average: number;
    vote_count: number
}

export interface IProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface IProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface ISpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}