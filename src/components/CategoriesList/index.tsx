import CategoryTag from "../CategoryTag";
import styles from "./styles.module.scss";

const categoriesArray = [
	"Acao",
	"Aventura",
	"Animacao",
	"Comedia",
	"Crime",
	"Documentario",
	"Drama",
	"Familia",
	"Fantasia",
	"Terror",
	"Misterio",
];

type CategoriesList = {
	categories: Array<string>;
};

const CategoriesList = ({ categories }: CategoriesList) => {
	return (
		<ul className={styles.content}>
			{categories.map((category, index) => (
				<li key={index}>
					<CategoryTag category={category} />
				</li>
			))}
		</ul>
	);
};

export default CategoriesList;