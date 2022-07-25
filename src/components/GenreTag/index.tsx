import styles from "./styles.module.scss";
import { IoMdCloseCircle } from "react-icons/io";
import { useState } from "react";
import { useMoviesDB } from "../../hooks/MoviesDB";

const GenreTag = ({ name, id }: Genre) => {
	const [selected, setSelected] = useState(false);
	const { selectedGenres, setSelectedGenres } = useMoviesDB();

	const handleClick = () => {
		setSelected((e) => !e);

		if (!selected) setSelectedGenres([...selectedGenres, id]);
		else setSelectedGenres(selectedGenres.filter((genre) => genre !== id));
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
