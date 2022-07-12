import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import Wraper from "../../components/Wraper";
import { useMoviesDB } from "../../hooks/MoviesDB";
import styles from "./styles.module.scss";
import { TbMovieOff } from "react-icons/tb";
import Link from "next/link";
import moviedbApi from "../../services/moviedbApi";

type Movie = {
	title: string;
	id: number;
	release_date: Date;
	poster_path: string;
	genre_ids: number[];
};

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
			console.log(res.data);
		});
	}, [currentPage]);

	return (
		<main className={styles.content}>
			<Wraper>
				<ul>
					{!emptySearch &&
						filteredMovies.map((movie) => (
							<li key={movie.id}>
								<Link href={`/movies/${movie.id}`}>
									<a>
										<MovieCard
											src={movie.poster_path}
											releaseDate={movie.release_date}
											title={movie.title}
										/>
									</a>
								</Link>
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
