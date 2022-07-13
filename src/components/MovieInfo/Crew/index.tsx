import styles from "../styles.module.scss";

const Crew = ({ cast }: { cast: Cast }) => {
	return (
		<ul className={styles.crewContent}>
			{cast?.crew.map((staff, index) => {
				const jobs = ["Characters", "Director", "Screenplay"];

				if (jobs.includes(staff.job))
					return (
						<li key={index}>
							<h3>{staff.name}</h3>
							<h4>{staff.job}</h4>
						</li>
					);
			})}
		</ul>
	);
};

export default Crew;
