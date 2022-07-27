import { useEffect, useState } from "react";
import CircularProgressbar from "../../components/CircularProgressbar";
import MovieRelease from "../MovieRelease";
import Wraper from "../Wraper";
import Crew from "./Crew";
import Overview from "./Overview";
import Poster from "./Poster";
import styles from "./styles.module.scss";

const MovieInfo = ({ movie }: { movie: Movie }) => {
	const [isLoading, setIsLoading] = useState(true);

	const {
		cast,
		poster_path,
		title,
		release_date,
		certification,
		overview,
		genres,
		runtime,
		vote_average,
	} = movie;

	const getYear = (date: string) => {
		const transformDate = new Date(date);
		return transformDate.getFullYear();
	};

	useEffect(() => {
		if (movie) setIsLoading(false);
		else setIsLoading(true);
	}, [movie]);

	return (
		<Wraper bgColor="primary">
			<section className={styles.movieInfos}>
				{poster_path && title && (
					<Poster
						src={poster_path}
						isLoading={isLoading}
						title={title}
					/>
				)}

				<div className={styles.movieInfos_texts}>
					<h1>
						{title} ({release_date && getYear(release_date)}
					</h1>
					{certification && genres && release_date && runtime && (
						<MovieRelease
							certification={certification}
							genres={genres}
							release_date={release_date}
							runtime={runtime}
						/>
					)}
					<div className={styles.circularProgress}>
						{vote_average && (
							<CircularProgressbar average={+vote_average} />
						)}
					</div>
					{overview && <Overview overview={overview} />}

					{cast && <Crew cast={cast} />}
				</div>
			</section>
		</Wraper>
	);
};

export default MovieInfo;
