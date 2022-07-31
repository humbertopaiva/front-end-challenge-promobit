import GenresList from "../../components/GenresList";
import Wraper from "../../components/Wraper";
import styles from "./styles.module.scss";

const GenresSection = ({ genres }: { genres: Genre[] }) => {
	return (
		<Wraper bgColor="primary">
			<section className={styles.content}>
				<h2>
					Milhões de filmes, séries e pessoas para descobrir. Explore
					já.
				</h2>
				<p>Filtre por: </p>
				<GenresList genres={genres} />
			</section>
		</Wraper>
	);
};

export default GenresSection;
