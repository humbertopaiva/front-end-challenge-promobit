import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

type MovieCardProps = {
	id?: number;
	src?: string;
	title?: string;
	releaseDate?: string;
};

const MovieCard = ({ id, title, src, releaseDate = "" }: MovieCardProps) => {
	const date = new Date(releaseDate);
	const month = date
		.toLocaleString("default", { month: "short" })
		.slice(0, -1);
	const day = date.getDay();
	const year = date.getFullYear();

	return (
		<Link href={`/movie/${id}`}>
			<a>
				<article className={styles.content}>
					<div className={styles.movie_image}>
						<Image
							src={`https://image.tmdb.org/t/p/w220_and_h330_face/${src}`}
							alt={title}
							width="175px"
							objectFit="cover"
							height="264px"
						/>
					</div>
					<div className={styles.movie_infos}>
						<h3>{title}</h3>
						<p>{`${day < 10 && "0"}${
							day === 0 ? 1 : day
						} ${month.toUpperCase()} ${year}`}</p>
					</div>
				</article>
			</a>
		</Link>
	);
};

export default MovieCard;
