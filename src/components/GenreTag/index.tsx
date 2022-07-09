import styles from "./styles.module.scss";
import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { useMoviesDB } from "../../hooks/MoviesDB";

type GenreTagProps = {
	name: string;
	id: number;
};

const GenreTag = ({ name, id }: GenreTagProps) => {
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
