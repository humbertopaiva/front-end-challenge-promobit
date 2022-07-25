// Movie Interface

// interface Movie {
// 	data?: MovieData;
// }

// MovieInfo Interface

interface Movie {
	id?: number;
	title?: string;
	overview?: string;
	vote_average?: number;
	genres?: Genre[];
	runtime?: number;
	release_date?: string;
	poster_path?: string;
	backdrop_path?: string;
	cast?: Cast;
	similarMovies?: SimilarMovies[];
	certification?: Certification[];
}

// Cast Interface

interface Cast {
	id?: number;
	cast?: Actor[];
	crew?: Staff[];
}

interface Actor {
	id?: number;
	name?: string;
	character?: string;
	profile_path?: string;
}

interface Staff {
	id?: number;
	name?: string;
	department?: string;
	profile_path?: string;
}

// Similar  Interface

interface SimilarMovies {
	data?: MovieData;
}

// Certification  Interface

type Certification = {
	iso_3166_1?: string;
	release_dates?: ReleaseDate[];
};

type ReleaseDate = {
	certification?: string;
};

interface Trailer {
	type: string;
	site: string;
	key: string;
	official: boolean;
}
