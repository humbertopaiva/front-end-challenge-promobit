import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moviedbApi from "../../services/moviedbApi";
import OficialTrailer from "../OficialTrailer";
import Wraper from "../Wraper";
import styles from "./styles.module.scss";

interface Video {
	type: string;
	site: string;
	key: string;
	official: boolean;
}

const MovieTrailer = () => {
	const [trailer, setTrailer] = useState("");
	const [videos, setVideos] = useState<Video[] | null>([]);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (id)
			moviedbApi.getVideos(id).then((res) => {
				setVideos(res.data.results);
			});
	}, [id]);

	useEffect(() => {
		const trailerKey = videos?.find(
			(video) => video.site === "YouTube" && video.type === "Trailer"
		);

		if (trailerKey) setTrailer(trailerKey.key);
		else setTrailer("");
	}, [videos, id]);

	return (
		<Wraper>
			{trailer && (
				<div className={styles.oficialTrailerContainer}>
					<h2>Trailer Oficial</h2>
					{trailer && <OficialTrailer src={trailer} />}
				</div>
			)}
		</Wraper>
	);
};

export default MovieTrailer;
