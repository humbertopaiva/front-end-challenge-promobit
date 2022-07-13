import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moviedbApi from "../../services/moviedbApi";
import CastCard from "../CastCard";
import Wraper from "../Wraper";
import styles from "./styles.module.scss";

const MovieCast = () => {
	const [cast, setCast] = useState<Cast | null>(null);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (id)
			moviedbApi.getCast(id).then((res) => {
				setCast(res.data);
			});
	}, [id]);

	return (
		<Wraper>
			<section className={styles.castContainer}>
				<h2>Elenco original</h2>
				<div className={styles.castList}>
					<ul>
						{cast &&
							cast.cast.map((actor) => (
								<li key={actor.id}>
									<CastCard
										name={actor.name}
										character={actor.character}
										profile_path={actor.profile_path}
										id={actor.id}
									/>
								</li>
							))}
					</ul>
				</div>
			</section>
		</Wraper>
	);
};

export default MovieCast;
