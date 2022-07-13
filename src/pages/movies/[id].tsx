import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoviesDB } from "../../hooks/MoviesDB";
import MovieRelease from "../../components/MovieRelease";
import Wraper from "../../components/Wraper";
import moviedbApi from "../../services/moviedbApi";
import styles from "./styes.module.scss";
import CircularProgressbar from "../../components/CircularProgressbar";
import MoviePoster from "../../components/MoviePoster";
import CastCard from "../../components/CastCard";
import "react-circular-progressbar/dist/styles.css";
import SimilarMovies from "../../components/SimilarMovies";
import MovieTrailer from "../../components/MovieTrailer";
import MovieCast from "../../components/MovieCast";
import MovieInfo from "../../components/MovieInfo";

const Movies = () => {
	return (
		<>
			<MovieInfo />
			<MovieCast />
			<MovieTrailer />
			<SimilarMovies />
		</>
	);
};

export default Movies;
