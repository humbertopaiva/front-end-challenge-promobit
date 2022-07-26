import { useEffect, useState } from "react";
import { useMoviesDB } from "../../hooks/MoviesDB";
import { TbMovieOff } from "react-icons/tb";
import Link from "next/link";
import moviedbApi from "../../services/moviedbApi";
import MovieCard from "../../components/MovieCard";
import Wraper from "../../components/Wraper";
import styles from "./styles.module.scss";

const MoviesGallery = ({ moviesList }: { moviesList: Movie[] }) => {
	const { selectedGenres, currentPage, setTotalPages } = useMoviesDB();

	const [filteredMovies, setFilteredMovies] = useState<Movie[]>(moviesList);
	const [emptySearch, setEmptySearch] = useState(false);
	const [movies, setMovies] = useState<Movie[]>([]);

	//FILTRA A LISTA DE FILMES DE ACORDO COM OS GENEROS ESCOLHIDOS

	useEffect(() => {
		const filtered = movies.filter((movie) => {
			const hasMovie = movie.genre_ids?.map((genre) => {
				return selectedGenres.includes(genre);
			});

			if (hasMovie?.filter((e) => e).length === selectedGenres.length)
				return movie;
		});

		if (filtered.length > 0) {
			setFilteredMovies(filtered);
			setEmptySearch(false);
		}

		if (selectedGenres.length === 0) setFilteredMovies(movies);

		if (filtered.length === 0 && selectedGenres.length > 0)
			setEmptySearch(true);
	}, [selectedGenres]);

	//CARREGA A LISTA DE FILMES NO MODO DEFAULT

	useEffect(() => {
		if (currentPage === 1) {
			setMovies(moviesList);
			setFilteredMovies(moviesList);
		} else {
			moviedbApi.getMoviesList(currentPage).then((res) => {
				setMovies(res.data.results);
				setTotalPages(res.data.total_pages);
				setFilteredMovies(res.data.results);
			});
		}
	}, [currentPage]);

	useEffect(() => {
		setFilteredMovies(movies);
	}, [movies]);

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
