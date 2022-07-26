import "react-circular-progressbar/dist/styles.css";
import SimilarMovies from "../../components/SimilarMovies";
import MovieTrailer from "../../components/MovieTrailer";
import MovieCast from "../../components/MovieCast";
import MovieInfo from "../../components/MovieInfo";
import { GetStaticPaths, GetStaticProps } from "next";
import moviedbApi from "../../services/moviedbApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type MovieProps = {
	movie: Movie;
	movieCast: Cast;
	similarMovies: Movie[];
	trailers: Trailer[];
};

const Movie = ({ movie, movieCast, similarMovies, trailers }: MovieProps) => {
	// const router = useRouter();
	// const { id } = router.query;
	// const api = moviedbApi;

	// const [movieData, setMovieData] = useState<Movie>();
	// const [cast, setCast] = useState<Cast>();
	// const [similarMovies, setSimilarMovies] = useState<Movie[]>();
	// const [certification, setCertification] = useState<Certification>();
	// const [trailers, setTrailers] = useState<Trailer[]>();
	// const [movie, setMovie] = useState<Movie | {}>();

	// useEffect(() => {
	// 	if (id) {
	// 		//MOVIE DATA
	// 		api.getMovieData(id).then((res) => setMovieData(res.data));

	// 		//MOVIE CAST
	// 		api.getCast(id).then((res) => setCast(res.data));

	// 		//SIMILAR MOVIES
	// 		api.getSimilarMovies(id).then((res) =>
	// 			setSimilarMovies(res.data.results)
	// 		);
	// 		//RELEASE DATES AND CERTIFICATION AGE
	// 		api.getReleaseDates(id).then((res) =>
	// 			setCertification(res.data.results)
	// 		);
	// 		//MOVIE TRAILER
	// 		api.getVideos(id).then((res) => {
	// 			setTrailers(res.data.results);
	// 		});
	// 	}
	// }, [id]);

	// useEffect(() => {
	// 	const data = {
	// 		...movieData,
	// 		similarMovies,
	// 		cast,
	// 		certification,
	// 	};

	// 	console.log("DAta", data);

	// 	setMovie(data);
	// }, [movieData, cast, similarMovies, certification, trailers]);

	return (
		<>
			{movie && movieCast && trailers && similarMovies && (
				<>
					<MovieInfo movie={movie} />
					<MovieCast cast={movieCast} />
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
	console.log("MOVIESSS", movies);
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
		const movieCast = await api.getCast(params.id).then((res) => res.data);
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
			movieCast,
			certification,
		};

		return {
			props: { movie, movieCast, similarMovies, trailers },
		};
	}

	return {
		props: {},
	};
};

export default Movie;
