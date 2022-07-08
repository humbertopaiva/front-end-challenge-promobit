import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MoviesDBProvider } from "../hooks/MoviesDB";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MoviesDBProvider>
			<Component {...pageProps} />
		</MoviesDBProvider>
	);
}

export default MyApp;
