import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CircularProgressbar from "../../components/CircularProgressbar";
import moviedbApi from "../../services/moviedbApi";
import MovieRelease from "../MovieRelease";
import Wraper from "../Wraper";
import Crew from "./Crew";
import Overview from "./Overview";
import Poster from "./Poster";
import styles from "./styles.module.scss";

const MovieInfo = () => {
	const [movie, setMovie] = useState<Movie | null>(null);
	const [cast, setCast] = useState<Cast | null>(null);
	const [certification, setCertification] = useState<string>("");
	const [percentage, setPercentage] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const { id } = router.query;

	const getYear = (date: string) => {
		const transformDate = new Date(date);
		return transformDate.getFullYear();
	};

	useEffect(() => {
		if (id) {
			moviedbApi.getMovieInfos(id).then((res) => {
				setMovie(res.data);
				setPercentage(res.data.vote_average * 10);
			});

			moviedbApi.getCast(id).then((res) => {
				setCast(res.data);
				console.log("Elenco", res.data);
			});

			moviedbApi.getReleaseDates(id).then((res) => {
				const releases: Release[] = res.data.results;
				const releaseBR = releases.find(
					(rel) => rel.iso_3166_1 === "BR"
				);
				const certificationBR =
					releaseBR?.release_dates[0].certification;
				setCertification(certificationBR!);
			});
		}
	}, [id]);

	useEffect(() => {
		if (movie) setIsLoading(false);
		else setIsLoading(true);
	}, [movie]);

	return (
		<Wraper bgColor="primary">
			<section className={styles.movieInfos}>
				{movie && (
					<Poster
						src={movie?.poster_path}
						isLoading={isLoading}
						title={movie?.title}
					/>
				)}

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
								<Overview overview={movie.overview} />
							)}

							{cast && <Crew cast={cast} />}
						</>
					)}
				</div>
			</section>
		</Wraper>
	);
};

export default MovieInfo;
