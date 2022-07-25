import { useEffect, useState } from "react";
import { useMoviesDB } from "../../hooks/MoviesDB";
import { TbMovieOff } from "react-icons/tb";
import Link from "next/link";
import moviedbApi from "../../services/moviedbApi";
import MovieCard from "../../components/MovieCard";
import Wraper from "../../components/Wraper";
import styles from "./styles.module.scss";

const MoviesGallery = () => {
	const {
		popularMovies,
		selectedGenres,
		currentPage,
		setPopularMovies,
		setTotalPages,
	} = useMoviesDB();

	const [filteredMovies, setFilteredMovies] =
		useState<Movie[]>(popularMovies);
	const [emptySearch, setEmptySearch] = useState(false);

	//FILTRA A LISTA DE FILMES DE ACORDO COM OS GENEROS ESCOLHIDOS

	useEffect(() => {
		console.log(popularMovies);
		const movies = popularMovies.filter((movie) => {
			const hasMovie = movie.genre_ids.map((genre) => {
				const hasGenre = selectedGenres.includes(genre);
				return hasGenre;
			});

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

	//CARREGA A LISTA DE FILMES NO MODO DEFAULT

	useEffect(() => {
		moviedbApi.getMoviesList(currentPage).then((res) => {
			setPopularMovies(res.data.results);
			setTotalPages(res.data.total_pages);
		});
	}, [currentPage]);

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
									id={movie.id}
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
