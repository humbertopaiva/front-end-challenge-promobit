import type { NextPage } from "next";
import Pagination from "../components/Pagination";

import GenresSection from "../layouts/GenresSection";
import Header from "../layouts/Header";
import MoviesGallery from "../layouts/MoviesGallery";

const Home: NextPage = () => {
	return (
		<div>
			<Header />
			<GenresSection />
			<MoviesGallery />
			<Pagination />
		</div>
	);
};

export default Home;
