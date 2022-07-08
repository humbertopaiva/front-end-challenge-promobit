import CategoriesList from "../../components/CategoriesList";
import Wraper from "../../components/Wraper";
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

const CategoriesSection = () => {
	return (
		<Wraper bgColor="primary">
			<section className={styles.content}>
				<h2>
					Milhões de filmes, séries e pessoas para descobrir. Explore
					já.
				</h2>
				<p>Filtre por: </p>
				<CategoriesList categories={categoriesArray} />
			</section>
		</Wraper>
	);
};

export default CategoriesSection;
