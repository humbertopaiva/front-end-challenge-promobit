import styles from "./styles.module.scss";
import { BsFileEarmarkPerson } from "react-icons/bs";

const CastCard = (actor: Actor) => {
	return (
		<article className={styles.castCardContainer}>
			<div className={styles.imageContainer}>
				{actor.profile_path ? (
					<img
						src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${actor.profile_path}`}
						alt={actor.name}
					/>
				) : (
					<i>
						<BsFileEarmarkPerson />
					</i>
				)}
			</div>
			<h3>{actor.name}</h3>
			<h4>{actor.character.split(/\s*[/]\s*/)[0]}</h4>
		</article>
	);
};

export default CastCard;
