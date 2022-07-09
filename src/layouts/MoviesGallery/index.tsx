import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import Wraper from "../../components/Wraper";
import { useMoviesDB } from "../../hooks/MoviesDB";
import styles from "./styles.module.scss";
import { TbMovieOff } from "react-icons/tb";

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
	const [emptySearch, setEmptySearch] = useState(false);

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

		if (movies.length > 0) {
			setFilteredMovies(movies);
			setEmptySearch(false);
		} else setFilteredMovies(popularMovies);

		if (movies.length === 0 && selectedGenres.length > 0)
			setEmptySearch(true);
	}, [selectedGenres, popularMovies]);

	return (
		<main className={styles.content}>
			<Wraper>
				<ul>
					{!emptySearch &&
						filteredMovies.map((movie) => (
							<li key={movie.id}>
								<MovieCard
									src={movie.poster_path}
									releaseDate={movie.release_date}
									title={movie.title}
								/>
							</li>
						))}
				</ul>
				{emptySearch && (
					<div className={styles.notFound}>
						<i>
							<TbMovieOff />
						</i>
						<h2>Nenhum filme encontrado</h2>
						<p>
							Tente escolher outros gêneros ou diminua a
							quantidade de gêneros selecionados
						</p>
					</div>
				)}
			</Wraper>
		</main>
	);
};

export default MoviesGallery;
