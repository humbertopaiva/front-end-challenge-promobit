import { createContext, useContext, useState, ReactNode } from "react";

// interface Movie {
// 	title: string;
// 	id: number;
// 	release_date: Date;
// 	poster_path: string;
// 	genre_ids: number[];
// }

type Genre = {
	id: number;
	name: string;
};

type MoviesDBContextProps = {
	popularMovies: Movie[];
	genres: Genre[];
	selectedGenres: number[];
	currentPage: number;
	totalPages: number;
	setPopularMovies: (movies: Movie[]) => void;
	setGenres: (genres: Genre[]) => void;
	setSelectedGenres: (genres: number[]) => void;
	setCurrentPage: (page: number) => void;
	setTotalPages: (number: number) => void;
};

const initalValues = {
	popularMovies: [],
	totalPages: 0,
	genres: [],
	selectedGenres: [],
	currentPage: 1,
	setPopularMovies: () => null,
	setGenres: () => null,
	setSelectedGenres: () => null,
	setCurrentPage: () => null,
	setTotalPages: () => null,
};

export const MoviesDBContext =
	createContext<MoviesDBContextProps>(initalValues);

export const MoviesDBProvider = ({ children }: { children: ReactNode }) => {
	const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
	const [genres, setGenres] = useState<Genre[]>([]);
	const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);

	return (
		<MoviesDBContext.Provider
			value={{
				popularMovies,
				genres,
				totalPages,
				currentPage,
				setPopularMovies,
				selectedGenres,
				setSelectedGenres,
				setCurrentPage,
				setTotalPages,
				setGenres,
			}}
		>
			{children}
		</MoviesDBContext.Provider>
	);
};

export const useMoviesDB = () => useContext(MoviesDBContext);
