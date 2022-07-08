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

	const arrayCompare = (first: number[], last: number[]) => {
		var result = first.filter((item) => {
			last.indexOf(item) > -1;
		});
		return result.length;
	};

	useEffect(() => {
		console.log(selectedGenres);
		const movies = popularMovies.filter((movie) => {
			const genres = [...selectedGenres];
			return movie.genre_ids.includes(genres.pop()!);
		});

		if (selectedGenres.length === 0) setFilteredMovies(popularMovies);
		else setFilteredMovies([...movies]);
		// console.log(newMoviesList);

		// console.log("Nova lista", newMoviesList);
	}, [selectedGenres]);

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
