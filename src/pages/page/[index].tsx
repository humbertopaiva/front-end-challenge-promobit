import type { GetServerSideProps } from "next";
import Pagination from "../../components/Pagination";
import GenresSection from "../../layouts/GenresSection";
import MoviesGallery from "../../layouts/MoviesGallery";
import moviedbApi from "../../services/moviedbApi";

type PageProps = {
	genres?: Genre[];
};

const Page = ({ genres }: PageProps) => {
	return (
		<div>
			{genres && <GenresSection genres={genres} />}
			<MoviesGallery />
			<Pagination />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const genres = await moviedbApi
		.getGenresList()
		.then((res) => res.data.genres);

	return {
		props: {
			genres,
		},
	};
};

export default Page;
