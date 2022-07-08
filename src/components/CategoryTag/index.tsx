import styles from "./styles.module.scss";

type CategoryTagProps = {
	category: string;
	selected?: boolean;
};

const CategoryTag = ({ category, selected = false }: CategoryTagProps) => {
	return (
		<article className={styles.content}>
			<h3>{category}</h3>
			{selected && <button></button>}
		</article>
	);
};

export default CategoryTag;
