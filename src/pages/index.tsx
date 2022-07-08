import type { NextPage } from "next";
import { MoviesDBProvider } from "../hooks/MoviesDB";
import GenresSection from "../layouts/GenresSection";
import Header from "../layouts/Header";
import MoviesGallery from "../layouts/MoviesGallery";

const Home: NextPage = () => {
	return (
		<div>
			<MoviesDBProvider>
				<Header />
				<GenresSection />
				<MoviesGallery />
			</MoviesDBProvider>
		</div>
	);
};

export default Home;
