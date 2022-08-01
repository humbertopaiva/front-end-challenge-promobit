import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { useMoviesDB } from "../../hooks/MoviesDB";
import styles from "./styles.module.scss";

const GenreTag = ({ name, id }: Genre) => {
	const [selected, setSelected] = useState(false);
	const { setSelectedGenres } = useMoviesDB();

	useEffect(() => {
		const storage = localStorage.getItem("@TMDB/genres");
		if (storage) {
			const genres = JSON.parse(storage);

			if (genres.includes(id)) {
				setSelected(true);
			} else setSelected(false);
		}
	}, []);

	const handleClick = () => {
		const storageGenres = localStorage.getItem("@TMDB/genres");
		const genres: number[] = storageGenres ? JSON.parse(storageGenres) : [];
		const genresList: number[] = [...genres];

		//SELECIONANDO
		if (!selected) {
			localStorage.setItem(
				"@TMDB/genres",
				JSON.stringify([...genresList, id])
			);
			setSelectedGenres([...genresList, id]);
		}

		//DESSELECIONANDO
		if (selected && genresList.length > 0) {
			localStorage.setItem(
				"@TMDB/genres",
				JSON.stringify(genresList.filter((genreId) => genreId !== id))
			);
			setSelectedGenres(genresList.filter((genreId) => genreId !== id));
		}

		if (selected && genresList.length === 0) {
			setSelectedGenres([]);
			localStorage.removeItem("@TMDB/genres");
		}

		setSelected((e) => !e);
	};

	return (
		<article
			className={`${styles.content} ${selected && styles["selected"]}`}
			onClick={handleClick}
		>
			<h3>{name}</h3>
			{selected && (
				<button>
					<IoMdCloseCircle />
				</button>
			)}
		</article>
	);
};

export default GenreTag;
