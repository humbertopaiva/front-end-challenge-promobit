import { useEffect, useState } from "react";
import Router from "next/router";

const Home = () => {
	useEffect(() => {
		const { pathname } = Router;
		if (pathname === "/") Router.push("page/1");
	}, []);

	return <></>;
};

export default Home;
