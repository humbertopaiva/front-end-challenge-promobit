import "react-circular-progressbar/dist/styles.css";
import SimilarMovies from "../../components/SimilarMovies";
import MovieTrailer from "../../components/MovieTrailer";
import MovieCast from "../../components/MovieCast";
import MovieInfo from "../../components/MovieInfo";
import { GetStaticPaths, GetStaticProps } from "next";
import moviedbApi from "../../services/moviedbApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface MovieProps {
	movie: Movie;
	cast: Cast;
	certification: string;
	percentage: number;
}

const Movie = () => {
	const router = useRouter();
	const { id } = router.query;
	const api = moviedbApi;

	const [movieData, setMovieData] = useState<Movie>();
	const [cast, setCast] = useState<Cast>();
	const [similarMovies, setSimilarMovies] = useState<Movie[]>();
	const [certification, setCertification] = useState<Certification>();
	const [trailers, setTrailers] = useState<Trailer[]>();
	const [movie, setMovie] = useState<Movie | {}>();

	useEffect(() => {
		if (id) {
			//MOVIE DATA
			api.getMovieData(id).then((res) => setMovieData(res.data));

			//MOVIE CAST
			api.getCast(id).then((res) => setCast(res.data));

			//SIMILAR MOVIES
			api.getSimilarMovies(id).then((res) =>
				setSimilarMovies(res.data.results)
			);
			//RELEASE DATES AND CERTIFICATION AGE
			api.getReleaseDates(id).then((res) =>
				setCertification(res.data.results)
			);
			//MOVIE TRAILER
			api.getVideos(id).then((res) => {
				setTrailers(res.data.results);
			});
		}
	}, [id]);

	useEffect(() => {
		const data = {
			...movieData,
			similarMovies,
			cast,
			certification,
		};

		setMovie(data);
	}, [movieData, cast, similarMovies, certification, trailers]);

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

// export const getStaticPaths: GetStaticPaths = async () => {
// 	const movies: Movie[] = await moviedbApi
// 		.getMoviesList(1)
// 		.then((res) => res.data.results);
// 	const moviesIds = movies.map((movie) => movie.id.toString());
// 	const paths = moviesIds.map((id) => {
// 		return {
// 			params: {
// 				id,
// 			},
// 		};
// 	});

// 	return {
// 		fallback: true,
// 		paths,
// 	};
// };

// export const getStaticProps: GetStaticProps = async (context) => {
// 	const id = context.params?.id;
// 	const movieId = id;
// 	console.log(movieId);

// 	const movieInfosResponse: Movie = await moviedbApi
// 		.getMovieInfos(id)
// 		.then((res) => res.data);
// 	const movie = movieInfosResponse;
// 	const percentage = movieInfosResponse.vote_average * 10;

// 	const cast = moviedbApi.getCast(id).then((res) => res.data);

// 	const releaseDates: Release[] = await moviedbApi
// 		.getReleaseDates(id)
// 		.then((res) => res.data.results);
// 	const releaseBR = releaseDates.find((rel) => rel.iso_3166_1 === "BR");
// 	const certification = releaseBR?.release_dates[0].certification;

// 	return {
// 		props: {
// 			movie,
// 			percentage,
// 			cast,
// 			certification,
// 		},
// 		revalidate: 60 * 60 * 24 * 7, // 7 days
// 	};
// };

export default Movie;
