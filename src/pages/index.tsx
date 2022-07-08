import type { NextPage } from "next";

import CategoriesSection from "../layouts/CategoriesSection";
import Header from "../layouts/Header";
import MoviesGallery from "../layouts/MoviesGallery";

const Home: NextPage = () => {
	return (
		<div>
			<Header />
			<CategoriesSection />
			<MoviesGallery />
		</div>
	);
};

export default Home;
