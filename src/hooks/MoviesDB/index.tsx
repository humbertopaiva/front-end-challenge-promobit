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
};

type Genre = {
	id: number;
	name: string;
};

type MoviesDBContextProps = {
	popularMovies: Movie[];
	genres: Genre[];
};

const API_KEY = "08111f57e924b7bea8034f62b2326dfb";

export const MoviesDBContext = createContext<MoviesDBContextProps>({
	popularMovies: [],
	genres: [],
});

export const MoviesDBProvider = ({ children }: { children?: ReactNode }) => {
	const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
	const [genres, setGenres] = useState<Genre[]>([]);

	useEffect(() => {
		axios(
			`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-BR`
		).then((res) => setGenres(res.data.genres));

		axios(
			`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
		).then((res) => setPopularMovies(res.data.results));
	}, []);

	return (
		<MoviesDBContext.Provider value={{ popularMovies, genres }}>
			{children}
		</MoviesDBContext.Provider>
	);
};

export const useMoviesDB = () => useContext(MoviesDBContext);
