import Image from "next/image";
import { BsFileEarmarkPerson } from "react-icons/bs";
import styles from "./styles.module.scss";

const CastCard = (actor: Actor) => {
	const characters: string[] | string | undefined =
		actor.character && actor.character.split(/\s*[/]\s*/);

	return (
		<article className={styles.castCardContainer}>
			<div className={styles.imageContainer}>
				{actor.profile_path ? (
					<Image
						src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
						alt={actor.name}
						width="175px"
						height="222px"
						objectFit="cover"
					/>
				) : (
					<i>
						<BsFileEarmarkPerson />
					</i>
				)}
			</div>
			<h3>{actor.name}</h3>
			<h4>
				{characters?.length === 1 && characters[0]}
				{characters &&
					characters.length > 1 &&
					characters[0] + " / " + characters[1]}
			</h4>
		</article>
	);
};

export default CastCard;
