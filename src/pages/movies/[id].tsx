import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MovieRelease from "../../components/MovieRelease";
import Wraper from "../../components/Wraper";
import moviedbApi from "../../services/moviedbApi";

import "react-circular-progressbar/dist/styles.css";
import styles from "./styes.module.scss";
import CircularProgressbar from "../../components/CircularProgressbar";

interface Video {
	type: string;
	site: string;
	key: string;
	official: boolean;
}

const Movies = () => {
	const [movie, setMovie] = useState<Movie | null>(null);
	const [cast, setCast] = useState<Cast | null>(null);
	const [videos, setVideos] = useState<Video[] | null>([]);
	const [similarMovies, setSimilarMovies] = useState<Movie[] | null>([]);
	const [certification, setCertification] = useState<string>("");
	const [isLoading, setIsLoading] = useState(true);
	const [percentage, setPercentage] = useState(0);

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (id) {
			// INFORMACOES DO FILME
			moviedbApi.getMovieInfos(id).then((res) => {
				setMovie(res.data);
				setPercentage(res.data.vote_average * 10);
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

			setIsLoading(false);
		}
	}, [id]);

	const getYear = (date: string) => {
		const transformDate = new Date(date);
		return transformDate.getFullYear();
	};

	useEffect(() => {
		console.log("Movie", movie);
		console.log("Cast", cast);
		console.log("Videos", videos);
		console.log("Similar", similarMovies);
		console.log("Releases", certification);
	}, [certification]);

	return (
		<Wraper bgColor="primary">
			<section className={styles.movieInfos}>
				<div className={styles.movieInfos_image}>
					<img
						src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie?.poster_path}`}
						alt={movie?.title}
					/>
				</div>
				<div className={styles.movieInfos_texts}>
					{movie && (
						<>
							<h1>
								{movie?.title} (
								{movie && getYear(movie?.release_date)})
							</h1>
							<MovieRelease
								movie={movie}
								certification={certification}
							/>

							<div className={styles.circularProgress}>
								<CircularProgressbar percentage={percentage} />
							</div>
							{movie.overview && (
								<div className={styles.overview}>
									<h2>Sinopse</h2>
									<p>{movie.overview}</p>
								</div>
							)}

							<ul className={styles.crewContent}>
								{cast?.crew.map((staff, index) => {
									const jobs = [
										"Characters",
										"Director",
										"Screenplay",
									];

									if (jobs.includes(staff.job))
										return (
											<li key={index}>
												<h3>{staff.name}</h3>
												<h4>{staff.job}</h4>
											</li>
										);
								})}
							</ul>
						</>
					)}
				</div>
			</section>
		</Wraper>
	);
};

export default Movies;
