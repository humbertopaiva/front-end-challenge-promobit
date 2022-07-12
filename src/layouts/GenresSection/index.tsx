import { useRouter } from "next/router";
import { useEffect } from "react";
import GenresList from "../../components/GenresList";
import Wraper from "../../components/Wraper";
import { useMoviesDB } from "../../hooks/MoviesDB";
import moviedbApi from "../../services/moviedbApi";
import styles from "./styles.module.scss";

const GenresSection = () => {
	const { setGenres } = useMoviesDB();

	useEffect(() => {
		moviedbApi.getGenresList().then((res) => {
			console.log("generos", res.data);
			setGenres(res.data.genres);
		});
	}, []);

	return (
		<Wraper bgColor="primary">
			<section className={styles.content}>
				<h2>
					Milhões de filmes, séries e pessoas para descobrir. Explore
					já.
				</h2>
				<p>Filtre por: </p>
				<GenresList />
			</section>
		</Wraper>
	);
};

export default GenresSection;
