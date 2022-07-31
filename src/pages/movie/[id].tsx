import { GetStaticPaths, GetStaticProps } from "next";
import SimilarMovies from "../../components/SimilarMovies";
import MovieTrailer from "../../components/MovieTrailer";
import MovieCast from "../../components/MovieCast";
import MovieInfo from "../../components/MovieInfo";
import moviedbApi from "../../services/moviedbApi";
import "react-circular-progressbar/dist/styles.css";

type MovieProps = {
	movie: Movie;
	cast: Cast;
	similarMovies: Movie[];
	trailers: Trailer[];
};

const Movie = ({ movie, cast, similarMovies, trailers }: MovieProps) => {
	return (
		<>
			{movie && cast && trailers && similarMovies && (
				<>
					<MovieInfo movie={movie} />
					<MovieCast cast={cast} />
					<MovieTrailer trailers={trailers} />
					<SimilarMovies similarMovies={similarMovies} />
				</>
			)}
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const api = moviedbApi;
	const movies: Movie[] = await api
		.getMoviesList(1)
		.then((res) => res.data.results);

	const paths = movies.map((movie) => {
		return {
			params: {
				id: movie.id?.toString(),
			},
		};
	});

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { params } = context;
	const api = moviedbApi;

	if (params) {
		const movieData = await api
			.getMovieData(params.id)
			.then((res) => res.data);
		const cast = await api.getCast(params.id).then((res) => res.data);

		const similarMovies = await api
			.getSimilarMovies(params.id)
			.then((res) => res.data.results);

		const trailers = await api
			.getVideos(params.id)
			.then((res) => res.data.results);

		const certification = await api
			.getReleaseDates(params.id)
			.then((res) => res.data.results);

		const movie = {
			...movieData,
			similarMovies,
			cast,
			certification,
		};

		return {
			props: { movie, cast, similarMovies, trailers },
			revalidate: 60 * 60 * 24 * 7,
		};
	}

	return {
		props: {},
	};
};

export default Movie;
