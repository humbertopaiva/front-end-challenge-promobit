import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import moviedbApi from "../../services/moviedbApi";
import MovieCard from "../MovieCard";
import Wraper from "../Wraper";
import styles from "./styles.module.scss";

const SimilarMovies = () => {
	const [similarMovies, setSimilarMovies] = useState<Movie[] | null>([]);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (id)
			moviedbApi
				.getSimilarMovies(id)
				.then((res) => setSimilarMovies(res.data.results));
	}, [id]);

	return (
		<Wraper>
			<div className={styles.similarMoviesContainer}>
				<h2>Recomendações</h2>
				<div className={styles.similarMoviesContent}>
					<ul className={styles.similarMoviesList}>
						{similarMovies &&
							similarMovies.map((movie) => (
								<li key={movie.id + 10}>
									<Link href={`/movies/${movie.id}`}>
										<a>
											<MovieCard
												releaseDate={movie.release_date}
												src={movie.poster_path}
												title={movie.title}
											/>
										</a>
									</Link>
								</li>
							))}
					</ul>
				</div>
			</div>
		</Wraper>
	);
};

export default SimilarMovies;
