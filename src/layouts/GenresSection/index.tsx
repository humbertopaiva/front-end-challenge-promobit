import GenresList from "../../components/GenresList";
import Wraper from "../../components/Wraper";
import styles from "./styles.module.scss";

const GenresSection = () => {
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
