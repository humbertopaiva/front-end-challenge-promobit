import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoviesDB } from "../../hooks/MoviesDB";
import MovieRelease from "../../components/MovieRelease";
import Wraper from "../../components/Wraper";
import moviedbApi from "../../services/moviedbApi";
import styles from "./styes.module.scss";
import CircularProgressbar from "../../components/CircularProgressbar";
import MoviePoster from "../../components/MoviePoster";
import CastCard from "../../components/CastCard";
import "react-circular-progressbar/dist/styles.css";

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
	const { setSelectedGenres } = useMoviesDB();

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		setIsLoading(true);
		setSelectedGenres([]);

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

			// INFORMACOES SOBRE A CLASSIFICACAO DE IDADE
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
	}, [id]);

	const getYear = (date: string) => {
		const transformDate = new Date(date);
		return transformDate.getFullYear();
	};

	useEffect(() => {
		if (movie) setIsLoading(false);
		else setIsLoading(true);
	}, [movie]);

	useEffect(() => {
		console.log("Movie", movie);
		console.log("Cast", cast);
		console.log("Videos", videos);
		console.log("Similar", similarMovies);
		console.log("Releases", certification);
	}, [certification]);

	return (
		<>
			<Wraper bgColor="primary">
				{/* MOVIE INFOS */}
				<section className={styles.movieInfos}>
					<div className={styles.movieInfos_image}>
						{movie && (
							<MoviePoster
								src={movie?.poster_path}
								title={movie?.title}
								isLoading={isLoading}
							/>
						)}
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
									<CircularProgressbar
										percentage={percentage}
									/>
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
			<Wraper>
				{/* MOVIE CAST */}
				<section className={styles.castContainer}>
					<h2>Elenco original</h2>
					<div className={styles.castList}>
						<ul>
							{cast &&
								cast.cast.map((actor) => (
									<li key={actor.id}>
										<CastCard
											name={actor.name}
											character={actor.character}
											profile_path={actor.profile_path}
											id={actor.id}
										/>
									</li>
								))}
						</ul>
					</div>
				</section>
			</Wraper>
		</>
	);
};

export default Movies;
