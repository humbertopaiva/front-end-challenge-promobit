import { useEffect, useState } from "react";
import { useMoviesDB } from "../../hooks/MoviesDB";
import { TbMovieOff } from "react-icons/tb";
import { useRouter } from "next/router";
import MovieCard from "../../components/MovieCard";
import Wraper from "../../components/Wraper";
import styles from "./styles.module.scss";
import moviedbApi from "../../services/moviedbApi";

const MoviesGallery = () => {
	const { selectedGenres, setTotalPages } = useMoviesDB();
	const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
	const [emptySearch, setEmptySearch] = useState(false);
	const [movies, setMovies] = useState<Movie[]>([]);
	const { currentPage } = useMoviesDB();
	const router = useRouter();

	const createGallery = () => {
		const storage = localStorage.getItem("@TMDB/genres");
		if (storage) {
			const genres = JSON.parse(storage);
			if (genres) {
				const filtered = movies.filter((movie) => {
					const hasMovie = movie.genre_ids?.map((genre) => {
						return genres.includes(genre);
					});

					if (hasMovie?.filter((e) => e).length === genres.length)
						return movie;
				});

				if (filtered.length > 0) {
					setFilteredMovies(filtered);
					setEmptySearch(false);
				}

				if (genres.length === 0) setFilteredMovies(movies);

				if (filtered.length === 0 && genres.length > 0)
					setEmptySearch(true);
			}
		}
	};

	useEffect(() => {
		const pageIndex = router.query.index || 1;
		moviedbApi.getMoviesList(+pageIndex).then((res) => {
			setTotalPages(res.data.total_pages);
			setMovies(res.data.results);
		});
	}, [router.query.index]);

	useEffect(() => {
		createGallery();
	}, [movies, selectedGenres]);

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
