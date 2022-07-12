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

const getMovieInfos = (id: string | string[] | undefined) => {
	return api.get(`movie/${id}?api_key=${API_KEY}&language=pt-BR`);
};

const getCast = (id: string | string[] | undefined) => {
	return api.get(`movie/${id}/credits?api_key=${API_KEY}&language=pt-BR`);
};

const getVideos = (id: string | string[] | undefined) => {
	return api.get(`movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`);
};

const getSimilarMovies = (id: string | string[] | undefined) => {
	return api.get(
		`movie/${id}/similar?api_key=${API_KEY}&language=pt-BR&page=1`
	);
};

const getReleaseDates = (id: string | string[] | undefined) => {
	return api.get(`movie/${id}/release_dates?api_key=${API_KEY}`);
};

const getImages = (id: number) => {
	return api.get(`person/${id}/images?api_key=${API_KEY}`);
};

const moviedbApi = {
	getGenresList,
	getMoviesList,
	getMovieInfos,
	getCast,
	getVideos,
	getSimilarMovies,
	getReleaseDates,
	getImages,
};

export default moviedbApi;
