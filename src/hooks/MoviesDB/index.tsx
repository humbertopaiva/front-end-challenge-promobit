import axios from "axios";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";

type Movie = {
	title: string;
	id: number;
	release_date: Date;
	poster_path: string;
	genre_ids: number[];
};

type Genre = {
	id: number;
	name: string;
};

type MoviesDBContextProps = {
	popularMovies: Movie[];
	genres: Genre[];
	selectedGenres: number[];
	setSelectedGenres: (genres: number[]) => void;
};

const initalValues = {
	popularMovies: [],
	genres: [],
	selectedGenres: [],
	setSelectedGenres: () => null,
};

const API_KEY = "08111f57e924b7bea8034f62b2326dfb";

export const MoviesDBContext =
	createContext<MoviesDBContextProps>(initalValues);

export const MoviesDBProvider = ({ children }: { children: ReactNode }) => {
	const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
	const [genres, setGenres] = useState<Genre[]>([]);
	const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
	const [moviesByGenres, setMoviesByGenres] = useState<Movie[]>([]);

	useEffect(() => {
		axios(
			`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-BR`
		).then((res) => {
			console.log("generos", res.data);
			setGenres(res.data.genres);
		});

		axios(
			`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`
		).then((res) => setPopularMovies(res.data.results));
	}, []);

	useEffect(() => {
		const newMoviesList = popularMovies.filter((movie) =>
			movie.genre_ids.filter((genre) => selectedGenres.includes(genre))
		);
		console.log(newMoviesList);
	}, [selectedGenres]);

	return (
		<MoviesDBContext.Provider
			value={{ popularMovies, genres, selectedGenres, setSelectedGenres }}
		>
			{children}
		</MoviesDBContext.Provider>
	);
};

export const useMoviesDB = () => useContext(MoviesDBContext);
