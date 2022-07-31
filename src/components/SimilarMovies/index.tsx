import MovieCard from "../MovieCard";
import Wraper from "../Wraper";
import styles from "./styles.module.scss";

const SimilarMovies = ({ similarMovies }: { similarMovies: Movie[] }) => {
	return (
		<Wraper>
			<div className={styles.similarMoviesContainer}>
				<h2>Recomendações</h2>
				<div className={styles.similarMoviesContent}>
					<ul className={styles.similarMoviesList}>
						{similarMovies?.map((movie) => {
							if (movie)
								return (
									<li key={movie.id}>
										<MovieCard
											id={movie.id}
											releaseDate={movie.release_date}
											src={movie.poster_path}
											title={movie.title}
										/>
									</li>
								);
						})}
					</ul>
				</div>
			</div>
		</Wraper>
	);
};

export default SimilarMovies;
