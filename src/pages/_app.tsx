import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MoviesDBProvider } from "../hooks/MoviesDB";
import Header from "../layouts/Header";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MoviesDBProvider>
			<Header />
			<Component {...pageProps} />
		</MoviesDBProvider>
	);
}

export default MyApp;
