import CastCard from "../CastCard";
import Wraper from "../Wraper";
import styles from "./styles.module.scss";

const MovieCast = ({ cast }: { cast: Cast }) => {
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
