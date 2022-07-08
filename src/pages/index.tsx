import type { NextPage } from "next";
import CategoriesSection from "../layouts/CategoriesSection";
import Header from "../layouts/Header";

const Home: NextPage = () => {
	return (
		<div>
			<Header />
			<CategoriesSection />
		</div>
	);
};

export default Home;
