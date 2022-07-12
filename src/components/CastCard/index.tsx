import styles from "./styles.module.scss";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import moviedbApi from "../../services/moviedbApi";

const CastCard = (actor: Actor) => {
	const characters = actor.character.split(/\s*[/]\s*/);
	const [pictures, setPictures] = useState([]);

	useEffect(() => {
		const images = moviedbApi
			.getImages(actor.id)
			.then((res) => setPictures(res.data.profiles));
	}, []);

	return (
		<article className={styles.castCardContainer}>
			<div className={styles.imageContainer}>
				{actor.profile_path && pictures.length > 0 ? (
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
			<h4>
				{characters.length === 1
					? characters[0]
					: characters[0] + " / " + characters[1]}
			</h4>
		</article>
	);
};

export default CastCard;
