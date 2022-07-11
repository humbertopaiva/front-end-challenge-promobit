interface Actor {
	id: number;
	name: string;
	profile_path: string;
	character: string;
}

interface Staff {
	name: string;
	job: string;
}

interface Cast {
	cast: Actor[];
	crew: Staff[];
}
