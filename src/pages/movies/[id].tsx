import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MovieRelease from "../../components/MovieRelease";
import Wraper from "../../components/Wraper";
import moviedbApi from "../../services/moviedbApi";

interface Video {
	type: string;
	site: string;
	key: string;
	official: boolean;
}

const Movies = () => {
	const [movie, setMovie] = useState<Movie>();
	const [cast, setCast] = useState<Cast | null>(null);
	const [videos, setVideos] = useState<Video[] | null>([]);
	const [similarMovies, setSimilarMovies] = useState<Movie[] | null>([]);
	const [certification, setCertification] = useState<string>("");

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (id) {
			// INFORMACOES DO FILME
			moviedbApi.getMovieInfos(id).then((res) => {
				setMovie(res.data);
			});

			// INFORMACOES DE ELENCO E EQUIPE
			moviedbApi.getCast(id).then((res) => {
				setCast(res.data);
				console.log("Elenco", res.data);
			});

			// INFORMACOES SOBRE VIDEOS E TRAILERS
			moviedbApi.getVideos(id).then((res) => setVideos(res.data.results));

			// INFORMACOES SOBRE FILMES SIMILARES
			moviedbApi
				.getSimilarMovies(id)
				.then((res) => setSimilarMovies(res.data.results));

			// INFORMACOES SOBRE FILMES SIMILARES
			moviedbApi.getReleaseDates(id).then((res) => {
				const releases: Release[] = res.data.results;
				console.log("RESULTS", releases);
				const releaseBR = releases.find(
					(rel) => rel.iso_3166_1 === "BR"
				);
				const certificationBR =
					releaseBR?.release_dates[0].certification;
				setCertification(certificationBR!);
			});
		}
	}, []);

	const getYear = (date: string) => {
		const transformDate = new Date(date);
		return transformDate.getFullYear();
	};

	// useEffect(() => {
	// 	console.log("Movie", movie);
	// 	console.log("Cast", cast);
	// 	console.log("Videos", videos);
	// 	console.log("Similar", similarMovies);
	// 	console.log("Releases", certification);
	// }, [certification]);
	return (
		<Wraper bgColor="primary">
			<section>
				<div>
					<img
						src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie?.poster_path}`}
						alt={movie?.title}
					/>
				</div>
				<div>
					<h1>
						{movie?.title} ({movie && getYear(movie?.release_date)})
					</h1>
					{movie && (
						<MovieRelease
							movie={movie}
							certification={certification}
						/>
					)}
				</div>
			</section>
		</Wraper>
	);
};

export default Movies;
