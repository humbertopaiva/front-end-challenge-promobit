import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Pagination from "../components/Pagination";
import GenresSection from "../layouts/GenresSection";
import MoviesGallery from "../layouts/MoviesGallery";
import moviedbApi from "../services/moviedbApi";

const Home = ({
	genres,
	moviesList,
}: {
	genres: Genre[];
	moviesList: Movie[];
}) => {
	return (
		<div>
			<GenresSection genres={genres} />
			<MoviesGallery moviesList={moviesList} />
			<Pagination />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const genres = await moviedbApi
		.getGenresList()
		.then((res) => res.data.genres);

	const moviesList = await moviedbApi
		.getMoviesList(1)
		.then((res) => res.data.results);

	return {
		props: {
			genres,
			moviesList,
		},
		revalidate: 60 * 60 * 3, //3 hours
	};
};

export default Home;
