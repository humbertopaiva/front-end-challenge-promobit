import GenreTag from "../GenreTag";
import styles from "./styles.module.scss";

const GenresList = ({ genres }: { genres: Genre[] }) => {
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
