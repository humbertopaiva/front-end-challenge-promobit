import axios from "axios";

const API_KEY = "08111f57e924b7bea8034f62b2326dfb";

const api = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
});

const getGenresList = () => {
	return api.get(`genre/movie/list?api_key=${API_KEY}&language=pt-BR`);
};

const getMoviesList = (page: number) => {
	return api.get(
		`movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`
	);
};

const moviedbApi = {
	getGenresList,
	getMoviesList,
};

// const moviedbApi = () => {
// 	const getGenresList = async (apiKey: string) => {
// 		const response = await axios(
// 			`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR`
// 		);

// 		return response;
// 	};

// 	const getMovieInfos = async ({
// 		apiKey,
// 		movieId,
// 	}: {
// 		apiKey: string;
// 		movieId: number;
// 	}) => {
// 		const response = await axios(
// 			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
// 		);

// 		return response;
// 	};
// };

export default moviedbApi;
