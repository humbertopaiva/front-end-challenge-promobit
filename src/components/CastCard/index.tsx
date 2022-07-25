import Image from "next/image";
import { useEffect, useState } from "react";
import { BsFileEarmarkPerson } from "react-icons/bs";
import moviedbApi from "../../services/moviedbApi";
import styles from "./styles.module.scss";

const CastCard = (actor: Actor) => {
	const characters = actor.character.split(/\s*[/]\s*/);
	const [picturePath, setPicturePath] = useState("");

	useEffect(() => {
		moviedbApi.getImages(actor.id).then((res) => {
			const profiles = res.data.profiles;
			if (profiles.length > 0) {
				setPicturePath(profiles[0].file_path);
			}
		});
	}, []);

	return (
		<article className={styles.castCardContainer}>
			<div className={styles.imageContainer}>
				{picturePath ? (
					<Image
						src={`https://image.tmdb.org/t/p/w185${picturePath}`}
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
				{characters.length === 1
					? characters[0]
					: characters[0] + " / " + characters[1]}
			</h4>
		</article>
	);
};

export default CastCard;
