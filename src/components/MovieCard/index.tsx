import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

type MovieCardProps = {
	id?: number;
	src?: string;
	title?: string;
	releaseDate?: string;
};

const slugfy = (title: string) => {
	return title
		.toLowerCase()
		.replace(/[àÀáÁâÂãäÄÅåª]+/g, "a") // Special Characters #1
		.replace(/[èÈéÉêÊëË]+/g, "e") // Special Characters #2
		.replace(/[ìÌíÍîÎïÏ]+/g, "i") // Special Characters #3
		.replace(/[òÒóÓôÔõÕöÖº]+/g, "o") // Special Characters #4
		.replace(/[ùÙúÚûÛüÜ]+/g, "u") // Special Characters #5
		.replace(/[ýÝÿŸ]+/g, "y") // Special Characters #6
		.replace(/[ñÑ]+/g, "n") // Special Characters #7
		.replace(/[çÇ]+/g, "c") // Special Characters #8
		.replace(/[ß]+/g, "ss") // Special Characters #9
		.replace(/[Ææ]+/g, "ae") // Special Characters #10
		.replace(/[Øøœ]+/g, "oe") // Special Characters #11
		.replace(/[%]+/g, "pct") // Special Characters #12
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/[^\w\-]+/g, "") // Remove all non-word chars
		.replace(/\-\-+/g, "-") // Replace multiple - with single -
		.replace(/^-+/, "") // Trim - from start of text
		.replace(/-+$/, ""); // Trim - from end of text
};

const MovieCard = ({ id, title, src, releaseDate = "" }: MovieCardProps) => {
	const date = new Date(releaseDate);
	const month = date
		.toLocaleString("default", { month: "short" })
		.slice(0, -1);
	const day = date.getDay();
	const year = date.getFullYear();
	const slug = title && slugfy(title);

	return (
		<Link href={`/movie/${id}/${slug}`}>
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
