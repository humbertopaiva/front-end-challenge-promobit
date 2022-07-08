import styles from "./styles.module.scss";

const MovieCard = () => {
	return (
		<article className={styles.content}>
			<div className={styles.movie_image}>
				<img src="https://i.pinimg.com/originals/bc/d5/c9/bcd5c9519581acc60bd60a429ab0c88f.jpg" />
			</div>
			<div className={styles.movie_infos}>
				<h3>Título do filme</h3>
				<p>18 nov 2021</p>
			</div>
		</article>
	);
};

export default MovieCard;
