import MovieCard from "../../components/MovieCard";
import Wraper from "../../components/Wraper";
import { useMoviesDB } from "../../hooks/MoviesDB";
import styles from "./styles.module.scss";

const MoviesGallery = () => {
	const { popularMovies } = useMoviesDB();
	console.log("Chupa", popularMovies);

	return (
		<main className={styles.content}>
			<Wraper>
				<ul>
					{popularMovies.map((movie) => (
						<li key={movie.id}>
							<MovieCard
								src={movie.poster_path}
								releaseDate={movie.release_date}
								title={movie.title}
							/>
						</li>
					))}
				</ul>
			</Wraper>
		</main>
	);
};

export default MoviesGallery;
