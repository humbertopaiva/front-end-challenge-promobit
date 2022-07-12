import styles from "./styles.module.scss";

const MovieRelease = ({
	movie,
	certification,
}: {
	movie: Movie;
	certification: string;
}) => {
	// const date = movie.release_date.toLocaleDateString();
	const runtime = movie.runtime;

	const runtimeTransform = () => {
		const hours = Math.floor(runtime / 60);
		const minutes = runtime % 60;
		const textHours = `00${hours}`.slice(-2);
		const textMinutes = `00${minutes}`.slice(-2);
		return `${textHours}h ${textMinutes}min`;
	};

	const dateTransform = (date: string) => {
		const transformDate = new Date(date);
		return transformDate.toLocaleDateString("pt-BR");
	};

	return (
		<div className={styles.movieRelease_content}>
			<ul>
				{certification && (
					<li>
						{certification === "L"
							? "Classificação livre"
							: `${certification} anos`}
					</li>
				)}

				<li>{dateTransform(movie.release_date)}</li>
				<li>{movie.genres.map((genre) => genre.name).join(", ")}</li>
				<li>{runtimeTransform()}</li>
			</ul>
		</div>
	);
};

export default MovieRelease;
