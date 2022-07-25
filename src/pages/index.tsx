import type { GetStaticProps, NextPage } from "next";
import Pagination from "../components/Pagination";
import GenresSection from "../layouts/GenresSection";
import MoviesGallery from "../layouts/MoviesGallery";
import moviedbApi from "../services/moviedbApi";

const Home = ({ genres }: { genres: Genre[] }) => {
	return (
		<div>
			<GenresSection genres={genres} />
			<MoviesGallery />
			<Pagination />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const genres = await moviedbApi
		.getGenresList()
		.then((res) => res.data.genres);

	return {
		props: {
			genres,
		},
		revalidate: 60 * 60 * 24, //24 hours
	};
};

export default Home;
