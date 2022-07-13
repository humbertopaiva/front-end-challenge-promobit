import styles from "../styles.module.scss";

const Overview = ({ overview }: { overview: string }) => {
	return (
		<div className={styles.overview}>
			<h2>Sinopse</h2>
			<p>{overview}</p>
		</div>
	);
};

export default Overview;
