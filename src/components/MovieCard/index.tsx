import styles from "./styles.module.scss";

type MovieCardProps = {
	src: string;
	title: string;
	releaseDate: string;
};

const MovieCard = ({ title, src, releaseDate }: MovieCardProps) => {
	return (
		<article className={styles.content}>
			<div className={styles.movie_image}>
				<img
					src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${src}`}
				/>
			</div>
			<div className={styles.movie_infos}>
				<h3>{title}</h3>
				<p>18 nov 2021</p>
			</div>
		</article>
	);
};

export default MovieCard;
