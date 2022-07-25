import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

type Props = {
	runtime: number;
	genres: Genre[];
	certification: Certification[];
	release_date: string;
};

const MovieRelease = ({
	runtime,
	genres,
	certification,
	release_date,
}: Props) => {
	const [certificationAge, setCertificationAge] = useState<string>("");

	useEffect(() => {
		if (certification) {
			certification.map((c) => {
				if (c.iso_3166_1 === "BR" && c.release_dates) {
					if (c.release_dates[0].certification)
						setCertificationAge(c.release_dates[0].certification);
				}
			});
		}
	}, [certification]);

	const runtimeTransform = () => {
		if (runtime) {
			const hours = Math.floor(runtime / 60);
			const minutes = runtime % 60;
			const textHours = `00${hours}`.slice(-2);
			const textMinutes = `00${minutes}`.slice(-2);
			return `${textHours}h ${textMinutes}min`;
		}
	};

	const dateTransform = (date: string) => {
		const transformDate = new Date(date);
		return transformDate.toLocaleDateString("pt-BR");
	};

	return (
		<div className={styles.movieRelease_content}>
			<ul>
				<li>
					{certificationAge && (
						<>
							Classificação:{" "}
							{certificationAge === "L"
								? "Livre"
								: certificationAge + " anos"}
						</>
					)}
				</li>

				<li>{dateTransform(release_date)}</li>

				<li>{genres.map((genre) => genre.name).join(", ")}</li>

				<li>{runtimeTransform()}</li>
			</ul>
		</div>
	);
};

export default MovieRelease;
