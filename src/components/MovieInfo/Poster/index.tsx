import MoviePoster from "../../MoviePoster";
import styles from "../styles.module.scss";

type PosterProps = {
	src: string;
	title: string;
	isLoading: boolean;
};

const Poster = ({ src, title, isLoading }: PosterProps) => {
	return (
		<div className={styles.movieInfos_image}>
			<MoviePoster src={src} title={title} isLoading={isLoading} />
		</div>
	);
};

export default Poster;
