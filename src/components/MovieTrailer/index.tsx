import OficialTrailer from "../OficialTrailer";
import Wraper from "../Wraper";
import styles from "./styles.module.scss";

const MovieTrailer = ({ trailers }: { trailers: Trailer[] }) => {
	const getTrailerPath = (): string => {
		const trailerPath = trailers?.find(
			(video) => video.site === "YouTube" && video.type === "Trailer"
		);

		if (trailerPath) return trailerPath.key;
		else return "";
	};

	return (
		<Wraper>
			{trailers && (
				<div className={styles.oficialTrailerContainer}>
					<h2>Trailer Oficial</h2>
					{trailers && <OficialTrailer src={getTrailerPath()} />}
				</div>
			)}
		</Wraper>
	);
};

export default MovieTrailer;
