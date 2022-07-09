import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import Wraper from "../../components/Wraper";
import { useMoviesDB } from "../../hooks/MoviesDB";
import styles from "./styles.module.scss";

type Movie = {
	title: string;
	id: number;
	release_date: Date;
	poster_path: string;
	genre_ids: number[];
};

const MoviesGallery = () => {
	const { popularMovies, selectedGenres } = useMoviesDB();
	const [filteredMovies, setFilteredMovies] =
		useState<Movie[]>(popularMovies);

	useEffect(() => {
		console.log(selectedGenres);

		// const movies = popularMovies.filter((movie) => {
		// 	const hasMovie = movie.genre_ids.filter((genre) =>
		// 		selectedGenres.includes(genre)
		// 	);
		// 	if (hasMovie.length > 0) return movie;
		// });

		// if (movies.length > 0) setFilteredMovies(movies);
		// else setFilteredMovies(popularMovies);

		const movies = popularMovies.filter((movie) => {
			const hasMovie = movie.genre_ids.map((genre) => {
				const hasGenre = selectedGenres.includes(genre);
				return hasGenre;
			});
			console.log("OIEEE", hasMovie);

			if (
				hasMovie.filter((condition) => condition).length ===
				selectedGenres.length
			)
				return movie;
		});

		if (movies.length > 0) setFilteredMovies(movies);
		else setFilteredMovies(popularMovies);
	}, [selectedGenres, popularMovies]);

	return (
		<main className={styles.content}>
			<Wraper>
				<ul>
					{filteredMovies.map((movie) => (
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
