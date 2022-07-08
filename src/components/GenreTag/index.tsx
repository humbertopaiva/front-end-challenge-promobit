import styles from "./styles.module.scss";
import { IoMdCloseCircle } from "react-icons/io";
import { useState } from "react";

type CategoryTagProps = {
	category: string;
};

const GenreTag = ({ category }: CategoryTagProps) => {
	const [selected, setSelected] = useState(false);
	const handleClick = () => {
		setSelected((e) => !e);
	};
	return (
		<article
			className={`${styles.content} ${selected && styles["selected"]}`}
			onClick={handleClick}
		>
			<h3>{category}</h3>
			{selected && (
				<button>
					<IoMdCloseCircle />
				</button>
			)}
		</article>
	);
};

export default GenreTag;
