import styles from "./styles.module.scss";
import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { useMoviesDB } from "../../hooks/MoviesDB";

const GenreTag = ({ name, id }: Genre) => {
	const [selected, setSelected] = useState(false);
	const { selectedGenres, setSelectedGenres } = useMoviesDB();

	useEffect(() => {
		const localGenres = localStorage.getItem("@TMDB/genres");
		if (localGenres) {
			const genresArray = JSON.parse(localGenres);

			if (genresArray.includes(id)) {
				setSelected(true);
			}
		}
	}, []);

	useEffect(() => {
		if (!selected) {
			if (selectedGenres.length > 0) {
				const localGenres = localStorage.getItem("@TMDB/genres");

				localStorage.setItem(
					"@TMDB/genres",
					JSON.stringify(
						selectedGenres.filter((genre) => genre !== id)
					)
				);

				if (localGenres) setSelectedGenres(JSON.parse(localGenres));
			}
		}

		if (selectedGenres.length === 0) {
			localStorage.removeItem("@TMDB/genres");
		}
	}, [selected]);

	const handleClick = () => {
		setSelected((e) => !e);

		if (!selected) {
			setSelectedGenres([...selectedGenres, id]);
		} else
			setSelectedGenres(selectedGenres.filter((genre) => genre !== id));
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
