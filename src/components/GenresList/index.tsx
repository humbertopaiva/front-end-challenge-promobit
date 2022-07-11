import { useMoviesDB } from "../../hooks/MoviesDB";
import GenreTag from "../GenreTag";
import styles from "./styles.module.scss";

// type CategoriesList = {
// 	categories: Array<string>;
// };

const GenresList = () => {
	const { genres } = useMoviesDB();
	return (
		<ul className={styles.content}>
			{genres.map((genre) => (
				<li key={genre.id}>
					<GenreTag name={genre.name} id={genre.id} />
				</li>
			))}
		</ul>
	);
};

export default GenresList;
